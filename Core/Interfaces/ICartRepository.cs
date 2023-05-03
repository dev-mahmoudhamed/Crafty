
using Core.Entities;

namespace Core.Interfaces
{
    public interface ICartRepository
    {
        Task<CustomerCart> GetCartAsync(string cartId);
        Task<CustomerCart> UpdateCartAsync(CustomerCart cart);
        Task<bool> DeleteCartAsync(string cartId);
    }
}
