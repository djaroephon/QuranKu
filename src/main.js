import './assets/main.css'
import 'font-awesome/css/font-awesome.min.css';
import "aos/dist/aos.css";
import AOS from "aos";



AOS.init();


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
