<template>
  <div class="tt-desctop-parent-account tt-parent-box">
    <div class="tt-account tt-dropdown-obj">
      <!-- <router-link :to="{ name: 'account' }" tag="button" class="tt-dropdown-toggle" data-tooltip="Mi Cuenta" data-tposition="bottom">
        <font-awesome-icon icon="user" class="secondaryColor"/>
      </router-link> -->
      <div class="tt-dropdown-menu">
        <div class="tt-mobile-add">
          <button class="tt-close">Close</button>
        </div>
        <div class="tt-dropdown-inner">
          <ul>
            <li><a href="account.php"><i class="icon-f-94"></i>Cuenta</a></li>
            <li><a href="login.php"><i class="icon-f-76"></i>Log In</a></li>
            <li><a href="register.php"><i class="icon-f-94"></i>Registro</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
