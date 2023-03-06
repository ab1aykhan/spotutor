<template>
  <div class="login">
    <div class="login__inner">
      <div class="login__item login__left">
        <banner text="Welcome to Spotutor" />
      </div>
      <div class="login__item login__right">
        <div class="login-form">
          <div class="login-form__title ">
            Sign in to continue
          </div>
          <div class="login-form__email login-form__item">
            <n-input 
              v-model:value="loginForm.username" 
              placeholder="Your Email"
              size="large"
            />
          </div>
          <div class="login-form__password login-form__item">
            <n-input 
              v-model:value="loginForm.password" 
              placeholder="Password"
              size="large"
            />
          </div>
          <div class="login-form__forget-password login-form__item">
            <n-space justify="end">
              <n-button 
                type="primary"
                text
              >
                Forgot Password
              </n-button>
            </n-space>
          </div>
          <div class="login-form__sign-in login-form__item">
            <n-button 
              type="primary" 
              style="width: 100%"
              @click="login"
            >
              Sign In
            </n-button>
          </div>
          <div class="login-form__register login-form__item">
            <n-button 
              quaternary 
              type="primary"
              style="width: 100%"
              @click="toMain"
            >
              Register
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router';

import Banner from '@/components/Banner.vue'
import { 
	NSpace,
	NButton,
	NInput,
} from 'naive-ui';
import { request } from '@/api/request';

export default defineComponent({
	components: {
		NSpace,
		NButton,
		NInput,
		Banner
	},
	setup() {
		const router = useRouter();

		const loginForm = ref({
			username: '',
			password: ''
		});

		const login = async () => {
			if (loginForm.value.password && loginForm.value.username) {
				await request({
					method: 'post',
					url: 'login/',
					data: {
						...loginForm.value
					}
				}).then(({ data }) => {
					localStorage.setItem('token', data.access);
					router.push({ name: 'main'});
				})
			}
		}

		const toMain = () => {
			router.push({ name: 'registration'});
		}
		return {
			loginForm,
			toMain,
			login
		}
	},
})
</script>

<style lang="scss">
.login{
    height: 100%;
    &__inner{
        display: flex;
        height: inherit;
    }
    &__item{
        flex: 1;
        height: inherit;
    }
    &__right{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.login-form{
    max-width: 430px;
    width: 100%;
    &__title{
        text-align: center;
        font-weight: 700;
        font-size: 26px;
        line-height: 34px;
        margin-bottom: 50px;
    }
    &__email{
        margin-bottom: 16px;
    }
    &__password{
        margin-bottom: 16px;
    }
    &__item{
        margin-bottom: 16px;
    }
    

}
</style>