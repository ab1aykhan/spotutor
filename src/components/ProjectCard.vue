<template>
  <n-card
    class="project-card"
    hoverable
    content-style="max-width: 358px; width:100%"
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
        <n-progress
          type="line"
          :show-indicator="false"
          status="success"
          :percentage="percentage"
        />
      </div>
    </div>

    <div class="project-card__members">
      <div class="user-card">
        <div class="user-card__name">
          Participants
        </div>
        <div class="user-card__list">
          <div
            v-for="i in project.participants"
            :key="i"
          >
            <user-card-mini :user="i" />
          </div>
        </div>
      </div>
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
            {{ date(project.deadline) }}
          </div>
        </div>
      </div>

      <div class="priority">
        <priority :code="project.priority"/>
      </div>
    </div>
  </n-card>
</template>
<script lang="ts">

import { NCard, NProgress } from 'naive-ui';
import { computed, defineComponent } from 'vue'
import Calendar from '@/assets/icons/Calendar.vue';
import UserCardMini from './UserCardMini.vue';
import Priority from './Priority.vue';

export default defineComponent({
	components: {
		NCard,
		Calendar,
		UserCardMini,
    NProgress,
    Priority
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
	setup(props) {
    const date = (date: string) => {
      const newDate = new Date(date);
      const day = newDate.getDate();
      const month = newDate .toLocaleString('default', { month: 'long' });
      const year = newDate.getFullYear();
      return `${month} ${day}, ${year}`;
    }

    const percentage = computed(()=> (props.project.complete_tasks / props.project.total_tasks) * 100) || 0;

    return {
      date,
      percentage
    }
	},
})
</script>
<style lang="scss" scoped>
.project-card{
  width: 100%;
  cursor: pointer;
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
    &__list{
      display: flex;
      
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