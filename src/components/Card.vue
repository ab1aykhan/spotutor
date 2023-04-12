<template>
  <div class="card">
    <div class="card__inner">
      <div class="card__left">
        <img
          :src="icon"
          class="card__icon"
        >
      </div>
      <div class="card__right">
        <h6 class="card__title">
          {{ title }}
        </h6>
        <div class="card__description">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		title: {
			type: String,
			required: true
		},
		description: {
			type: [String, Number],
			required: true
		},
		iconName: {
			type: String,
			required: true,
			default: 'pending'
		},
	},

	setup(props) {
		const icon = require(`@/assets/icons/${props.iconName}.svg`)

		return {
			icon
		}  
	},
})
</script>


<style lang="scss" scoped>
.card{
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 0px 26.1104px rgba(18, 15, 38, 0.04);
    border-radius: 13.0552px;
    width: 256px;
    height: 116px;
    &__inner{
        display: flex;
    }
    &__left{
        margin-right: 22px;
    }
    &__icon{
        width: 50px;
        height: 50px;
    }
    &__title{
        color: $main-gray;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        margin: 0 0 6px 0;
    }
    &__description{
        font-weight: 700;
        font-size: 28px;
        line-height: 130%;
    }
}
</style>