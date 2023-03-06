<template>
  <div class="menu">
    <n-menu :options="menuOptions"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'


const menuOptions = ref([
  {
    label: 'Dashboard',
    key: 'Dashboard'
  },
  {
    label: 'Analytics',
    key: 'Analytics'
  },
  {
    label: 'Recommendations',
    key: 'Recommendations'
  },
  {
    label: 'Projects',
    key: 'Projects'
  },
  {
    label: 'Profile',
    key: 'Profile'
  },
])

</script>

<style>

</style>