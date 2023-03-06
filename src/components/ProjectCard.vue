<template>
  <n-card
    class="project-card"
    hoverable
  >
    <div class="project-card__title">
      {{ project.title }}
    </div>
    <div class="project-card__subtitle">
      {{ '' }}
    </div>
        
    <div class="task-progress project-card__task-progress">
      <div class="task-progress__title">
        Task Done: {{ project.complete_tasks }} / {{ project.total_tasks }}
      </div>
      <div class="task-progress__line">
        <!-- <n-progress
          type="line"
          :show-indicator="false"
          status="success"
          :percentage="20"
        /> -->
      </div>
    </div>

    <div class="project-card__members">
      <div class="user-card">
        <div class="user-card__name">
          Participants
        </div>
        <div
          v-for="i in project.participants"
          :key="i"
          class="user-card__avatar"
        >
          <n-avatar
            round
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </div>
      </div>

      <!-- <div class="user-card">
        <div class="user-card__name">
          Students
        </div>
        <div class="user-card__avatar">
          <n-avatar
            round
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </div>
      </div> -->
    </div>

    <div class="project-card__info">
      <div class="project-card__date">
        <div class="project-date">
          <div class="project-date__icon">
            <Calendar
              :width="17"
              :height="17"
            />
          </div>
          <div class="project-date__text">
            {{ project.deadline }}
          </div>
        </div>
      </div>

      <div class="priority">
        {{ project.priority }}
      </div>
    </div>
  </n-card>
</template>
<script lang="ts">

import { NCard, NProgress, NAvatar } from 'naive-ui';
import { defineComponent } from 'vue'
import Calendar from '@/assets/icons/Calendar.vue';

export default defineComponent({
	components: {
		NCard,
		NProgress,
		NAvatar,
		Calendar
	},
	props: {
		project: {
			type: Object,
			default: ()=> {
				return {
					title: 'My project',
					subtitle: 'Subtitle',
					total_tasks: 0,
					complete_tasks: 0
				}
			}
		},
		title: {
			type: String,
			default: 'My project'
		},
		subtitle: {
			type: String,
			default: 'Subtitle'
		}
	},
	setup() {
        
	},
})
</script>
<style lang="scss" scoped>
.n-card {
  max-width: 358px;
}
.project-card{
    &__title{
        font-weight: 700;
        font-size: 16px;
        line-height: 130%;
        margin-bottom: 8px;
    }
    &__subtitle{
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #9098B1;
        margin-bottom: 24px;
    }
    &__members{
        display: flex;
        margin-bottom: 16px ;
    }
    &__task-progress{
        margin-bottom: 25px;
    }
    &__info{
        display: flex;
        justify-content: space-between;
    }
}
.task-progress{
    &__title{
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        margin-bottom: 12px;
    }
}
.user-card{
    margin-right: 34px;
    &__name{
        color: #A3A5A9;
        font-weight: 600;
        font-size: 12px;
        line-height: 130%;
        margin-bottom: 5px;
    }
    &:last-child{
        margin-right: 0;
    }
}
.project-date{
    display: flex;
    align-items: center;
    &__icon{
        margin-right: 3px;
    }
    &__text{
        font-style: normal;
        font-weight: 600;
        font-size: 13.5685px;
        line-height: 130%;
        color: #A3A5A9;
    }
}
.priority{
    font-style: normal;
    font-weight: 700;
    font-size: 13.5685px;
    line-height: 130%;
    text-transform: uppercase;
}
</style>