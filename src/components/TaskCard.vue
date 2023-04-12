<template>
    <n-card
        size="large"
    >
        <div class="task-card">
            <div class="task-card__header">
                <div class="task-card__title">In the To do column</div>
            </div>
            <div class="task-card__body">
                <div class="task-card__field">
                    <div class="task-card__subtitle">Task title</div>
                    <n-input 
                        v-model:value="form.title"
                        :disabled="loading"
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Importance</div>
                    <n-select :options="priority" v-model:value="form.importance"/>                    
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Date</div>
                    <n-date-picker
                      v-model:formatted-value="form.deadline"
                      type="date"
                      :value-format="'yyyy-MM-dd'"
                      :disabled="loading"
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Description</div>
                    <n-input 
                        v-model:value="form.description"
                        :disabled="loading"
                        type="textarea"
                    />
                </div>
                <!-- Subtask -->
                <div class="task-card__field">
                    <div class="task-card__subtitle">Subtasks</div>
                    <div class="task-card__subtitle-body">
                        <template v-for="(item, index) in form.subtasks" :key="index">
                            <n-checkbox v-model:checked="item.is_completed">{{ item.title }}</n-checkbox>
                        </template>
                        <div class="subtask-creating">
                            <div class="subtask-creating__form" v-if="addSubtask">
                                <div class="subtask-creating__input">
                                    <n-input type="text" v-model:value="subtask"/>
                                </div>
                                <div class="subtask-creating__btn">
                                    <n-button quaternary circle type="success" @click="createSubtask">
                                        <template #icon>
                                          <n-icon><check-icon /></n-icon>
                                        </template>
                                    </n-button>
                                    <n-button quaternary circle type="error" @click="cancelSubtask">
                                        <template #icon>
                                          <n-icon><close-icon /></n-icon>
                                        </template>
                                    </n-button>
                                </div>
                            </div>
                            <n-button 
                                v-else
                                quaternary
                                :style="'width: 160px; color: #9098B1; font-size: 14px;'"
                                @click="newSubtask"
                            >
                                <template #icon>
                                  <n-icon><plus-icon /></n-icon>
                                </template>
                                Add a subtask
                            </n-button>
                        </div>
                    </div>
                </div>
                <!-- / Subtask -->

                <!-- Assign -->
                <div class="task-card__field">
                    <div class="task-card__subtitle">Assign</div>
                    <div class="task-card__assign">
                        <template v-for="(item, index) in form.assigned_to" :key="index">
                            <user-card :user="item" />
                        </template>
                    </div>
                </div>
                <!-- / Assign -->
                <div class="task-card__field">
                    <div class="task-card__subtitle">Supervisor</div>
                    <div class="task-card__assign">
                        <template v-for="(item, index) in form.assigned_to" :key="index">
                            <user-card :user="item" />
                        </template>
                    </div>
                </div>
                <div class="task-card__btn">
                    <n-space justify="end">
                        <n-button>
                            Cancel
                        </n-button>
                        <n-button
                            type="primary"
                            @click="save"
                            :loading="loading"
                        >
                            Save
                        </n-button>
                    </n-space>
                </div>
            </div>
        </div>
    </n-card>
</template>
<script lang="ts">
import { NIcon, NCard, NInput, NButton, NSpace,NSelect, SelectRenderLabel, NDatePicker, NCheckbox } from 'naive-ui'
import { computed, defineComponent, h, onBeforeMount, ref } from 'vue'
import { Add as PlusIcon,  CloseOutline as CloseIcon, CheckmarkOutline as CheckIcon } from '@vicons/ionicons5'

import Priority from './Priority.vue';
import { useStore } from 'vuex';
import UserCard from './UserCardMini.vue';
import { th } from 'date-fns/locale';
import { request } from '@/api/request';
import { add } from 'lodash';

export interface Form {
    title: string | null,
    importance: string | null,
    deadline: string | null,
    description: string | null,
    assigned_to: Array<{  
        id: number
        username: string
        email: string
        year_of_study: string
        status: string
        birth_date: string
        language: string
        course_of_study: string
        picture_url: string
    } >,
    supervisor: [] | null
    type: 'EDIT' | 'NEW',
    subtasks: Array<{task: number, is_completed: boolean, title: string} >
    id: number | string,
    created_at: string
    completed_at: any
    status: number | string
}

export default defineComponent({
    components: {
        NCard,
        NInput,
        NButton,
        NSpace,
        NSelect,
        Priority,
        NDatePicker,
        UserCard,
        NCheckbox,
        NIcon,
        PlusIcon,
        CloseIcon,
        CheckIcon
    },

    setup() {
        const form = ref<Form>({
            id: '',
            title: 'Do assignment 1',
            importance: 'high',
            deadline: '2007-06-30',
            description: '2007-06-30',
            assigned_to: [],
            supervisor: [],
            type: 'NEW',
            subtasks: [],
            created_at: '',
            completed_at: '',
            status: ''
            
        });
	    const store = useStore();
        const loading = ref<boolean>(false)
        const priority = computed(()=> store.getters.priority)

        

        const task =  computed(()=> store.getters.currentTask);

        const handleFocus = (e: Event) => {}

        const handleInput = (e: Event) => { console.log(e.target) }

        const option = [
            {
                id: 1,
                value: '123'
            }
        ]

        const renderLabel: SelectRenderLabel = (option) => {
            return h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center'
              }
            },
            [
            ]
            )
        }
        // ====  Subtask ==== 
        const addSubtask = ref<boolean>(false);

        const subtask = ref<string>("");

        const newSubtask = () => addSubtask.value = true

        const cancelSubtask = () => addSubtask.value = false
        
        const createSubtask = async () => {
            const data = {
                task_id: form.value.id,
                title: subtask.value
            }

            await store.dispatch('createSubtask', data)
            // await store.dispatch('getSubtaskByTaskID', data.task_id)
        }

        // ====  / Subtask ==== 

        const save = () => {
            loading.value = true;
            console.log(form.value)
            const preparedData = {
                ...form.value,
                assigned_to: form.value.assigned_to.map(item => item.id),
                task_id: form.value.id
            }
            if (form.value.type === 'EDIT') {
                request({ method: 'post', url: 'tasks/edit/', data: preparedData})
                .finally(()=>{
                    loading.value = false;
                })
            }

            if (form.value.type === 'NEW') {
                
            }
        }

        onBeforeMount(()=> {
            console.log(task.value);
            
            form.value = task.value
        })

        return {
            form,
            handleFocus,
            handleInput,
            option: [...option, renderLabel],
            save,
            loading,
            addSubtask,
            newSubtask,
            cancelSubtask,
            createSubtask,
            subtask,
            priority
        }
        
    },
})
</script>
<style lang="scss" scoped>
.n-card {
  max-width: 640px;
}
.task-card{
    &__header{
        margin-bottom: 40px;
    }
    &__title{
        font-weight: 600;
        font-size: 24px;
        line-height: 22px;
        letter-spacing: -0.408px;
    }
    &__subtitle{
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: #9098B1;
        margin-bottom: 6px;
    }
    &__subtitle-body{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    &__field{
        margin-bottom: 30px;
    }
    &__assign{
        display: flex;
        gap: 8px
    }
}
.subtask-creating{
    &__form{
        display: flex;
    }
}
</style>