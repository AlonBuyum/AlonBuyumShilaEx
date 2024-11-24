using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AlonBuyumShilaEx.Server.Models
{
    public class Manager
    {
        [Key]
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();

        //[Required]
        public string Email { get; set; }

       // [Required]
        public string Password { get; set; } 

        //[Required]
        public string? FullName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
       // [JsonIgnore]
       // public ICollection<Employee> Employees { get; set; }
    }
}
