using ApartmentManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ApartmentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantController : Controller
    {
        private readonly ApplicationDbContext _context;
        public TenantController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/tenant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tenant>>> GetTenants()
        {
            return await _context.Tenants.ToListAsync(); 
        }

        // GET: api/tenant/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tenant>> GetTenant(int id)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            if (tenant == null)
            {
                return NotFound();
            }
            return tenant;
        }

        // POST: api/tenant
        [HttpPost]
        public async Task<ActionResult<Tenant>> PostTenant(Tenant tenant)
        {
            if (tenant == null)
            {
                return BadRequest(new { message = "Tenant is null." });
            }
            if (ModelState.IsValid)
            {
                _context.Tenants.Add(tenant);
                await _context.SaveChangesAsync();
            }
            
            return tenant;
        }

        // PUT: api/tenant/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Tenant>> PutTenant(int id, Tenant tenant)
        {
            if (id != tenant.Id)
            {
                return BadRequest(new { message = "Ids are not matching." });
            }

            var oldTenant = await _context.Tenants.FindAsync(id);

            if (oldTenant == null)
            {
                return NotFound(new { message = "Tenant not found"});
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("ModelState is invalid");
            }

            try
            {
                oldTenant.Name = tenant.Name;
                oldTenant.Surname = tenant.Surname;
                oldTenant.Email = tenant.Email;
                oldTenant.StartOfLease = tenant.StartOfLease;
                oldTenant.LeaseAgreements = tenant.LeaseAgreements;

                await _context.SaveChangesAsync();
                return oldTenant;
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Error updating the found tenant");
            }

           
        }

        // DELETE: api/tenant/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTenant(int id)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            if (tenant == null)
            {
                return NotFound("Tenant not found");
            }
            _context.Tenants.Remove(tenant);
            await _context.SaveChangesAsync();
            return Ok("Succesfully deleted tenant");
        }

    }
}
