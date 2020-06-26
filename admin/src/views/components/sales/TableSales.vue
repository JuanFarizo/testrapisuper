<template>
  <div>

    <!-- prompt -->
    <SelectEmployee
    :msg="SelectEmployee.msg"
    :Sale="SelectEmployee.Sale"
    :change="SelectEmployee.change"
    :isPromptActive="IsPromptActiveInner.selectEmployee"
    @selectEmployee="employeeSelected($event)"
    @closePrompt="IsPromptActiveInner.selectEmployee = false"
    />

    <PromptShippingSales
    :sales="Sales"
    :isPromptActive="IsPromptActiveInner.shippingSales"
    @modifySaleDB="$emit('modifySaleDB', $event)"
    @closePrompt="IsPromptActiveInner.shippingSales = false"
    @modifySaleState="modifySaleState($event)"
    />

    <PromptEmployeesSalesSummary
    :isPromptActive="IsPromptActiveInner.employeesSalesSummary"
    @modifySaleDB="$emit('modifySaleDB', $event)"
    @closePrompt="IsPromptActiveInner.employeesSalesSummary = false"
    />

    <PromptStateSummary
    :isPromptActive="IsPromptActiveInner.stateSummary"
    :allSales="Sales"
    @closePrompt="IsPromptActiveInner.stateSummary = false;"
    />




    <!-- Table -->
    <vs-table ref="table" :data="!showEmployeesSales ? Sales : EmployeesSales" :max-items="itemsPerPage" :noDataText="defaultNoDataText">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <PromptSelectCities @filterCities="$emit('filterCities', $event)" class="tableHeaderItem"/>

          <vs-button class="tableHeaderItem" type="border"
            v-if="checkUser('gestion') && isMainHouse()"
            @click="$emit('modifyShowEmployeesSales', !showEmployeesSales);">
            <font-awesome-icon icon="exchange-alt"/>
            Ver ventas  {{ showEmployeesSales ? 'normales' : 'a empleados' }}
          </vs-button>

          <template v-if="!showEmployeesSales">

            <vs-button class="tableHeaderItem" type="border" v-if="checkUser('gestion')"
            @click="IsPromptActiveInner.stateSummary = true">
            <font-awesome-icon icon="list-ul"/>
              Resumen estado
            </vs-button>


            <vs-button class="tableHeaderItem" type="border" v-if="checkUser('gestion')"
            @click="IsPromptActiveInner.shippingSales = true;">
              <font-awesome-icon icon="shipping-fast"/> Ventas en camino
            </vs-button>

            <vs-checkbox v-model="showFutureSalesLocal" class="tableHeaderItem"
            :disabled="showFutureSalesDisabled">
              Mostrar pedidos futuros
            </vs-checkbox>

          </template> <!-- if !showEmployeesSales -->

          <template v-if="showEmployeesSales">
            <vs-button class="tableHeaderItem" type="border"
            @click="IsPromptActiveInner.employeesSalesSummary = true">
              <font-awesome-icon icon="list-ul"/>
                Resumen deudas
            </vs-button>

            <v-select class="tableHeaderItem" v-model="selectedFilteredByBuyerEmployeeID"
            :options="_allEmployeesAndNone" :reduce="Employee => Employee.id" label="fullName"
            style="display: inline-block; min-width: 250px"></v-select>

          </template> <!-- if showEmployeesSales -->

        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="listLength"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="$emit('newItemsPerPage', $event)"
        @searchInput="vmMain.search = $event; $emit('reloadSales');"
        />

      </div> <!-- header -->


      <!-- SALE TITLES -->
      <template slot="thead">
        <vs-th v-for="Col in Columns" v-if="!isHidden.Sales[Col.name]" :class="Col.nowrap == false ? '' : 'nowrap'">
          {{ Col.title }}
        </vs-th>
      </template>

      <!-- SALE ITEMS -->
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <!-- id -->
          <vs-td v-if="!isHidden.Sales.id">
            <vs-chip color="primary">{{ tr.id }}</vs-chip>
          </vs-td>

          <!-- date -->
          <vs-td v-if="!isHidden.Sales.date" :data="tr.date" :title="getTimeOfDB(tr.date)">
            {{ getDateOfDB(tr.date) }}
          </vs-td>

          <!-- isPrinted -->
          <vs-td v-if="!isHidden.Sales.isPrinted" class="centered">
            <vs-switch v-model="tr.isPrinted" @change="modifyIsPrinted(tr)" vs-icon="print"/>
          </vs-td>

          <!-- Products amount -->
          <vs-td class="centered">
            <div class="productsAmount">
              <span style="margin-top: 1px;">{{ tr.productsAmount }}</span>
            </div>
          </vs-td>

          <!-- Is stock controlled -->
          <vs-td class="centered" v-if="!isHidden.Sales.isStockControled">
            <vs-switch v-model="tr.isStockControled" @change="modifyIsStockControled(tr)" vs-icon="check"/>
          </vs-td>

          <!-- Control stock -->
          <vs-td class="centered" v-if="!isHidden.Sales.controlStock">
            <vs-button v-if="!tr.isStockControled" @click="controlStock(tr, -1)"
            size="small" style="white-space: nowrap;" vs-icon="check">
            <font-awesome-icon icon="arrow-down"/>
              Dar baja stock
            </vs-button>

            <vs-button v-if="!tr.isStockControled" @click="controlStock(tr, +1)"
            size="small" style="white-space: nowrap;" class="ml-2" vs-icon="check">
            <font-awesome-icon icon="arrow-up"/>
              Dar alta stock
            </vs-button>

          </vs-td>

          <!-- State -->
          <vs-td v-if="!isHidden.Sales.states" class="nowrap centered">
            <div class="stateGroup unselectable">
              <div @click="changeStateStart(tr, -1)" class="stepArrow stepArrow-right"
                :class="[`saleState${tr.stateID}`, {stepFirst: checkStepFirst(tr)}]">
                <font-awesome-icon icon="grip-lines-vertical" v-if="checkStepFirst(tr)"/>
                <font-awesome-icon icon="chevron-left" v-else/>
              </div>
              <div @click="changeStateStart(tr, +1)" class="state" :class="[`saleState${tr.stateID}`, {withUser: checkHasUser(tr)}]">
                {{ _localDB.SaleStates[tr.stateID] }}
                <div class="userImg" :class="`saleState${tr.stateID}`"
                v-if="tr.stateID == _localDB.SaleStateIDs.EnArmado || tr.stateID == _localDB.SaleStateIDs.Armado">
                  <vx-tooltip :text="tr.makingEmployeeFullName">
                    <img :src="getImg(`employees/${tr.makingEmployeeID}.png`)">
                  </vx-tooltip>
                </div>
                <div class="userImg" :class="`saleState${tr.stateID}`"
                v-if="tr.stateID == _localDB.SaleStateIDs.EnControl || tr.stateID == _localDB.SaleStateIDs.Controlado">
                  <vx-tooltip :text="tr.controlEmployeeFullName">
                    <img :src="getImg(`employees/${tr.controlEmployeeID}.png`)">
                  </vx-tooltip>
                </div>
                <div class="userImg" :class="`saleState${tr.stateID}`"
                v-if="tr.stateID == _localDB.SaleStateIDs.EnCamino">
                  <vx-tooltip :text="tr.shippingEmployeeFullName">
                    <img :src="getImg(`employees/${tr.shippingEmployeeID}.png`)">
                  </vx-tooltip>
                </div>
              </div>
              <div @click="changeStateStart(tr, +1)" class="stepArrow stepArrow-left"
              :class="[`saleState${tr.stateID}`, {stepLast: !(tr.stateID < _localDB.SaleStateIDs.Entregado)}]">
                <font-awesome-icon icon="chevron-right" v-if="tr.stateID < _localDB.SaleStateIDs.Entregado"/>
                <font-awesome-icon icon="grip-lines-vertical" v-else/>
              </div>
            </div>
          </vs-td>


        <vs-td v-if="!isHidden.Sales.changeToBuyerSale" class="centered">
          <vs-button @click="modifyBuyerEmployeeIDStart(tr)" size="small" style="width: 101px;">
          {{ showEmployeesSales ? 'No es' : 'Es' }} venta a empleado
          </vs-button>
        </vs-td>


          <!-- Functions -->
          <vs-td class="nowrap" v-if="!isHidden.Sales.functions">
              <vx-tooltip text="Ver lista de productos">
                <button type="button" class="myBtn btn-left" v-if="!isHidden.Sales.showProducts"
                @click="$emit('showProducts', tr)">
                  <font-awesome-icon :icon="['fas', 'list-ul']"/>
                </button>
              </vx-tooltip>

            <vx-tooltip text="Más funciones">
              <vs-dropdown vs-custom-content vs-trigger-click class="myBtn btn-right">
                <a class="a-icon" href.prevent>
                  <font-awesome-icon :icon="['fas', 'plus']"/>
                </a>

                <vs-dropdown-menu>
                  <div class="moreFuncDropdown">
                    <h3 class="moreFuncDropdownTitle">Funciones</h3>
                    <!-- <button type="button" class="myBtn myBtnV myBtnV-top" v-if="!isHidden.Sales.print"
                    @click="$emit('printList', tr)" title="Imprimir lista de productos">
                      <font-awesome-icon :icon="['fas', 'print']"/> Imprimir
                    </button> -->
                    <button type="button" class="myBtn myBtnV myBtnV-center" v-if="!isHidden.Sales.copy"
                    @click="$emit('copyList', tr)" title="Copiar lista de productos">
                      <font-awesome-icon :icon="['far', 'copy']"/> Copiar
                    </button>
                    <button type="button" class="myBtn myBtnV myBtnV-bottom" v-if="!isHidden.Sales.edit"
                    @click="$emit('startEdit', tr)" title="Editar venta">
                      <font-awesome-icon :icon="['far', 'edit']"/> Editar
                    </button>
                  </div>
                  <div v-if="tr.makingEmployeeID || tr.controlEmployeeID || tr.shippingEmployeeID">
                    <h3 class="moreFuncDropdownTitle mt-3">Historial</h3>
                    <div v-if="tr.makingEmployeeID">Armado:   {{ getEmployeeName(tr.makingEmployeeID) }}</div>
                    <div v-if="tr.controlEmployeeID">Control: {{ getEmployeeName(tr.controlEmployeeID) }}</div>
                    <div v-if="tr.shippingEmployeeID">Envío:  {{ getEmployeeName(tr.shippingEmployeeID) }}</div>
                  </div>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vx-tooltip>

            <!-- Notes -->
            <!-- <vx-tooltip title="Detalles" :html="getControlDetailsOfSale(tr, true)" v-if="tr.controlNotes"> -->
              <vs-dropdown vs-custom-content vs-trigger-click v-if="getControlDetailsOfSale(tr)">
                <a class="a-icon" href.prevent>
                  <div class="controlIcon" :class="{notesIcon: tr.controlNotes}">
                    <font-awesome-icon :icon="['far', 'sticky-note']"/>
                  </div>
                </a>
                <vs-dropdown-menu>
                  <div>
                    <h6 class="text-center mb-3">Detalles</h6>
                    <p v-html="getControlDetailsOfSale(tr, true)"></p>
                  </div>
                </vs-dropdown-menu>
              </vs-dropdown>
            <!-- </vx-tooltip> -->

          </vs-td>

          <!-- buyer employee -->
          <vs-td v-if="!isHidden.Sales.buyerEmployee" class="nowrap">
            {{ tr.buyerEmployeeFullName }}
          </vs-td>

          <!-- buyer id -->
          <vs-td v-if="!isHidden.Sales.buyerID" class="centered">
            <vs-chip color="primary">{{ tr.buyerID }}</vs-chip>
          </vs-td>


          <!-- buyer -->
          <vs-td v-if="!isHidden.Sales.buyer" style="min-width: 300px; max-width: 300px;">
            <!-- <vx-tooltip :text="tr.buyerFullName">
          </vx-tooltip> -->
          {{ tr.buyerFullName }}
          </vs-td>

          <!-- isPayed -->
          <vs-td v-if="!isHidden.Sales.isPayed" class="centered">
            <vs-switch v-model="tr.isPayed" @change="modifyIsPayed(tr)" vs-icon="attach_money"/>
          </vs-td>

          <!-- paymentType -->
          <vs-td v-if="!isHidden.Sales.paymentType" :data="tr.paymentTypeID" class="nowrap centered">
            <vx-tooltip :text="tr.paymentType">
              <font-awesome-icon :icon="getPaymentIcon(tr.paymentTypeID)" :class="`payment${tr.paymentTypeID}`"/>
            </vx-tooltip>
            <!-- {{ tr.paymentType }} -->
          </vs-td>

          <!-- paymentDatetime -->
          <vs-td v-if="!isHidden.Sales.paymentDatetime" class="centered">
          <div v-if="tr.paymentDatetime != null && tr.paymentDatetime != emptyDatetime"
          :title="getTimeOfDB(tr.paymentDatetime)">
            {{ getDateOfDB(tr.paymentDatetime) }}
          </div>
        </vs-td>

          <!-- shippingNeeded -->
          <vs-td v-if="!isHidden.Sales.shippingNeeded" class="nowrap centered">
            <!-- <vx-tooltip :text="'Retiro en local'"> -->
            <vx-tooltip :text="(tr.shippingNeeded ? 'Envío a domicilio' : 'Retiro en local')">
              <font-awesome-icon :icon="getShippingIcon(tr.shippingNeeded)" class="shippingIcon"/>
            </vx-tooltip>
          </vs-td>

          <!-- reception -->
          <vs-td v-if="!isHidden.Sales.reception" class="nowrap">
            <div style="display: inline-flex">
              <vs-chip :color="getDateColor(tr.receptionDate, tr.stateID)" class="biggerFontSize">
                <div v-if="tr.receptionTime != null && tr.receptionTime != emptyDatetime">
                  <vx-tooltip :text="getFullReceptionTime(tr)">
                      {{ minToHour(tr.receptionTime) }}
                  </vx-tooltip>
                </div>
                <div v-else-if="!tr.shippingNeeded">Retiro en local</div>
                <div v-else><span class="noTime">Sin horario</span></div>
              </vs-chip>
            </div>
            <!-- <span v-if="getDateOfDB(tr.receptionDate)"> - </span> -->
            <div style="display: inline-flex">
              <vs-chip :color="getDateColor(tr.receptionDate, tr.stateID)" class="biggerFontSize">
                {{ getDateOfDB(tr.receptionDate) }}
              </vs-chip>
            </div>
          </vs-td>
          <!-- total -->
          <vs-td v-if="!isHidden.Sales.total" :data="tr.totalTotal" :title="showPaymentPrediction(tr.paymentPrediction)"
          class="notOverflow nowrap" style="max-width: 190px;">
            ${{ tr.totalTotal }}
            <span>{{ showPaymentPrediction(tr.paymentPrediction) }}</span>
          </vs-td>
          <!-- address -->
          <vs-td v-if="!isHidden.Sales.address" style="min-width: 500px; max-width: 500px;">
             <!-- overflow: auto; -->
            <span v-if="tr.shippingNeeded">{{ getBuyerAddress(tr) }}</span>
            <span v-else class="retiroEnLocalText"></span>
          </vs-td>
          <!-- phone -->
          <vs-td v-if="!isHidden.Sales.phone" class="nowrap">{{ tr.buyerPhone }}</vs-td>
          <!-- notes -->
          <vs-td v-if="!isHidden.Sales.notes">{{ tr.notes }}</vs-td>
          <!-- reportIssue -->
          <vs-td v-if="!isHidden.Sales.reportIssue">
            <vs-switch v-model="tr.Cancelado" color="danger" vs-icon="clear" class="centered"
            @click="cancelSale(tr)"/>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>  <!-- Sale table -->

    <!-- PAGINATION -->
    <div>
      <vs-pagination :total="totalPages" :value="currentPage" :max="7"
      @input="(val) => { paginationPageChange(val) }" />
    </div>


  </div>
