using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : BaseApiController
    {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;
        public CartController(ICartRepository cartRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cartRepository = cartRepository;
        }


        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetCartById(string id)
        {
            var cart = await _cartRepository.GetCartAsync(id);
            return Ok(cart ?? new CustomerCart(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCart>> UpdateCart(CustomerCartDto cart)
        {
            var customerCart = _mapper.Map<CustomerCartDto, CustomerCart>(cart);
            var updateCart = await _cartRepository.UpdateCartAsync(customerCart);
            return Ok(updateCart);
        }

        [HttpDelete]
        public async Task DeleteCartAsync(string id)
        {
            await _cartRepository.DeleteCartAsync(id);
        }
    }
}
