<template>
  <div class="sidebar">
    <div class="sidebar__inner">
        <div class="sidebar__logo">
            <logo />
        </div>
        <div class="sidebar__usercard">
            <user-card />
        </div>
        <div class="sidebar__menu">
            <n-menu :options="menuOptions"/>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Logo from './Logo.vue'
import UserCard from './UserCard.vue'
import { NIcon, NMenu } from 'naive-ui'
import { h, Component } from 'vue'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

import Dashboard from '@/assets/icons/Dashboard.vue'
import Recommendation from '@/assets/icons/Recommendation.vue'
import Analytics from '@/assets/icons/Analytics.vue'
import Projects from '@/assets/icons/Projects.vue'
import Profile from '@/assets/icons/Profile.vue'

export default defineComponent({
  components: {
    Logo,
    UserCard,
    NMenu
  },
  setup() {
    const renderIcon = (icon: Component) => {
      return () => h(NIcon, null, { default: () => h(icon) })
    }
    const menuOptions: MenuOption[] = [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/dashboard'
              }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'Dashboard',
        icon: renderIcon(Dashboard),
        props: {
          style: {
            color: 'red'
          }
        }

      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/analytics'
              }
            },
            { default: () => 'Analytics' }
        ),
        key: 'Analytics',
        icon: renderIcon(Analytics),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/recommendations'
              }
            },
            { default: () => 'Recommendations' }
        ),
        key: 'Recommendations',
        icon: renderIcon(Recommendation),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/project'
              }
            },
            { default: () => 'Projects' }
        ),
        key: 'Projects',
        icon: renderIcon(Projects),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/profile'
              }
            },
            { default: () => 'Profile' }
        ),
        key: 'Profile',
        icon: renderIcon(Profile),
      },
    ]

    return {
      menuOptions
    }
  },
})
</script>

<style lang="scss" scoped>
.sidebar{
    height: 100%;
    background-color: $secondary-gray;
    &__inner{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    &__logo, &__usercard{
        margin-top: 50px;
        margin-left: 20px;
    }
    &__menu{
      margin-top: 50px;
    }

}
</style>