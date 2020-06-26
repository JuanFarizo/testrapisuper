// ADD_ADDRESS
// ADD_BUYER_IP
// ADD_RECEIVER
// CLEAR_ADDRESSES
// CLEAR_RECEIVERS
// MODIFY_BUYER_ID
// MODIFY_IS_ADMIN
// MODIFY_IS_TESTER

export default {
  ADD_ADDRESS(state, item) {
    if (item.isNew) {
      state.Addresses.unshift(item);
    } else {
      state.Addresses.push(item);
    }
  },
  ADD_BUYER_IP(state, buyerIP) {
    state.id = buyerIP;
    state.buyerIP = buyerIP;
  },
  ADD_RECEIVER(state, item) {
    if (item.isNew) {
      state.Receivers.unshift(item);
    } else {
      state.Receivers.push(item);
    }
  },
  CLEAR_ADDRESSES(state) {
    state.Addresses.length = 0;
  },
  CLEAR_RECEIVERS(state) {
    state.Receivers.length = 0;
  },
  MODIFY_BUYER_ID(state, newID) {
    state.id = newID;
  },
  MODIFY_IS_ADMIN(state, value) {
    state.isAdmin = value;
  },
  MODIFY_IS_TESTER(state, value) {
    state.isTester = value;
  },
} // export default
