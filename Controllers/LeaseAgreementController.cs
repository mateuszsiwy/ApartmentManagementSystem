using Microsoft.AspNetCore.Mvc;
using ApartmentManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ApartmentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaseAgreementController : Controller
    {
        private readonly ApplicationDbContext _context;
        public LeaseAgreementController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: /api/leaseagreement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaseAgreement>>> GetLeaseAgreements()
        {
            return await _context.LeaseAgreements.ToListAsync();
        }

        // GET: /api/leaseagreement/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaseAgreement>> GetLeaseAgreement(int id)
        {
            var lease = await _context.LeaseAgreements.FirstOrDefaultAsync(x => x.Id == id);
            if (lease == null)
            {
                return NotFound("Lease agreement not found");
            }

            return lease;
        }

        // POST: /api/leaseagreement
        [HttpPost]
        public async Task<ActionResult<LeaseAgreementDTO>> PostLeaseAgreement(LeaseAgreementDTO leaseAgreementDto)
        {
            if (ModelState.IsValid)
            {
                LeaseAgreement leaseAgreement = new LeaseAgreement
                {
                    Id = leaseAgreementDto.Id,
                    ApartmentId = leaseAgreementDto.ApartmentId,
                    TenantId = leaseAgreementDto.TenantId,
                    StartOfLease = leaseAgreementDto.StartOfLease,
                    EndOfLease = leaseAgreementDto.EndOfLease,
                    Rent = leaseAgreementDto.Rent
                };
                _context.LeaseAgreements.Add(leaseAgreement);
                var tenant = await _context.Tenants.FindAsync(leaseAgreementDto.TenantId);
                if (tenant == null)
                {
                    return NotFound("Tenant not found.");
                }
                tenant.LeaseAgreements.Add(leaseAgreement);

                var apartment = await _context.Apartments.FindAsync(leaseAgreementDto.ApartmentId);
                if (apartment == null)
                {
                    return NotFound("Apartment not found.");
                }
                apartment.LeaseAgreements.Add(leaseAgreement);

                await _context.SaveChangesAsync();
                return leaseAgreementDto;
            }

            return BadRequest("Model state is invalid.");
        }


        // PUT: /api/leaseagreement
        [HttpPut("{id}")]
        public async Task<ActionResult<LeaseAgreement>> PutLeaseAgreement(int id, LeaseAgreement leaseAgreement)
        {
            if (id != leaseAgreement.Id)
            {
                return BadRequest("Ids are not matching.");
            }

            var oldLeaseAgreement = await _context.LeaseAgreements.FindAsync(id);

            if (oldLeaseAgreement == null)
            {
                return NotFound();
            }

            try
            {
                oldLeaseAgreement.ApartmentId = leaseAgreement.ApartmentId;
                oldLeaseAgreement.TenantId = leaseAgreement.TenantId;
                oldLeaseAgreement.StartOfLease = leaseAgreement.StartOfLease;
                oldLeaseAgreement.EndOfLease = leaseAgreement.EndOfLease;
                oldLeaseAgreement.Rent = leaseAgreement.Rent;

                await _context.SaveChangesAsync();

                return oldLeaseAgreement;
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }
        }

        // DELETE: /api/leaseagreement
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLeaseAgreement(int id)
        {
            var leaseAgreement = await _context.LeaseAgreements.FindAsync(id);
            if (leaseAgreement == null)
            {
                return NotFound();
            }

            _context.LeaseAgreements.Remove(leaseAgreement);
            await _context.SaveChangesAsync();

            return Ok();
        }



    }
}
