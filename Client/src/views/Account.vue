<template>
  <div class="mainContent">
    <div class="routeTitle">
        <h2>{{ routeTitle }}</h2>
    </div>
    <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen" style="width: 100%">
      <!-- GENERAL -->
      <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-general />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Cambiar contraseña' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-password />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'Info' : ''">
        <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-info />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-github" :label="!isSmallerScreen ? 'Social Links' : ''">
        <div class="tab-social-links md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-social-links />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-link-2" :label="!isSmallerScreen ? 'Connections' : ''">
        <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-connections />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-bell" :label="!isSmallerScreen ? 'Notifications' : ''">
        <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-notifications />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
export default {
  components: {
    UserSettingsGeneral       : () => import('./components/Account/UserSettingsGeneral.vue'),
    UserSettingsChangePassword: () => import('./components/Account/UserSettingsChangePassword.vue'),
    UserSettingsInfo          : () => import('./components/Account/UserSettingsInfo.vue'),
    UserSettingsSocialLinks   : () => import('./components/Account/UserSettingsSocialLinks.vue'),
    UserSettingsConnections   : () => import('./components/Account/UserSettingsConnections.vue'),
    UserSettingsNotifications : () => import('./components/Account/UserSettingsNotifications.vue'),
  },
  data() {
    return {
      routeTitle: this.$route.meta.pageTitle,
    }; // return DATA
  }, // DATA
  computed: {
    isSmallerScreen() {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
.mainContent {
  padding: 0 30px;
}
</style>
