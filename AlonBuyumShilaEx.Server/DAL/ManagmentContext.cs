using AlonBuyumShilaEx.Server.Models;

using Microsoft.EntityFrameworkCore;

namespace AlonBuyumShilaEx.Server.DAL
{
    public class ManagmentContext:DbContext
    {
        public ManagmentContext(DbContextOptions<ManagmentContext> options) : base(options) { }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<Employee> Employees { get; set; }


    }
}
