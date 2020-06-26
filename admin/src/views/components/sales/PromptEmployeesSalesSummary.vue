<template>
  <vs-popup title="Resumen de deudas" :active.sync="isPromptActiveLocal">
    <div class="mainContent">
      <MonthSelector
      :selectedMonth="selectedMonth"
      @changeMonth="selectedMonth = $event; loadEmployeesSales();"
      class="monthSelector"
      />

      <vs-table ref="table" :data="allSummaries" noDataText="No hay deudas pendientes">

        <!-- SALE TITLES -->
        <template slot="thead">
          <vs-th>Deuda</vs-th>
          <vs-th>Nombre</vs-th>
          <vs-th v-if="checkUser('subAdmin')">Saldar</vs-th>
        </template>

        <!-- SALE ITEMS -->
        <template slot-scope="{data}">
          <vs-tr v-if="tr.total" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td class="autoWidth">${{ showPrice(tr.total) }}</vs-td>
            <vs-td>{{ tr.employeeFullName }}</vs-td>
            <vs-td class="autoWidth" v-if="checkUser('subAdmin')">
              <vs-switch v-model="tr.isPayed" @change="payAllOf(tr)"/>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>  <!-- Sale table -->

    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
  }, // PROPS
  data() {
    return {
      avoidDuplicatesCounter: 0,
      selectedMonth: null,
      allSummaries: [],
      selectedCities: [],
    }; // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        if (val) {
          this.loadEmployeesSales();
        } else {
          this.$emit('closePrompt');
        }
      }
    },
  }, // COMPUTED
  watch: {
  }, // WATCH
  created() {
  }, // CREATED

  methods: {
    // copyList
    // loadEmployeesSales
    // payAllOf
    // showSummary
    copyList(Item) {
      // LA IDEA ERA GENERAR UN RESUMEN DE LOS PRODUCTOS QUE SE LLEVARON
      // Eczampl:
      // 21/03/19
      //   1x Fideos
      //   3x Salsa de tomate
      // 22/03/19
      //   1x Chocolate negro
      let text = '';
      for (let Sale of this.EmployeesSales) {
        if (Sale.buyerEmployeeID == Item.employeeID) {
          text += ``;
          // ESTO ES ALTO MAMBITO, ASÍ QUE QUEDA ABANDONADO
        }
      }
      this.myNotify('success', 'Éxito', `Lista de deudas de <b>${Item.employeeFullName}</b> copiada`);
    },

    loadEmployeesSales() {
      let Params = {
        branchID: this.getBranchID,
        hasBuyerEmployeeID: true,
        paymentStateID: this._localDB.SalePaymentStateIDs.EnEspera,
      }
      if (this.selectedMonth) {
        Params.month = this.selectedMonth;
      }
      this.conectToDB({
        file: 'Sales', action: 'getSale', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let EmployeesSales = res.data.data;
          console.log('EmployeesSales', EmployeesSales);
          this.EmployeesSales = EmployeesSales;
          this.showSummary()
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    payAllOf(Item) {
      if (this.avoidDuplicatesCounter++ % 2) return;
      let time = selectedMonth ? this.monthsNamesSpanish[selectedMonth-1] : 'todos los tiempos';
      let text = `las deudas de ${time} de ${Item.employeeFullName}`;
      if (!confirm(`Estás seguro que querés descontar ${text}`))
      this.myNotify('success', 'Éxito', `Se han saldados ${text}`);
      for (let Sale of this.EmployeesSales) {
        if (Sale.buyerEmployeeID == Item.employeeID) {
          Sale.isPayed = true;
          console.log(Item);
          continue;
          if (selectedMonth && selectedMonth != this.getMonth(Item.algo))continue;
          let Params = {
            saleID: Sale.id,
            paymentDatetime: this.getActualDatetimeToDB(),
          }
          this.$emit('modifySaleDB', Params);
        }
      }
    },

    showSummary() {
      let allSummaries = [];
      // set all to 0
      for (let Employee of this._allEmployees) {
        let newSummary = {
          employeeID: Employee.id,
          total: 0,
          isPayed: false,
          employeeFullName: Employee.fullName,
        }
        allSummaries.push(newSummary);
      }
      // set real values
      for (let Sale of this.EmployeesSales) {
        for (let Summary of allSummaries) {
          if (Sale.buyerEmployeeID == Summary.employeeID) {
            Summary.total += +Sale.totalTotal;
            break;
          }
        }
      }
      this.allSummaries = allSummaries;
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

  .mainContent {
    min-height: 400px;
  }

  .monthSelector {
    margin-left: auto;
    margin-bottom: 30px;
  }

</style>
