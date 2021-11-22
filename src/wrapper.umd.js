// Import vue component
import VImageMarker from './vue-image-marker.vue';
import VMarker from './vue-marker.vue';

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('v-image-marker', VImageMarker);
    Vue.component('v-marker', VMarker);
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}
VImageMarker.install = install;
VMarker.install = install;
// To allow use as module (npm/webpack/etc.) export component
export default VImageMarker