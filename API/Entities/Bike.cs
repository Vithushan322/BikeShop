namespace API.Entities
{
    public class Bike
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ReferenceNumber { get; set; }
        public double Rating { get; set; }
        public double Price { get; set; }
        public double DicountedPrice { get; set; }
        public string Color { get; set; }
        public List<Photo> Photos { get; set; } = new();
        public string BikeType { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Location { get; set; }
    }
}
