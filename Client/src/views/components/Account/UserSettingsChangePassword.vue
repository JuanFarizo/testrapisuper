<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base" label-placeholder="Contraseña actual" v-model="old_password" />
    <vs-input class="w-full mb-base" label-placeholder="Contraseña nueva" v-model="new_password" />
    <vs-input class="w-full mb-base" label-placeholder="Confirmar contraseña" v-model="confirm_new_password" />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Guardar</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
  }
}
</script>
