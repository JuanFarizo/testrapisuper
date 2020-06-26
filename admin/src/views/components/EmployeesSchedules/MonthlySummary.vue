<template>
  <vs-popup :active.sync="isPromptActiveLocal" title="Resumen">
    <div style="min-height: 400px;">
      <vs-table ref="table" :data="allSummaries" noDataText="No hay horarios" search>
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between" style="padding-bottom: 14px;">
          <div class="flex flex-wrap-reverse items-center headerItems">
            <div class="">
              <MonthSelector :selectedMonth="selectedMonth" @changeMonth="selectedMonth = $event"/>
            </div>
            <vs-input v-model="paymentPerHour" type="number" label="Pago hora"
            min="0" class="paymentPerHourInput"/>
          </div>

        </div> <!-- header -->


        <template slot="thead">
          <vs-th v-for="Col in Columns" :class="Col.nowrap == false ? '' : 'nowrap'">
            {{ Col.title }}
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- employee -->
            <vs-td>
              {{ tr.employee }}
            </vs-td>
            <!-- timeWorked -->
            <vs-td class="autoWidth">
              {{ minToHour(tr.timeWorked) }}
            </vs-td>
            <!-- payment -->
            <vs-td class="autoWidth nowrap">
              $ {{ addPoints(tr.payment) }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
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
      paymentPerHour: 0,
      selectedMonth: (+this.getActualMonth()),
      allMonths: [
        { id:  null, name: 'Todos', },
        { id:  1, name: 'Enero', },
        { id:  2, name: 'Febrero', },
        { id:  3, name: 'Marzo', },
        { id:  4, name: 'Abril', },
        { id:  5, name: 'Mayo', },
        { id:  6, name: 'Junio', },
        { id:  7, name: 'Julio', },
        { id:  8, name: 'Agosto', },
        { id:  9, name: 'Septiembre', },
        { id: 10, name: 'Octubre', },
        { id: 11, name: 'Noviembre', },
        { id: 12, name: 'Diciembre', },
      ],
      Columns: [
        { name: 'employee', title: 'Empleado', },
        { name: 'timeWorked', title: 'Horas', },
        { name: 'payment', title: 'Pago', },
      ],
      allSummaries: [],
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
    isPromptActiveLocal(val) {
      if (!val) return;
      this.calculateSummary();
    },
    selectedMonth() {
      this.calculateSummary();
    },
    paymentPerHour() {
      this.calculatePayment();
    },
  }, // WATCH

  created() {
  },

  mounted() {
    let keyPressArray = [
      {
        key: 'esc',
        callback: (vm) => { vm.isPromptActiveLocal = false; },
        params: this,
      },
    ]
    // this.checkKeyPressArray(keyPressArray);
  },

  methods: {
    // calculateSummary

    calculateSummary() {
      // ya lo puedo traer hecho de la db, no? jejej
      let Params = {
        branchID: this.getBranchID(),
        month: this.selectedMonth,
        isActive: 1,
      }
      const vm = this;
      this.conectToDB({
        file: 'EmployeesSchedules', action: 'getScheduleMovementSummary', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let allSummaries = res.data.data;
          for (let Summary of allSummaries) {
            Summary.payment = 0;
          }
          vm.allSummaries = allSummaries;
          vm.calculatePayment()
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    calculatePayment() {
      for (let Summary of this.allSummaries) {
        Summary.payment = this.showPrice(this.paymentPerHour * (Summary.timeWorked/60));
      }
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
  .inputLine {
    margin-top: 5px;
    width: 100%;
  }

  .headerItems {
    .paymentPerHourInput {
      margin-left: 10px;
      width: 80px;
    }
    .paymentPerHourInput /deep/ div input {
      text-align: center;
    }
  }
</style>
