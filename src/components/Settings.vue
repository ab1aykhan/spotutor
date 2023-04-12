<template>
    <n-card>
        <n-tabs
          class="card-tabs"
          default-value="edit-profile"
          size="large"
          animated
          style="margin: 0 -4px"
          pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        >
          <n-tab-pane name="edit-profile" tab="Edit profile">
            <user-card style="margin-bottom: 22px" :user="usercard"/>
            <n-upload
                @beforeUpload="handleAvatar"
                :headers="{
                'naive-info': 'hello!'
                }"
                :data="{
                  'naive-data': 'cool! naive!'
                }"
                :action="profile.picture_url"
                :file-list-style="{display: 'none'}"
            >
                <n-button 
                    quaternary
                    style="color: #5BB1F9; 
                           font-weight: 600;
                           margin-bottom: 32px"
                    :render-icon="renderIcon"
                >
                    Change photo
                </n-button> 
            </n-upload>
            <n-form>
                <n-form-item :show-label="showLabel">
                    <n-input 
                        size="large" 
                        placeholder="Name & Surname" 
                        v-model:value="profile.username"
                        :disabled="loading"
                    />
                </n-form-item>
                <n-form-item :show-label="showLabel">
                    <n-input 
                    size="large" 
                    placeholder="Email" 
                    v-model:value="profile.email"
                    :disabled="loading"

                    />
                </n-form-item>
                <n-form-item :show-label="showLabel">
                    <n-date-picker 
                        size="large" 
                        placeholder="Birth Date"
                        style="width:100%"
                        value-format="yyyy-MM-dd"
                        v-model:formatted-value="profile.birth_date"
                        :disabled="loading"

                    />
                </n-form-item>
                <n-form-item :show-label="showLabel">
                    <n-select size="large" placeholder="Degree" :disabled="loading"/>
                </n-form-item>
                <n-form-item :show-label="showLabel">
                    <n-select size="large" placeholder="Course" :disabled="loading"/>
                </n-form-item>
                <n-form-item :show-label="showLabel">
                    <n-space>
                        <n-button 
                            type="primary"
                            @click="editProfile"
                        >
                            Save changes
                        </n-button>
                        <n-button 
                            quaternary
                            style="color: #5BB1F9"
                        >
                            Cancel
                        </n-button> 
                    </n-space>
                </n-form-item>
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="language" tab="Language">
            <n-form>
                <n-form-item>
                    <n-select
                        :options="languageOption"
                        style="width: 60%" 
                        placeholder="Select language"
                        v-model:value="currentLang"
                    />
                </n-form-item>
                <n-form-item>
                    <n-button 
                        size="large" 
                        type="primary"
                        @click="editProfile"
                    >
                        Save changes  
                    </n-button>
                </n-form-item>
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="change-password" tab="Change password">
            <n-form>
                <n-form-item label="Old passsword">
                    <n-input 
                        size="large" 
                        type="password"
                        show-password-on="mousedown"
                        v-model:value="password.old_password"

                    />
                </n-form-item>
                <n-form-item label="New Password">
                    <n-input 
                        size="large" 
                        type="password"
                        show-password-on="mousedown"
                        v-model:value="password.new_password1"

                    />
                </n-form-item>
                <n-form-item label="Confirm your password">
                    <n-input 
                        size="large" 
                        type="password"
                        show-password-on="mousedown"
                        v-model:value="password.new_password2"

                    />
                </n-form-item>
                <n-form-item :show-label="showLabel">
                    <n-button 
                        type="primary"
                        @click="changePassword"
                    >
                            Save changes
                    </n-button>
                </n-form-item>
            </n-form>
          </n-tab-pane>
        </n-tabs>
    </n-card>
</template>
<style lang="scss" scoped>
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import UserCard from './UserCard.vue';

import EmailIcon from '@/assets/icons/Email.vue'
import pencilIcon from '@/assets/icons/pencil.vue'
import { h } from 'vue'
import { 
    NCard, 
    NTab, 
    NTabPane, 
    NTabs, 
    NButton,
    NSpace,
    NForm,
    NFormItem,
    NInput,
    NButtonGroup,
    NDatePicker,
    NSelect,
    NIcon,
    NAvatar,
    useMessage,
    NUpload,
    UploadFileInfo
} from 'naive-ui'
import { useStore } from 'vuex';
import { request } from '@/api/request';
import axios from 'axios';


export default defineComponent({

    props: {
        data: {
            type: Object,
            default: ()=> {
                return {
                    username: '',
                    email: '',
                    birth_date: '',
                    year_of_study: '',
                    course_of_study: ''
                }
            }
        }
    },
    components: {
        pencilIcon,
        EmailIcon,
        UserCard,
        NCard, 
        NTab, 
        NTabPane, 
        NTabs, 
        NButton,
        NSpace,
        NForm,
        NFormItem,
        NInput,
        NButtonGroup,
        NDatePicker,
        NSelect,
        NIcon,
        NAvatar,
        NUpload
    },
    setup(props) {
        const showLabel: boolean = false
        const store = useStore();
        let loading = ref(false);        
        let profile: any = ref({});
        let usercard: any = ref({});
        const message = useMessage();

        const renderIcon = () => {
            return h(pencilIcon)
        }
        const currentLang = ref('RU')

        const password = ref({
            old_password: '',
            new_password1: '',
            new_password2: ''
        })

        const languageOption = [
                {
                  label: "Русский",
                  value: 'RU',
                },
                {
                  label: "English",
                  value: 'ENG',
                },
        ]

        const handleAvatar = (data: { file: any }) => {
            const file = data.file;
            console.log(file);
            let formData = new FormData();
            if (file) {
                const blob = new Blob([file.file], { type: file.type })
                formData.append(file.name, blob);
                const data = { file: formData}
                request({ method: 'post', url: 'profile/upload_image/', data, 
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }).then(()=> {
                    fetchProfile();
                    message.success(
                        "Status changed successfully"
                    )
                }).catch(()=> {
                    message.success(
                        "Status changed successfully"
                    )
                })
            }
        }

        const editProfile = async () => {
            loading.value = true;
            const data = await store.dispatch('editProfile', {
                year_of_study: profile.value.year_of_study,
                birth_date: profile.value.birth_date,
                course_of_study: profile.value.course_of_study,
                language: currentLang.value,
                picture_url: profile.value.picture_url
            })
            profile.value = {
                ...data[0]
            } 
            loading.value = false;
        }

        const fetchProfile = async () => {
            const data = await store.dispatch('dashboard');
            profile.value = {
                ...data[0],
                birth_date: data[0].birth_date
                
            }

            usercard.value = {
                username: data[0].username,
				role: data[0].is_advisor,
                picture_url: data[0].photo
            }            
        }

        const changePassword = () => {
            store.dispatch('changePassword', password.value).then(({ data })=> {
                if (data.status === 'error') {
                    message.error(
                        data.error,
                        { duration: 5000 }
                    )
                    return;
                } else{
                    password.value = {
                        old_password: '',
                        new_password1: '',
                        new_password2: ''
                    }
                    
                    message.success(
                    data.success,
                    { duration: 5000 }
                )
                }
            })
        }

        onMounted(()=>{
            fetchProfile();
        })
        return {
            showLabel,
            renderIcon,
            languageOption,
            profile,
            editProfile,
            loading,
            usercard,
            currentLang,
            password,
            changePassword,
            handleAvatar
        }
    },
})
</script>
