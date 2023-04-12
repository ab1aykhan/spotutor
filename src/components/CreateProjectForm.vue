<template>
    <n-card :style="'width: 400px'">
    <n-form ref="formRef">
      <h1>Create Project</h1>
      <n-form-item path="title" label="Title">
        <n-input v-model:value="model.title" />
      </n-form-item>
      <n-form-item path="deadline" label="Deadline">
        <n-date-picker 
          value-format="yyyy-MM-dd"
          v-model:formatted-value="model.deadline" type="date" :style="'width: 100%'" 
          :is-date-disabled="dateDisabled"
        />
      </n-form-item>
      <n-form-item path="priority" label="Priority">
        <n-select :options="priority" v-model:value="model.priority"/>
      </n-form-item>
      <n-form-item path="course" label="Course">
        <n-select v-model:value="model.course" :options="courseList"/>
      </n-form-item>
      <n-form-item path="course" label="Participants">
        <n-mention :options="options" default-value="@" />
      </n-form-item>
      <n-form-item style="width: 100%">
        <n-space justify="end" style="width: 100%">
            <n-button type="info" @click="createProject">
                Save
            </n-button>
        </n-space>
    </n-form-item>
    </n-form>
</n-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, VNodeChild, h, computed, onMounted } from 'vue'
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
    NIcon,
    NMention
  } from 'naive-ui'
import { useStore } from 'vuex';
import Priority from './Priority.vue'
import { timestampToDate } from '@/helper';
import { Reload } from '@vicons/ionicons5';
import { request } from '@/api/request';
import axios from 'axios';
  
  interface ModelType {
    title: string | null
    deadline: any,
    priority: string | null
    course: string | null,
    participants: [] | null
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
        NIcon,
        NMention
    },
    setup (props, { emit }) {
	  const store = useStore();

      const modelRef = ref<ModelType>({
        title: '',
        deadline: new Date().toISOString().slice(0, 10),
        priority: '',
        course: '',
        participants: []
      })

      const courseList = ref<any[]>([])
      const studentList = ref<any[]>([])

      const priority = computed(()=> store.getters.priority)

      const dateDisabled = (ts: number) => {
        const date = new Date(ts).getDate();
        console.log('date:',date);
        
        return date < new Date().getDate();
      }

      const createProject = async () => {
        const prepared: any = JSON.parse(JSON.stringify(modelRef.value));

        const data = {
            ...prepared,
            course: 1,
            deadline: timestampToDate(prepared.deadline)
        }        
        store.dispatch('createProject', data)
        .then(res => {
          emit("projectCreate")          
        }).catch((error)=> {
          console.log(error);
        }).finally(()=>{
          
        })
      }

      const getCourses = () => {
        store.dispatch('getCourseOfSupervisor')
        .then(res => {
          courseList.value = res.data.map((item: any)=> {
            return {
              label: item.title,
              value: item.value,
            }
          });
        })
      }

      const getStudents = () => {
        store.dispatch('getStudentsOfLoggedInSupervisor')
        .then(res => {
          studentList.value = res.data.map((item: any)=> {
            return {
              label: item.username,
              value: item.id,
            }
          });
        })
      }

      onMounted(()=>{
        getCourses();
        getStudents();
      })

      return  {
        model: modelRef,
        priority,
        createProject,
        courseList,
        dateDisabled
      }
    }
  })
  </script>