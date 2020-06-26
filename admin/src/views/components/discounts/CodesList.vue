<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="`Códigos de ${DiscountToAddCode.name}`">
    <div>

      <AddCode
      :DiscountToAddCode="DiscountToAddCode"
      :isPromptActive="IsPromptActiveInner.addCode"
      @closePrompt="IsPromptActiveInner.addCode = false; $emit('openPropmt');"
      />

      <vs-table ref="table" :data="allCodes" pagination :max-items="itemsPerPage" noDataText="No hay códigos" search>
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between" style="padding-bottom: 14px;">
          <div class="flex flex-wrap-reverse items-center">
            <vs-button class="mr-1" color="primary" type="border"
            @click="openCodeListPrompt()">
              <font-awesome-icon icon="plus"/>
              Nuevo código
            </vs-button>
          </div>

          <items-per-page :itemsLength="allCodes.length" :currentPage ="currentPage" :itemsPerPage ="itemsPerPage"/>
        </div> <!-- header -->



        <template slot="thead">
          <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name]" :class="Col.nowrap == false ? '' : 'nowrap'">
            {{ Col.title }}
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <!-- id -->
            <vs-td v-if="!isHidden.id">
              <vs-chip>{{ tr.id }}</vs-chip>
            </vs-td>
            <!-- avaibleUses -->
            <vs-td v-if="!isHidden.avaibleUses" class="nowrap autoWidth">
              <vs-chip :color="tr.avaibleUses > 0 ? 'success' : 'danger'">{{ tr.avaibleUses }}</vs-chip>
            </vs-td>
            <!-- code -->
            <vs-td v-if="!isHidden.code" class="nowrap">
              {{ tr.code }}
            </vs-td>
            <!-- buyer ID -->
            <vs-td v-if="!isHidden.buyerID" class="nowrap autoWidth">
              <vs-chip color="primary">{{ tr.buyerID }}</vs-chip>
            </vs-td>
            <!-- buyer -->
            <vs-td v-if="!isHidden.buyer" class="nowrap">
              <span v-if="tr.buyerID == 0" class="helpText">Cualquiera</span>
              <span v-else>{{ tr.buyer }}</span>
            </vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.delete" class="centered autoWidth">
              <vs-button type="flat" color="danger" @click="deleteCode(tr.id)">
                <font-awesome-icon icon="trash"/>
              </vs-button>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </div>
  </vs-popup>
</template>

<script>
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  mixins: [vsTableConfig],
  components: {
    AddCode: () => import('./AddCode.vue'),
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    DiscountToAddCode: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      Columns: [
        { name: 'id',          title: 'ID', },
        { name: 'avaibleUses', title: 'Usos', },
        { name: 'code',        title: 'Código', },
        { name: 'buyerID',       title: 'ID Comprador', },
        { name: 'buyer',       title: 'Comprador', },
        { name: 'delete',      title: 'Eliminar', },
      ],
      IsPromptActiveInner: { columnsManager: false, addCode: false, },
      allCodes: [],

      selectedProfile: 1,
      Profiles: [
        /* 00 - Testing */ [],
        /* 01 - Admin */ [ 'id', 'buyerID', ],
        /* 02 - Sub admin */ [ 'id', 'buyerID', ],
        /* 03 - Gestión */ [ ],
        /* 04 - Ventas */ [ ],
      ],

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
      this.loadAllCodes();
    },
  }, // WATCH
  created() {
  }, // CREATED
  methods: {
    // deleteCode
    // loadAllCodes
    // modifyCodeDB
    // openCodeListPrompt
    deleteCode(codeID) {
      console.log(codeID);
      let index = this.allCodes.findIndex(i => i.id == codeID);
      if (index != -1) this.allCodes.splice(index, 1);
      let Params = {
        codeID,
        isActive: 0,
      }
      this.modifyCodeDB(Params);
    },
    loadAllCodes() {
      let Params = {
        discountID: this.DiscountToAddCode.id,
        isActive: 1,
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'getDiscountCode', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('allCodes', res.data.data);
          vm.allCodes = res.data.data;
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },

    modifyCodeDB(ParamsOriginal) {
      let Params = this.copyObj(ParamsOriginal);
      console.log(Params);
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'modifyDiscountCode', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let action = Params.isActive ? 'modificado' : 'eliminado';
          console.log(`Código ${action} ID: ${Params.codeID}`);
          vm.myNotify('success', 'Éxito', `Código ${ action } correctamente`);
          // if (addIt) vm.replaceDiscountInList(Params.codeID);
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },

    openCodeListPrompt() {
      this.isPromptActiveLocal = false;
      this.IsPromptActiveInner.addCode = true;
    },

  }, // METHODS
} // export default
</script>

<style lang="css" scoped>
</style>
