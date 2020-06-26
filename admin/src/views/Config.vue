<template>
  <div>
    <vs-card class="p-5">
      <!-- isStoreOpen -->
      <div class="configItem" style="position: relative;">
        <div style="position: absolute; top: 2px;">
          <vs-switch v-model="BranchLocal.isStoreOpen"/>
        </div>
        <h3 style="margin-left: 50px;">Local abierto hoy</h3>
      </div>
      <!-- usesStock -->
      <div class="configItem" style="position: relative;">
        <div style="position: absolute; top: 2px;">
          <vs-switch v-model="BranchLocal.usesStock"/>
        </div>
        <h3 style="margin-left: 50px;">Usa sistema de stock</h3>
      </div>
      <!-- isStockWorking -->
      <div v-if="BranchLocal.usesStock" class="configItem"
      style="position: relative; margin-left: 50px; margin-top: 10px;">
        <div style="position: absolute; top: 2px;">
          <vs-switch v-model="BranchLocal.isStockWorking"/>
        </div>
        <h3 style="margin-left: 50px;">Stock funcionando</h3>
      </div>
      <!-- minimumPurchase -->
      <div class="configItem">
        <vs-input type="number" v-model="BranchLocal.minimumPurchase" label="Compra mínima"/>
      </div>
      <!-- address -->
      <div class="configItem address">
        <vs-input type="text" v-model="BranchLocal.address" label="Dirección del local" style="display: inline-block;"/>
        <div class="citySelector">
          <label class="labelVselect">Ciudad</label>
          <v-select :options="_allCities" label="name"
          v-model="BranchLocal.cityID" :reduce="City => City.id" :clearable="false"/>
        </div>
      </div>
      <!-- headerMsg -->
      <div class="configItem">
        <h3>Mensaje barra superior</h3>
        <vs-textarea v-model="BranchLocal.headerMsg" class="mt-2"/>
      </div>

      <!-- save -->
      <div class="mt-5">
        <vs-divider/>
        <vs-button class="block ml-auto" @click="modifyBranch()">
          Guardar cambios
        </vs-button>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      antiRepeatCounter: 0,
      BranchLocal: {
        usesStock: false,
        isStoreOpen: true,
        isStockWorking: true,
        headerMsg: '',
        minimumPurchase: 0,
        address: '',
        city: '',
        cityID: 0,
      },
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
  created() {
    this.copyDataToLocal();
  }, // CREATED
  methods: {
    // copyDataToLocal
    // modifyBranch
    copyDataToLocal() {
      let Branch = this._Branch;
      for (let key in this.BranchLocal) {
        this.BranchLocal[key] = Branch[key];
      }
    },
    modifyBranch() {
      // fix double call
      // if (this.antiRepeatCounter++ % 2 != 0) return;
      if (!confirm('Estás seguro que querés guardar los cambios? Esto provocará cambios importantes!')) return;
      // modifyDB
      let Params = this.BranchLocal;
      Params.branchID = 1;
      // console.log(Params);
      const vm = this;
      this.conectToDB({
        file: 'Branches', action: 'modifyBranch', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.myNotify('success', 'Éxito', 'Se modificó correctamente');
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

  .configItem {
    width: 100%;
    margin-top: 30px;
  }
  .citySelector {
    display: inline-block;
    margin-left: 15px;
    min-width: 200px;
  }
  .citySelector /deep/ div {
    padding-bottom: 5px;
    height: 38px;
  }
  .address {
    display: flex;
    align-items: flex-end;
  }

</style>
