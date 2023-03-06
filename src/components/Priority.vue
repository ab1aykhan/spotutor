<template>
  <div :class="[`priority priority--${type}`]">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	props: {
		text: {
			type: String,
			default: 'priority'
		},
		type: {
			type: String,
			default: 'high'
		}
	},  
	setup(props) {
		const a = ref({})


		return a;
	},
})
</script>
<style scoped lang="scss"> 
.priority{
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    border-radius: 4px;
    padding: 6px 12px;
    text-transform: uppercase;
    max-width: 106px;
    height: 30px;
    text-align: center;
    &--medium{
        border: 1.5px solid #4DD684;
        color: #4DD684;
    }
    &--high{
        border: 1.5px solid #F83A24;
        color: #F83A24;
    }
    &--low {
        border: 1.5px solid #FDDE85;
        color: #FDDE85;    
    }
}
</style>