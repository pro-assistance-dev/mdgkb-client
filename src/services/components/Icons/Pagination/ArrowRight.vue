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
    <use xlink:href="#arrow-right"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="arrow-right">
      <path d="M366.436 875.054C363.723 877.84 360.479 880.055 356.895 881.568C353.312 883.08 349.462 883.859 345.572 883.859C341.683 883.859 337.832 883.08 334.249 881.568C330.666 880.055 327.421 877.84 324.708 875.054C319.145 869.342 316.031 861.683 316.031 853.71C316.031 845.736 319.145 838.077 324.708 832.366L636.58 512.494L324.708 192.558C321.9 189.684 319.686 186.284 318.193 182.555C316.699 178.825 315.954 174.837 316.002 170.82C316.049 166.802 316.888 162.833 318.47 159.14C320.051 155.446 322.345 152.1 325.22 149.294C327.958 146.618 331.197 144.508 334.752 143.086C338.306 141.663 342.106 140.955 345.934 141.003C349.762 141.05 353.544 141.852 357.062 143.363C360.58 144.873 363.765 147.063 366.436 149.806L698.084 490.158C703.909 496.134 707.169 504.148 707.169 512.494C707.169 520.839 703.909 528.854 698.084 534.83L366.436 875.054Z" ></path>
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
