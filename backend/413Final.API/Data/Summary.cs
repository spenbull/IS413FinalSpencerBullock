using System.ComponentModel.DataAnnotations;

namespace _413Final.API.Data;

public class Summary
{
    public int EntertainerId { get; set; }
    public string StageName { get; set; }
    public int BookingCount { get; set; }
    public string? LastBookingDate { get; set; } // was DateTime? before
}
