// Import Vue
import { createApp } from 'vue'
// Import Pinia
import { createPinia } from 'pinia'
// Import Ress
import 'ress'
// Import Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// // Import Leaflet Styles
import 'leaflet/dist/leaflet.css'
// Import App
import App from './App.vue'
// Create App
const app = createApp(App)
// Use Libraries
app.use(createPinia())
app.use(createVuetify({ components, directives }))
// Mount App
app.mount('#app')
