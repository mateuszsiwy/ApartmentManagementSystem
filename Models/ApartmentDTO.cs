namespace ApartmentManagementSystem.Models
{
    public class ApartmentDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Price { get; set; }
        public int NumberOfRooms { get; set; }
        public int OwnerId { get; set; } 
    }

}
