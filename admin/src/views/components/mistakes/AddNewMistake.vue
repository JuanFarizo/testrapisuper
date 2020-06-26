<template>
  <vs-prompt
    title="Nuevo error"
    :active.sync="isPromptActiveLocal"
    @accept="addMistake"
    :accept-text="editingItem ? 'Editar' : 'Crear'"
    cancel-text="Cancelar"
  >
    <div class="con-exemple-prompt">
      <div class="w-full">
        <label class="ml-1">Venta</label>
        <v-select v-model="NewMistake.saleID"
        :reduce="title => title.id" :options="allSales"
        class="w-full" label="title"></v-select>
      </div>
      <div class="w-full mt-2">
        <label class="ml-1">Tipo de error</label>
        <v-select v-model="NewMistake.typeID"
        :reduce="type => type.id" :options="allMistakesTypes"
        class="w-full" label="type"></v-select>
      </div>
      <div class="w-full mt-2">
        <label class="ml-1">Responsable</label>
        <v-select v-model="NewMistake.responsibleEmployeeID"
        :reduce="name => name.id" :options="_allEmployeesAndNone"
        class="w-full" label="fullName"></v-select>
      </div>
      <div class="w-full mt-2">
        <label class="ml-1">Descripción</label>
        <vs-textarea v-model="NewMistake.description" class="w-full"/>
      </div>
    </div>
  </vs-prompt>
</template>

<script>
import vSelect from 'vue-select';

export default {
  components: {
    'v-select': vSelect,
  },
  props: {
    isPromptActive: { type: Boolean, required: true },
    ItemToModify: { type: Object },
    // AllBrands: { type: Array, required: true },
  }, // PROPS

  data() {
    return {
      editingItem: false,
      NewMistake: this.getNewMistake(),
      allSales: [],
      allMistakesTypes: [],
    }; // return DATA
  }, // DATA
  watch: {
    'NewMistake.responsibleEmployeeID': function(val) {
      this.$nextTick(() => {
        if (val == null) this.NewMistake.responsibleEmployeeID = 0;
      })
    },
  },

  computed: {
    isPromptActiveLocal: {
      get() {
        if (this.isPromptActive) this.checkNewOrEdit();
        return this.isPromptActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closePrompt');
        }
      }
    },
  }, // COMPUTED
  created() {
    this.loadAllSales();
    this.loadAllTypes();
  },
  methods: {
    // addMistake
    // addMistakeToList
    // checkNewOrEdit
    // getNewMistake
    // loadAllSales
    // loadAllTypes
    addMistake() {
      if (this.editingItem) {
        this.$emit('deleteItemFromList', this.NewMistake.id);
      }
      let action = !this.editingItem ? 'addMistake' : 'modifyMistake';
      let Params = this.NewMistake;
      Params.mistakeID = Params.id;
      const vm = this;
      this.conectToDB({
        file: 'SaleMistakes', action: action, params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let addText = 'Se ha registrado el error correctamente';
          let modText = 'Se ha modificado el error correctamente';
          vm.myNotify('success', 'Éxito', vm.editingItem ? modText : addText);
          vm.addMistakeToList(vm.editingItem ? vm.NewMistake.id : res.data.data);
        },
      });
    },
    addMistakeToList(mistakeID) {
      let Params = { mistakeID: mistakeID }
      const vm = this;
      this.conectToDB({
        file: 'SaleMistakes', action: 'getMistake', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.$emit('addedNewMistake', res.data.data[0]);
        },
      });
    },
    checkNewOrEdit() {
      this.editingItem = this.ItemToModify == null ? false : true;
      if (this.editingItem) {
        for (let key in this.NewMistake) {
          this.NewMistake[key] = this.ItemToModify[key];
        }
      } else {
        this.NewMistake = this.getNewMistake();
      }
    },
    getNewMistake() {
      return {
        id: 0,
        dateTime: this.getActualDatetimeToDB(),
        typeID: 1,
        stateID: 1,
        saleID: 0,
        description: '',
        responsibleEmployeeID: 0,
      }
    },
    loadAllSales() {
      let Params = {
        hasBuyerEmployeeID: false,
        stateIDMayorOrQualThat: this._localDB.SaleStateIDs.EnCamino,
      }
      const vm = this;
      this.conectToDB({
        file: 'Sales', action: 'getSale', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let fullSales = res.data.data;
          let allSales = [];
          for (let Sale of fullSales) {
            allSales.push({
              id: Sale.id,
              title: `${vm.getDateOfDB(Sale.receptionDate)} - ${Sale.buyerFullName}`
            })
          }
          vm.allSales = allSales;
        },
      });
    },
    loadAllTypes() {
      let Params = {}
      const vm = this;
      this.conectToDB({
        file: 'SaleMistakes', action: 'getMistakesType', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allMistakesTypes = res.data.data;
        },
      });
    },
  }, // METHODS
} // export default
</script>

<style lang="css" scoped>
</style>
