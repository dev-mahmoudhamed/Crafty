using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AddressDto
    {

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }

    }
}
