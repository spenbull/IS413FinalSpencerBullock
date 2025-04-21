using _413Final.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _413Final.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private readonly EntertainerDbContext _entertainerContext;

        public EntertainerController(EntertainerDbContext temp)
        {
            _entertainerContext = temp;
        }

        [HttpGet("GetEntertainers")]
        public IEnumerable<Entertainers> Get()
        {
            return _entertainerContext.Entertainers.ToList();
        }

        [HttpGet("EntertainerSummaries")]
        public IActionResult GetEntertainerSummaries()
        {
            var entertainers = _entertainerContext.Entertainers.ToList();
            var engagements = _entertainerContext.Engagements.ToList();

            var summaries = entertainers.Select(e => new Summary
            {
                EntertainerId = e.EntertainerId,
                StageName = e.EntStageName,
                BookingCount = engagements.Count(en => en.EntertainerId == e.EntertainerId),
                LastBookingDate = engagements
                    .Where(en => en.EntertainerId == e.EntertainerId)
                    .Select(en =>
                    {
                        DateTime.TryParse(en.EndDate, out var parsedDate);
                        return parsedDate;
                    })
                    .OrderByDescending(d => d)
                    .FirstOrDefault()
                    .ToString("yyyy-MM-dd") // optional formatting
            }).ToList();

            return Ok(summaries);
        }
        
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainers newEntertainer)
        {
            _entertainerContext.Entertainers.Add(newEntertainer);
            _entertainerContext.SaveChanges();
            return Ok(newEntertainer);
        }
        [HttpGet("{id}")]
        public IActionResult GetEntertainerById(int id)
        {
            var entertainer = _entertainerContext.Entertainers.FirstOrDefault(e => e.EntertainerId == id);
            if (entertainer == null)
            {
                return NotFound();
            }
            return Ok(entertainer);
        }
        
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainers updated)
        {
            var existing = _entertainerContext.Entertainers.FirstOrDefault(e => e.EntertainerId == id);
            if (existing == null) return NotFound();

            // Update fields
            existing.EntStageName = updated.EntStageName;
            existing.EntSSN = updated.EntSSN;
            existing.EntStreetAddress = updated.EntStreetAddress;
            existing.EntCity = updated.EntCity;
            existing.EntState = updated.EntState;
            existing.EntZipCode = updated.EntZipCode;
            existing.EntPhoneNumber = updated.EntPhoneNumber;
            existing.EntWebPage = updated.EntWebPage;
            existing.EntEMailAddress = updated.EntEMailAddress;
            existing.DateEntered = updated.DateEntered;

            _entertainerContext.SaveChanges();
            return Ok(existing);
        }
        
        [HttpDelete("DeleteEntertainer/{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var Entertainer = _entertainerContext.Entertainers.Find(id);

            if (Entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }
            _entertainerContext.Entertainers.Remove(Entertainer);
            _entertainerContext.SaveChanges();
            
            return NoContent();
        }



    }
}

