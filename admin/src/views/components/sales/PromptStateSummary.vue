<template>
  <vs-popup title="Resumen diario" :active.sync="isPromptActiveLocal">
    <vs-table :data="allSales">
      <template slot="header">
        <div class="w-full flex mb-4" style="justify-content: space-between;">
          <div><b>Total</b></div>
          <div class="">
            <span class="mr-5">{{ Totals.Total.sales }} ventas</span>
            <span v-if="checkUser('admin')">
              $ {{ addPoints(Totals.Total.invoicing) }} facturado
            </span>
          </div>
          <div class="">
            <change-day @changeDay="daysOfDiference = $event; loadSales()"/>
          </div>
        </div>
      </template>
      <template slot="thead">
        <vs-th>Estado</vs-th>
        <vs-th>Cantidad</vs-th>
        <vs-th v-if="checkUser('admin')">Valor</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-if="Totals.Pedido.sales">
          <vs-td><div class="saleState saleState1">Pedidos</div></vs-td>
          <vs-td class="amountTd">{{ Totals.Pedido.sales }}</vs-td>
          <vs-td v-if="checkUser('admin')">$ {{ addPoints(Totals.Pedido.invoicing) }}</vs-td>
        </vs-tr>
        <vs-tr v-if="Totals.Armado.sales">
          <vs-td><div class="saleState saleState2">Armados</div></vs-td>
          <vs-td class="amountTd">{{ Totals.Armado.sales }}</vs-td>
          <vs-td v-if="checkUser('admin')">$ {{ addPoints(Totals.Armado.invoicing) }}</vs-td>
        </vs-tr>

        <vs-tr v-if="Totals.Controlado.sales">
          <vs-td><div class="saleState saleState4">Controlados</div></vs-td>
          <vs-td class="amountTd">{{ Totals.Controlado.sales }}</vs-td>
          <vs-td v-if="checkUser('admin')">$ {{ addPoints(Totals.Controlado.invoicing) }}</vs-td>
        </vs-tr>

        <vs-tr v-if="Totals.EnCamino.sales">
          <vs-td><div class="saleState saleState6">En camino</div></vs-td>
          <vs-td class="amountTd">{{ Totals.EnCamino.sales }}</vs-td>
          <vs-td v-if="checkUser('admin')">$ {{ addPoints(Totals.EnCamino.invoicing) }}</vs-td>
        </vs-tr>

        <vs-tr v-if="Totals.Entregado.sales">
          <vs-td><div class="saleState saleState7">Entregados</div></vs-td>
          <vs-td class="amountTd">{{ Totals.Entregado.sales }}</vs-td>
          <vs-td v-if="checkUser('admin')">$ {{ addPoints(Totals.Entregado.invoicing) }}</vs-td>
        </vs-tr>

        <vs-tr v-if="Totals.Cancelado.sales">
          <vs-td class="saleState saleState8">Cancelados</vs-td>
          <vs-td class="amountTd">{{ Totals.Cancelado.sales }}</vs-td>
          <vs-td v-if="checkUser('admin')">$ {{ addPoints(Totals.Cancelado.invoicing) }}</vs-td>
        </vs-tr>

        <vs-tr v-if="!Totals.Total.sales">
          <vs-td colspan="3">
            <div class="noSalesMsg">
              No hay ninguna venta hoy
            </div>
          </vs-td>
        </vs-tr>

      </template>
    </vs-table>

  </vs-popup>
</template>

<script>
export default {
  components: {
    ChangeDay: () => import('@/../../Dual/components/ChangeDay.vue'),
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    // allSales: { type: Array, required: true, },
  },
  data() {
    return {
      Totals: this.getNewTotals(),
      daysOfDiference: 0,
      allSales: [],
    }; // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        if (this.isPromptActive) this.loadSales();
        return this.isPromptActive;
      },
      set(val) {
        if (!val) { this.$emit('closePrompt'); }
        else { this.$emit('openPrompt') }
      }
    },
  }, // COMPUTED
  methods: {
    // calculateSummary
    // getNewTotals
    // loadSales
    calculateSummary() {
      let actualDate = this.getActualDateToDB();
      let stateIDs = this._localDB.SaleStateIDs;
      this.Totals = this.getNewTotals();
      for (let Sale of this.allSales) {
        if (Sale.receptionDate != actualDate) continue;
        this.Totals.Total.sales++;
        this.Totals.Total.invoicing = +Sale.totalTotal + +this.Totals.Total.invoicing;
        switch (Sale.stateID) {
          case stateIDs.Pedido:
            this.Totals.Pedido.sales++;
            this.Totals.Pedido.invoicing = +Sale.totalTotal + +this.Totals.Pedido.invoicing;
            break;
          case stateIDs.EnArmado:
          case stateIDs.Armado:
            this.Totals.Armado.sales++;
            this.Totals.Armado.invoicing = +Sale.totalTotal + +this.Totals.Armado.invoicing;
            break;
          case stateIDs.EnControl:
          case stateIDs.Controlado:
            this.Totals.Controlado.sales++;
            this.Totals.Controlado.invoicing = +Sale.totalTotal + +this.Totals.Controlado.invoicing;
            break;
          case stateIDs.EnCamino:
            this.Totals.EnCamino.sales++;
            this.Totals.EnCamino.invoicing = +Sale.totalTotal + +this.Totals.EnCamino.invoicing;
            break;
          case stateIDs.Entregado:
            this.Totals.Entregado.sales++;
            this.Totals.Entregado.invoicing = +Sale.totalTotal + +this.Totals.Entregado.invoicing;
            break;
        }
      }
    },
    getNewTotals() {
      return {
        Total:      { sales: 0, invoicing: 0.0 },
        Pedido:     { sales: 0, invoicing: 0.0 },
        Armado:     { sales: 0, invoicing: 0.0 },
        Controlado: { sales: 0, invoicing: 0.0 },
        EnCamino:   { sales: 0, invoicing: 0.0 },
        Entregado:   { sales: 0, invoicing: 0.0 },
        Cancelado:  { sales: 0, invoicing: 0.0 },
      }
    },

    loadSales() {
      let Params = {
        branchID: this.getBranchID(),
        hasBuyerEmployeeID: false,
        receptionDate: this.getActualDateToDB({day: this.daysOfDiference}),
      }
      this.conectToDB({
        file: 'Sales', action: 'getSale', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allSales = res.data.data;
          this.calculateSummary();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

  },
} // export default
</script>

<style lang="scss" scoped>
  .noSalesMsg {
    padding: 50px 0;
    width: 100%;
    text-align: center;
    font-size: 15px;
    opacity: 0.7;
    font-style: italic;
  }
  .saleState {
    width: 100%;
    padding: 5px 15px;
    /* text-align: center; */
    border-radius: 5px;
  }
  .amountTd /deep/ span {
    margin-left: 25px;
  }
</style>
