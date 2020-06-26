export const users = {
  data() {
    return {
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
  methods: {

    getEmployeeName(employeeID) {
      for (let Employee of this._allEmployees) {
        if (Employee.id == employeeID) return Employee.fullName;
      }
      return '';
    },
    getEmployeeID() {
      return localStorage.userID || 0;
    },

    isTester() {
      return this.getUser().isTester;
    },

    checkUser(userType, strict = false) {
      if (userType == '') {
        return this.checkEmployeeIsWorking();
      }
      let Dictionary = {
        admin:    'Administracion',
        subAdmin: 'SubAdministracion',
        gestion:  'Gestion',
        ventas:   'Ventas',
        cargaProductos: 'CargaProductos',
      }

      let userRoleID = this.getUser().roleID;
      let requiredRoleID = this._localDB.employeesRoleIDs[Dictionary[userType]];

      if (userRoleID == requiredRoleID) { return true; }
      else {
        if (strict) return false;
        if (userRoleID < requiredRoleID) return true;
        return false;
      }
    },

    getUser() {
      let index = this._allEmployees.findIndex(i => i.id == localStorage.userID);
      if (index == -1) return {};
      return this._allEmployees[index];
    },
    logout() {
      this.myNotify('success', 'Adiós!', `Chau ${this._User.nick}! Volvé pronto`);
      localStorage.removeItem('userID');
      this.$router.push({ name: 'page-login' });
    },

    getCityID() {
      return localStorage.cityID || 1;
    },

    getUserID() {
      return localStorage.userID;
    },

    checkIsLogued() {
      // ESTO NO FUNCA BIEN
      return !!localStorage.userID;
    },

    checkEmployeeIsWorking() {
      return !!this.getUser().isWorking;
    },

    checkUserIsMe() {
      if (this.getUser().id == 1) return true;
      return false;
    },

    loadEmployee(callback) {
      let vm = this;
      let Params = {
        isActive: 1,
        // branchID: vm.getBranchID(),
        employeeID: vm.getUserID(),
      }
      vm.conectToDB({
        file: 'Employees', action: 'getEmployee', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Employee = res.data.data[0];
          callback(Employee);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },


    loadAllEmployees(callback) {
      let Params = {
        isActive: 1,
        // branchID: this.getBranchID(),
      }
      this.conectToDB({
        file: 'Employees', action: 'getEmployee', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allEmployees = res.data.data;
          let index = allEmployees.findIndex(i => i.id == this.getUserID());
          let Employee = allEmployees[index];
          // this.$store.dispatch('dataDB/setAllEmployees', allEmployees)
          callback(allEmployees, Employee, this);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },


    encodePass(pass) {
      // let passChars =
      let codifierNum = 7;
      let finalPass = '';
      for (let char of pass){
        finalPass += (char.charCodeAt()+codifierNum)+ '-';
      }
      return finalPass.slice(0, -1);
    },

    decodePass(pass) {
      let codifierNum = 7;
      let finalPass = '';
      pass = pass.split('-');
      for (let codedChar of pass) {
        codedChar = codedChar - codifierNum;
        finalPass += String.fromCharCode(codedChar);
      }
      return finalPass;
    },

  }, // METHODS
} // export default
