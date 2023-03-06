<template>
<div class="page">
    <div class="page__inner">
      <div class="page__title">Project Math</div>
      <div class="page__body">
        <div class="project-task">
            <div class="project-task__breadcrumb">
                <n-space justify="space-between">
                    <n-breadcrumb separator=">">
                        <n-breadcrumb-item>Projects</n-breadcrumb-item>
                        <n-breadcrumb-item>Project Math</n-breadcrumb-item>
                    </n-breadcrumb>
                    <n-button 
                        type="primary"
                        @click="openModal"
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
                            <draggable class="list-group" v-model="list1" group="people" item-key="id">
                                <template #item="{element}">
                                    <assignment-card 
                                        :title="element.title"
                                        :description="element.date"
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
                            <draggable class="list-group" v-model="list2" group="people" item-key="id">
                                <template #item="{element}">
                                    <assignment-card 
                                        :title="element.title"
                                        :description="element.date"
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
                            <draggable class="list-group" v-model="list3" group="people" item-key="id">
                                <template #item="{element}">
                                    <assignment-card 
                                        :title="element.title"
                                        :description="element.date"
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
                <task-card />
            </n-modal>
        </div>
      </div>
    </div>
</div>
</template>
<script lang="ts">
import Draggable from 'vuedraggable'


import { NBreadcrumb, NBreadcrumbItem, NButton, NSpace, NModal } from 'naive-ui'
import { defineComponent, ref } from 'vue'

import TaskCard from '@/components/TaskCard.vue';
import AssignmentCard from '@/components/AssignmentCard.vue';

export default defineComponent({
    components: {
        NBreadcrumb,
        NBreadcrumbItem,
        AssignmentCard,
        NButton,
        NSpace,
        Draggable,
        NModal,
        TaskCard
    },
    setup() {
        const showModal = ref(true);
        const list1: any = ref([
            {
                id: 1,
                title: 'Do assignment 1',
                date: 'Friday, 12 November, 2021'
            },
            {
                id: 2,
                title: 'Do assignment 2',
                date: 'Friday, 12 November, 2021'
            }
        ])

        const list2: any = ref([
            {
                id: 1,
                title: 'Do assignment 1',
                date: 'Friday, 12 November, 2021'
            },
            {
                id: 2,
                title: 'Do assignment 2',
                date: 'Friday, 12 November, 2021'
            }
        ])

        const list3: any = ref([
            {
                id: 1,
                title: 'Do assignment 1',
                date: 'Friday, 12 November, 2021'
            },
            {
                id: 2,
                title: 'Do assignment 2',
                date: 'Friday, 12 November, 2021'
            }
        ])

        const log = (evt: Event) =>  {
            window.console.log(evt);
        }

        const openModal = () => {
            showModal.value = !showModal.value
        }

        return {
            list1,
            list2,
            list3,
            log,
            showModal,
            openModal
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
