<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__title">
        Dashboard
      </div>
      <div class="page__body">
        <loader v-if="loader" />
        <div
          v-else
          class="dashboard"
        >
          <div class="dashboard__projects">
            <div class="task-info">
              <div
                class="task-info__item"
              >
                <Card  
                  title="Pending tasks"
                  :description="dashboard.in_progress_tasks"
                  icon-name="pending"
                />
              </div>
              <div class="task-info__item">
                <Card  
                  title="Total tasks"
                  :description="dashboard.total_tasks"
                  icon-name="total"
                />
              </div>
            </div>
            <!-- <div class="task-statuses">
              task-statuses
            </div> -->

            <div
              class="project"
            >
              <div class="project__title">
                My projects
              </div>
              <template v-if="dashboard.projects.length">
                <div
                  v-for="(i, index) in dashboard.projects"
                  :key="index"
                  class="project__card-list"
                >
                  <project-card :project="i" />
                </div>
              </template>
              <template v-else>
                No projects
              </template>
            </div>

            <div
              v-if="dashboard.supervisor"
              class="project"
            >
              <div class="project__title">
                Students
              </div>
              <div class="project__card-list">
                <user-card-list :data="students" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex';

import Card from '@/components/Card.vue'
import ProjectCard from '@/components/ProjectCard.vue';
import UserCardList from '@/components/UserCardList.vue';
import Loader from '@/components/UI/Loader.vue';

export default defineComponent({
	components: {
		Card,
		ProjectCard,
		UserCardList,
		Loader
	},
	setup() {
		const store = useStore()
		const loader = ref(true)
		const taskInfo = ref([
			{
				title: 'Pending tasks',
				description: '23',
				iconName: 'pending'
			},
			{
				title: 'Total tasks',
				description: '120',
				iconName: 'total'
			}
		]);
		const dashboard = computed(()=> store.getters.dashboard)

		const projects = ref([
			{
				title: 'Math app Project',
				subtitle: 'Digital Product Design'
			}
		]);

		const students = ref([
			{
				name: 'Akyl Bazarbay',
				description: 'Computer Science'
			}
		]);


		onBeforeMount(()=> {
			loader.value = true;
			store.dispatch('dashboard').finally(()=>{
				loader.value = false;
			})
		})

		return {
			taskInfo,
			students,
			dashboard,
			loader
		}
	},
})
</script>



<style lang="scss" scoped>
.project{
  &__title{
    font-weight: 700;
    font-size: 26px;
    line-height: 130%;
  }
  &__card-list{
    padding-top: 16px;
  }
}

.task-info{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}
</style>