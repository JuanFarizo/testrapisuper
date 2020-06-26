import store from '@/store/store.js';

export default {
  computed: {
    _dataDB() {
      if (!store) return {};
      return store.state.dataDB;
    },
    _allCities() { return this._dataDB.allCities; },
    _allBranches() { return this._dataDB.allBranches; },
    _allEmployees() { return this._dataDB.allEmployees; },
    _allEmployeesAndNone() {
      let list = this.copyArray(this._allEmployees);
      list.unshift({ id: 0, fullName: 'Todos', });
      return list;
    },
    _Branch() {
      if (!store) return {};
      return this._dataDB.Branch;
    },
    _City() { return this._dataDB.City; },
    _ExternalLinks() { return store.state.localDB.ExternalLinks; },
    _localDB() { return store.state.localDB; },
    _AllBranchsInfo() { return this._localDB.AllBranchsInfo; },
    _SocialMedia() { return store.state.localDB.SocialMedia; },
    _User() { return this.getUser(); },
  }, // COMPUTED
} // export default
