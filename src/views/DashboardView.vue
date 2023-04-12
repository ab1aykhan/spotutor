<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__header">
        <div class="page__title">
          Dashboard
        </div>
      </div>
      <div class="page__body">
        <loader v-if="loader" />
        <div
          v-else
          class="dashboard"
        >
          <div class="dashboard__projects">
            <div class="task-info dashboard__task-info">
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

            <div class="task-hint dashboard__task-hint">
              <task-type-hint class="task-hint__item" :task="{ type: 'proposed_tasks', count: dashboard.proposed_tasks }"/>
              <task-type-hint class="task-hint__item" :task="{ type: 'in_progress_tasks', count: dashboard.in_progress_tasks }"/>
              <task-type-hint class="task-hint__item" :task="{ type: 'complete_tasks', count: dashboard.complete_tasks }"/>
            </div>

            <div
              class="project dashboard__project"
            >
              <div class="project__title">
                My projects
              </div>
              <div class="project__list">
                <template v-if="dashboard.projects.length">
                  <div
                    v-for="(i, index) in dashboard.projects"
                    :key="index"
                    style="max-width: 358px; width:100%"
                  >
                    <project-card :project="i" @click="toProject(i)" />
                  </div>
                </template>
                <template v-else>
                  No projects
                </template>
              </div>
            </div>

            <div
              v-if="dashboard.is_supervisor"
              class="project project__students"
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
import { useRouter } from 'vue-router';

import Card from '@/components/Card.vue'
import ProjectCard from '@/components/ProjectCard.vue';
import UserCardList from '@/components/UserCardList.vue';
import Loader from '@/components/UI/Loader.vue';
import TaskTypeHint from '@/components/TaskTypeHint.vue';

export default defineComponent({
	components: {
		Card,
		ProjectCard,
		UserCardList,
		Loader,
    TaskTypeHint
	},
	setup() {
		const store = useStore();
		const router = useRouter();

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
    const  dashboard = ref({
      projects:[],
      is_supervisor: false,
      total_tasks: '',
      in_progress_tasks: '',
      proposed_tasks: 0,
      complete_tasks: 0
    });

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


		const toProject = (item: any) => {
      router.push({name: 'tasks', query: item })
		}

    const fetchDashboard = () => {
			loader.value = true;
			store.dispatch('dashboard')
      .then((res)=> {
        dashboard.value = res[0];
      }).finally(()=>{
				loader.value = false;
			})
    }

		onBeforeMount(()=> {
      fetchDashboard();
		})

		return {
			taskInfo,
			students,
			dashboard,
			loader,
			toProject
		}
	},
})
</script>



<style lang="scss" scoped>
.dashboard{
  &__task-hint {
    margin-bottom: 40px;
  }
}
.project{
  width: 100%;
  &__title{
    font-weight: 700;
    font-size: 26px;
    line-height: 130%;
  }
  &__card-list{
    padding-top: 16px;
    width: 100%;

  }
  &__list{
    width: 100%;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  &__students{
    margin-top: 40px;
  }
}

.task-info{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}
.task-hint{
  display: flex;
  &__item{
    padding: 0 20px;
    border-right: 1px solid #EBF0FF;
  }
  &__item:last-child{
    border: none;
  }
}
</style>