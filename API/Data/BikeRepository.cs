using API.DTOs;
using API.Entities;
using API.Helper;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace API.Data
{
    public class BikeRepository : IBikeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BikeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BikeDTO> GetBikeByIdAsync(int id)
        {
            //return await _context.Bikes
            //    .Include(p => p.Photos)
            //    .FirstOrDefaultAsync(x => x.Id == id);
            return await _context.Bikes
                .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<BikeDTO>> GetBikeByNameAsync(string name)
        {
            return await _context.Bikes
                .Where(x => x.Name.ToLower().Contains(name.ToLower()))
                .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<BikeDTO>> GetBikeByRefNumberAsync(string refNumber)
        {
            return await _context.Bikes
                .Where(x => x.ReferenceNumber.ToLower().Contains(refNumber.ToLower()))
                .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PagedList<BikeDTO>> GetBikesAsync(UserParams userParams)
        {
            //return await _context.Bikes
            //    .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
            //    .ToListAsync();
            var querry = _context.Bikes
               .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
               .AsNoTracking();

            return await PagedList<BikeDTO>.CreateAsync(querry, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void update(Bike bike)
        {
            _context.Entry(bike).State = EntityState.Modified;
        }
    }
}
