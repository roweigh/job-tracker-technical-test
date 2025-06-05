using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobApplicationApi.Models
{
    public class JobApplication
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName ="nvarchar(255)")]
        public string companyName { get; set; }

        [Column(TypeName ="nvarchar(255)")]
        public string position { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string status { get; set; }

        [Column(TypeName ="datetime2")]
        public DateTime dateApplied {  get; set; }
    }
}
