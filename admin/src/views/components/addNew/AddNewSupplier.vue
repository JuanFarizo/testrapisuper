<template lang="html">
  <vs-prompt
    title="Nuevo proveedor"
    :active.sync="isPromptActiveLocal"
    @accept="createSupplier"
    @close="closePrompt"
    @cancel="closePrompt"
    accept-text="Crear"
    cancel-text="Cancelar"
  >
    <div class="con-exemple-prompt">
      <div class="w-full">
        <label>Nombre</label>
        <vs-input v-model="NewSupplier.name" class="w-full"/>
      </div>
      <div class="w-full">
        <label>Ciudad</label>
        <vs-input v-model="NewSupplier.city" class="w-full"/>
      </div>
      <div class="mt-3 w-full">
        <label>Email</label>
        <vs-input v-model="NewSupplier.email" class="w-full"/>
      </div>
      <div class="mt-3 w-full">
        <label>Teléfono</label>
        <vs-input v-model="NewSupplier.phone" class="w-full"/>
      </div>
      <div class="mt-3 w-full">
        <label>Dirección</label>
        <vs-input v-model="NewSupplier.address" class="w-full"/>
      </div>
      <div class="mt-3 w-full">
        <label>Info extra</label>
        <vs-input v-model="NewSupplier.extraInfo" class="w-full"/>
      </div>
      <div class="mt-3 w-full pos-relative">
        <label>Comisión en porcentaje</label>
        <div class="percentageIcon">%</div>
        <vs-input v-model="NewSupplier.percentageCharge" class="w-full" @input="NewSupplier.percentageCharge = removeNoNumber(NewSupplier.percentageCharge, true)"/>
      </div>
      <div class="mt-3 w-full pos-relative">
        <label>Comisión fija</label>
        <div class="dolarIcon">$</div>
        <vs-input v-model="NewSupplier.fixedCharge" class="w-full" @input="NewSupplier.fixedCharge = removeNoNumber(NewSupplier.fixedCharge, true)"/>
      </div>
    </div>
  </vs-prompt>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    'v-select': vSelect,
  },
  props: {
    isPromptActive: {
      type: Boolean,
      required: true
    },
    AllSuppliers: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      NewSupplier: this.getNewSupplier(),
    };
  },
  computed: {
    'NewSupplier.label': function() {
      return this.NewSupplier.name;
    },
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive
      },
      set(val) {
        this.$emit('closePrompt', '');
      }
    },
  },
  methods: {
    // cleanData
    // closePrompt
    // createSupplier
    // getNewSupplier
    cleanData() {
      this.NewSupplier = this.getNewSupplier();
    },
    closePrompt() {
      this.cleanData();
      this.isPromptActiveLocal = false;
    },
    createSupplier() {
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'createSupplier', params: this.NewSupplier,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Proveedor '+ vm.NewSupplier.name +' creado');
          vm.myNotify('success', '¡Éxito!',  'Proveedor <b>'+ vm.NewSupplier.name +'</b> creado con éxito')
          // Add to array
          vm.NewSupplier.id = res.data.data;
          vm.NewSupplier.isNew = true;
          // vm.NewSupplier.fixedCharge = vm.NewSupplier.fixedCharge == '' ? 0 : vm.NewSupplier.fixedCharge;
          // vm.NewSupplier.percentageCharge = vm.NewSupplier.percentageCharge == '' ? 0 : vm.NewSupplier.percentageCharge;
          vm.$emit('addedNewSupplier', vm.NewSupplier);
          vm.cleanData();
        },
      });
    },
    getNewSupplier() {
      return {
        id              : 0,
        name            : '',
        city            : '',
        email           : '',
        phone           : '',
        address         : '',
        extraInfo       : '',
        fixedCharge     : '',
        percentageCharge: '',
      }
    },
  } // METHODS
}
</script>




<style>
.percentageIcon {
  right: 2px;
}
.dolarIcon {
  left: 2px;
}
.dolarIcon,
.percentageIcon {
  position: absolute;
  z-index: 1;
  font-size: 14px;
  top: 30px;
}
</style>
