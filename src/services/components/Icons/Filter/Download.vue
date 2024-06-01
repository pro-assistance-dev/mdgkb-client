<template>
  <svg
    class="icon"
    :class="iconClass"
    :style="{ 
      margin: margin, 
      width: size, 
      height: size, 
      fill: hoverColor ? (hovering ? hoverColor : color) : (hovering ? color : color),
    }" 
    @mouseenter="hovering = true" 
    @mouseleave="hovering = false"
  >
    <use xlink:href="#download"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="download">
      <path d="M15.6443 5.06141C15.0797 5.29331 15.0998 5.06141 15.0998 12.1393C15.0998 15.7388 15.0696 18.6728 15.0293 18.6728C14.9889 18.6728 14.1521 17.8763 13.1842 16.9083C11.6819 15.4061 11.3592 15.1338 11.0467 15.0733C10.724 15.0229 10.6333 15.0632 10.3611 15.3254C10.1292 15.5573 10.0586 15.7186 10.0586 16.0211C10.0586 16.3941 10.1594 16.5151 12.8615 19.2071C15.4326 21.7681 15.6947 22 16.0073 22C16.3198 22 16.582 21.7681 19.153 19.2071C21.9156 16.4546 21.9559 16.4042 21.9559 15.9908C21.9559 15.4867 21.6535 15.1641 21.109 15.0733C20.736 15.0128 20.7259 15.0229 18.8808 16.868C17.0357 18.6929 17.0155 18.7131 17.0155 18.3703C17.0054 18.1787 16.9953 15.2145 16.9853 11.7965L16.9651 5.56554L16.713 5.31348C16.4307 5.03117 15.9669 4.92026 15.6443 5.06141Z" ></path>
      <path d="M5.30247 20.3872L5 20.6997L5.04033 22.081C5.07058 23.4321 5.08066 23.4825 5.44363 24.2488C6.09899 25.6099 7.17782 26.5173 8.59945 26.8904C9.47663 27.1122 22.5335 27.1223 23.4006 26.8904C25.044 26.4669 26.3245 25.2671 26.8084 23.7043C26.9496 23.2506 27 22.7868 27 21.8794C27 20.6796 27 20.6695 26.7076 20.3771C26.3144 19.9839 25.901 19.9839 25.4675 20.3771L25.1347 20.6695L25.1045 21.8189C25.0843 22.8776 25.0541 23.0086 24.7516 23.6035C24.3987 24.3093 23.7938 24.8235 23.088 25.0251C22.5839 25.1663 9.4363 25.1663 8.93217 25.0251C8.30706 24.8436 7.64161 24.3093 7.29881 23.7144C7.00642 23.2002 6.98625 23.0691 6.93584 21.9197L6.88543 20.6695L6.5527 20.3771C6.11916 19.9839 5.70577 19.9839 5.30247 20.3872Z" ></path>
    </symbol>
  </svg>
</template>

<script lang="ts" setup>
const hovering = ref(false);
const props = defineProps({
  color: { type: String as PropType<string>, default: '' },
  hoverColor: { type: String as PropType<string>, default: '' },
  size: { type: String as PropType<string>, default: '' },
  margin: { type: String as PropType<string>, default: '0' },
  iconClass: { type: String as PropType<string>, required: false, default: '' },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
  .hidden { display: none }
  .icon {
    width: $icon-width;
    height: $icon-height;
    fill: $icon-color;
    transition: $icon-transition;
  }

  .icon:hover {
    fill: $icon-hover-color;
  }

</style>
