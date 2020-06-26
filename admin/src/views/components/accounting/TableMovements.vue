<template>
  <!-- Table -->
  <vs-table ref="table" :data="allMovements" pagination :max-items="itemsPerPage" noDataText="No hay movimientos">
    <div slot="header" class="tableHeaderContainer">
      <div class="tableHeader">
        <vs-button @click="vmMain.toggleNewMovement('gasto')" type="border" color="danger" class="tableHeaderItem">
          <font-awesome-icon icon="plus"/> Gasto
        </vs-button>
        <vs-button @click="vmMain.toggleNewMovement('ingreso')" type="border" color="success" class="tableHeaderItem">
          <font-awesome-icon icon="plus"/> Ingreso
        </vs-button>
        <vs-button @click="vmMain.toggleTransfer()" type="border" class="tableHeaderItem">
          <font-awesome-icon icon="plus"/> Movimiento entre cuentas
        </vs-button>
      </div> <!-- .tableHeader -->

      <TableHeaderActions
      :vmMain="getThis()"
      :itemsLength="allMovements.length"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      @newItemsPerPage="itemsPerPage = $event"
      @searchInput="search = $event;"
      />

    </div> <!-- header -->



    <!-- SALE TITLES -->
    <template slot="thead">
      <vs-th v-for="(Col,index) in Columns" v-if="!vmMain.isHidden[Col.name]" :class="Col.nowrap == false ? '' : 'nowrap'" :key="index">
        {{ Col.title }}
      </vs-th>
    </template>

    <!-- SALE ITEMS -->
    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in allMovements" class="text-center">
        <!-- id -->
        <vs-td v-if="!vmMain.isHidden.id">
          <vs-chip color="primary">{{ tr.id }}</vs-chip>
        </vs-td>

        <!-- price -->
        <vs-td v-if="!vmMain.isHidden.price">
          <vs-chip class="w-full" :color="(tr.price >= 0) ? 'success':'danger'"> ${{ showPrice(tr.price) }} </vs-chip>
        </vs-td>

        <!-- category -->
        <vs-td v-if="!vmMain.isHidden.category" class="nowrap">
          {{ tr.category }}
        </vs-td>

        <!-- account -->
        <vs-td v-if="!vmMain.isHidden.account">
          <div class="accountName" :style="{ backgroundColor: tr.accountColor }">
            {{ tr.account }}
          </div>
        </vs-td>

        <!-- isPayed -->
        <vs-td v-if="!vmMain.isHidden.state">
          <vs-chip class="w-full" :color="tr.isPayed? 'success' : 'danger'">
            {{ tr.isPayed? 'Si' : 'No' }}
          </vs-chip>
        </vs-td>

        <!-- date -->
        <vs-td v-if="!vmMain.isHidden.date">
          <vx-tooltip :text="getTimeOfDB(tr.datePayment)">
            {{ getDateOfDB(tr.datePayment) }}
          </vx-tooltip>
        </vs-td>
        <!-- dateReal -->
        <vs-td v-if="!vmMain.isHidden.dateReal" class="nowrap">
          <div v-if="tr.dateReal">
            <vx-tooltip :text="getTimeOfDB(tr.datePayment)">
              {{ getDateOfDB(tr.datePayment) }}
            </vx-tooltip>
          </div>
          <div v-else>
            {{ tr.dateReal ? tr.dateReal : 'No pagado' }}
          </div>
        </vs-td>

        <!-- dateCreated -->
        <vs-td v-if="!vmMain.isHidden.dateCreated">
          <vx-tooltip :text="getTimeOfDB(tr.dateCreated)">
            {{ getDateOfDB(tr.dateCreated) }}
          </vx-tooltip>
        </vs-td>

        <!-- descripcion -->
        <vs-td v-if="!vmMain.isHidden.description">
          {{ tr.description	 }}
        </vs-td>

        <!-- paymentType -->
        <vs-td v-if="!vmMain.isHidden.paymentType" :data="tr.paymentType" class="nowrap">
          <vs-chip color="primary">{{tr.paymentType}}</vs-chip>
          <!-- <font-awesome-icon :icon="getPaymentIcon(tr.paymentType)" :class="`payment${tr.paymentTypeID}`" class="centeredInTable"/> -->
          <!-- {{ tr.paymentType }} -->
        </vs-td>

        <!-- currency -->
        <vs-td v-if="!vmMain.isHidden.date">
          <vs-chip color="primary">{{ tr.currency}}</vs-chip>
        </vs-td>

        <!-- Employee -->
        <vs-td v-if="!vmMain.isHidden.employee" class="nowrap">
          <!-- <vs-chip color="primary">{{ getEmployeeName(tr.employeeID) }}</vs-chip> -->
          {{ getEmployeeName(tr.employeeID) }}
        </vs-td>

      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';

export default {
  mixins: [vsTableConfig],

  props: {
    vmMain: { type: Object, required: true, },
    Columns: { type: Array, required: true, },
    allMovements: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
    } // return DATA
  }, // DATA
  created() {
  }, // CREATED
} // export default
</script>

<style lang="scss" scoped>

.accountName {
  width: 100%;
  padding: 5px 10px;
  border-radius: 15px;
  color: black;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
}

</style>
