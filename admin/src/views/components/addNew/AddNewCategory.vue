<template lang="html">
  <vs-prompt
    title="Nueva categoría"
    :active.sync="isPromptActiveLocal"
    @accept="createCategory"
    accept-text="Crear"
    cancel-text="Cancelar"
  >
    <div class="con-exemple-prompt">
      <div class="w-full">
        <label>Nombre</label>
        <vs-input v-model="NewCategoryLocal.name" class="w-full"/>
      </div>
      <div class="mt-3 w-full" v-if="NewCategory.isDefault">
        <label>Categoría padre</label>
        <v-select
          label="name"
          class="w-full"
          v-model="SelectedParent"
          :options="AllCategoriesLocal"
        >
        </v-select>
      </div>
      <!-- <div class="mt-3 w-full" v-if="NewCategory.isDefault">
        <label>Visible</label>
        <vs-switch v-model="NewCategoryLocal.isShowed"/>
      </div> -->
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
    isPromptActive: { type: Boolean, required: true, },
    AllCategories: { type: Array, required: false, },
    NewCategory: { type: Object, required: false,
      default: function () {
        return { parentID: 0, name: '', isDefault: false, hasSons: false, isHidden: false,  }
      },
    },
  }, // PROPS
  data() {
    return {
      SelectedParent: null,
      NewCategoryLocal: [],
    };
  },
  watch: {
    SelectedParent: function(Parent) {
      if (Parent == null) return;
      this.NewCategoryLocal.parentID = Parent.id;
    },
  },
  created() {
    this.NewCategoryLocal = this.NewCategory;
  },
  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive
      },
      set(val) {
        this.$emit('closePrompt');
      },
    },
    AllCategoriesLocal: {
      get() {
        let newArray = [];
        for (let i = 0; i < this.AllCategories.length; i++) {
          newArray.push(this.AllCategories[i]);
        }
        newArray.shift();
        return newArray;
      },
    },
  },
  methods: {
    createCategory() {
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'addCategory', params: this.NewCategoryLocal,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let NewCat = vm.copyObj(vm.NewCategoryLocal);
          console.log('Categoría '+ NewCat.name +' creada');
          vm.myNotify('success', '¡Éxito!',  'Categoría <b>'+ NewCat.name +'</b> creada con éxito')
          // Add to array
          vm.$set(NewCat, 'id', res.data.data);
          vm.$set(NewCat, 'isNew', true);
          // vm.AllCategories.push(NewCat);
          vm.$emit('addedNewCategory', NewCat);
        },
      });
    },
  }
}
</script>
