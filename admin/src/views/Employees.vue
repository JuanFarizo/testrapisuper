<template>
  <div>

    <!-- columns -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="Columns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />
    <!-- END PROMPTS -->

    <AddEmployee
    :isEditing="isEditingEmployee"
    :EmployeeToEdit="EmployeeToEdit"
    :isPromptActive="IsPromptActive.addEmployee"
    @addedEmployee="addedEmployee($event)"
    @modifyEmployeeDB="modifyEmployeeDB($event, true)"
    @closePrompt="IsPromptActive.addEmployee = false;"
    />

    <template>
      <vs-table ref="table" :data="allEmployees" pagination :max-items="itemsPerPage" noDataText="No hay empleados">
        <div slot="header" class="tableHeaderContainer">
          <div class="tableHeader">

            <vs-button class="tableHeaderItem" color="primary" type="border"
            @click="openEditOrNewEmployee()" v-if="checkUser('subAdmin')">
              <font-awesome-icon icon="plus"/>
              Nuevo Empleado
            </vs-button>
          </div> <!-- .tableHeader -->

          <TableHeaderActions
          :vmMain="getThis()"
          :itemsLength="allEmployees.length"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @newItemsPerPage="itemsPerPage = $event"
          @searchInput="searchEmployee($event)"
          />
        </div> <!-- header -->


        <template slot="thead">
          <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name] && (!Col.onlyMainHouse ? true : isMainHouse())" :class="Col.nowrap == false ? '' : 'nowrap'">
            {{ Col.title }}
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- id -->
            <vs-td v-if="!isHidden.id" class="autoWidth">
              <vs-chip color="primary">{{ tr.id }}</vs-chip>
            </vs-td>
            <!-- edit -->
            <vs-td v-if="!isHidden.edit" class="autoWidth">
              <vs-button @click="openEditOrNewEmployee(tr)" type="border" size="small">
                <font-awesome-icon icon="edit"/>
              </vs-button>
            </vs-td>
            <!-- roleID -->
            <vs-td v-if="!isHidden.roleID" class="autoWidth">
              <vs-chip color="primary">{{ tr.roleID }}</vs-chip>
            </vs-td>
            <!-- role -->
            <vs-td v-if="!isHidden.role" class="autoWidth nowrap">
              <vs-chip v-if="!tr.isWorking" class="w-full">No empleado</vs-chip>
              <vs-chip v-else :color="getRoleColor(tr.roleID)" class="w-full">{{ tr.role }}</vs-chip>
            </vs-td>
            <!-- fullName -->
            <vs-td v-if="!isHidden.fullName" class="nowrap">
              <employeeImg :Employee="tr" class="mr-3"/>
              <vx-tooltip text="Usuario root" v-if="tr.isRoot">
                <font-awesome-icon icon="star" color="#22223E" class="isRootIcon"/>
              </vx-tooltip>
              {{ tr.fullName }}
            </vs-td>
            <!-- nick -->
            <vs-td v-if="!isHidden.nick" class="nowrap">
              {{ tr.nick }}
            </vs-td>
            <!-- age -->
            <vs-td v-if="!isHidden.age" class="nowrap">
              <span v-if="getYearsFromDate(tr.dob) != ''">{{ getYearsFromDate(tr.dob) }} años</span>
            </vs-td>
            <!-- phone -->
            <vs-td v-if="!isHidden.phone" class="nowrap">
              <div @click="callPhone(tr.phone)">
                {{ tr.phone }}
              </div>
            </vs-td>
            <!-- address -->
            <vs-td v-if="!isHidden.address" class="nowrap">
              <span v-if="tr.address != ''">{{ tr.address }}, {{ tr.city }}</span>
            </vs-td>
            <!-- email -->
            <vs-td v-if="!isHidden.email">
              {{ tr.email }}
            </vs-td>
            <!-- cuit -->
            <vs-td v-if="!isHidden.cuit" class="nowrap">
              {{ tr.cuit }}
            </vs-td>
            <!-- dob -->
            <vs-td v-if="!isHidden.dob">
              {{ getDateOfDB(tr.dob) }}
            </vs-td>
            <!-- dniTramitNumber -->
            <vs-td v-if="!isHidden.dniTramitNumber">
              {{ tr.dniTramitNumber }}
            </vs-td>
            <!-- dateJoined -->
            <vs-td v-if="!isHidden.dateJoined">
              {{ getDateOfDB(tr.dateJoined) }}
            </vs-td>
            <!-- extraInfo -->
            <vs-td v-if="!isHidden.extraInfo">
              {{ tr.extraInfo }}
            </vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.delete">
              <vs-button color="danger" type="border" icon="clear" @click="deleteEmployee(tr)"></vs-button>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </template> <!-- table -->

  </div>
</template>










<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';

