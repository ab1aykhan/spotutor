<template>
<div class="assignment-card">
    <div class="assignment-card__inner">
        <div class="assignment-card__info">
            <div class="assignment-card__title">{{ title }}</div>
            <div class="assignment-card__description">{{ description }}</div>
            <div class="assignment-card__progress-bar">
                <n-progress type="line" :percentage="25" />
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { NProgress } from 'naive-ui'
import { defineComponent } from 'vue'


export default defineComponent({
    components: {
        NProgress
    },
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        description: {
            type: String,
            default: 'Description'    
        }
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
.assignment-card{
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(10, 24, 47, 0.05);
    border-radius: 8px;
    padding: 6px;
    &__title{
        margin-bottom: 4px;
        font-weight: 500;
        font-size: 17px;
        line-height: 130%;
        color: #0B121E;
    }
    &__description{
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #A3A3A3;
        margin-bottom: 18px;
    }
    &__progress-bar{
    }
}
</style>