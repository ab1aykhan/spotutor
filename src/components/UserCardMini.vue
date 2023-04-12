<template>
  <div class="user-card-mini">
    <n-popover trigger="hover">
      <template #trigger>
        <n-avatar
          round
          size="medium"
          :src="user.photo"
        />
      </template>
      <span>{{ user.username }}</span>
    </n-popover>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NAvatar, NPopover } from 'naive-ui';

export default defineComponent({
	components:{
		NAvatar,
		NPopover
	},
	props: {
		user:{
			type: Object,
			default: ()=>{
				return {
					username: 'User',
					photo: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
				}
			}
		}
	},
})
</script>