export default {
  mixins: [vsTableConfig],
  components: {
    AddEmployee: () => import('./components/employees/AddEmployee.vue'),
  },
  data() {
    return {
      itemsPerPage: 50,
      // edit
      isEditingEmployee: false,
      EmployeeToEdit: {},

      IsPromptActive: {
        addEmployee: false,
        columnsManager: false,
      },
      allEmployees: [],

      // static
      Columns: [
        { name: 'id'             , title: 'ID', },
        { name: 'edit'           , title: 'Editar', },
        { name: 'roleID'         , title: 'Rol ID', },
        { name: 'role'           , title: 'Rol', },
        { name: 'fullName'       , title: 'Nombre', },
        { name: 'nick'           , title: 'Apodo', },
        { name: 'age'            , title: 'Edad', nowrap: false, },
        { name: 'phone'          , title: 'Teléfono', },
        { name: 'address'        , title: 'Dirección', },
        { name: 'email'          , title: 'Email', },
        { name: 'cuit'           , title: 'CUIT', },
        { name: 'dob'            , title: 'Fecha de nacimiento', nowrap: false, },
        { name: 'dniTramitNumber', title: 'N° de trámite de DNI', nowrap: false, },
        { name: 'dateJoined'     , title: 'Primer día', },
        { name: 'extraInfo'      , title: 'Info extra', },
        { name: 'delete'         , title: 'Eliminar', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'roleID', 'cuit', 'dob', 'dniTramitNumber', 'dateJoined', ],
      ],
    };
  },
  created() {
    this.loadEmployees();
  },
  methods: {
    // addedEmployee
    // deleteEmployee
    // openEditOrNewEmployee
    // getRoleColor
    // loadEmployees
    // modifyEmployeeDB
    // replaceEmployeeInList
    // searchEmployee
    addedEmployee(employeeID) {
      let Params = { employeeID: employeeID };
      const vm = this;
      this.conectToDB({
        file: 'Employees', action: 'getEmployee', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Employee = res.data.data[0];
          vm.allEmployees.unshift(Employee);
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    deleteEmployee(Employee) {
      if (Employee.isRoot) {
        this.myNotify('danger', 'Error', 'No se puede borrar este usuario');
        return;
      }
      if (!confirm(`Seguro que querés eliminar a "${Employee.fullName}"`)) return;
      let Params = {
        employeeID: Employee.id,
        isActive: 0,
      }
      const index = this.allEmployees.findIndex(i => i.id == Employee.id);
      if (index != -1) this.allEmployees.splice(index, 1);
      this.modifyEmployeeDB(Params);
    },

    openEditOrNewEmployee(Employee = '') {
      if (Employee == '') {
        // new employee
        this.EmployeeToEdit = {};
        this.isEditingEmployee = false;
      } else {
        // edit employee
        this.EmployeeToEdit = Employee;
        this.isEditingEmployee = true;
      }
      this.IsPromptActive.addEmployee = true;
    },

    getRoleColor(roleID) {
      // No me convence mucho... Pero así queda por ahora
      let employeesRoleIDs = this._localDB.employeesRoleIDs;
      switch (roleID) {
        case employeesRoleIDs.Administracion:
          return '#663399';
        case employeesRoleIDs.SubAdministracion:
          return '#85144b';
        case employeesRoleIDs.Gestion:
          return '#001f3f';
        case employeesRoleIDs.Ventas:
          return 'primary';
        case employeesRoleIDs.Empleado:
          return '#A52A2A';
        case employeesRoleIDs.CargaProductos:
          return '#3D9970';
      }
    },
    loadEmployees() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
        search: this.search,
      }
      this.conectToDB({
        file: 'Employees', action: 'getEmployee', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allEmployees = res.data.data;
          console.log('allEmployees', this.allEmployees);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifyEmployeeDB(paramsOriginal, addIt) {
      let Params = this.copyObj(paramsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Employees', action: 'modifyEmployee', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data);
          let action = Params.isActive ? 'modificado' : 'eliminado';
          console.log(`Empleado ${action} ID: ${Params.employeeID}`);
          vm.myNotify('success', 'Éxito', `Empleado ${ action } correctamente`);
          if (addIt) vm.replaceEmployeeInList(Params.employeeID);
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    replaceEmployeeInList(employeeID) {
      let Params = {
        employeeID: employeeID,
      }
      const vm = this;
      this.conectToDB({
        file: 'Employees', action: 'getEmployee', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Employee = res.data.data[0];
          let index = vm.allEmployees.findIndex(i => i.id == Params.employeeID);
          if (index != -1) vm.allEmployees.splice(index, 1, Employee);
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    searchEmployee(search) {
      this.search = search;
      this.loadEmployees();
    },
  }, // METHODS
}

</script>

<style lang="scss" scoped>

  .isRootIcon {
    padding-bottom: 3px;
    margin-right: 5px;
  }

</style>
