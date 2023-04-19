using Core.Entities;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecifications : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandsSpecifications()
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }

        public ProductWithTypesAndBrandsSpecifications(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}
