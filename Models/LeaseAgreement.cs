using System.ComponentModel.DataAnnotations;

namespace ApartmentManagementSystem.Models
{
    public class LeaseAgreement
    {
        public int Id { get; set; }
        public int ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartOfLease { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndOfLease { get; set; }
        public string Rent { get; set; }
    }
}
