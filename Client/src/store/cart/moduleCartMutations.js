// ADD_DISCOUNT
// ADD_TO_IPHONE_COUNTER
// ADD_CART_ITEM
// EMPTY_CART
// MODIFY_BUYER_EMPLOYEE_ID
// MODIFY_CART_ADDRESS
// MODIFY_CART_RECEIVER
// MODIFY_SALE_TYPE_ID
// MODIFY_SELLER
// UPDATE_CART_INFO
// UPDATE_CART_HAS_BEEN_LOADED
// UPDATE_IS_FOR_ME
// UPDATE_IS_RECEIVED
// UPDATE_ITEM_AMOUNT
// UPDATE_RECEPTION_DATETIME
// UPDATE_SELECTED_ADDRESS_ID
// UPDATE_SELECTED_RECEIVER_ID
// UPDATE_SHIPPING_NEEDED
// REMOVE_ITEM_FROM_CART

// TOGGLE_SHOW_MOVILE_MENU


export default {

  ADD_DISCOUNT(state, value) {
    state.Discount      = value;
  },

  ADD_TO_IPHONE_COUNTER(state, value) {
    state.iPhoneCounter = state.iPhoneCounter+1;
  },
  ADD_CART_ITEM(state, Item) {
    const index = state.cartItems.findIndex(i => i.productID == Item.productID);
    if (index == -1) {
      state.cartItems.push(Item);
    }
  },
  EMPTY_CART(state) {
    state.cartItems.length = 0;
  },
  MODIFY_BUYER_EMPLOYEE_ID(state, item) {
    state.buyerEmployeeID = item;
  },
  MODIFY_CART_ADDRESS(state, item) {
    state.Address = item;
  },
  MODIFY_CART_RECEIVER(state, item) {
    state.Receiver = item;
  },
  UPDATE_CART_ITEM_ID(state, Params) {
    const index = state.cartItems.findIndex(i => i.id == Params.oldID);
    if (index != -1) {
      state.cartItems[index].id = Params.newID;
    }
  },
  MODIFY_SALE_TYPE_ID(state, value) {
    state.saleTypeID = value;
  },
  MODIFY_SELLER(state, value) {
    state.Seller = value;
  },
  UPDATE_CART_INFO(state) {
    state.totalItemsAmount = 0;
    state.totalProducts = 0;
    for (let Item of state.cartItems) {
      let realPrice = Item.offert ? +Item.offert : +Item.price;
      state.totalProducts += realPrice * Item.amount;
      state.totalItemsAmount += +Item.amount;
    }
    state.totalProducts = parseFloat(state.totalProducts).toFixed(2);
    state.totalTotal = state.totalProducts;

    // discount
    let Discount = state.Discount;
    if (state.Discount.id == 0) {
      state.appliedDiscount = 0;
    } else {
      let appliedDiscount = 0;
      if (Discount.discountAmount != 0) {
        appliedDiscount = Discount.discountAmount;
        if (state.totalProducts < appliedDiscount) {
          appliedDiscount = state.totalProducts;
        }
      }
      if (Discount.discountPercentaje != 0) {
        appliedDiscount = state.totalProducts * Discount.discountPercentaje /100;
        if (Discount.discountPercentajeMax != 0) {
          if (appliedDiscount > Discount.discountPercentajeMax) {
            appliedDiscount = Discount.discountPercentajeMax;
          }
        }
      }
      state.appliedDiscount = parseFloat(appliedDiscount).toFixed(2);
      state.totalTotal = parseFloat(state.totalTotal - +appliedDiscount).toFixed(2);
    }
  },
  UPDATE_CART_HAS_BEEN_LOADED(state){
    state.cartHasBeenLoaded = true;
  },
  UPDATE_ITEM_AMOUNT(state, item) {
    // if (item.Item.amount < item.newAmount) {
      // console.log('CHECKEO QUE HAYA STOCK');
    // }
    item.Item.amount = item.newAmount;
  },
  UPDATE_IS_FOR_ME(state, value) {
    state.isForMe = value;
  },
  UPDATE_IS_RECEIVED(state, value) {
    state.isReceived = value;
  },
  UPDATE_RECEPTION_DATETIME(state, value) {
    state.ReceptionDatetime.date = value.date;
    state.ReceptionDatetime.time = value.time;
    state.ReceptionDatetime.timeRange = value.timeRange;
  },
  UPDATE_SELECTED_ADDRESS_ID(state, value) {
    state.selectedAddressID = value;
  },
  UPDATE_SELECTED_RECEIVER_ID(state, value) {
    state.selectedReceiverID = value;
  },
  UPDATE_SHIPPING_NEEDED(state, value) {
    state.shippingNeeded = value;
  },
  REMOVE_ITEM_FROM_CART(state, item) {
    const index = state.cartItems.findIndex(i => i.id == item.id);
    state.cartItems.splice(index, 1)
    let realPrice = item.offert ? item.offert : item.price;
    state.totalProducts += realPrice;
    state.totalTotal += realPrice;
  },

    TOGGLE_SHOW_MOVILE_MENU(state, value) {
      console.log(value);
      state.showMovileMenu = value;
    },


} // export default
