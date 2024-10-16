
using Microsoft.EntityFrameworkCore;
namespace ApartmentManagementSystem.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Owner> Owners { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<LeaseAgreement> LeaseAgreements { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Owner>().HasData(
                new Owner
                {
                    Id = 1,
                    Name = "John",
                    Surname = "Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "123-456-7890"
                },
                new Owner
                {
                    Id = 2,
                    Name = "Jane",
                    Surname = "Smith",
                    Email = "jane.smith@example.com",
                    PhoneNumber = "987-654-3210"
                }
            );

            modelBuilder.Entity<Apartment>().HasData(
                new Apartment
                {
                    Id = 1,
                    Name = "Sunset Villas",
                    Address = "123 Sunset Blvd, Cityville",
                    Price = "1200",
                    NumberOfRooms = 3,
                    OwnerId = 1
                },
                new Apartment
                {
                    Id = 2,
                    Name = "Ocean Breeze Apartments",
                    Address = "456 Ocean Drive, Beachtown",
                    Price = "1500",
                    NumberOfRooms = 2,
                    OwnerId = 2
                }
            );

            modelBuilder.Entity<Tenant>().HasData(
                new Tenant
                {
                    Id = 1,
                    Name = "Michael",
                    Surname = "Johnson",
                    Email = "michael.johnson@example.com",
                    StartOfLease = new DateTime(2023, 1, 15)
                },
                new Tenant
                {
                    Id = 2,
                    Name = "Emily",
                    Surname = "Davis",
                    Email = "emily.davis@example.com",
                    StartOfLease = new DateTime(2023, 5, 1)
                }
            );

            modelBuilder.Entity<LeaseAgreement>().HasData(
                new LeaseAgreement
                {
                    Id = 1,
                    ApartmentId = 1,
                    TenantId = 1,
                    StartOfLease = new DateTime(2023, 1, 15),
                    EndOfLease = new DateTime(2024, 1, 15),
                    Rent = "1200"
                },
                new LeaseAgreement
                {
                    Id = 2,
                    ApartmentId = 2,
                    TenantId = 2,
                    StartOfLease = new DateTime(2023, 5, 1),
                    EndOfLease = new DateTime(2024, 5, 1),
                    Rent = "1500"
                }
            );
        }

    }


}
