namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }
        public Address(string firstName, string lastName, string street, string city)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
    }
}
