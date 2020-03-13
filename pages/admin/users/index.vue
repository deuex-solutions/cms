<template>
  <div 
    class="md-layout md-alignment-center-center" 
    style="margin: 4em 0;">
    <!-- Top Navigation -->
    <NavigationBar/>
    <div class="md-layout-item md-size-95">
      <md-content 
        class="md-layout md-gutter" 
        style="background: #007998; padding: 1em;">
        Users Listing
      </md-content>
    </div>
  </div>
</template>
<script>
import NavigationBar from '~/components/common/NavigationBar'

export default {
  name: 'UserListing',
  middleware: 'auth',
  components: {
    NavigationBar
  },
  methods: {}
}
</script>
