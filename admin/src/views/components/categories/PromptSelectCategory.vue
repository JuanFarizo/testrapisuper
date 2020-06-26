<template>
  <div>
    <vs-prompt title="Seleccionar categoría" button-accept="border"
    accept-text="Aceptar" cancel-text="Cancelar" :active.sync="isPromptActiveLocal"
    @accept="selectCategory()" @cancel="selectedCategory = {}">
      <vs-select v-model="selectedCategory" label="Categorías" class="w-full">
        <vs-select-item :value="{}" text="" :key="0"/>
        <vs-select-item v-for="Cat in categories" :value="Cat" :text="Cat.name" :key="Cat.id"/>
      </vs-select>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array, required: true, },
    isPromptActive: { type: Boolean, required: true, },
  }, // PROMPS
  data() {
    return {
      selectedCategory: {},
    }; // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        if (this.isPromptActive) {
          this.selectedCategory = {};
        }
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED
  methods: {
    selectCategory() {
      if (Object.entries(this.selectedCategory).length) {
        this.$emit('selectCategory', this.selectedCategory);
      }
    },
  }, // METHODS
} // export default
</script>

<style lang="css" scoped>
</style>
