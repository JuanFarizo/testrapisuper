export default {
  isInCart: state => itemId => {
    return state.cartItems.some((item) => item.objectID == itemId )
  },
}
