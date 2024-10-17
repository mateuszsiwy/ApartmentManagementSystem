using ApartmentManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApartmentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : Controller
    {
        private readonly ApplicationDbContext _context;
        public OwnerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/owner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Owner>>> GetOwners()
        {
            return await _context.Owners.ToListAsync();
        }

        // GET: api/owner/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Owner>> GetOwner(int id)
        {
            var owner = await _context.Owners.FirstOrDefaultAsync(x => x.Id == id);
            if (owner == null)
            {
                return NotFound();
            }
            return owner;
        }

        // POST: api/owner
        [HttpPost]
        public async Task<ActionResult<Owner>> PostOwner(Owner owner)
        {
            
            if (ModelState.IsValid)
            {
                _context.Owners.Add(owner);
                await _context.SaveChangesAsync();

            }
            return owner;
        }

        // PUT: api/owner/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Owner>> PutOwner(int id, Owner owner)
        {
            if (id != owner.Id)
            {
                return BadRequest("ID mismatch.");
            }

            var oldOwner = await _context.Owners.FirstOrDefaultAsync(a => a.Id == id);
            if (oldOwner == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                oldOwner.Name = owner.Name;
                oldOwner.Surname = owner.Surname;
                oldOwner.Email = owner.Email;
                oldOwner.PhoneNumber = owner.PhoneNumber;
                oldOwner.Apartments = owner.Apartments;


                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok(oldOwner);
        }


        //DELETE: api/owner/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOwner(int id)
        {
            var owner = await _context.Owners.FirstOrDefaultAsync(_ => _.Id == id);
            if (owner == null)
            {
                return NotFound("There are no owners with this Id.");
            }
            if (owner.Apartments != null)
            {
                _context.Apartments.RemoveRange(owner.Apartments);
            }
            
            _context.Owners.Remove(owner);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
