<template>
  <div class="page">
    <div class="page__inner">
        <div class="page__title">Student</div>
        <div class="page__body">
            <div class="student">
                <div class="student__user-card student__item">
                    <user-card />
                </div>
                <div class="student__task-cards student__item">
                    <template
                        v-for="(item, index) in taskInfo"
                        :key="index"
                    >
                        <Card  
                          :title="item.title"
                          :description="item.description"
                          :icon-name="item.iconName"
                        />
                    </template>
                </div>
                <div class="student__projects student__item" >
                    <div class="block">
                        <div class="block__title">
                            My projects
                        </div>
                        <div class="block__body">
                            <project-card />
                        </div>
                    </div>
                </div>
                <div class="student__statistics student__item">
                    Statistics
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import UserCard from '@/components/UserCard.vue'
import ProjectCard from '@/components/ProjectCard.vue';
import Card from '@/components/Card.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
    components: {
        UserCard,
        Card,
        ProjectCard,
    },
    setup() {
        const taskInfo = ref([
            {
              title: 'Pending tasks',
              description: '23',
              iconName: 'pending'
            },
            {
              title: 'Total tasks',
              description: '120',
              iconName: 'total'
            }
        ]);

        return {
            taskInfo
        }
    },
})
</script>
<style lang="scss" scoped>
.student{
    &__item{
        margin-bottom: 40px;
    }
    &__item:last-child{
        margin-bottom: 0;
    }
    &__task-cards{
        display: flex;
        gap: 10px;
    }
}
</style>