import { createApp } from 'vue'
import './style.css'
import router from './assets/routes'
import App from './App.vue'

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

// Add the "About" (info) icon
library.add(faInfoCircle)

const app = createApp(App)

// Register Font Awesome globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router).mount('#app')