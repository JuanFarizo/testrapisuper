<template>
  <div>
    Estás siendo redirigido...
  </div>
</template>

<script>
export default {
  created() {
    window.location = this._ExternalLinks.AppIOS;
  }
}
</script>

<style lang="css" scoped>
</style>
