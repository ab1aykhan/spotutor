<template>
<div class="page">
  <div class="page__inner">
    <div class="page__header">
      <div class="page__title">Recommendations</div>
    </div>
    <div class="page__body">
      <loader v-if="loader" />
      <div class="recommendations" v-else>
        <div class="recommendations__search-bar">
          <!-- <div>There are over 300 supervisors!</div> -->
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
            clickable
          >
            <n-list-item
              v-for="(user) in userList"
              :key="user.id"
              @click="getUser(user)"
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
                    <div>{{ user.username }}</div>
                  </div>
                  <div class="user-info__faculty">
                    {{ user.year_of_study }}
                  </div>
                  <div>
                    <!-- <n-button quaternary circle>
                      <template #icon>
                        <n-icon><heart-icon /></n-icon>
                     </template>
                    </n-button>
                    <n-button quaternary circle>
                      <template #icon>
                        <n-icon><paper-plane-icon /></n-icon>
                     </template>
                    </n-button> -->
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

<script lang="ts">
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

import Loader from '@/components/UI/Loader.vue';

import { HeartOutline as HeartIcon, PaperPlaneOutline as PaperPlaneIcon  } from '@vicons/ionicons5';

import { defineComponent, onMounted, ref } from 'vue'
import { request } from '@/api/request';

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
    PaperPlaneIcon,
    Loader
  },

  setup() {
      const userList = ref<any>([]);
  		const loader = ref(true)


      const fetchRecommendation = async () => {
  			loader.value = true;
        const { data } = await request({method: 'get', url: 'recommendation/'});
        userList.value = data;
  			loader.value = false;
      }

      const getUser = async (user: any) => {
        const { id } = user;
        await request({method: 'get', url: `profile/get_student/?id=${id}`})
      }

      onMounted(()=> {
        fetchRecommendation();
      })

      return{
        userList,
        loader,
        getUser
      }
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