export const cartMixin = {
  data:()=>({
    contador: 0,
    loadAddButton: false,
  }),
  computed: {

  }, // COMPUTED
  methods: {


    // addItemToCart
    // cartButtonClicked
    // emptyCart
    // emptyCartDB
    // getEmployeeInfo
    // isInCart
    // loadCart
    // modifyCartDB
    // updateAmountInCart
    // updateItemAmount
    // updateItemAmountByProd
    // removeItemFromCart
    // updateCart

    addItemToCart(Item, testing = false) {
      // if (this.isIphone) {
      //   this.$store.dispatch("cart/addToIphoneCounter");
      //   if (this.Cart.iPhoneCounter%2) return;
      // }
      if (!Item.stock) {
        this.myNotify('warning', 'Atención', 'No hay stock de este producto');
      }
      this.loadAddButton = true
      let Params = this.copyObj(Item);
      Params.productID = Item.productID;
      Params.stock = Item.stock;
      Params.buyerID = this.Buyer.id;
      Params.token = this.myToken;
      Params.amount = Item.amount ? Item.amount : 1;
      const vm = this;
      this.conectToDB({
        file: 'Cart', action: 'addCartItem', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; vm.loadAddButton = false }
          vm.$store.dispatch("cart/addCartItem", Params);
          vm.$store.dispatch("cart/updateCartItemID", { oldID: Item.productID, newID: res.data.data });
          vm.updateAmountInCart(Params.productID);
          vm.loadAddButton = false
          // console.log(`Agrego al carro el producto ${Params.fullName}`);
        }
      });
    },
    emptyCart() {
      for (var i = 0; i < this._cartItems.length; i++) {
        this.removeItemFromCart(this._cartItems[i]);
      }
      this.$store.dispatch('cart/emptyCart');
      this.emptyCartDB();
    },
    emptyCartDB() {
      // this func is to check te cart is really empty
      let Params = { buyerID: this.Buyer.id, token: this.myToken }
      const vm = this;
      this.conectToDB({
        file: 'Cart', action: 'emptyCart', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        }
      });
    },
    getEmployeeInfo(employeeID) {
      for (let Employee of this._allEmployees) {
        if (Employee.id == employeeID) return Employee;
      }
      return { id: '', name: '', nick: '' };
    },
    isInCart(prodID) {
      const index = this._cartItems.findIndex(i => i.productID == prodID);
      if (index == -1) return false;
      return true;
    },
    loadCart() {
      let Params = { buyerID: this.Buyer.id, token: this.myToken, isActive: 1 }
      const vm = this;
      this.conectToDB({
        file: 'Cart', action: 'getCart', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.hasBeenLoaded = true;
          vm.$store.dispatch("cart/updateCartHasBeenLoaded", Params);

          let myCart = res.data.data;
          vm.$store.dispatch("cart/emptyCart");
          for (var i = 0; i < myCart.length; i++) {
            vm.$store.dispatch("cart/addCartItem", myCart[i]);
            vm.updateAmountInCart(myCart[i].productID);
          }
        }
      });
    },
    modifyCartDB(Params) {
      Params.lastUpdate = this.getActualDatetimeToDB();
      const vm = this;
      this.conectToDB({
        file: 'Cart', action: 'modifyCart', params:  Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: function(error) { vm.myNotify('danger', 'Error', 'Error al modificar el carro'); },
      });
    },
    updateAmountInCart(productID) {
      const index = this._cartItems.findIndex(i => i.productID == productID);
      let amountInCart = index == -1 ? 0 : this._cartItems[index].amount;
      this.$store.dispatch("products/modifyAmountInCart", {productID, amountInCart});
    },
    updateItemAmount(newAmount, Item) {

      //Validate
      // console.log("Update")
      // console.log("Befor conv:",newAmount, typeof(newAmount))
      if (newAmount==NaN) {
         // console.log("NaN Return")
        return
      }
      if (typeof(newAmount)=="string" && newAmount.length == 0) {
        try {
           // console.log("Str Vacio")
          return
        } catch (error) {
           // console.log(error)
        }
      } else if (typeof(newAmount)=="string") {
        try {
          newAmount = parseInt(newAmount)
           // console.log("Str Conversion")
        } catch (error) {
          // console.log(error)
        }
      }
      if (newAmount <= 0) {newAmount = 0 }
      newAmount = parseInt(newAmount)
      // console.log("After conv:",newAmount, typeof(newAmount))
      if (newAmount == 0) {
        this.removeItemFromCart(Item);
      } else {
        this.$store.dispatch("cart/updateItemAmount", { Item, newAmount })
        this.modifyCartDB({cartItemID: Item.id, amount: newAmount});
      }
      this.updateAmountInCart(Item.productID)
    },
    updateItemAmountByProd(newAmount, prodID) {
      // console.log("Update")
      // console.log("Befor conv:",newAmount, typeof(newAmount))
      if (newAmount==NaN) {
        // console.log("NaN Return")
        return
      }
      if (typeof(newAmount)=="string" && newAmount.length == 0) {
        try {
          // console.log("Str Vacio")
          return
        } catch (error) {
          // console.log(error)
        }
      } else if (typeof(newAmount)=="string") {
        try {
          newAmount = parseInt(newAmount)
          // console.log("Str Conversion")
        } catch (error) {
          // console.log(error)
        }
      }
      if (newAmount <= 0) {newAmount = 0 }
      newAmount = parseInt(newAmount)
      //console.log("After conv:",newAmount, typeof(newAmount))

      this.updateAmountInCart(prodID);
      const index = this._cartItems.findIndex(i => i.productID == prodID);
      this.updateItemAmount(newAmount, this._cartItems[index]);
    },

    removeItemFromCart(Item) {
      this.$store.dispatch('cart/removeItemFromCart', Item);
      this.modifyCartDB({cartItemID: Item.id, isActive: 0});
    },
  }, // METHODS
}
