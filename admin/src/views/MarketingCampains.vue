<template>
  <div class="">
    <vs-table :data="allCampains">
    <template slot="header">
      <!-- Columns Manager -->
      <vs-button color="primary" type="filled" class="columnsManagerBtn" @click="manageColumns()">
        <font-awesome-icon icon="columns"/>
      </vs-button>

    </template>
    <template slot="thead">
      <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name] && (!Col.onlyMainHouse ? true : isMainHouse())" :class="Col.nowrap == false ? '' : 'nowrap'">
        {{ Col.title }}
      </vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
        <!-- id -->
        <vs-td v-if="!isHidden.id">
          <vs-chip>{{ tr.id }}</vs-chip>
        </vs-td>
        <!-- mediaID -->
        <vs-td v-if="!isHidden.mediaID">
          <vs-chip>{{ tr.mediaID }}</vs-chip>
        </vs-td>
        <!-- mediaName -->
        <vs-td v-if="!isHidden.mediaName" class="nowrap">
          {{ tr.mediaName }}
        </vs-td>
        <!-- mediaManagerName -->
        <vs-td v-if="!isHidden.mediaManagerName" class="nowrap">
          {{ tr.mediaManagerName }}
        </vs-td>
        <!-- medidaType -->
        <vs-td v-if="!isHidden.medidaType" class="nowrap">
          {{ tr.medidaType }}
        </vs-td>
        <!-- monthlyPayment -->
        <vs-td v-if="!isHidden.monthlyPayment" class="nowrap">
          $ {{ tr.monthlyPayment }}
        </vs-td>
        <!-- startDate -->
        <vs-td v-if="!isHidden.startDate">
          {{ getDateOfDB(tr.startDate) }}
        </vs-td>
        <!-- finishDate -->
        <vs-td v-if="!isHidden.finishDate" class="nowrap">
          <span v-if="tr.finishDate != emptyDate">{{ getDateOfDB(tr.finishDate) }}</span>
          <span v-else class="helpText">* No hay finalizado *</span>
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
  </div>
</template>

<script>
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  mixins: [vsTableConfig],
  data() {
    return {
      allCampains: [],

      Columns: [
        { name: 'id',               title: 'ID', },
        { name: 'mediaID',          title: 'ID Medio', },
        { name: 'mediaName',        title: 'Medio', },
        { name: 'mediaManagerName', title: 'Responsable del Medio', },
        { name: 'medidaType',       title: 'Tipo de Medio', },
        { name: 'monthlyPayment',   title: 'Pago mensual', nowrap: false, },
        { name: 'startDate',        title: 'Fecha inicio', },
        { name: 'finishDate',       title: 'Fecha fin', },
      ],

      selectedProfile: 1,
      Profiles: [
        /* 00 - Testing */ [],
        /* 01 - Admin */ [ 'id', 'mediaID', ],
        /* 02 - Sub admin */ [ 'id', 'mediaID', ],
        /* 03 - Gestión */ [ ],
        /* 04 - Ventas */ [ ],
      ],
    } // return DATA
  }, // DATA
  created() {
    this.loadAllCampains();
  },
  methods: {
    loadAllCampains() {
      let Params = {
        branchID: this.getBranchID(),
      }
      const vm = this;
      this.conectToDB({
        file: 'Marketing', action: 'getMarketingCampain', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('allCampains', res.data.data);
          vm.allCampains = res.data.data;
        },
      });
    },
  }, // METHODS
} // export default
</script>

<style lang="css" scoped>
</style>
