export default {
  computed: {
    _allProductsOfBranch() {
      return this.$store.state.products.allProductsOfBranch;
    },
    _cartItems() {
      return this.Cart.cartItems;
    },
    _sortedProducts() {
      return this.$store.state.products.sortedProducts;
    },

    _Categories() {
      return this.$store.state.products.Categories;
    },
    _LayoutIsActive() {
      return this.$store.state.layout.isActive;
    },
    _ProductsQuery() {
      return this.$store.state.products.Query;
    },

    // user
    Buyer() {
      return this.$store.state.buyer;
    },
    AddressList() {
      return this.$store.state.buyer.Addresses;
    },
    ReceiverList() {
      return this.$store.state.buyer.Receivers;
    },
    User() {
      return this.$store.state.user;
    },



    // cart
    Cart() {
      return this.$store.state.cart;
    },

    // products
    Query() {
      return this.$store.state.products.Query;
    },

  }, // COMPUTED
} // export default
