<template>
  <div class="user-card">
    <div class="user-card__item">
      <img
        src="https://www.google.com/url?sa=i&url=http%3A%2F%2Fyarmama.com%2Fload%2Furl%3Dhttp%3A%2Far.javamem.com%2Fpictures%2Fblank-facebook-profile&psig=AOvVaw3WMpMLOCrsNWXTCz7XAakY&ust=1673773160617000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCvwYfZxvwCFQAAAAAdAAAAABAJ"
        alt=""
        class="user-card__avatar"
      >
    </div>
    <div class="user-card__item">
      <div class="user-card__name">
        {{ user.username }}
      </div>
      <div class="user-card__role">
        {{ user.role }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		user: {
			type: Object,
			default: ()=>   {
				return {
					username: 'Kamila Abylay',
					role: 'Student'
				} 
			}
		}
	}
})
</script>

<style lang="scss" scoped>
.user-card{
    display: flex;
    align-items: center;
    &__avatar{
        margin-right: 16px;
        height: 60px;
        width: 60px;
    }
    &__name{
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        margin-bottom: 8px;
    }
    &__role{
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: $main-gray;
    }
}
</style>