<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="`Generar código para ${DiscountToAddCode.name}`">
    <div>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="3">
          <vs-input label="Largo" v-model="codeLength" min="0" max="15" type="number" class="inputLine"/>
          <vs-button @click="NewCode.code = getRandomCode(codeLength)"
          title="Generar un código al azar" size="small" class="codeGeneratorIcon ml-2">
            <font-awesome-icon icon="magic"/>
          </vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-w="9">
          <vs-input label="Código" v-model="NewCode.code" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="3">
          <vs-input label="Usos" v-model="NewCode.avaibleUses"
          min="0" type="number" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="9">
          <vs-input label="Comprador" disabled v-model="example" class="inputLine"/>
        </vs-col>
      </vs-row>

      <PromptButtons @accept="checkCode" @cancel="isPromptActiveLocal = false;" acceptText="Generar"/>
    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    DiscountToAddCode: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      example: 'Cualquiera',
      NewCode: this.getNewCode(),
      codeLength: 5,
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
      if (val) {
        this.NewCode = this.getNewCode();
      }
    },
  }, // WATCH

  created() {
  }, // CREATED

  methods: {
    // checkCode
    // addDiscountCode
    // getNewCode
    checkCode() {
      if (this.NewCode.code.length < 5) {
        this.myNotify('warning', 'Atención', 'El código debe tener al menos 5 caracteres');
        return;
      }
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'getDiscountCode', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let allCodes = res.data.data;
          for (let Code of allCodes) {
            if (Code.code == vm.NewCode.code) {
              vm.myNotify('danger', 'Error', 'El código ya existe');
              return;
            }
          }
          vm.addDiscountCode();
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    addDiscountCode() {
      let Params = this.NewCode;
      Params.discountID = this.DiscountToAddCode.id;
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'addDiscountCode', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.myNotify('success', 'Éxito', 'Código creado correctamente')
          vm.isPromptActiveLocal = false;
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    getNewCode() {
      return {
        code: '',
        avaibleUses: 1,
        buyerID: 0,
      }
    },
  }, // METHODS

} // export default
</script>

<style lang="css" scoped>
  .inputLine {
    margin-top: 5px;
    width: 100%;
  }
  .checkbox {
    padding-top: 25px;
  }
  .textarea {
    margin-top: 15px;
  }
  .codeGeneratorIcon {
    padding-left: 16px !important;
    margin-top: 26px;
    font-size: 15px;
  }
</style>
