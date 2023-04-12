<template>
  <div class="main">
    <div class="main__inner">
      <div class="main__sidebar">
        <sidebar />
      </div>
      <div class="main__body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue';

import { ref } from 'vue';
export default {
	name:'MainView',
	components: {
		Sidebar,
	},


	setup() {
		const input = ref(null)
		return {
			input,
		}
	}
}
</script>

<style lang="scss" scoped>
.main{
    height:100%;
    &__inner{
        display: flex;
        height: 100%;
    }
    &__sidebar{
        flex: 3;
    }
    &__body{
        flex: 13;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
}
</style>