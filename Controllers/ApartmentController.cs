
using Microsoft.AspNetCore.Mvc;
using ApartmentManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
namespace ApartmentManagementSystem.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ApartmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/apartment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Apartment>>> GetApartments()
        {
            return await _context.Apartments.ToListAsync();
        }

        // GET: api/apartment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Apartment>> GetApartment(int id)
        {
            var apartment = await _context.Apartments.FirstOrDefaultAsync(x => x.Id == id);
            if (apartment == null)
            {
                return NotFound();
            }
            return apartment;
        }

        // POST: api/apartment
        [HttpPost]
        public async Task<ActionResult<ApartmentDTO>> PostApartment(ApartmentDTO apartmentDto)
        {
            if (apartmentDto.OwnerId == null)
            {
                return BadRequest("Owner information is required.");
            }

            var owner = await _context.Owners.FindAsync(apartmentDto.OwnerId);
            if (owner == null)
            {
                return NotFound("Owner not found.");
            }

            
            var apartment = new Apartment
            {
                Name = apartmentDto.Name,
                Address = apartmentDto.Address,
                Price = apartmentDto.Price,
                NumberOfRooms = apartmentDto.NumberOfRooms,
                OwnerId = apartmentDto.OwnerId 
            };
            owner.Apartments.Add(apartment);
            if (ModelState.IsValid)
            {
                _context.Add(apartment);
                await _context.SaveChangesAsync();
                
            }
            return apartmentDto;
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
