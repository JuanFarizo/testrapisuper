export default {
  data() {
    return {
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
  methods: {
    // getBranchID
    // getCityID
    // isMainHouse
    // isFullFranchise
    // setBranch
    // setBranchByCity

    getBranchID() {
      if (typeof this._Branch.id != 'undefined') return this._Branch.id;
      console.log('Error al cargar la sucursal');
      this.myNotify('danger', 'Error', 'Error al cargar la sucursal');
      return 0;
    },

    getCityID() {
      if (localStorage.cityID != +localStorage.cityID) return 0;
      return localStorage.cityID || 0;
    },

    isMainHouse() {
      return (this.getBranchID() == 1);
    },

    isFullFranchise() {
      // llegado el momento habría que modificar esta func
      return this.isMainHouse();
    },

    setBranch(store, branchID, callback = null) {
      let Params = {
        branchID: branchID,
      }
      this.conectToDB({
        file: 'Branches', action: 'getBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Branch = res.data.data[0];
          if (typeof Branch == 'undefined') {
            this.myNotify('danger', 'Error', 'No se encontró la sucursal');
            return;
          }
          store.dispatch('dataDB/setBranch', Branch);
          if (callback != null) callback();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    setBranchByCity(store, callback = null) {
      let Params = {
        cityID: this.getCityID(),
      }
      if (!Params.cityID) {
        this.myNotify('danger', 'Error', 'No se seleccionó la ciudad');
        return;
      }
      this.conectToDB({
        file: 'Cities', action: 'getCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let City = res.data.data[0];
          store.dispatch('dataDB/setCity', City);
          this.setBranch(store, City.branchID, callback);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

  }, // METHODS
} // export default
