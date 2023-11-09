using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Bike, BikeDTO>();
            CreateMap<Bike, UpdateBikeDTO>();
            CreateMap<UpdateBikeDTO, Bike>();
            CreateMap<CreateBikeDTO, Bike>();

            CreateMap<Photo, PhotoDTO>();
            CreateMap<AppUser, UserDTO>();
        }
    }
}
