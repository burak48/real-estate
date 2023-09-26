import { createRouter, createWebHistory } from 'vue-router'
import EstateDashboard from '@/components/EstateDashboard.vue'
import EstateAppointments from '@/components/EstateAppointments.vue'
import EstateCreateAppointment from '@/components/EstateCreateAppointment.vue'
import EstateEditAppointment from '@/components/EstateEditAppointment.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EstateDashboard',
      component: EstateDashboard
    },
    {
      path: '/appointments',
      name: 'EstateAppointments',
      component: EstateAppointments
    },
    {
      path: '/create-appointment',
      name: 'EstateCreateAppointment',
      component: EstateCreateAppointment
    },
    {
      path: '/edit-appointment/:id',
      name: 'EstateEditAppointment',
      component: EstateEditAppointment,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
