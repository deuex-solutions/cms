<template>
  <md-toolbar 
    class="fixed-toolbar" 
    elevation="1">

    <!-- LHS - Title & Logo -->
    <nuxt-link 
      :to="NavigationBarData.titleData.titleLink" 
      class="md-primary md-title">
      {{ NavigationBarData.titleData.titleName }}
    </nuxt-link>

    <!-- LHS Action Buttons -->
    <div 
      v-if="NavigationBarData.leftMenuList.length">
      <template 
        v-for="(menu, i) in NavigationBarData.leftMenuList" >
        <NavBarButton 
          v-if="!menu.child" 
          :data="menu"
          :key="i" />
        <NavBarMenu 
          v-else 
          :key="i"
          :data="menu" />
      </template>
    </div>

    <!-- RHS Action Buttons -->
    <div 
      v-if="NavigationBarData.rightMenuList.length" 
      class="md-toolbar-section-end">
      <template 
        v-for="(menu, i) in NavigationBarData.rightMenuList" >
        <NavBarButton 
          v-if="!menu.child" 
          :data="menu"
          :key="i" />
        <NavBarMenu 
          v-else 
          :key="i"
          :data="menu" />
      </template>
    </div>
  </md-toolbar>
</template>

<script>
import NavBarButton from './NavBarButton'
import NavBarMenu from './NavBarMenu'

import { NavigationBarData } from '~/utils/constants'

export default {
  name: 'NavigationBar',
  components: {
    NavBarButton,
    NavBarMenu
  },
  data: () => ({
    NavigationBarData
  }),
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
