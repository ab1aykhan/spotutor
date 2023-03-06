import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import MainView from '@/views/MainView.vue'
import Recommendations from '@/views/RecommendationsView.vue'
import Projects from '@/views/ProjectsView.vue'
import Analytics from '@/views/AnalyticsView.vue'
import Profile from '@/views/ProfileView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Registration from '@/views/RegistrationView.vue'
import Login from '@/views/LoginView.vue'
import ProjectTaskView from '@/views/ProjectTaskView.vue'
import SectionRoot from '@/views/Root.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/main',
    component: MainView,
    name: 'main',
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: '/analytics',
        name: 'analytics',
        component: Analytics
      },
      {
        path: '/recommendations',
        name: 'recommendations',
        component: Recommendations
      },

      {
        path: '/project',
        name: 'project',
        component: Projects
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/tasks',
        name: 'tasks',
        component: ProjectTaskView,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
