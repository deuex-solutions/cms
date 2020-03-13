<template>
  <md-button 
    :class="!!data.menuIcon ? 'md-icon-button' : undefined"
    :to="data.targetLink"
    md-menu-trigger
  >
    <md-icon v-if="!!data.menuIcon">{{ data.menuIcon }}</md-icon>
    <template v-if="!!data.menuName">{{ data.menuName }}</template>
  </md-button>
</template>

<script>
export default {
  name: 'NavBarButton',
  props: {
    data: { type: Object, default: () => ({}) }
  }
}
</script>
