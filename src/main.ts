import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


import App from './App.vue'
import router from './router'

const pinia = createPinia();

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        aliases: {
            account: 'mdi-account',
            lock: 'mdi-lock'
        },
    },
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
