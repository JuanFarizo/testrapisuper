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

    <AddMovement
    :isEditing="isEditingMovement"
    :MovementToEdit="MovementToEdit"
    :isPromptActive="IsPromptActive.addMovement"
    @addedMovement="addedMovement($event)"
    @modifyEmployeeDB="modifyEmployeeDB($event, true)"
    @closePrompt="IsPromptActive.addMovement = false;"
    />

    <MonthlySummary
    :isPromptActive="IsPromptActive.monthlySummary"
    @closePrompt="IsPromptActive.monthlySummary = false;"
    />


    <!-- END PROMPTS -->

    <vs-table ref="table" :data="allMovements" pagination :max-items="itemsPerPage" noDataText="No hay horarios">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="openEditOrNewMovement()" v-if="checkUser('subAdmin')">
            <font-awesome-icon icon="plus"/>
            Nueva entrada / salida
          </vs-button>

          <vs-button type="border" v-if="checkUser('subAdmin')" class="tableHeaderItem"
          @click="IsPromptActive.monthlySummary = true;">
            <font-awesome-icon icon="list-ul"/>
            Resumen
          </vs-button>

        </div> <!-- tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="allMovements.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event"
        @searchInput="searchMovement($event);"
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
            <vs-button @click="openEditOrNewMovement(tr)" type="flat" size="small">
              <font-awesome-icon icon="edit"/>
            </vs-button>
          </vs-td>
          <!-- employeeID -->
          <vs-td v-if="!isHidden.employeeID">
            {{ tr.employeeID }}
          </vs-td>
          <!-- employee -->
          <vs-td v-if="!isHidden.employee" class="nowrap">
            {{ tr.employeeFullname }}
          </vs-td>
          <!-- dateEntryDeparture -->
          <vs-td v-if="!isHidden.dateEntryDeparture" class="nowrap centered">
            {{ getDateOfDB(tr.entryDate) }}
            <span v-if="tr.entryDate != tr.departureDate">
              &nbsp;- {{ getDateOfDB(tr.departureDate) }}
            </span>
          </vs-td>
          <!-- timeWorked -->
          <vs-td v-if="!isHidden.entry" class="nowrap centered">
            <div v-if="tr.departureTime - tr.entryTime != 0">
              {{ minToHour(tr.departureTime - tr.entryTime) }}
            </div>
          </vs-td>
          <!-- entry -->
          <vs-td v-if="!isHidden.entry" class="nowrap centered">
            <div v-if="tr.departureTime != 0">
              {{ minToHour(tr.entryTime) }}
            </div>
          </vs-td>
          <!-- departure -->
          <vs-td v-if="!isHidden.departure" class="nowrap centered">
            <div v-if="tr.departureTime != 0">
              {{ minToHour(tr.departureTime) }}
            </div>
          </vs-td>
          <!-- createdByEployee -->
          <vs-td v-if="!isHidden.createdByEployee">
            {{ tr.createdByEployeeFullname }}
          </vs-td>
          <!-- dateCreated -->
          <vs-td v-if="!isHidden.dateCreated" class=" centered">
            <vx-tooltip :text="getTimeOfDB(tr.dateCreated)">
              {{ getDateOfDB(tr.dateCreated) }}
            </vx-tooltip>
          </vs-td>
          <!-- delete -->
          <vs-td v-if="!isHidden.delete">
            <vs-button color="danger" type="flat" icon="clear"
            @click="deleteMovement(tr)"></vs-button>
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>

  </div>
</template>










<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';

export default {
  mixins: [vsTableConfig],
  components: {
    AddMovement: () => import('./components/EmployeesSchedules/AddMovement.vue'),
    MonthlySummary: () => import('./components/EmployeesSchedules/MonthlySummary.vue'),
  },
  data() {
    return {
      itemsPerPage: 50,
      // edit
      isEditingMovement: false,
      MovementToEdit: {},
      search: '',

      IsPromptActive: {
        addMovement: false,
        monthlySummary: false,
        columnsManager: false,
      },
      allMovements: [],

      // static
      Columns: [
        { name: 'id'                 , title: 'ID', },
        { name: 'edit'               , title: 'Editar', },
        { name: 'employeeID'         , title: 'ID Empleado', nowrap: false, },
        { name: 'employee'           , title: 'Empleado', },
        { name: 'dateEntryDeparture' , title: 'Fecha', },
        { name: 'timeWorked'         , title: 'Trabajado', },
        { name: 'entry'              , title: 'Entrada', },
        { name: 'departure'          , title: 'Salida', },
        { name: 'createdByEployee'   , title: 'Creador', },
        { name: 'dateCreated'        , title: 'Fecha de creación', nowrap: false, },
        { name: 'delete'             , title: 'Eliminar', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'employeeID', 'createdByEployee', 'dateCreated', ],
      ],
    };
  },
  created() {
    this.loadMovements();
  },
  methods: {
    // addedMovement
    // deleteMovement
    // loadMovements
    // modifyMovementDB
    // openEditOrNewMovement
    // replaceMovementInList
    // searchMovement

    addedMovement(movementID) {
      let Params = { movementID: movementID };
      console.log(Params);
      const vm = this;
      this.conectToDB({
        file: 'EmployeesSchedules', action: 'getScheduleMovement', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data);
          let Movement = res.data.data[0];
          vm.allMovements.unshift(Movement);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    deleteMovement(Movement) {
      if (!confirm(`Seguro que querés eliminar a el movimiento`)) return;
      let Params = {
        movementID: Movement.id,
        isActive: 0,
      }
      const index = this.allMovements.findIndex(i => i.id == Movement.id);
      if (index != -1) this.allMovements.splice(index, 1);
      this.modifyMovementDB(Params);
    },

    openEditOrNewMovement(Movement = '') {
      if (Movement == '') {
        // new movement
        this.MovementToEdit = {};
        this.isEditingMovement = false;
      } else {
        alert('Función no disponible todavía');
        return;
        // edit movement
        this.MovementToEdit = Movement;
        this.isEditingMovement = true;
      }
      this.IsPromptActive.addMovement = true;
    },

    loadMovements() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
        search: this.search,
      }
      const vm = this;
      this.conectToDB({
        file: 'EmployeesSchedules', action: 'getScheduleMovement', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allMovements = res.data.data;
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    modifyMovementDB(paramsOriginal, addIt) {
      let Params = this.copyObj(paramsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'EmployeesSchedules', action: 'modifyScheduleMovement', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data);
          let action = Params.isActive ? 'modificado' : 'eliminado';
          console.log(`Movimiento ${action} ID: ${Params.movementID}`);
          vm.myNotify('success', 'Éxito', `Movimiento ${ action } correctamente`);
          // if (addIt) vm.replaceMovementInList(Params.movementID);
        },
      });
    },
    replaceMovementInList(movementID) {
      let Params = {
        movementID: movementID,
      }
      const vm = this;
      this.conectToDB({
        file: 'ScheduleMovement', action: 'getScheduleMovement', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Movement = res.data.data[0];
          let index = vm.allMovements.findIndex(i => i.id == Params.movementID);
          if (index != -1) vm.allMovements.splice(index, 1, Movement);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    searchMovement(search) {
      this.search = search;
      this.loadMovements();
    },

  }, // METHODS
} // export default

</script>
