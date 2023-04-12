<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__title">
        Analytics
      </div>
      <div class="page__body">
        <loader v-if="loader" />
        <div
          v-else
          class="analytics"
        >
          <div class="analytics__inner">
            <div class="analytics__project">
              <n-select 
                :options="options"
				v-model:value="options[0].value"
              />
            </div>
            <div class="analytics__users">
              <user-type-list
                title="Participants"
				:list="analytics.participants"
              />
            </div>
            <div class="analytics__tasks">
                <Card 
                  title="Complete tasks"
                  :description="analytics.completed_tasks"
                  icon-name="success"
                />
				<Card 
                  title="Pending tasks"
                  :description="analytics.assigned_tasks"
                  icon-name="pending"
                />
            </div>
            <div class="analytics__statistic">
              <div class="block">
                <div class="block__title">
                  Statistics                  
                </div>
                <div class="block__range">
                  <n-date-picker
                    v-model:formatted-value="range"
					value-format="yyyy-MM-dd"
                    type="daterange"
                    clearable
					@confirm="filterDate"
                  />
                </div>
                <div class="block__body">
                  <Bar
                    :style="chartStyle"
                    :data="data"
                    :options="optionsChart"
                  />
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NSelect, NDatePicker } from 'naive-ui'
import { defineComponent, onBeforeMount, ref } from 'vue'
import Card from '@/components/Card.vue'
import UserTypeList from '@/components/UserTypeList.vue'
import Loader from '@/components/UI/Loader.vue';

import { Bar } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js'
import { request } from '@/api/request'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Analytics {
	assigned_tasks: number,
	completed_tasks: number,
	participants: [],
}

export default defineComponent({
	components: {
		NSelect,
		NDatePicker,
		Card,
		Bar,
		UserTypeList,
		Loader
	},
	setup() {
		const range = ref<[string, string]>(['2007-06-30', '2007-07-30'])
		const loader = ref(true);
		const options = ref<Array<{id: number, value: string}>>([{id: 0, value: ''}]);
		const analytics = ref<Analytics>({
			assigned_tasks: 0,
			completed_tasks: 0,
			participants: [],
		});
	

		const optionsChart = ref({
			responsive: true,
			maintainAspectRatio: false
		})

		const data = {
			labels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			datasets: [
				{
					label: 'Data One',
					backgroundColor: '#5BB1F9',
					data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
				}
			]
		}

		const chartStyle = ref({
			height:'300px',
		})

		const filterDate = async (value: any) =>{
			console.log('aaaaa');
			const formatDate = (timestap: any) => {
				const date = new Date(timestap)
				return date.toISOString().split('T')[0]
			}
			
			const [start, end] = [formatDate(value[0]), formatDate(value[1])]
			const id = 	options.value[0].value
			console.log(id, options.value);

			await getAnalytics(id, [start, end])
		}

		const getCourses = async ()=> {
			const { data } = await request({ method: 'get', url: 'projects/my/'})
			options.value = data.map((item: any) => { 
				const data = { label: item.title, value: item.id }
				return data;
			})
			return data
		}

		const getAnalytics = async (id: string | number, date: [string, string] ) => {
			const { data } = await request({ method: 'get', url: `analytics/?project_id=${id}&start_date=${date[0]}&end_date=${date[1]}`})
			analytics.value = {
				...data[0],
			};
		}

		const fetchAnalytics = async () => {
			loader.value = true;

			const courses = await getCourses()
			await getAnalytics(courses[0].id, range.value)
			const extended = await request({ method: 'get', url: 'analytics/extended/'})
			loader.value = false;
		}
    
		onBeforeMount(()=> {
			fetchAnalytics();
		})
    
		return {
			options,
			data,
			optionsChart,
			chartStyle,
			range,
			loader,
			analytics,
			filterDate
		}
	},
})
</script>


<style lang="scss" scoped>
.n-select{
  width: 198px;
}
.n-date-picker {
  width: 300px;
}
.analytics{
  &__project{
    margin-bottom: 14px;
  }
  &__tasks{
    display: flex;
    gap: 10px;
    margin-bottom: 40px; 
  }
  &__users{
    display: flex;
    gap: 36px;
    margin-bottom: 40px ;
  }
}
</style>