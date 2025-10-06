using AutoMapper;
using backend.DTOs.User;
using backend.Models;
 
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
            // SignInDto → User
            CreateMap<SignInDto, User>()
                .ForMember(dest => dest.PasswordHash,
                           opt => opt.MapFrom(src => PasswordHasher.Hash(src.Password)));
            // User → UserResponseDto
            CreateMap<User, UserResponseDto>();
            // UpdateUserDto → User
            CreateMap<UpdateUserDto, User>()
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            // User → InfoUserDto
            CreateMap<User, InfoUserDto>();

              
        }
    }
}
