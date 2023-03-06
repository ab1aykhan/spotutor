<template>
  <n-list 
    :show-divider="false"
    style="width: 60%"
  >
    <n-list-item 
      v-for="(i, index) in data"
      :key="index"
    >
      <n-card size="small">
        <div class="user-info">
          <div class="user-info__person">
            <n-avatar
              round
              size="small"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              class="user-info__avatar"
            />
            <div>{{ i.name }}</div>
          </div>
          <div class="user-info__faculty">
            {{ i.description }}
          </div>
          <div>
            <n-button
              quaternary
              circle
            >
              <template #icon>
                <n-icon><heart-icon /></n-icon>
              </template>
            </n-button>
            <n-button
              quaternary
              circle
            >
              <template #icon>
                <n-icon><paper-plane-icon /></n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </n-card>
    </n-list-item>
  </n-list>
</template>
<script lang="ts">
import {  NList, 
	NListItem, 
	NCard, 
	NSpace,
	NAvatar,
	NIcon,
	NButton,
	NInput,
	NInputGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { HeartOutline as HeartIcon, PaperPlaneOutline as PaperPlaneIcon  } from '@vicons/ionicons5';


export default defineComponent({
	components: {
		NList, 
		NListItem, 
		NCard, 
		NSpace,
		NAvatar,
		NIcon,
		NButton,
		NInput,
		NInputGroup,
		HeartIcon,
		PaperPlaneIcon
	},
	props: {
		data: {
			type: Array
		}
	},
	setup() {
        
	},
})
</script>
<style lang="scss" scoped>
.user-info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__person{
    display: flex;
    align-items: center;
  }
  &__avatar{
    margin-right: 16px;
  }
  &__faculty{
    font-weight: 500;
    font-size: 13px;
    line-height: 130%;
    color: $main-gray;
  }
  &__action{}
}
</style>