<template>
  <div class="">
    <label>Mes</label>
    <v-select :options="allMonths" label="name" :reduce="name => name.id"
    v-model="selectedMonthLocal" class="monthSelector"/>
  </div>

</template>

<script>
export default {
  name: 'MonthSelector',
  props: {
    selectedMonth: { default: null, },
  },
  data() {
    return {
      allMonths: [
        { id:  null, name: 'Todos', },
        { id:  1, name: 'Enero', },
        { id:  2, name: 'Febrero', },
        { id:  3, name: 'Marzo', },
        { id:  4, name: 'Abril', },
        { id:  5, name: 'Mayo', },
        { id:  6, name: 'Junio', },
        { id:  7, name: 'Julio', },
        { id:  8, name: 'Agosto', },
        { id:  9, name: 'Septiembre', },
        { id: 10, name: 'Octubre', },
        { id: 11, name: 'Noviembre', },
        { id: 12, name: 'Diciembre', },
      ],
    } // return DATA
  }, // DATA
  computed: {
    selectedMonthLocal: {
      get() {
        return this.selectedMonth;
      },
      set(val) {
        this.$emit('changeMonth', val);
      },
    },
  }, // COMPUTED
} // export default
</script>

<style lang="scss" scoped>

.monthSelector {
  width: 200px;
}

</style>
