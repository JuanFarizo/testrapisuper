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

    <vs-table ref="table" :data="filteredStockChanges" pagination :max-items="itemsPerPage" noDataText="No hay ningún movimiento">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">
          <label class="vSelctLabel">Empleado</label>
          <v-select v-model="filterByEmployeeID" :reduce="Employee => Employee.id"
            label="fullName" :options="_allEmployeesAndNone" :disabled="isfilterByEmployeeDisabled" style="min-width: 250px;"/>
        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="filteredStockChanges.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event"
        @searchInput="searchMovement($event);"
        />

      </div> <!-- header -->

      <template slot="thead">
        <vs-th v-if ="!isHidden.id">ID</vs-th>
        <vs-th v-if ="!isHidden.img">Fecha</vs-th>
        <vs-th v-if ="!isHidden.img">Cambio</vs-th>
        <vs-th v-if ="!isHidden.img">Imagen</vs-th>
        <vs-th v-if ="!isHidden.product">Producto</vs-th>
        <vs-th v-if ="!isHidden.employee">Responsable</vs-th>
        <vs-th v-if ="!isHidden.websiteZone">Lugar</vs-th>
        <vs-th v-if ="!isHidden.reason">Razón</vs-th>
        <vs-th v-if ="!isHidden.notes">Notas</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <!-- id -->
          <vs-td v-if="!isHidden.id"><vs-chip color="primary">{{ tr.id }}</vs-chip></vs-td>
          <vs-td v-if="!isHidden.date" class="autoWidth">
            <vx-tooltip :text="getTimeOfDB(tr.date)">
              <div class="">{{ getDateOfDB(tr.date) }}</div>
            </vx-tooltip>
          </vs-td>
          <vs-td v-if="!isHidden.date" class="centered autoWidth">
            <div class="amount" :class="{ amountMore: tr.amount > 0, amountLess: tr.amount < 0 }">
              {{ Math.abs(tr.amount) }}
            </div>
          </vs-td>
          <!-- img -->
          <vs-td v-if="!isHidden.img" class="autoWidth">
            <div class="imgContainer imgContainer-s">
              <img :src="getImgDual(`${tr.productID}-1`)">
            </div>
          </vs-td>
          <!-- product -->
          <vs-td v-if="!isHidden.product">
            {{ tr.product }}
          </vs-td>
          <!-- employee -->
          <vs-td v-if="!isHidden.employee" style="white-space: nowrap;">
            {{ getEmployeeName(tr.employeeID) }}
          </vs-td>
          <!-- websiteZone -->
          <vs-td v-if="!isHidden.websiteZone" style="white-space: nowrap;">
            {{ tr.websiteZone }}
          </vs-td>
          <!-- reason -->
          <vs-td v-if="!isHidden.reason" class="autoWidth">
            <span v-if="tr.reasonID">{{ tr.reason }}</span>
          </vs-td>
          <vs-td v-if="!isHidden.notes">
            {{ tr.notes }}
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
  },
  data() {
    return {
      allStockChanges: [],
      isfilterByEmployeeDisabled: false,
      IsPromptActive: {
        columnsManager: false,
      },
      filterByEmployeeID: 0,
      search: '',

      // static
      itemsPerPage: 50,
      Columns: [
        { name: 'id'     , title: 'ID', },
        { name: 'img'    , title: 'Imagen', },
        { name: 'product', title: 'Producto', },
        { name: 'employee', title: 'Responable', },
        { name: 'websiteZone', title: 'Lugar', },
        { name: 'reason' , title: 'Razón', },
        { name: 'notes'  , title: 'Notas', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id' ],
      ],
    }; // return DATA
  }, // DATA

  computed: {
    filteredStockChanges: function() {
      return this.allStockChanges;
    },
  }, // COMPUTED

  watch: {
    filterByEmployeeID(val) {
      this.isfilterByEmployeeDisabled = true;
      this.$nextTick(() => {
        if (val == null) {
          this.filterByEmployeeID = 0;
        }
        this.loadStockChanges();
      });
    },
  }, // WATCH

  created() {
    this.loadStockChanges();
  }, // CREATED

  methods: {
    // loadStockChanges
    // searchMovement
    loadStockChanges() {
      let Params = {
        branchID: this.getBranchID(),
        search: this.search,
      }
      if (this.filterByEmployeeID) {
        Params.employeeID = this.filterByEmployeeID;
      }
      this.conectToDB({
        file: 'Stock', action: 'getStockChanges', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allStockChanges = res.data.data;
          console.log('allStockChanges', this.allStockChanges);
          this.isfilterByEmployeeDisabled = false;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    searchMovement(search) {
      this.search = search;
      this.loadStockChanges();
    },
  }, // METHODS
} // export default

</script>

<style lang="css" scoped>
.amount {
  white-space: nowrap;
  color: white;
  padding: 5px 10px;
  /* padding: 10px; */
  border-radius: 30px;
  background-color: #15B0CE;
}
.amountLess { background-color: #FF4136 }
.amountLess::before { content: "-"; }

.amountMore { background-color: #2ECC40; }
.amountMore::before { content: "+"; }
</style>
