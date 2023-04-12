<template>
  <div :class="[`priority priority--${priority.type}`]">
    {{ priority.text }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
	props: {
		text: {
			type: String,
			default: 'priority'
		},
		type: {
			type: String,
			default: 'high'
		},
    code: {
      type: Number,
    }
	},  
	setup(props) {
		const a = ref({})

    const priority = computed(()=> {
      const code = props.code
      if (code) {
        switch(code){
          case 1 : 
            return {
              type: 'high',
              text: 'high priority'
            }
          case 2 : 
            return {
              type: 'medium',
              text: 'medium priority'
            }
          case 3 : 
            return {
              type: 'low',
              text: 'low priority'
            }
        }
      }
      return {
        type: props.type,
        text: props.text
      }
    })

		return {
      priority
    };
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
    min-width: 106px;
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