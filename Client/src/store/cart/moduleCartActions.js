// addDiscount
// addToIphoneCounter
// addCartItem
// emptyCart
// modifyBuyerEmployeeID
// modifyCartAddress
// modifyCartReceiver
// updateCartItemID
// modifySeller
// updateItemAmount
// updateIsForMe
// updateIsReceived
// updateReceptionDatetime
// updateSelectedAddressID
// updateSelectedReceiverID
// updateShippingNeeded
// updateCartHasBeenLoaded
// removeItemFromCart

// toggleShowMovileMenu

export default {

  addDiscount({ commit }, item) {
    commit('ADD_DISCOUNT', item);
    commit('UPDATE_CART_INFO');
  },

  // addToIphoneCounter({ commit }, item) {
  //   commit('ADD_TO_IPHONE_COUNTER', item);
  // },

  toggleShowMovileMenu({ commit }, item) {
    commit('TOGGLE_SHOW_MOVILE_MENU', item);
  },

  addCartItem({ commit }, item) {
    commit('ADD_CART_ITEM', item);
    let realPrice = item.offert ? item.offert : item.price;
    commit('UPDATE_CART_INFO');
  },
  emptyCart({ commit }) {
    commit('EMPTY_CART');
    commit('UPDATE_CART_INFO');
  },
  modifyBuyerEmployeeID({ commit }, item) {
    commit('MODIFY_BUYER_EMPLOYEE_ID', item);
  },
  modifyCartAddress({ commit }, item) {
    commit('MODIFY_CART_ADDRESS', item);
  },
  modifyCartReceiver({ commit }, item) {
    commit('MODIFY_CART_RECEIVER', item);
  },
  updateCartItemID({ commit }, item) {
    commit('UPDATE_CART_ITEM_ID', item);
  },
  modifySaleTypeID({ commit }, item) {
    commit('MODIFY_SALE_TYPE_ID', item);
  },
  modifySeller({ commit }, item) {
    commit('MODIFY_SELLER', item);
  },
  updateItemAmount({ commit }, item) {
    commit('UPDATE_ITEM_AMOUNT', item);
    commit('UPDATE_CART_INFO');
  },
  updateIsForMe({ commit }, item) {
    commit('UPDATE_IS_FOR_ME', item);
  },
  updateIsReceived({ commit }, item) {
    commit('UPDATE_IS_RECEIVED', item);
  },
  updateReceptionDatetime({ commit }, item) {
    commit('UPDATE_RECEPTION_DATETIME', item);
  },
  updateShippingNeeded({ commit }, item) {
    commit('UPDATE_SHIPPING_NEEDED', item);
  },
  updateSelectedAddressID({ commit }, item) {
    commit('UPDATE_SELECTED_ADDRESS_ID', item);
  },
  updateSelectedReceiverID({ commit }, item) {
    commit('UPDATE_SELECTED_RECEIVER_ID', item);
  },
  updateCartHasBeenLoaded({ commit }) {
    commit('UPDATE_CART_HAS_BEEN_LOADED');
  },
  removeItemFromCart({ commit }, item) {
    commit('REMOVE_ITEM_FROM_CART', item)
    let realPrice = item.offert ? item.offert : item.price;
    commit('UPDATE_CART_INFO');
  },
} // export default
