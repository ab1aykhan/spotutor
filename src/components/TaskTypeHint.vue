<template>
    <div class="user-type-hint">
        <div class="user-type-hint__inner">
            <div class="user-type-hint__item">
                <div :class="['user-type-hint__type', `${type.class}`]">{{ type.type }}</div>
            </div>
            <div class="user-type-hint__item">
                <div class="user-type-hint__count">{{ type.count }} task</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: {
        task: {
            type: Object,
            default: ()=>{
                return {
                    type: 'complete_tasks',
                    count: 0
                }
            }
        }
    },
    setup(props) {
        const type = computed(()=> {
            return {
                type: props.task.type === 'complete_tasks' 
                      ? 'COMPLETE' : props.task.type === 'proposed_tasks' 
                      ? 'PROPOSED' : props.task.type === 'in_progress_tasks' 
                      ? 'IN PROGRESS' : 'COMPLETE',
                count: props.task.count,
                class: `user-type-hint__${props.task.type}`
            }
        })
        return {
            type
        }
    },
})
</script>
<style lang="scss" scoped>
.user-type-hint{
    &__inner{
        display: flex;
    }
    &__item:first-child{
        margin-right: 60px;
    }
    &__count{
        color: #A3A5A9;
        font-weight: 700;
        font-size: 15px;
    }
    &__type{
        color: #0B121E;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        position: relative;
        font-weight: 600;
    }
    &__type::before{
        content: "";
        display: inline-block;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 5px;
        width: 6px;
        height: 6px;
        margin-right: 5px;
        background-color: #0B121E;
    }
    &__complete_tasks::before{
        background-color: #4DD684;
    }
    &__proposed_tasks::before{
        background-color: #5BB1F9;
    }
    &__in_progress_tasks::before{
        background-color: #FDDE85;
    }
}
</style>