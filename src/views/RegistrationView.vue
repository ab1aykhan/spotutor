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
                          :status="error.username.length ? 'error' : undefined"
                          @input="onInput('username')"
                      >
                      </n-input>
                      <n-gradient-text type="error"  v-if="error.username.length">
                        {{ error.username  }}                       
                      </n-gradient-text>
                  </div>
                  <div class="registration-form__email registration-form__item">
                      <n-input 
                          placeholder="Your Email" 
                          size="large"
                          v-model:value="registration.email"
                          :status="error.email.length ? 'error' : undefined"
                      >
                      </n-input>
                      <n-gradient-text type="error" v-if="error.email.length">
                        {{ error.email  }}                       
                      </n-gradient-text>
                  </div>
                  <div class="registration-form__birth_date registration-form__item">
                      <n-date-picker
                          placeholder="Birth Date" 
                          size="large"
                          type="date"
                          value-format="yyyy-MM-dd"
                          v-model:formatted-value="registration.profile.birth_date"
                          :status="error.birth_date.length ? 'error' : undefined"
                      />
                      <n-gradient-text type="error" v-if="error.birth_date.length">
                        {{ error.birth_date  }}                       
                      </n-gradient-text>
                  </div>
                  <div class="registration-form__course registration-form__item">
                      <n-select
                        v-model:value="registration.profile.course_of_study" 
                        :options="degree"
                        size="large"
                        placeholder="Course of Study"
                        :status="error.course_of_study.length ? 'error' : undefined"
                    />
                    <n-gradient-text type="error" v-if="error.course_of_study.length">
                        {{ error.course_of_study  }}                       
                    </n-gradient-text>
                  </div>
                  <div class="registration-form__year_study registration-form__item">
                      <n-select
                          placeholder="Year of Study" 
                          size="large"
                          v-model:value="registration.profile.year_of_study" 
                          :options="course"
                          :status="error.year_of_study.length ? 'error' : undefined"
                      >
                      </n-select>
                      <n-gradient-text type="error" v-if="error.year_of_study.length">
                        {{ error.year_of_study  }}                       
                      </n-gradient-text>
                  </div>
                  <div class="registration-form__password registration-form__item">
                      <n-input 
                          placeholder="Password" 
                          size="large"
                          v-model:value="registration.password"
                          type="password"
                          show-password-on="mousedown"
                          :status="error.password.length ? 'error' : undefined"

                      >
                      </n-input>
                      <n-gradient-text type="error" v-if="error.password.length">
                        {{ error.password  }}                       
                      </n-gradient-text>
                  </div>
                  <div class="registration-form__password_again registration-form__item">
                      <n-input 
                          placeholder="Password Again" 
                          size="large"
                          v-model:value="registration.password2"
                          type="password"
                          show-password-on="mousedown"
                          :status="error.password.length ? 'error' : undefined"
                      >
                      </n-input>
                      <n-gradient-text type="error" v-if="error.password.length">
                        {{ error.password  }}                       
                      </n-gradient-text>
                  </div>
                  <div class="registration-form__sign-in registration-form__item">
                      <n-button 
                          type="primary" 
                          style="width: 100%"
                          size="large"
                          @click="register"
                          :disabled="disableBtn"
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

type tplotOptions = {
    [key: string]: any
}


import { defineComponent, ref, onMounted, computed } from 'vue'
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
  NDatePicker,
  NGradientText
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
        Lock,
        NGradientText
    },
    setup() {
        const router = useRouter();

        const registration = ref({
            username: '', 
            password: '', 
            password2: '', 
            email: '',
            profile: {
                birth_date: '2023-01-01',
                course_of_study: null,
                year_of_study: null,
            }
        })

        const error  = ref<tplotOptions>({
            username: '',
            email: '',
            birth_date: '',
            course_of_study: '',
            year_of_study: '',
            password: ''

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

        const disableBtn = computed<boolean>(() => {
            const a: boolean = !(registration.value.username.length > 6 
                   && registration.value.email.length > 6 
                   && registration.value.password.length >= 6
                   && registration.value.password2.length >= 6
                   && registration.value.password.length === registration.value.password2.length
                   && registration.value.profile.course_of_study        
                   && registration.value.profile.year_of_study
                   && registration.value.profile.birth_date.length
           )
            return a
        })
        
        const register = async () => {
            const prepared: any = JSON.parse(JSON.stringify(registration.value));
            
            error.value = {
                username: '',
                email: '',
                birth_date: '',
                course_of_study: '',
                year_of_study: '',
                password: ''
            }

            const isValid = prepared.username 
                            && prepared.password.length >= 6
                            && prepared.password2.length >= 6
                            && prepared.password.length === prepared.password2.length
                            && prepared.email
                            && prepared.profile.birth_date
                            && prepared.profile.course_of_study
                            && prepared.profile.year_of_study

            if (isValid) {
                request({
                    method: 'post',
                    url: 'register/',
                    data: {
                        ...prepared,    
                    }
                }).then((res)=> {
                    const data = res.data                
                    if (data && data.status === "error") {
                        error.value = {
                            ...error.value,
                            ...data.error
                        }
                    }

                    if (res && res.status === 201) {
                        request({
			    	        method: 'post',
			    	        url: 'login/',
			    	        data: {
			    	        	username: prepared.username,
			    	        	password: prepared.password
			    	        }
			            }).then((res)=> {
                            localStorage.setItem('token', res.data.access)
                            router.push({ name: 'main'});
                        })
                    }
                }).catch((error)=> {
                    console.log('error:', {...error});
                })
            }

        }

        const toLogin = () => {
            router.push({ name: 'login'});
        }

        const onInput = (field: any) => {
            if(error.value[field].length) {
                error.value[field] = ''
            }
        }

        onMounted(() => {
            console.log('registration')
        })
            
        return {
            registration,
            degree,
            course,
            register,
            toLogin,
            error,
            onInput,
            disableBtn
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

  {
    password: ''
    username: '',

  }