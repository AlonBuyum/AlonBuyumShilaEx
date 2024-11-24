using AlonBuyumShilaEx.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using AlonBuyumShilaEx.Server.DAL;
using System.Security.Cryptography;
using System;

namespace AlonBuyumShilaEx.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly ManagmentContext _managmentContext;
        private readonly ILogger<AuthController> _logger;
        private readonly IConfiguration _configuration;

        public AuthController(ManagmentContext context, ILogger<AuthController> logger, IConfiguration configuration)
        {
            _managmentContext = context;
            _logger = logger;
            _configuration = configuration;
        }

      
        [HttpPost, Route("register")]
        public IActionResult Register([FromBody]Manager manager)
        {
            if (_managmentContext.Managers.Any(m => m.Email == manager.Email))
            {
                _logger.LogWarning("Registration failed. Email {Email} is already in use.", manager.Email);
                return BadRequest("Email is already registered.");
            }

            manager.Password = HashPassword(manager.Password);
            _managmentContext.Managers.Add(manager);
            _managmentContext.SaveChanges();

            _logger.LogInformation("Manager {Email} registered successfully.", manager.Email);
            return Ok("Manager registered successfully: " + manager);
        }

     

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginDetails login)
        {
            var manager = _managmentContext.Managers.FirstOrDefault(m => m.Email == login.Email);
            if (manager == null || !VerifyPassword(login.Password, manager.Password))
            {
                _logger.LogWarning("Login failed. Email was not found: {email}, or password was incorrect: {password}.", login.Email, login.Password);
                return Unauthorized("Invalid credentials.");
            }

            var token = GenerateJwtToken(manager);
            _logger.LogInformation("Manager {Email} logged in successfully.", manager.Email);
            return Ok(token);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            return HashPassword(password) == hashedPassword;
        }

        private string GenerateJwtToken(Manager manager)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, manager.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
