import Vue from "vue";

export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    ADD_PRODUCT(state, payload) {
      state.products.push({
        product: payload.product,
        quantity: payload.quantity
      });
    },
    UPDATE_PRODUCT(state, payload) {
      const product = state.products.filter(el => {
        return el.product.id == payload.product.id;
      })[0];

      const updatedProduct = {
        quantity: payload.quantity
      };

      Object.assign(product, updatedProduct);
    },
    REMOVE_PRODUCT(state, payload) {
      state.products = state.products.filter(el => {
        el.id != payload.product.id;
      });
    },
    RESET_PRODUCTS(state) {
      state.products = [];
    }
  },
  actions: {
    productCRUD({ state, commit }, payload) {
      // payload = {product: product, quantity}
      console.log("PRODCRUD");
      console.log("PAYLOAD: ", payload);
      console.log("PRODUCTS: ", state.products);
      const products = state.products.filter(el => {
        return el.product.id == payload.product.id;
      });
      console.log("P FILTER:", products);

      if (products.length != 0) {
        if (payload.quantity == 0) {
          commit("REMOVE_PRODUCT", payload);
        } else {
          commit("UPDATE_PRODUCT", payload);
        }
      } else if (payload.product !== undefined) {
        commit("ADD_PRODUCT", payload);
      }
    },
    resetProducts({ state, commit }) {
      commit("RESET_PRODUCTS");
    }
  }
};
