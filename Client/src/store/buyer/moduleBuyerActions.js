// addAddress
// addBuyerIP
// addReceiver
// clearAddresses
// clearReceivers
// modifyBuyerID
// modifyIsAdmin
// modifyIsTester

export default {
  addAddress({ commit }, item) {
    commit('ADD_ADDRESS', item);
  },
  addBuyerIP({ commit }, item) {
    commit('ADD_BUYER_IP', item);
  },
  addReceiver({ commit }, item) {
    commit('ADD_RECEIVER', item);
  },
  clearAddresses({ commit }) {
    commit('CLEAR_ADDRESSES');
  },
  clearReceivers({ commit }) {
    commit('CLEAR_RECEIVERS');
  },
  modifyBuyerID({ commit }, item) {
    commit('MODIFY_BUYER_ID', item);
  },
  modifyIsAdmin({ commit }, item) {
    commit('MODIFY_IS_ADMIN', item);
  },
  modifyIsTester({ commit }, item) {
    commit('MODIFY_IS_TESTER', item);
  },
} // export default
