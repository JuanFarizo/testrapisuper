// addIsInPage
// addCategory
// addCategoryChildren
// addQueryCategory
// clearProducts
// clearPages
// loadProducts
// modifyAmountInCart
// modifyIsHidden
// updateCurrentPage
// updateQueryCategory
// updateQueryBrand
// updateQueryPrice
// updateQuerySearch
// removeIsInPage
// removeProduct
// removeQueryCategory
// resetQuery
// setSortedProducts
// setZoomProductID

export default {
  addIsInPage({ commit }, item) {
    commit('ADD_IS_IN_PAGE', item);
  },
  addCategory({ commit }, item) {
    commit('ADD_CATEGORY', item);
  },
  addCategoryChildren({ commit }, item) {
    commit('ADD_CATEGORY_CHILDREN', item);
  },
  addQueryCategory({ commit }, item) {
    commit('ADD_QUERY_CATEGORY', item);
  },
  clearProducts({ commit }) {
    commit('CLEAR_PRODUCTS');
  },
  clearPages({ commit }) {
    commit('CLEAR_PAGES');
  },
  loadProducts({ commit }, item) {
    commit('LOAD_PRODUCTS', item);
  },
  modifyAmountInCart({ commit }, item) {
    commit('MODIFY_AMOUNT_IN_CART', item);
  },
  modifyIsHidden({ commit }, item) {
    commit('MODIFY_IS_HIDDEN', item);
  },
  updateCurrentPage({ commit }, item) {
    commit('UPDATE_CURRENT_PAGE', item);
  },
  updateQueryCategory({ commit }, item) {
    commit('UPDATE_QUERY_CATEGORY', item);
  },
  updateQueryBrand({ commit }, item) {
    commit('UPDATE_QUERY_BRAND', item);
  },
  updateQueryPrice({ commit }, item) {
    commit('UPDATE_QUERY_PRICE', item);
  },
  updateQuerySearch({ commit }, item) {
    commit('UPDATE_QUERY_SEARCH', item);
  },
  removeIsInPage({ commit }, item) {
    commit('REMOVE_IS_IN_PAGE', item);
  },
  removeProduct({ commit }, item) {
    commit('REMOVE_PRODUCT', item);
  },
  removeQueryCategory({ commit }, item) {
    commit('REMOVE_QUERY_CATEGORY', item);
  },
  resetQuery({ commit }, item) {
    commit('RESET_QUERY', item);
  },
  setSortedProducts({ commit }, item) {
    commit('SET_SORTED_PRODUCTS', item);
  },
  setZoomProductID({ commit }, item) {
    commit('SET_ZOOM_PRODUCT_ID', item);
  },
} // export default
