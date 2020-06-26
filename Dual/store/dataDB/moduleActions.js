// setAllBranches
// setAllCities
// setAllEmployees
// setBranch
// setCity

export default {
  setAllBranches({ commit }, item) {
    commit('SET_ALL_BRANCHES', item);
  },
  setAllCities({ commit }, item) {
    commit('SET_ALL_CITIES', item);
  },
  setAllEmployees({ commit }, item) {
    commit('SET_ALL_EMPLOYEES', item);
  },

  setBranch({ commit }, item) {
    commit('SET_BRANCH', item);
  },
  setCity({ commit }, item) {
    commit('SET_CITY', item);
  },
} // export default
