import Vue from 'vue'
import VueImageMarker from '../src/vue-image-marker.vue'
import VueMarker from '../src/vue-marker.vue'

import App from './app.vue'

Vue.component('VImageMarker', VueImageMarker)
Vue.component('VMarker', VueMarker)

Vue.component('App', App)


let app = new Vue({
  el: '#app',
  render: h => h('App')
})

console.log(app);