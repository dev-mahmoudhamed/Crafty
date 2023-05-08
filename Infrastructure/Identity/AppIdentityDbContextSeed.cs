using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Mahmoud Hamed",
                    Email = "Mahmoud@email.com",
                    UserName = "Mahmoudhamed",
                    Address = new Address
                    {
                        FirstName = "Mahmoud",
                        LastName = "Hamed",
                        City = "Mansoura",
                    }
                };
                await userManager.CreateAsync(user, "Password@1");
            }
        }
    }
}
