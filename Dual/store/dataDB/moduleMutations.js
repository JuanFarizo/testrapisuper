// SET_ALL_BRANCHES
// SET_ALL_CITIES
// SET_ALL_EMPLOYEES

// SET_BRANCH
// SET_CITY

export default {
  SET_ALL_BRANCHES(state, value) {
    state.allBranches = value;
  },
  SET_ALL_CITIES(state, value) {
    state.allCities = value;
  },
  SET_ALL_EMPLOYEES(state, value) {
    state.allEmployees = value;
  },

  SET_BRANCH(state, value) {
    state.Branch = value;
  },
  SET_CITY(state, value) {
    state.City = value;
  },
} // export default
