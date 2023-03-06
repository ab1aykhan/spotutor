<template>
    <div class="registration">
      <div class="registration__inner">
          <div class="registration__item registration__left">
              <banner text="Let’s Get Started"/>
          </div>
          <div class="registration__item registration__right">
              <div class="registration-form">
                  <div class="registration-form__title ">
                    Create an new account
                  </div>
                  <div class="registration-form__full_name registration-form__item">
                      <n-input 
                          placeholder="Full Name" 
                          size="large"
                          v-model:value="registration.username"
                      >
                      </n-input>
                  </div>
                  <div class="registration-form__email registration-form__item">
                      <n-input 
                          placeholder="Your Email" 
                          size="large"
                          v-model:value="registration.email"

                      >
                      </n-input>
                  </div>
                  <div class="registration-form__birth_date registration-form__item">
                      <n-date-picker
                          placeholder="Birth Date" 
                          size="large"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          v-model:formatted-value="registration.profile.birth_date"
                      />
                  </div>
                  <div class="registration-form__course registration-form__item">
                      <n-select
                        v-model:value="registration.profile.course_of_study" 
                        :options="degree"
                        size="large"
                        placeholder="Course of Study"
                      />
                  </div>
                  <div class="registration-form__year_study registration-form__item">
                      <n-select
                          placeholder="Year of Study" 
                          size="large"
                          v-model:value="registration.profile.year_of_study" 
                          :options="course"
                      >
                      </n-select>
                  </div>
                  <div class="registration-form__password registration-form__item">
                      <n-input 
                          placeholder="Password" 
                          size="large"
                          v-model:value="registration.password"
                          type="password"
                          show-password-on="mousedown"
                      >
                      </n-input>
                  </div>
                  <div class="registration-form__password_again registration-form__item">
                      <n-input 
                          placeholder="Password Again" 
                          size="large"
                          v-model:value="registration.password2"
                          type="password"
                          show-password-on="mousedown"
                      >
                      </n-input>
                  </div>
                  <div class="registration-form__sign-in registration-form__item">
                      <n-button 
                          type="primary" 
                          style="width: 100%"
                          size="large"
                          @click="register"
                      >
                        Register
                      </n-button>
                  </div>
                  <div class="registration-form__register registration-form__item">
                      <n-button 
                      quaternary 
                      type="primary"
                      style="width: 100%"
                      size="large"
                      @click="toLogin"
                      >
                        Back to Log in
                      </n-button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </template>
    
<script lang="ts">

interface RegistrationForm{
    username: string, 
    password: string, 
    password2: string, 
    email: string,
    profile: {
        birth_date: string
        course_of_study: string | null
        year_of_study: string | null
    }
}


import { defineComponent, ref, onMounted } from 'vue'
import Email from '@/assets/icons/Email.vue';
import Profile from '@/assets/icons/Profile.vue';
import Calendar from '@/assets/icons/Calendar.vue'
import Book from '@/assets/icons/Book.vue';
import Banner from '@/components/Banner.vue'
import Lock from '@/assets/icons/Lock.vue';

import { 
  NIcon,
  NButton,
  NInput,
  NInputGroup,
  NSelect,
  NDatePicker
} from 'naive-ui';

import { request } from '@/api/request';
import { useRouter } from 'vue-router';




export default defineComponent({
    components: {
        NIcon,
        NButton,
        NInput,
        NInputGroup,
        NSelect,
        NDatePicker,
        Email,
        Profile,
        Calendar,
        Book,
        Banner,
        Lock
    },
    setup() {
        const router = useRouter();

        const registration = ref<RegistrationForm>({
            username: '', 
            password: '', 
            password2: '', 
            email: '',
            profile: {
                birth_date: '2007-06-30 12:08:55',
                course_of_study: null,
                year_of_study: null,
            }
        })

        const degree = ref([
            {
                label: 'Bachelor',
                value: 'Bachelor',
            },
            {
                label: 'Master',
                value: 'Master',
            }
        ])

        const course = ref([
            {
                value: '1 course',
                label: '1 course'
            },
            {
                value: '2 course',
                label: '2 course'
            },
            {
                value: '3 course',
                label: '3 course'
            },
            {
                value: '4 course',
                label: '4 course'
            },
        ])
        
        const register = async () => {
            const prepared: any = JSON.parse(JSON.stringify(registration.value));
            prepared.profile.birth_date = prepared.profile.birth_date.slice(0, -9);

            request({
                method: 'post',
                url: 'register/',
                data: {
                    ...prepared
                }
            }).then((res)=> {
                console.log(res);
                if (res.status === 201) {
                    request({
				        method: 'post',
				        url: 'login/',
				        data: {
				        	username: prepared.username,
				        	password: prepared.password
				        }
			        }).then(()=> {
                        router.push({ name: 'main', params: { access: 'eduardo'}});
                    })
                }
            }).catch((error)=> {
                console.log(error);
            })
        }

        const toLogin = () => {
            router.push({ name: 'login'});
        }

        onMounted(() => {
            console.log('registration')
        })
            
        return {
            registration,
            degree,
            course,
            register,
            toLogin
        }
    },
})
</script>


  <style lang="scss">
  .registration{
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
  .registration-form{
      max-width: 430px;
      width: 100%;
      &__title{
          text-align: center;
          font-weight: 700;
          font-size: 26px;
          line-height: 34px;
          margin-bottom: 50px;
      }
      &__item{
          margin-bottom: 16px;
      }
      &__password_again{
        margin-bottom: 30px;
      }
      
  
  }
  </style>