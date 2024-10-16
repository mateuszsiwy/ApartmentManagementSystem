namespace ApartmentManagementSystem.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public ICollection<Apartment> Apartments { get; set; }
    }
}
