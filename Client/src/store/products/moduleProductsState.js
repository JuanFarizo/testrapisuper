export default {
  sortedProducts: [],
  allProductsOfBranch: [],
  Categories: [],
  totalProductsAmount: 0,
  currentPage: 1,
  Query: {
    Category: { id: 0, name: '', parentID: 0, amount: 0, },
    Brand: { id: 0, name: '', amount: 0, },
    search: '',
    minPrice: '',
    maxPrice: '',
  },
  zoomProductID: 0,
} // export default


// Categories example:
// [
//   { id: 1, name: Frescos, children: ['1', '4', '7'] }
//   { id: 2, name: Verduras, children: ['3', '7', '9'] }
// ]
// Los productos con ID 1, 4 y 7 pertenecen a la categoría Frescos)
// Los productos con ID 3, 7 y 9 pertenecen a la categoría Verduras)
