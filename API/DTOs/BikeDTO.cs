using API.Entities;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateBikeDTO
    {
        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ReferenceNumber { get; set; }

        public double Rating { get; set; }

        [Required]
        public double Price { get; set; }

        public double DicountedPrice { get; set; }

        [Required]
        public string Color { get; set; }

        public List<Photo> Photos { get; set; } = new List<Photo>();

        [Required]
        public string BikeType { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        [Required]
        public string Location { get; set; }
    }

    public class UpdateBikeDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ReferenceNumber { get; set; }
        public double Rating { get; set; }
        public double Price { get; set; }
        public string Color { get; set; }
        public string BikeType { get; set; }
        public string Location { get; set; }
    }

    public class BikeDTO : CreateBikeDTO
    {
        public int Id { get; set; }

        public new List<PhotoDTO> Photos { get; set; }
    }
}
