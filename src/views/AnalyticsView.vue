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
              />
            </div>
            <div class="analytics__users">
              <user-type-list 
                title="Supervisor"
              />

              <user-type-list 
                title="Students"
              />
            </div>
            <div class="analytics__tasks">
              <template
                v-for="(item, index) in taskInfo"
                :key="index"
              >
                <Card 
                  :title="item.title"
                  :description="item.description"
                  :icon-name="item.iconName"
                />
              </template>
            </div>
            <div class="analytics__statistic">
              <div class="block">
                <div class="block__title">
                  Statistics                  
                </div>
                <div class="block__range">
                  <n-date-picker
                    v-model:value="range"
                    type="daterange"
                    clearable
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
		const range = ref<[number, number]>([1183135260000, Date.now()])
		const loader = ref(true)
		const options = ref([
			{
				label: 'Math app Project',
				value: 'Math app Project'
			}
		])

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
    
		onBeforeMount(()=> {
			loader.value = true;
			Promise.all([
				request({ method: 'get', url: 'analytics/'}),
				request({ method: 'get', url: 'analytics/extended/',})
			]).finally(() => {
				loader.value = false;
			})
		})
    
		return {
			options,
			taskInfo,
			data,
			optionsChart,
			chartStyle,
			range,
			loader
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