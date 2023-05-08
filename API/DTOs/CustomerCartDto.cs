using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CustomerCartDto
    {
        [Required]
        public string Id { get; set; }
        public List<CartItemDto> Items { get; set; }
    }
}
