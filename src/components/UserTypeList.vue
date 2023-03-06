<template>
    <div class="user-type-list">
        <div class="user-type-list__title">{{ title }}</div>
        <div class="user-type-list__body">
            <n-avatar
                round
                :size="50" 
            />
        </div>
    </div>
</template>
<script lang="ts">
import { NAvatar } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
    components:{
        NAvatar
    },
    props: {
        title: {
            type: String,
            default: 'Supervisor'
        },
        src: {
            type: String,
            default: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
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
}
</style>