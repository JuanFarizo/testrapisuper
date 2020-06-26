// hideLayout
// showLayout
// toggleLayout

export default {

  hideLayout({ commit }, item) {
    commit('HIDE_LAYOUT', item);
  },
  showLayout({ commit }, item) {
    commit('SHOW_LAYOUT', item);
  },
  toggleLayout({ commit }, item) {
    commit('TOGGLE_LAYOUT', item);
  },

} // export default
