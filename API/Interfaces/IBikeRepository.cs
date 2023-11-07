using API.DTOs;
using API.Entities;
using API.Helper;

namespace API.Interfaces
{
    public interface IBikeRepository
    {
        void update(Bike bike);

        Task<bool> SaveAllAsync();

        Task<PagedList<BikeDTO>> GetBikesAsync(UserParams userParams);

        Task<BikeDTO> GetBikeByIdAsync(int id);

        Task<IEnumerable<BikeDTO>> GetBikeByNameAsync(string name);

        Task<IEnumerable<BikeDTO>> GetBikeByRefNumberAsync(string refNumber);
    }
}
