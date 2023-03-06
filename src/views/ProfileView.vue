<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__title">Profile</div>
      <div class="page__body">
        <loader v-if="loader" />

        <div class="profile" v-else>
          <div class="profile__left profile__item">
            <!-- Cards -->
            <div 
              class="profile__cards"
              style="margin-bottom: 30px;"
            >
                <Card title="Projects" :description="profile.projects" icon-name="list"/>
                <Card title="Total tasks" :description="profile.total_tasks" icon-name="total"/>
                <Card title="Complete tasks" :description="profile.complete_tasks" icon-name="success"/>
                <Card title="Pending tasks" :description="profile.pending_tasks" icon-name="pending"/>
            </div>
            <!-- Status -->
            <n-card
              size="small"                 
              style="width: 80%; margin-bottom: 10px;"
            >
              <n-space justify="space-between">
                  <div>Set Status</div>
                  <n-switch 
                    :rail-style="railStyle" 
                    v-model:value="status" 
                    @on-update:value="switchStatus"
                    :loading="loading"
                  >
                    <template #checked>
                      Online
                    </template>
                    <template #unchecked>
                      Offline
                    </template>
                  </n-switch>
              </n-space>            
            </n-card>
            <!-- Delete Account -->
            <n-card
              size="small"                 
              style="width: 80%"
            >
              <n-space 
                justify="space-around" 
                size="small"
              >
                <n-button 
                  quaternary 
                  type="error" 
                  size="small"
                >
                  Delete account
                </n-button>
              </n-space>
            </n-card>
            
          </div>
          <div class="profile__right profile__item">
            <settings :data="dashboard"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, computed } from 'vue'
import { CSSProperties } from 'vue'
import Card from '@/components/Card.vue';
import Settings from '@/components/Settings.vue'


import { NCard, NTab, NTabPane, NTabs, NButton, NSwitch, NSpace } from 'naive-ui'
import { useStore } from 'vuex';
import Loader from '@/components/UI/Loader.vue';
  export default defineComponent({
  components: {
    Settings,
    Card,
    NCard,
    NTab,
    NTabPane,
    NTabs,
    NButton,
    NSwitch,
    NSpace,
    Loader
  },
  setup() {
		const loader = ref(true)
    const store = useStore()
		const dashboard = computed(()=> store.getters.dashboard)
    const status = ref(true)
    const loading = ref(false)

    const switchStatus = () => {
        loading.value = true;
        const code = status.value ? 3 : 4;
        store.dispatch('changeStatus', {status: code})
        .then(()=>{
          loading.value= false;
        })
    }

    const cards = [
      {
        icon: 'success',
        title: 'Complete tasks',
        description: '532'
      },
      {
        icon: 'pending',
        title: 'Pending tasks',
        description: '23'
      },
      {
        icon: 'list',
        title: 'Projects',
        description: '2'
      },
      {
        icon: 'total',
        title: 'Total tasks',
        description: '120'
      },
    ]

    const railStyle = ({
      focused,
      checked
     }: {
            focused: boolean
            checked: boolean
          }) => {
            const style: CSSProperties = {}
            if (checked) {
              style.background = '#2080f0'
              if (focused) {
                style.boxShadow = '0 0 0 2px #2080f040'
              }
            } else {
              style.background = 'gray'
              if (focused) {
                style.boxShadow = '0 0 0 2px gray'
              }
            }
      return style
    }

    const profile = computed(()=> store.getters.profile);

    onBeforeMount(()=> {
      loader.value = true;
      Promise.all([
        store.dispatch('profile'), 
    ]).finally(()=>{
				loader.value = false;
      })
    });

    return {
      railStyle,
      cards,
      loader,
      profile,
      dashboard,
      status,
      switchStatus,
      loading
    }
  },
})
</script>
<style scoped lang="scss">
.profile{
  display: flex;
  &__item{
    flex: 1;
  }
  &__cards{
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 10px;
  }
}

// === Settings ===
.settings{
  background: #FFFFFF;
  box-shadow: 0px 0px 25.9512px rgba(18, 15, 38, 0.04);
  &__title{
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
  }
}
</style>