using System.ComponentModel.DataAnnotations;

namespace ApartmentManagementSystem.Models
{
    public class Tenant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; } 
        public string Email { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartOfLease { get; set; }

        public ICollection<LeaseAgreement>? LeaseAgreements { get; set; }
    }
}
