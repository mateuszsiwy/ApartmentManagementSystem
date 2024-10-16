using System.Buffers;

namespace ApartmentManagementSystem.Models
{
    public class Apartment
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Price { get; set; }
        public int NumberOfRooms { get; set; }

        public int OwnerId { get; set; }
        public Owner Owner { get; set; }
        public ICollection<LeaseAgreement> LeaseAgreements { get; set; }
    }
}
