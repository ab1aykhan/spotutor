<template>
  <div class="logo">
    <div class="logo__icon">
        <img src="@/assets/icons/logo.svg" alt="logo">
    </div>
    <div class="logo__text">spotutor</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo{
    display: flex;
    align-items: center;
    font-family: 'Poppins';
    &__icon{
        margin-right: 12px;
    }
    &__text{
        font-weight: 600;
        font-size: 20px;
        line-height: 120%;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }
}
</style>