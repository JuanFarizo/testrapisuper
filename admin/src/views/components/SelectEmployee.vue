<template>
  <vs-prompt
  @accept="$emit('selectEmployee', {employeeID, Sale, change})"
  accept-text="Aceptar"
  cancel-text="Cancelar"
  :title="msg"
  :active.sync="isPromptActiveLocal">
    <div class="imgContainer imgContainer-big">
      <img :src="getImg(`employees/${employeeID}.png`)">
    </div>

    Seleccione el trabajador
    <v-select class="w-full" v-model="employeeID" :options="_allEmployees"
    label="fullName" :reduce="name => name.id">
     <!-- :key="`selectEmployee${id}`" -->
    </v-select>
  </vs-prompt>
</template>

<script>
import vSelect from 'vue-select';
export default {
  components: {
    'v-select': vSelect,
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    msg: { type: String, required: false, default: 'Seleccione el personal'},
    Sale: { type: Object, required: false, default: {}, },
    change: { type: Number, required: false, default: +1},
  },
  data() {
    return {
      employeeID: 0,
    }; // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
    isPromptActiveLocal: function(val) {
      if (val) this.employeeID = 0;
    },
    employeeID: function(val) {
      if (val == null) this.employeeID = 0;
    },
  },

  created() {
    // this.loadEmployeeList();
  },
  methods: {
    loadEmployeeList() {
    },
  }, // METHODS
} // export default
</script>

<style lang="css" scoped>
.imgContainer {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
