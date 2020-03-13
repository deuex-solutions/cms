<template>
  <md-menu 
    :md-close-on-select="true" 
    md-size="auto" 
    md-align-trigger
  >
    <NavBarButton 
      :data="data"
    />
    <md-menu-content>
      <md-menu-item 
        v-for="(subMenu, j) in data.child" 
        :key="j"
        :to="!!subMenu.targetLink ? subMenu.targetLink : undefined"
        @click="subMenu.action === 'logout' ? logoutUser() : undefined"
      >
        <md-icon v-if="!!subMenu.menuIcon">{{ subMenu.menuIcon }}</md-icon>
        <template v-if="!!subMenu.menuName">{{ subMenu.menuName }}</template>
      </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>

<script>
import NavBarButton from './NavBarButton'

export default {
  name: 'NavBarMenu',
  components: {
    NavBarButton
  },
  props: {
    data: { type: Object, default: () => ({}) }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>
