﻿
namespace Core.Entities
{
    public class CustomerCart
    {
        public CustomerCart()
        {
        }
        public CustomerCart(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}
