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
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Importance</div>
                    <priority type="high">high</priority>
                    
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Date</div>
                    <n-input 
                        :disabled="true"
                        v-model:value="form.date"
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Description</div>
                    <n-input 
                        :disabled="true"
                        v-model:value="form.description"
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Subtasks</div>
                    <n-input 
                        :disabled="true"
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Assign</div>
                    <n-input 
                        :disabled="true"
                    />
                </div>
                <div class="task-card__field">
                    <div class="task-card__subtitle">Supervisor</div>
                    <n-input 
                        :disabled="true"
                    />
                </div>
                <div class="task-card__btn">
                    <n-space justify="end">
                        <n-button>
                            Cancel
                        </n-button>
                        <n-button
                            type="primary"
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
import { NCard, NInput, NButton, NSpace,NSelect, SelectRenderLabel } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'
import Priority from './Priority.vue';

interface Form {
    title: string | null,
    importance: string | null,
    date: string | null,
    description: string | null,
    assign: [] | null,
    supervisor: [] | null
}


export default defineComponent({
    components: {
        NCard,
        NInput,
        NButton,
        NSpace,
        NSelect,
        Priority,
    },
    setup() {
        const form = ref<Form>({
            title: 'Do assignment 1',
            importance: 'high',
            date: 'Friday, 12 November 2021',
            description: 'Make excercise 231, 234, 254. Write formulas, make conspect',
            assign: [],
            supervisor: []
        });

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

        return {
            form,
            handleFocus,
            handleInput,
            option: [...option, renderLabel]
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
    &__field{
        margin-bottom: 30px;
    }
}
</style>