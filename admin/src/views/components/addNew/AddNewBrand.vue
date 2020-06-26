<template lang="html">
  <vs-prompt
    title="Nueva Marca"
    :active.sync="isPromptActiveLocal"
    @accept="createBrand"
    @close="closePrompt"
    @cancel="closePrompt"
    accept-text="Crear"
    cancel-text="Cancelar"
  >
    <div class="con-exemple-prompt">
      <div class="w-full">
        <label>Nombre</label>
        <vs-input v-model="NewBrand.name" class="w-full"
        ref="newBrandInput"/>
      </div>
    </div>
  </vs-prompt>
</template>




<!-- - - - - - - - - - - - - - - - SCRIPT - - - - - - - - - - - - - - - -->
<script>
export default {
  props: {
    isPromptActive: {
      type: Boolean,
      required: true
    },
    AllBrands: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      NewBrand: this.getNewBrand(),
    };
  },
  computed: {
    'NewBrand.label': function() {
      return this.NewBrand.name;
    },
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePrompt');
      }
    },
  },
  watch:{
    isPromptActiveLocal(val) {
      if (val) {
        this.setFocusVsInput('newBrandInput');
      }
    },
  },
  methods: {
    // cleanData
    // closePrompt
    // createBrand
    // getNewBrand
    cleanData() {
      this.NewBrand = this.getNewBrand();
    },
    closePrompt() {
      this.cleanData();
      this.isPromptActiveLocal = false;
    },
    createBrand() {
      const vm = this;
      this.conectToDB({
        file: 'Brands', action: 'addBrand', params: this.NewBrand,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Marca '+ vm.NewBrand.name +' creada');
          vm.myNotify('success', '¡Éxito!',  'Marca <b>'+ vm.NewBrand.name +'</b> creada con éxito');
          // Add to array
          vm.NewBrand.id = res.data.data,
          vm.$emit('addedNewBrand', vm.NewBrand);
          vm.cleanData();
        },
      });
    },
    getNewBrand() {
      return {
        id: 0,
        name: '',
        isShowed: 1,
        isActive: 1,
        isNew: 1,
      }
    },
  } // METHODS
}
</script>
