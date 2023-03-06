<template>
    <div class="spin">
        <n-spin size="large"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { 
  NSpin,
} from 'naive-ui';
export default defineComponent({
    components: {
        NSpin
    }
})
</script>
<style lang="scss" scoped>
.spin{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;   
}
</style>