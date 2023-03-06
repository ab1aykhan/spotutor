<template>
    <n-card :style="'width: 400px'">
    <n-form ref="formRef">
      <h1>Create Project</h1>
      <n-form-item path="title" label="Title">
        <n-input v-model:value="model.title" />
      </n-form-item>
      <n-form-item path="deadline" label="Deadline">
        <n-date-picker v-model:value="model.deadline" type="date" :style="'width: 100%'"/>
      </n-form-item>
      <n-form-item path="priority" label="Priority">
        <n-select :options="priority" v-model:value="model.priority"/>
      </n-form-item>
      <n-form-item path="course" label="Course">
        <n-select />
      </n-form-item>
      <n-form-item style="width: 100%">
        <n-space justify="end" style="width: 100%">
            <n-button type="info" @click="createProject">
                <template #icon>
                    <n-icon>
                      <Reload3333/>
                    </n-icon>
                </template>
                Save
            </n-button>
        </n-space>
    </n-form-item>
    </n-form>
</n-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, VNodeChild, h, computed } from 'vue'
  import {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NButton,
    NCard,
    NDatePicker,
    NSelect,
    NSpace,
    NIcon
  } from 'naive-ui'
import { useStore } from 'vuex';
import Priority from './Priority.vue'
import { timestampToDate } from '@/helper';
import { Reload } from '@vicons/ionicons5';
  
  interface ModelType {
    title: string | null
    deadline: number
    priority: string | null
    course: string | null
  }
  
  export default defineComponent({
    components: {
        NForm,
        NFormItem,
        NInput,
        NRow,
        NCol,
        NButton,
        NCard,
        NDatePicker,
        NSelect,
        Priority,
        NSpace,
        Reload,
        NIcon
    },
    setup () {
	  const store = useStore();

      const modelRef = ref<ModelType>({
        title: '',
        deadline: 1183135260000,
        priority: '',
        course: ''
      })

      const priority = computed(()=> store.getters.priority)

      const createProject = () => {
        const prepared: any = JSON.parse(JSON.stringify(modelRef.value));

        const data = {
            ...prepared,
            course: 1,
            deadline: timestampToDate(prepared.deadline)
        }
        
        store.dispatch('createProject', data)
      }

      return  {
        model: modelRef,
        priority,
        createProject
      }
    }
  })
  </script>