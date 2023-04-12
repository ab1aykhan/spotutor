<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__title">
        {{ tasks.project }}
      </div>
      <div class="page__body">
        <loader v-if="loader" />
        <div class="project-task">
          <div class="project-task__breadcrumb">
            <n-space justify="space-between">
              <n-breadcrumb separator=">">
                <n-breadcrumb-item>Projects</n-breadcrumb-item>
                <n-breadcrumb-item>{{ tasks.project }}</n-breadcrumb-item>
              </n-breadcrumb>
              <n-button 
                type="primary"
                @click="createTask"
              >
                Create task
              </n-button>
            </n-space>                
          </div>
          <div class="project-task__body">
            <div class="kanban">
              <div class="kanban__block">
                <div class="kanban__header">
                  <div class="kanban__block-title">
                    To do
                  </div>
                </div>
                <div class="kanban__body">
                  <draggable
                    v-model="tasks.to_do"
                    class="list-group"
                    group="people"
                    item-key="id"
                    @change="changeStatus($event, 'todo')"
                  >
                    <template #item="{element}">
                      <assignment-card 
                        :task="element"
                        @click="openTask(element)"
                      />
                    </template>
                  </draggable>
                </div>
              </div>
              <div class="kanban__block">
                <div class="kanban__header">
                  <div class="kanban__block-title">
                    In Progress
                  </div>
                </div>
                <div class="kanban__body">
                  <draggable
                    v-model="tasks.in_progress"
                    class="list-group"
                    group="people"
                    @change="changeStatus($event, 'inProgress')"
                    item-key="id"
                  >
                    <template #item="{element}">
                      <assignment-card 
                        :task="element"
                      />
                    </template>
                  </draggable>
                </div>
              </div>
              <div class="kanban__block">
                <div class="kanban__header">
                  <div class="kanban__block-title">
                    Done
                  </div>
                </div>
                <div class="kanban__body">
                  <draggable
                    v-model="tasks.done"
                    class="list-group"
                    group="people"
                    item-key="id"
                    @change="changeStatus($event, 'done')"
                  >
                    <template #item="{element}">
                      <assignment-card
                        :task="element"
                      />
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
          <n-modal 
            v-model:show="showModal"
            :mask-closable="false"
          >
            <task-card :task="currentTask" :type="taskType"/>
          </n-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Draggable from 'vuedraggable'  

import { NBreadcrumb, NBreadcrumbItem, NButton, NSpace, NModal, useMessage } from 'naive-ui'
import { defineComponent, onMounted, ref } from 'vue'

import TaskCard from '@/components/TaskCard.vue';
import AssignmentCard from '@/components/AssignmentCard.vue';
import Loader from '@/components/UI/Loader.vue';
import { request } from '@/api/request';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
	components: {
		NBreadcrumb,
		NBreadcrumbItem,
		AssignmentCard,
		NButton,
		NSpace,
		Draggable,
		NModal,
		TaskCard,
		Loader,
	},
	setup() {
		const showModal = ref(false);
		const router = useRouter();
		const route = useRoute();
		const loader = ref(true)
    const store = useStore();
    const message = useMessage()

		const tasks = ref({
			project: '',
			done: [],
			in_progress: [],
			to_do:[]
		})

    const taskType= ref<'NEW' | 'EDIT' >('NEW') 

    const currentTask = ref({});

    const changeStatus = async (evt: any, status: string) => {
      
      const { added } = evt
      if (added) {
        let id: number | null = null;

        if (status === 'todo') {
          id = 1
        }

        if (status === 'inProgress') {
          id = 2
        }

        if (status === 'done') {
          id = 3
        }
        const { element } = added;
        const data = {
          ...element, 
          status: id, 
          task_id: element.id, 
          ...(element.assigned_to.length && {assigned_to: element.assigned_to.map((item: any) => item.id)})
        };

        try {
          await request({ method: 'post', url: 'tasks/edit/', data})
          await updateTask()
          message.success(
            "Photo uploaded successfully"
          )
        } catch (error) {
          message.error(
            "Something went wrong please try again"
          )
        }
      }  
    }

		const createTask = () => {
      currentTask.value = {};
      store.commit('SET_CURRENTTASK', {type: 'EDIT'})
			showModal.value = !showModal.value;
		}

    const openTask = (task: object) => {
      currentTask.value = { type: 'EDIT', ...task };
      store.commit('SET_CURRENTTASK', {...task, type: 'EDIT', })
			showModal.value = !showModal.value;
    }

    const updateTask = async () => {
			const { id } = route.query
      
      const res = await request({
        method: 'get', url: 'projects/details/', params: {
          project_id: id
        }
      });

      tasks.value={
        ...res.data
      };
    }

    const fetchTask = () => {
			const { id } = route.query
      
			request({ method: 'get', url: 'projects/details/', params: {
				project_id: id
			} }).then(res => {
				tasks.value = {
					...res.data
				}
			}).finally(()=> {
				loader.value = false;
			})
		}


		onMounted(()=> {
			fetchTask();
		})
        

		return {
			showModal,
			createTask,
			tasks,
			loader,
      openTask,
      currentTask,
      taskType,
      changeStatus
		}
	},
})
</script>
<style lang="scss" scoped>
.project-task{
    height: 100%;
    display: flex;
    flex-direction: column;
    &__body{
        height: 100%;
    }
    &__breadcrumb{
        margin-bottom: 28px;
        
    }
}
.kanban{
    display: flex;
    height: 100%;
    &__header{
        padding: 20px 0;
    }
    &__block{
        border: 0.5px solid #F0F0F0;
        flex: 1;
        padding: 0 15px;
    }
    &__block-title{
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 130%;
        color: #5BB1F9;
    }
}
</style>