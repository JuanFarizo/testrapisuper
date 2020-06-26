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

    <AddDiscount
    :isEditing="isEditingDiscount"
    :DiscountToEdit="DiscountToEdit"
    :isPromptActive="IsPromptActive.addEditDiscount"
    @closePrompt="IsPromptActive.addEditDiscount = false"
    @addedDiscount="addedDiscount($event)"
    @modifyDiscountDB="modifyDiscountDB($event, true)"
    />

    <CodesList
    :DiscountToAddCode="DiscountToAddCode"
    :isPromptActive="IsPromptActive.codesList"
    @closePrompt="IsPromptActive.codesList = false"
    @openPropmt="IsPromptActive.codesList = true"
    />

    <vs-table ref="table" :data="allDiscounts" pagination :max-items="itemsPerPage" noDataText="No hay descuentos">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="openAddEditPromt()">
            <font-awesome-icon icon="plus"/>
            Nuevo descuento
          </vs-button>
        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="allDiscounts.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event"
        @searchInput="searchDiscount($event)"
        />

      </div> <!-- header -->



      <template slot="thead">
        <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name] && (!Col.onlyMainHouse ? true : isMainHouse())" :class="Col.nowrap == false ? '' : 'nowrap'">
          {{ Col.title }}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <!-- id -->
          <vs-td v-if="!isHidden.id">
            <vs-chip color="primary">{{ tr.id }}</vs-chip>
          </vs-td>
          <!-- newCode -->
          <vs-td v-if="!isHidden.newCode" class="centered">
            <vs-button type="border" @click="openCodeListPrompt(tr)">
              <font-awesome-icon icon="list-ul"/>
            </vs-button>
          </vs-td>
          <!-- edit -->
          <vs-td v-if="!isHidden.edit" class="centered">
            <vs-button type="flat" @click="openAddEditPromt(tr)">
              <font-awesome-icon icon="edit"/>
            </vs-button>
          </vs-td>
          <!-- name -->
          <vs-td v-if="!isHidden.name" class="nowrap">
            {{ tr.name }}
          </vs-td>
          <!-- discountAmount -->
          <vs-td v-if="!isHidden.discountAmount" class="nowrap">
            <span v-if="tr.discountAmount != 0">$ {{ tr.discountAmount }}</span>
            <span v-else class="helpText">Nada</span>
          </vs-td>
          <!-- discountPercentaje -->
          <vs-td v-if="!isHidden.discountPercentaje" class="nowrap">
            <span v-if="tr.discountPercentaje != 0">{{ tr.discountPercentaje }} %</span>
            <span v-else class="helpText">Nada</span>
          </vs-td>
          <!-- discountPercentajeMax -->
          <vs-td v-if="!isHidden.discountPercentajeMax" class="nowrap">
            <span v-if="tr.discountPercentaje != 0">$ {{ tr.discountPercentajeMax }}</span>
            <span v-else class="helpText">Nada</span>
          </vs-td>
          <!-- description -->
          <vs-td v-if="!isHidden.description">
            {{ tr.description }}
          </vs-td>
          <!-- discountOverID -->
          <vs-td v-if="!isHidden.discountOverID">
            <vs-chip>{{ tr.discountOverID }}</vs-chip>
          </vs-td>
          <!-- datetimeCreated -->
          <vs-td v-if="!isHidden.datetimeCreated">
            <vx-tooltip :text="getTimeOfDB(tr.datetimeCreated)">
              {{ getDateOfDB(tr.datetimeCreated) }}
            </vx-tooltip>
          </vs-td>
          <!-- datetimeStart -->
          <vs-td v-if="!isHidden.datetimeStart">
            <span v-if="tr.datetimeStart == emptyDatetime" class="helpText">No tiene</span>
            <vx-tooltip v-else :text="getTimeOfDB(tr.datetimeStart)">
              <span class="date dateStart" :class="getDateClass(tr)">
                {{ getDateOfDB(tr.datetimeStart) }}
              </span>
            </vx-tooltip>
          </vs-td>
          <!-- datetimeEnd -->
          <vs-td v-if="!isHidden.datetimeEnd">
            <span v-if="tr.datetimeEnd == emptyDatetime" class="helpText">No tiene</span>
            <vx-tooltip v-else :text="getTimeOfDB(tr.datetimeEnd)">
              <span class="date dateEnd" :class="getDateClass(tr)">
                {{ getDateOfDB(tr.datetimeEnd) }}
              </span>
            </vx-tooltip>
          </vs-td>
          <!-- delete -->
          <vs-td v-if="!isHidden.delete" class="centered">
            <vs-button type="flat" color="danger" @click="deleteDiscount(tr.id)">
              <font-awesome-icon icon="trash"/>
            </vs-button>
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
  components: {
    AddDiscount: () => import('./components/discounts/AddDiscount.vue'),
    CodesList: () => import('./components/discounts/CodesList.vue'),
  },
  data() {
    return {
      IsPromptActive: {
        columnsManager: false,
        addEditDiscount: false,
        codesList: false,
        addCode: false,
      },
      DiscountToEdit: {},
      DiscountToAddCode: {},
      allDiscounts: [],
      isEditingDiscount: false,
      search: '',

      Columns: [
        { name: 'id',                    title: 'ID', },
        { name: 'newCode',               title: 'Nuevo código', nowrap: false, },
        { name: 'edit',                  title: 'Editar', },
        { name: 'name',                  title: 'Nombre', },
        { name: 'discountAmount',        title: 'Valor descuento', nowrap: false, },
        { name: 'discountPercentaje',    title: 'Porcentaje descuento', nowrap: false, },
        { name: 'discountPercentajeMax', title: 'Máximo descuento', nowrap: false, },
        { name: 'description',           title: 'Descripción', },
        { name: 'discountOverID',        title: 'ID descuentro sobre', nowrap: false, },
        { name: 'datetimeCreated',       title: 'Fecha creación', },
        { name: 'datetimeStart',         title: 'Fecha inicio', },
        { name: 'datetimeEnd',           title: 'Fecha fin', },
        { name: 'delete',                title: 'Eliminar', },
      ],
      selectedProfile: 1,
      Profiles: [
        /* 00 - Testing */ [],
        /* 01 - Admin */ [ 'id', 'discountOverID', 'datetimeCreated', ],
        /* 02 - Sub admin */ [ 'id', 'discountOverID', 'datetimeCreated', ],
        /* 03 - Gestión */ [ ],
        /* 04 - Ventas */ [ ],
      ],
    } // return DATA
  }, // DATA
  created() {
    this.loadAllDiscounts();
  },
  methods: {
    // addedDiscount
    // deleteDiscount
    // getDateClass
    // loadAllDiscounts
    // modifyDiscountDB
    // openAddEditPromt
    // openCodeListPrompt
    // replaceDiscountInList
    // searchDiscount
    addedDiscount(discountID) {
      let Params = {
        discountID,
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'getDiscount', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let NewDiscount = res.data.data[0];
          console.log('NewDiscount', NewDiscount);
          vm.allDiscounts.unshift(NewDiscount);
        },
      });
    },
    deleteDiscount(discountID) {
      let index = this.allDiscounts.findIndex(i => i.id == discountID);
      if (index != -1) this.allDiscounts.splice(index, 1);
      let Params = {
        discountID,
        isActive: 0,
      }
      this.modifyDiscountDB(Params);
    },
    getDateClass(Discount) {
      let now = this.getActualDatetimeToDB();
      if (Discount.datetimeStart != this.emptyDatetime) {
        if (Discount.datetimeStart > now) return 'fail';
      }
      if (Discount.datetimeEnd != this.emptyDatetime) {
        if (Discount.datetimeEnd < now) return 'fail';
      }
      return 'ok';
    },
    loadAllDiscounts() {
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
        search: this.search,
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'getDiscount', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('allDiscounts', res.data.data);
          vm.allDiscounts = res.data.data;
        },
      });
    },
    modifyDiscountDB(ParamsOriginal, addIt) {
      let Params = this.copyObj(ParamsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'modifyDiscount', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let action = Params.isActive ? 'modificado' : 'eliminado';
          console.log(`Descuento ${action} ID: ${Params.discountID}`);
          vm.myNotify('success', 'Éxito', `Descuento ${ action } correctamente`);
          if (addIt) vm.replaceDiscountInList(Params.discountID);
        },
      });
    },
    openAddEditPromt(Discount = null) {
      if (Discount != null) {
        this.isEditingDiscount = true;
        this.DiscountToEdit = Discount;
      } else {
        this.isEditingDiscount = false;
        this.DiscountToEdit = {};
      }
      this.IsPromptActive.addEditDiscount = true;
    },

    openCodeListPrompt(Discount) {
      this.IsPromptActive.codesList = true;
      this.DiscountToAddCode = Discount;
    },

    replaceDiscountInList(discountID) {
      let Params = {
        discountID: discountID,
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'getDiscount', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Discount = res.data.data[0];
          let index = vm.allDiscounts.findIndex(i => i.id == Params.discountID);
          if (index != -1) vm.allDiscounts.splice(index, 1, Discount);
        },
      });
    },
    searchDiscount(search) {
      this.search = search;
      this.loadAllDiscounts();
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.date {
  background-color: #DDD;
  padding: 5px 15px;
  border-radius: 3px
}
.dateEnd {
  border-top-right-radius:    15px;
  border-bottom-right-radius: 15px;
}
.dateStart {
  border-top-left-radius:    15px;
  border-bottom-left-radius: 15px;
}
.date.ok { background-color: #2ECC40; color: #0E3E14; }
.date.fail { background-color: #15B0CE; color: white; }

</style>
