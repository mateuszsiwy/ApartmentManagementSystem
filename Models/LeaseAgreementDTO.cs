using System.ComponentModel.DataAnnotations;

namespace ApartmentManagementSystem.Models
{
    public class LeaseAgreementDTO
    {
        public int Id { get; set; }
        public int ApartmentId { get; set; }
        public int TenantId { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartOfLease { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndOfLease { get; set; }
        public string Rent { get; set; }
    }
}
