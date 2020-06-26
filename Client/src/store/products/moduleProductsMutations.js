// ADD_IS_IN_PAGE
// ADD_CATEGORY
// ADD_CATEGORY_CHILDREN
// ADD_QUERY_CATEGORY
// CLEAR_PRODUCTS
// CLEAR_PAGES
// LOAD_PRODUCTS
// MODIFY_AMOUNT_IN_CART
// MODIFY_IS_HIDDEN
// UPDATE_CURRENT_PAGE
// UPDATE_QUERY_BRAND
// UPDATE_QUERY_CATEGORY
// UPDATE_QUERY_PRICE
// UPDATE_QUERY_SEARCH
// REMOVE_IS_IN_PAGE
// REMOVE_PRODUCT
// REMOVE_QUERY_CATEGORY
// RESET_QUERY
// SET_SORTED_PRODUCTS

export default {
  ADD_IS_IN_PAGE(state, productID) {
    const index = state.allProductsOfBranch.findIndex(i => i.productID == productID);
    state.allProductsOfBranch[index].isInPage = true;
  },
  ADD_CATEGORY(state, Category) {
    Category.children = [];
    state.Categories.push(Category);
  },
  ADD_CATEGORY_CHILDREN(state, Params) {
    const index = state.Categories.findIndex(i => i.id == Params.categoryID);
    if (index != -1) state.Categories[index].children.push(Params.detailsID);
  },
  ADD_QUERY_CATEGORY(state, categoryID) {
    state.Query.categoriesID.push(categoryID);
  },
  CLEAR_PRODUCTS(state) {
    state.allProductsOfBranch.lenght = 0;
    state.totalProductsAmount = 0;
  },
  CLEAR_PAGES(state) {
    for (let ProdOfBranch of state.allProductsOfBranch) {
      ProdOfBranch.isInPage = false;
    }
  },
  LOAD_PRODUCTS(state, item) {
    state.allProductsOfBranch = item;
    state.totalProductsAmount = item.length;
  },
  MODIFY_AMOUNT_IN_CART(state, item) {
    const index = state.allProductsOfBranch.findIndex(i => i.productID == item.productID);
    if (index == -1) return;
    state.allProductsOfBranch[index].amountInCart = item.amountInCart;
  },
  MODIFY_IS_HIDDEN(state, item) {
    const index = state.allProductsOfBranch.findIndex(i => i.productID == item.productID);
    let oldValue = state.allProductsOfBranch[index].isHidden;
    let newValue = item.isHidden;
    state.allProductsOfBranch[index].isHidden = item.isHidden;
    if (oldValue == newValue) return;
    // true -> false
    if (oldValue) state.totalProductsAmount++;
    // false -> true
    else state.totalProductsAmount--;
  },
  UPDATE_CURRENT_PAGE(state, newValue) {
    state.currentPage = newValue;
  },
  UPDATE_QUERY_BRAND(state, id) {
    state.Query.Brand.id = id;
  },
  UPDATE_QUERY_CATEGORY(state, id) {
    if (id == state.Query.Category.id && name != '') return;
    const index = state.Categories.findIndex(i => i.id == id);
    // let emptyCat = { id: 0, name: '', parentID: 0, amount: 0 };
    let emptyCat = { id: id, name: '', parentID: 0, amount: 0 };
    state.Query.Category = index != -1 ? state.Categories[index] : emptyCat;
  },
  UPDATE_QUERY_PRICE(state, Params) {
    if (typeof Params.minPrice != 'undefined') {
      state.Query.minPrice = Params.minPrice;
    }
    if (typeof Params.maxPrice != 'undefined') {
      state.Query.maxPrice = Params.maxPrice;
    }
  },
  UPDATE_QUERY_SEARCH(state, val) {
    if (val == state.Query.search) return;
    state.Query.search = val;
  },
  REMOVE_IS_IN_PAGE(state, productID) {
    const index = state.allProductsOfBranch.findIndex(i => i.productID == productID);
    state.allProductsOfBranch[index].isInPage = false;
  },
  REMOVE_PRODUCT(state, productID) {
    const index = state.allProductsOfBranch.findIndex(i => i.productID == productID);
    state.allProductsOfBranch.splice(index, 1);
    state.totalProductsAmount--;
  },
  REMOVE_QUERY_CATEGORY(state, categoryID) {
    const index = state.Query.categoriesID.findIndex(i => i == categoryID);
    if (index != -1) state.Query.categoriesID.splice(index, 1);
  },
  RESET_QUERY(state) {
    state.Query.Category = { id: 0, name: '', parentID: 0, amount: 0 };
    state.Query.Brand = { id: 0, name: '', amount: 0 };
    state.Query.search = '';
  },
  SET_SORTED_PRODUCTS(state, value) {
    state.sortedProducts = value;
  },
  SET_ZOOM_PRODUCT_ID(state, value) {
    state.zoomProductID = value;
  },
} // export default
