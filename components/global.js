import Vue from 'vue'

const requireComponent = require.context(
  './common', // The relative path of the components folder
  true, // Whether or not to look in subfolders
  /.vue/i // The regular expression used to match base component filenames
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = fileName
    .split('/')
    .pop() // Get last part - filename
    .replace(/\.\w+$/, '') // Removes .vue

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
