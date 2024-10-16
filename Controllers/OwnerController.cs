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
        public async Task<ActionResult<Owner>> PostApartment(Owner owner)
        {
            
            if (ModelState.IsValid)
            {
                _context.Owners.Add(owner);
                await _context.SaveChangesAsync();

            }
            return owner;
        }

        // PUT: api/apartment/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Apartment>> PutApartment(int id, Apartment apartment)
        {
            if (id != apartment.Id)
            {
                return BadRequest("ID mismatch.");
            }

            var oldApartment = await _context.Apartments.FirstOrDefaultAsync(a => a.Id == id);
            if (oldApartment == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                oldApartment.Name = apartment.Name;
                oldApartment.Address = apartment.Address;
                oldApartment.Price = apartment.Price;
                oldApartment.NumberOfRooms = apartment.NumberOfRooms;
                oldApartment.OwnerId = apartment.OwnerId;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok(oldApartment);
        }


        //DELETE: api/apartment/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteApartment(int id)
        {
            var apartment = await _context.Apartments.FindAsync(id);
            if (apartment == null)
            {
                return NotFound();
            }
            var owner = await _context.Owners.FindAsync(apartment.OwnerId);
            owner.Apartments.Remove(apartment);
            _context.Apartments.Remove(apartment);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
