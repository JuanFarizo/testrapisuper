// HIDE_LAYOUT
// SHOW_LAYOUT
// TOGGLE_LAYOUT

export default {

  HIDE_LAYOUT(state, value) {
    state.isActive[value] = false;
  },
  SHOW_LAYOUT(state, value) {
    state.isActive[value] = true;
  },
  TOGGLE_LAYOUT(state, value) {
    state.isActive[value] = !state.isActive[value];
  },
} // export default
