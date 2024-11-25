import { createRouter, createWebHistory } from 'vue-router'
import QuranView from '@/views/QuranView.vue'
import SurahDetail from '@/views/DetailSurahView.vue'
import Solat from '@/views/SolatView.vue'
import Hadist from '@/views/HadistView.vue'
import RamadhanView from '@/views/RamadhanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'QuranView',
      component: QuranView,
    },
    {
      path: '/surah/:id',
      name: 'SurahDetails',
      component: SurahDetail,
    },
    {
      path: '/sholat',
      name: 'Solat',
      component: Solat,
    },
    {
      path: '/hadist',
      name: 'Hadist',
      component: Hadist,
    },
    {
      path: "/ramadhan",
      name: "RamadhanView",
      component: RamadhanView,
    },
  ],
})

export default router
