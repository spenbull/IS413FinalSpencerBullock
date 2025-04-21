using System.ComponentModel.DataAnnotations;

namespace _413Final.API.Data;

public class Engagement
{
    [Key]
    public int EngagementNumber { get; set; }
    public int EntertainerId { get; set; }
    public string EndDate { get; set; }


}
