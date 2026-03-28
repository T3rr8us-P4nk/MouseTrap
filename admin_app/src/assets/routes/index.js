import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../components/views/Home.vue'
import Dashboard from '../../components/views/dashboard/dashboard.vue'
import deviceDashboard from '../../components/views/dashboard/deviceDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/deviceDashboard/:id',
    name: 'Device Dashboard',
    component: deviceDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router