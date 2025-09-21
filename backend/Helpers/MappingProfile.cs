using AutoMapper;
using backend.DTOs.User;
using backend.Models;
using backend.Helpers;

namespace backend.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // SignUpDto → User
            CreateMap<SignUpDto, User>()
                .ForMember(dest => dest.PasswordHash,
                           opt => opt.MapFrom(src => PasswordHasher.Hash(src.Password)))
                .ForMember(dest => dest.EmailVerified, opt => opt.MapFrom(_ => false))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            // User → UserResponseDto
            CreateMap<User, UserResponseDto>();
        }
    }
}
