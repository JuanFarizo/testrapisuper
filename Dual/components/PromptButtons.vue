<template>
  <div style="padding-top: 15px;">
    <vs-divider color="#E5E5E5"/>
    <div class="flex" style="justify-content: flex-end; margin-bottom: 5px; margin-top: 20px; margin-right: 15px;">
      <vs-button v-if="!hideCancel" @click="$emit('cancel')" type="flat" color="danger">
        {{ cancelText }}
      </vs-button>
      <vs-button v-if="!hideAccept" @click="$emit('accept')" type="border" class="ml-2">
        {{ acceptText }}
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromptButtons',
  props: {
    acceptText: { type: String, default: 'Aceptar' },
    cancelText: { type: String, default: 'Cancelar' },
    hideCancel: { type: Boolean, default: false },
    hideAccept: { type: Boolean, default: false },
  }, // PROPS
} // export default
</script>

<style lang="css" scoped>
</style>
