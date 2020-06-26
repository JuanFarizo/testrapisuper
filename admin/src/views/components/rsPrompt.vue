<template>
  <div class="">
    PRUEBA LIHYKZ
    <vs-popup
    :title="title"
    :active.sync="isActiveLocal"
    >
      <div class="">
        <slot></slot>
        <PromptButtons @accept="finishAction" @cancel="isActiveLocal = false;"/>
      </div>
    </vs-popup>
  </div>
</template>

  <script>
  export default {
    props: {
      title: { type: String, default: '¡Atención!', required: false,  },
      isActive: { type: Boolean, required: true, },
    }, // PROPS
    data() {
      return {
      } // return DATA
    }, // DATA

    computed: {
      isActiveLocal: {
        get(val) {
          console.log(val);
          return this.isActive;
        },
        set(val) {
          if (val) return;
          this.$emit('closePrompt');
        }
      },
    }, // COMPUTED

    created() {
    }, // CREATED

    methods: {
      finishAction() {
        console.log('TERMINO');
      },
    }, // METHODS

  } // export default
  </script>

  <style lang="scss" scoped>
  </style>

</template>
