using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Bike, BikeDTO>()
                .ForMember(
                    dest => dest.PhotoUrl, 
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Bike, UpdateBikeDTO>();
            CreateMap<UpdateBikeDTO, Bike>();
            CreateMap<CreateBikeDTO, Bike>();
            CreateMap<Photo, PhotoDTO>();
            CreateMap<AppUser, UserDTO>();
        }
    }
}
