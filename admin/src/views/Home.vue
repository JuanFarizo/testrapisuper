<template>
  <div>
    <div v-if="!hasAccess">
      <h1>No tenés acceso para ver el resto del contenido, pedile al administrador que te habilite</h1>
    </div>
    <div v-else>
      Estás siendo redirigido a ventas...
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasAccess() {
      if (this._localDB.employeesRoleIDs.Empleado) return false;
      if (!this.checkEmployeeIsWorking()) return false;
      return true;
    },
  }, // COMPUTED
  created() {
    if (this.hasAccess) {
      this.$router.push({ name: 'sales' });
    }
  }, // CREATED
} // export default
</script>

<style lang="scss" scoped>
</style>
