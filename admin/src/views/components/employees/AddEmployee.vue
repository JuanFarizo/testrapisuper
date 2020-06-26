<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="isEditing ? 'Editar empleado' : 'Crear empleado'">
    <div class="">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Nombre *" v-model="NewEmployee.name" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Apellido *" v-model="NewEmployee.surname" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Apodo *" v-model="NewEmployee.nick" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-select label="Rol" v-model="NewEmployee.roleID" class="inputLine">
            <vs-select-item :key="`Rol${index}`" :value="Item.id" :text="Item.role"
            v-for="Item, index in allRoles"/>
          </vs-select>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Usuario *" v-model="NewEmployee.user" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Contraseña *" v-model="password" type="password" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Teléfono *" v-model="NewEmployee.phone" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Nacimiento" v-model="NewEmployee.dob" type="date" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Dirección" v-model="NewEmployee.address" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-select label="Ciudad" v-model="NewEmployee.cityID" class="inputLine">
            <vs-select-item :key="`City${index}`" :value="Item.id" :text="Item.city"
            v-for="Item, index in _allCities"/>
          </vs-select>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="E-mail" v-model="NewEmployee.email" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="CUIT" v-model="NewEmployee.cuit" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="N° de trámite de DNI" v-model="NewEmployee.dniTramitNumber" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-checkbox v-model="NewEmployee.isWorking" class="checkbox">Trabaja actualmente</vs-checkbox>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6" vs-offset="3">
          <UploadPhoto v-model="photoData" title="Foto (.png)" format="png"
          :fileName="`${NewEmployee.id}`" destinationURL="employees"
          />
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="12" class="textarea">
          <vs-textarea placeholder="Informacióne extra" v-model="NewEmployee.extraInfo"/>
        </vs-col>
      </vs-row>
      <PromptButtons @accept="checkData" @cancel="isPromptActiveLocal = false;"/>
    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    isEditing: { type: Boolean, required: true, },
    EmployeeToEdit: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      NewEmployee: {},
      password: '',
      allRoles: [],
      photoData: '',
    } // return DATA
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get(val) {
        return this.isPromptActive;
      },
      set(val) {
        if (val) return;
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
    isPromptActiveLocal: function(val) {
      if (val) {
        if (!this.isEditing) {
          // new employee
          this.NewEmployee = this.getNewEmployee();
          this.photoData = '';
          return;
        } else {
          // edit employee
          this.photoData = this.getImg(`employees/${this.EmployeeToEdit.id}.png`);
          this.password = this.decodePass(this.EmployeeToEdit.password);
          this.copyEditData();
        }        
      }
    },
  },

  created() {
    this.loadRoles();
  },

  methods: {
    // addEmployee
    // checkData
    // copyEditData
    // finishAction
    // getNewEmployee
    // loadRoles
    addEmployee(Params) {
      const vm = this;
      this.conectToDB({
        file: 'Employees', action: 'addEmployee', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let NewEmployeeID = res.data.data;
          vm.$emit('addedEmployee', NewEmployeeID);
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    checkData() {
      let Params = { isActive: 1, }
      this.conectToDB({
        file: 'Employees', action: 'getEmployee', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allEmployeesOfTheWorld = res.data.data;
          let msg = '';
          if (this.NewEmployee.cityID == null) msg = 'Tenés que seleccionar una ciudad';
          if (this.password == '') msg = 'Tenés que ponerle un contraseña';
          if (this.NewEmployee.user == '') msg = 'Tenés que ponerle un nombre de usuario';
          if (this.NewEmployee.roleID == null) msg = 'Tenés que seleccionar un rol';
          if (!this.isEditing) {
            // new employee
            let index = allEmployeesOfTheWorld.findIndex(i => i.user == this.NewEmployee.user);
            if (index != -1) msg = 'El nombre de usuario ya existe';
          }
          if (msg != '') {
            this.myNotify('warning', 'Atención', msg);
            return;
          }
          this.finishAction();

        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },

    copyEditData() {
      for (let key in this.NewEmployee) {
        if (typeof this.NewEmployee[key] == 'undefined') continue;
        this.NewEmployee[key] = this.EmployeeToEdit[key];
      }
    },

    finishAction() {
      if (!this.checkData()) return;
      let Params = this.NewEmployee;
      Params.password = this.encodePass(this.password);
      if (this.isEditing) {
        Params.employeeID = Params.id;
        this.$emit('modifyEmployeeDB', Params);
      } else {
        this.addEmployee();
      }
      this.isPromptActiveLocal = false;
    },

    getNewEmployee() {
      return {
        id:              0,
        branchID:        this.getBranchID(),
        roleID:          null,
        name:            '',
        surname:         '',
        nick:            '',
        phone:           '',
        user:            '',
        password:        '',
        email:           '',
        address:         '',
        cityID:          null,
        cuit:            '',
        dob:             '',
        dniTramitNumber: '',
        dateJoined:      this.getActualDateToDB(),
        extraInfo:       '',
        isWorking:       1,
        isRoot:          0,
        isActive:        1,
      }
    },
    loadRoles() {
      let Params = {
        isActive: 1,
        hideOnlyMainHouse: !this.isMainHouse(),
      }
      const vm = this;
      this.conectToDB({
        file: 'Employees', action: 'getEmployeeRoles', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allRoles = res.data.data;
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
  }, // METHODS

} // export default
</script>

<style lang="css" scoped>
  .inputLine {
    margin-top: 5px;
    width: 100%;
  }
  .checkbox {
    padding-top: 25px;
  }
  .textarea {
    margin-top: 15px;
  }
</style>
