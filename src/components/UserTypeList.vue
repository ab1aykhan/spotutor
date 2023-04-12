<template>
    <div class="user-type-list">
        <div class="user-type-list__title">{{ title }}</div>
        <div class="user-type-list__body">
            <user-card-mini 
                v-for="(i, index) in list"
                :key="index"
                :user="i"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { NAvatar } from 'naive-ui'
import { defineComponent, PropType } from 'vue'
import UserCardMini from './UserCardMini.vue'
UserCardMini
export default defineComponent({
    components:{
        NAvatar,
        UserCardMini
    },
    props: {
        title: {
            type: String,
            default: 'Supervisor'
        },
        list: {
            type: Array as PropType<Array<any>>,
            default: ()=> {
                return [{username: '', photo: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'}]
            }
        }
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
.user-type-list{
    &__title{
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #616161;
    }
    &__body{
        display: flex;
    }
}
</style>