</template>

<script>

// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  // mixins: [
  //   vsTableConfig,
  // ],
  components: {
    SelectEmployee: () => import('@/views/components/SelectEmployee.vue'),
    PromptEmployeesSalesSummary: () => import('@/views/components/sales/PromptEmployeesSalesSummary.vue'),
    PromptSelectCities: () => import('./PromptSelectCities.vue'),
    PromptShippingSales: () => import('./PromptShippingSales.vue'),
    PromptStateSummary: () => import('./PromptStateSummary.vue'),
  },
  props: {
    vmMain: { type: Object, required: true, },
    Sales: { type: Array, required: true, },
    EmployeesSales: { type: Array, required: true, },
    Columns: { type: Array, required: true, },
    isHidden: { type: Object, required: true, },
    showEmployeesSales: { type: Boolean, required: true, },
    itemsPerPage: { type: Number, required: true, },
    listLength: { type: Number, required: true, },
    showFutureSales: { type: Boolean, required: true, },
  }, // PROPS

  data() {
    return {
      selectedFilteredByBuyerEmployeeID: 0,
      showFutureSalesDisabled: false,
      isMounted: false,
      currentPage: 1,
      avoidDuplicatesCounter: 0,
      SelectEmployee: { Sale: {}, change: 0, msg: '', },
      IsPromptActiveInner: {
        selectEmployee: false,
        shippingSales: false,
        employeesSalesSummary: false,
        stateSummary: false,
      },
      selectingBuyerEmployee: false,
    } // return DATA
  }, // DATA
  computed: {


    totalPages() {
      let integer = Math.floor(this.listLength/this.itemsPerPage);
      let remainder = this.listLength%this.itemsPerPage;
      return integer + (remainder ? 1 : 0);
    },
    showFutureSalesLocal: {
      get() {
        return this.showFutureSales;
      },
      set(val) {
        this.vmMain.showFutureSales = val;
        this.$emit('reloadSales');
      },
    },
  }, // COMPUTED
  watch: {
    selectedFilteredByBuyerEmployeeID(val) {
      this.$nextTick(() => {
        if (val == null) {
          this.selectedFilteredByBuyerEmployeeID = 0;
        }
        this.vmMain.selectedFilteredByBuyerEmployeeID = val;
        this.$emit('reloadSales');
      });
    },
    showFutureSales() {
      this.showFutureSalesDisabled = true;
    },
    Sales() {
      this.showFutureSalesDisabled = false;
    },
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    modifyBuyerEmployeeIDStart(Sale) {
      if (this.showEmployeesSales) {
        // Le saca la ID de comprador y listo
        let Data = {
          Sale: Sale,
          employeeID: 0,
        }
        this.selectBuyerEmployeeFinish(Data);
        return;
      }
      // Pregunta quién lo compró
      this.SelectEmployee.msg = '¿Quién es el comprador?'
      this.SelectEmployee.Sale = Sale;
      this.IsPromptActiveInner.selectEmployee = true;
      this.selectingBuyerEmployee = true;
    },
    selectBuyerEmployeeFinish(Data) {
      let array = !this.showEmployeesSales ? this.Sales : this.EmployeesSales;
      const index = array.findIndex(i => i.id == Data.Sale.id);
      array.splice(index, 1);
      let Params = {
        saleID: Data.Sale.id,
        buyerEmployeeID: Data.employeeID,
      }
      this.$emit('modifySaleDB', Params);
      this.myNotify('success', 'Éxito', 'Se ha modificado correctamente');
    },
    employeeSelected(data) {
      if (this.selectingBuyerEmployee) {
        this.selectBuyerEmployeeFinish(data);
        this.selectingBuyerEmployee = false;
      } else {
        this.changeStateFinish(data)
      }
    },
    modifySaleState(Params) {
      let index = this.Sales.findIndex(i => i.id == Params.saleID);
      if (index == -1) return;
      this.Sales[index].stateID = Params.stateID;
      this.Sales[index].isPayed = Params.isPayed;
    },
    checkStepFirst(Sale) {
      return !!(Sale.stateID <= this._localDB.SaleStateIDs.Pedido || this._localDB.SaleStateIDs.ConErrores <= Sale.stateID)
    },
    // cancelSale
    // changeState
    // checkHasUser
    cancelSale(Sale) {
      let canceledID = this._localDB.SaleStateIDs.Cancelado;
      if (Sale.stateID != canceledID) {
        var msg = 'Seguro que querés cancelar la venta?';
        var stateID = canceledID;
      } else {
        var msg = 'Seguro que querés que la venta no esté más cancelada?';
        var stateID = this._localDB.SaleStateIDs.Pedido;
      }
      if (!confirm(msg)) {
        Sale.Cancelado = !Sale.Cancelado;
        return;
      }
      Sale.stateID  = stateID;
      let Params = {
        saleID:  Sale.id,
        stateID: stateID,
      }
      this.$emit('modifySaleDB', Params);
      let ParamsControlStock = {
        addStock: (stateID == canceledID),
        websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.cancelSale,
      }
      this.$emit('controlStock', { Sale, Params: ParamsControlStock });
    },
    checkHasUser(Sale) {
      switch (Sale.stateID) {
        case this._localDB.SaleStateIDs.EnArmado:
        case this._localDB.SaleStateIDs.Armado:
        case this._localDB.SaleStateIDs.EnControl:
        case this._localDB.SaleStateIDs.Controlado:
        case this._localDB.SaleStateIDs.EnCamino:
          return true;
      }
      return false;
    },
    changeStateStart(Sale, change) {
      let SaleStateIDs = this._localDB.SaleStateIDs;
      if (change == -1 && Sale.stateID == SaleStateIDs.Pedido) return;
      if (change == +1 && Sale.stateID == SaleStateIDs.Entregado) return;
      let employeeID = 0;
      this.SelectEmployee.Sale = Sale;
      this.SelectEmployee.change = change;
      if (change == +1) {
        switch (Sale.stateID+1) {
          case SaleStateIDs.EnArmado:
            this.SelectEmployee.msg = '¿Quién lo va a armar?'
            this.IsPromptActiveInner.selectEmployee = true;
            return;
          case SaleStateIDs.EnControl:
            this.SelectEmployee.msg = '¿Quién lo va a controlar?'
            this.IsPromptActiveInner.selectEmployee = true;
            return;
          case SaleStateIDs.EnCamino:
            this.SelectEmployee.msg = '¿Quién lo va a llevar?'
            this.IsPromptActiveInner.selectEmployee = true;
            return;
        }
      }
      this.changeStateFinish({Sale, change});
    },
    changeStateFinish(Params) {
      let SaleStateIDs = this._localDB.SaleStateIDs;
      Params.Sale.stateID += Params.change;
      let Params2 = {
        saleID:  Params.Sale.id,
        stateID: Params.Sale.stateID,
      }
      if (Params.change == +1) {
        switch (Params.Sale.stateID) {
          case SaleStateIDs.EnArmado:
            if (!Params.employeeID) {
              this.myNotify('warning', 'Atención', 'No se realizó ningún cambio'); return;
            }
            Params.Sale.makingEmployeeID = Params.employeeID;
            Params.Sale.makingEmployeeFul = this.getEmployeeName(Params.employeeID);
            Params2.makingEmployeeID = Params.employeeID;
            break;
          case SaleStateIDs.EnControl:
            if (!Params.employeeID) {
              this.myNotify('warning', 'Atención', 'No se realizó ningún cambio'); return;
            }
            Params.Sale.controlEmployeeID = Params.employeeID;
            Params.Sale.controlEmployeeFul = this.getEmployeeName(Params.employeeID);
            Params2.controlEmployeeID = Params.employeeID;
            break;
          case SaleStateIDs.EnCamino:
            if (!Params.employeeID) {
              this.myNotify('warning', 'Atención', 'No se realizó ningún cambio'); return;
            }
            Params.Sale.shippingEmployeeID = Params.employeeID;
            Params.Sale.shippingEmployeeFullName = this.getEmployeeName(Params.employeeID);
            Params2.shippingEmployeeID = Params.employeeID;
            break;
        }
      }
      this.$emit('modifySaleDB', Params2);
    },
    // getDateColor
    // getSaleStateColor
    // getStateIcon
    // getPaymentIcon
    // getShippingIcon
    // getShippingColor
    // manageColumns
    getDateColor(date, stateID) {
      let dateToShow = this.getDateOfDB(date)
      if (stateID == this._localDB.SaleStateIDs.Cancelado) return '';
      if (stateID == this._localDB.SaleStateIDs.Entregado) return '';
      if (date == this.getActualDateToDB()) return 'primary';
      if (this.dateIsNewer(date, this.getActualDateToDB())) return 'warning';
      return 'danger';
    },
    getSaleStateColor(stateID) {
      if(stateID == this._localDB.SaleStateIDs.Desconocido) return '#000000';
      if(stateID == this._localDB.SaleStateIDs.Cancelado) return 'danger';
      if(stateID == this._localDB.SaleStateIDs.Pedido) return 'warning';
      if(stateID == this._localDB.SaleStateIDs.Entregado) return 'success';
      return 'primary';
    },
    getStateIcon(stateID) {
      if(stateID == this._localDB.SaleStateIDs.Desconocido) return 'exclamation';
      if(stateID == this._localDB.SaleStateIDs.Cancelado) return 'times';
      return 'check';
    },
    getPaymentIcon(paymentTypeID) {
      switch (paymentTypeID) {
        case 1: // Efectivo
          return 'money-bill';
        case 2: // Argentino / Central
          return ['far', 'credit-card'];
        case 3: // Otras tarjetas
          return ['fab', 'cc-visa'];
        case 4: // QR Mercadopago
          return ['fas', 'qrcode'];
        default: // Alerta
          return 'exclamation-circle';
      }
    },
    getShippingIcon(shippingNeeded) {
      if (shippingNeeded) {
        return 'shipping-fast';
      } else {
        return 'store-alt';
      }
    },
    manageColumns() {
      this.$emit('manageColumns');
    },
    modifyIsPayed(Sale) {
      // aca tendríamos que poder guardar el paymentEmployeeID:
      Sale.paymentDatetime = Sale.isPayed ? this.getActualDatetimeToDB() : this.emptyDatetime;
      if (this.avoidDuplicatesCounter++%2) return;
      let Params = {
        saleID: Sale.id,
        paymentDatetime: Sale.paymentDatetime,
      }
      this.$emit('modifySaleDB', Params);
    },
    modifyIsPrinted(Sale) {
      if (this.avoidDuplicatesCounter++%2) return;
      let Params = {
        saleID: Sale.id,
        isPrinted: Sale.isPrinted,
      }
      this.$emit('modifySaleDB', Params);
    },
    modifyIsStockControled(Sale, control = true) {
      if (control) {
        if (this.avoidDuplicatesCounter++%2) return;
      }
      let Params = {
        saleID: Sale.id,
        isStockControled: Sale.isStockControled,
      }
      this.$emit('modifySaleDB', Params);
    },
    controlStock(Sale, changeDirection) {
      let action = changeDirection == +1 ? ' dar de alta ' : ' dar de baja ';
      if (!confirm(`¿Seguro querés ${action} el stock de esta compra?`)) return;
      if (changeDirection == -1) {
        Sale.isStockControled = true;
        let control = false;
        this.modifyIsStockControled(Sale, control);
      }
      let Params = {
        websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.forceSaleStockControl,
        addStock: (changeDirection = +1),
      }
      this.$emit('controlStock', { Sale, Params });
    },

    paginationPageChange(val) {
      // let currentPage = !this.isMounted ? 0 : this.$refs.table.currentx;
      let currentPage = val;
      this.currentPage = currentPage;
      this.$emit('newCurrentPage', currentPage);
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
  /deep/ th {
    padding-left: 5px;
    padding-right: 5px;
  }
  .productsAmount {
    padding: 5px 12px;
    background: #15B0CE;
    border-radius: 15px;
    color: white;
    text-align: center;
    font-size: 12px;
  }
  .stateSwitch {
    display: inline-flex;
    width: 46px;
  }
  .stateSwitch:not(:last-of-type) {
    margin-right: 10px;
  }
  .retiroEnLocalText {
    opacity: 0.5;
    font-style: italic;
  }
  .retiroEnLocalText::after {
    content: 'Retiro en local';
  }
  .noTime {
    opacity: 0.8;
    font-style: italic;
    margin: 0 6px;
  }
  .biggerFontSize {
    font-size: 13px;
  }

  .myBtnV {
    display: block;
    border-radius: 7px;
    width: 100%;
  }
  .myBtnV-top {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  .myBtnV-center {
    border-bottom: none;
    border-radius: 0;
  }
  .myBtnV-bottom {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .moreFuncDropdown {
    padding: 5px 10px;
  }
  .moreFuncDropdownTitle {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 5px;
    margin-bottom: 15px;
  }

  // states
  .stateGroup {
    // border-radius:25px;
    // border: 1px solid;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
  }
  .state {
    display: inline-block;
    position: relative;
    padding: 10px;
    padding: 4px 10px;
    /* border-radius: 25px; */
    font-size: 14px;
    border: 1px solid;
    border-bottom: none;
    border-top: none;
    width: 135px;
    text-align: center;
  }
  .state.withUser {
    padding-right: 45px;
  }

  .state:hover {
    opacity: 0.85;
  }

  .stepArrow {
    display: inline-block;
    padding: 4px 10px;
  }
  .stepArrow:hover {
    opacity: 0.85;
  }
  .stepArrow-left {
    border-radius: 0 25px 25px 0;
    padding: 4px 13px 4px 10px;
  }
  .stepArrow-right {
    border-radius: 25px 0 0 25px;
    padding: 4px 10px 4px 13px;
  }

  .stepArrow.stepFirst {
    border-radius: 5px 0 0 5px;
  }
  .stepArrow.stepLast {
    border-radius: 0 5px 5px 0;
  }

  .userImg {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid;
    border-radius: 30px;
    position: absolute;
    right: 2px;
    top: -5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shippingIcon {
    color: #22223E;
    // color: #15B0CE;
  }

  .controlIcon {
    padding: 0 10px;
    font-size: 22px;
    color: #15B0CE;
    cursor: pointer;
  }
  .notesIcon{ color: #22223E; }

  .falseTooltip {
    background-color: #323232;
    color: white;
  }

  // MAIN
  /deep/ td {
    padding: 7px 5px !important;
  }
</style>
