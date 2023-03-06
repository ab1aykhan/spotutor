<template>
  <div class="banner">
    <div class="banner__inner">
        <img 
            src="@/assets/icons/logoWhite.svg" 
            alt="logo" 
            class="banner__logo"
        />

        <div class="banner__text">
            {{ text }}
        </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
    name: 'Banner',
    props: {
        img: {
            type: String,
            default: '@/assets/icons/logo.svg'
        },
        text: {
            type: String,
            default: 'Welcome to Spotutor'
        }
    },
    computed: {
        icon: function (): any {
            // return require(this.img)
        }
    }
}
</script>

<style lang="scss" scoped>
.banner{
    background: linear-gradient(169.06deg, #5BB1F9 -26.08%, #0B1E71 183.93%);
    height: 100%;
    width: 100%;
    &__inner{
        height: inherit;
        width: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    &__logo{
        margin-bottom: 40px;
    }
    &__text{
        font-weight: 700;
        font-size: 34px;
        line-height: 44px;
        text-align: center;
        color: #ffffff;
    }
}
</style>