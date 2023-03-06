<template>
<div class="page">
  <div class="page__inner">
    <div class="page__title">Recommendations</div>
    <div class="page__body">
      <div class="recommendations">
        <div class="recommendations__search-bar">
          <div>There are over 300 supervisors!</div>
          <div >
            <n-input-group>
              <n-input :style="{ width: '50%' }" />
              <n-button type="primary" ghost>
                Search
              </n-button>
            </n-input-group>
          </div>
        </div>
        <div class="recommendations__list">
          <n-list 
            :show-divider="false"
            style="width: 60%"
          >
            <n-list-item>
              <n-card size="small">
                <div class="user-info">
                  <div class="user-info__person">
                    <n-avatar
                      round
                      size="small"
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                      class="user-info__avatar"
                    />
                    <div>Akyl Bazarbay</div>
                  </div>
                  <div class="user-info__faculty">
                    Computer Science
                  </div>
                  <div>
                    <n-button quaternary circle>
                      <template #icon>
                        <n-icon><heart-icon /></n-icon>
                     </template>
                    </n-button>
                    <n-button quaternary circle>
                      <template #icon>
                        <n-icon><paper-plane-icon /></n-icon>
                     </template>
                    </n-button>
                  </div>
                </div>
              </n-card>
            </n-list-item>
          </n-list>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { 
  NList, 
  NListItem, 
  NCard, 
  NSpace,
  NAvatar,
  NIcon,
  NButton,
  NInput,
  NInputGroup
} from 'naive-ui';

import { HeartOutline as HeartIcon, PaperPlaneOutline as PaperPlaneIcon  } from '@vicons/ionicons5';

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