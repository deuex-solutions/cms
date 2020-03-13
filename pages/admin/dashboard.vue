<template>
  <div 
    class="md-layout md-alignment-center-center" 
    style="margin: 4em 0;">
    <!-- Top Navigation -->
    <md-toolbar 
      class="fixed-toolbar" 
      elevation="1">
      <nuxt-link 
        class="md-primary md-title" 
        to="/">
        CMS
      </nuxt-link>

      <div class="md-toolbar-section-end">
        <md-menu 
          :md-close-on-select="true" 
          md-size="auto"
          md-align-trigger>
          <md-button 
            class="md-icon-button" 
            md-menu-trigger>
            <md-icon>person</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item to="/">My Account</md-menu-item>
            <md-menu-item>Preferences</md-menu-item>
            <md-menu-item @click="logoutUser">Logout</md-menu-item>
          </md-menu-content>
        </md-menu>

      </div>
    </md-toolbar>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  middleware: 'auth',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  watch: {
    isAuthenticated(value) {
      if (!value) {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>
<style scoped>
.fixed-toolbar {
  position: fixed;
  top: 0;
  z-index: 5;
}
</style>
