<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__header">
        <div class="page__title">
          Projects
        </div>       

        <n-button
          type="info" 
          @click="showModal"
        >
          Create project
        </n-button>
      </div>
      <div class="page__body">
        <n-modal
          v-model:show="isOpen"
          preset="dialog"
          class="projects__modal"
        >
          <create-project-form @projectCreate="projectCreate"/>
        </n-modal>
        <div class="projects">
          <div class="projects__nav">
            <n-tabs
              type="line"
              animated
            >
              <n-tab-pane
                name="All"
                tab="All"
              >
                <div class="projects__list">
                  <project-card
                    v-for="(i, index) in projects"
                    :key="index"
                    :project="i"
                    @click="toProject(i)"
                    style="max-width: 358px; width:100%"
                  />
                </div>
              </n-tab-pane>
              <n-tab-pane
                name="Ongoing"
                tab="Ongoing"
              >
                <div class="projects__list" />
              </n-tab-pane>
              <n-tab-pane
                name="Completed"
                tab="Completed"
              >
                <div class="projects__list" />
              </n-tab-pane>
            </n-tabs>
          </div>
          <div class="projects__list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { NTabs, NTabPane, NButton, NModal } from 'naive-ui'
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: {
		NTabs,
		NTabPane,
		ProjectCard,
		NButton,
		NModal,
		CreateProjectForm
	},
	setup() {
		const loader = ref(true)
		const store = useStore();
		const isOpen = ref(false);
		const router = useRouter();

		const projects = computed(()=> store.getters.myProjects)
		
		const showModal = () => {      
			isOpen.value = !isOpen.value
		}

    const toProject = (item: any) => {
      router.push({name: 'tasks', query: item })
		}

    const projectCreate = () => {
			isOpen.value = false;
      fetchProjects()
    }

    const fetchProjects = () => {
			loader.value = true;
			store.dispatch('myProjects').finally(()=>{
				loader.value = false;
			})
    }
    
		onBeforeMount(()=> {
      fetchProjects();
		});



		return {
			projects,
			isOpen,
			showModal,
      toProject,
      projectCreate
		}
	},
})
</script>


<style lang="scss" scoped>
.projects{
  &__list{
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
}
.page{
  &__header{
    display: flex;
    justify-content: space-between;
  }
}
</style>