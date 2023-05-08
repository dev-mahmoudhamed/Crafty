using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
