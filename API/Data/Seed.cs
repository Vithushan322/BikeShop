using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Bikes.AnyAsync()) return;

            var bikeData = await File.ReadAllTextAsync("Data/BikeSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var bikes = JsonSerializer.Deserialize<List<Bike>>(bikeData);

            foreach (var bike in bikes)
            {
                context.Bikes.Add(bike);
            }

            await context.SaveChangesAsync();
        }
    }
}
