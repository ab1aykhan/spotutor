<template>
  <n-config-provider :theme-overrides="themeOverrides" style="height:100%">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NConfigProvider, GlobalThemeOverrides, NMessageProvider } from 'naive-ui'

export default defineComponent({
  components: {
    NConfigProvider,
    NMessageProvider
  },
  setup() {
    const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#5BB1F9'
    },
    Button: {
      colorPrimary: '#5BB1F9',
      colorHoverPrimary: '#5BB1F9',
      colorPressedPrimary: '#5BB1F9',
      colorFocusPrimary: '#5BB1F9',
      colorDisabledPrimary: '#5BB1F9',
      fontWeight: '700',
      borderPressed: '1px solid #5BB1F9',
      borderFocus: '1px solid #5BB1F9'
    },
    DatePicker: {
      itemColorHover: "#5BB1F9",
      itemColorActive: "#5BB1F9",
      itemTextColorCurrent: "#5BB1F9"
    },
    Input: {
      paddingLarge: '16px',
      heightLarge: '48px',
      caretColor: '#5BB1F9',
      borderHover: '1px solid #5BB1F9',
      borderFocus: '1px solid #5BB1F9',
      placeholderColor: '#9098B1'
    },
    Select: {
      peers: {
        InternalSelection: {
          borderHover: '1px solid #5BB1F9',
          borderFocus: '1px solid #5BB1F9',
          placeholderColor: '#9098B1'
        }
      }
    }
  }
  return {
    themeOverrides
  }
  },
})
</script>


<style lang="scss">
.n-select:hover{
  border-color: #5BB1F9 !important;
}
</style>
