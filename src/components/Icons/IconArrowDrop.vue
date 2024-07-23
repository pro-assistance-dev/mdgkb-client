<template>
  <svg
    class="icon"
    :class="iconClass"
    :style="{
      margin: margin,
      width: size,
      height: size,
      fill: hoverColor ? (hovering ? hoverColor : color) : hovering ? color : color,
    }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <use xlink:href="#arrow-drop"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="arrow-drop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
      <path
        d="M5.06858 9.14787L4 10.2165L8.89633 15.1287C11.5917 17.8241 13.8724 20.041 13.9522 20.041C14.0478 20.041 16.3445 17.8241 19.0558 15.0968L24 10.1527L22.9155 9.08408L21.8469 7.99955L17.9075 11.9549L13.9522 15.8943L10.0447 11.9868L6.13716 8.07929L5.06858 9.14787Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts" setup>
const hovering = ref(false);
defineProps({
  color: { type: String as PropType<string>, default: '' },
  hoverColor: { type: String as PropType<string>, default: '' },
  size: { type: String as PropType<string>, default: '' },
  margin: { type: String as PropType<string>, default: '0' },
  iconClass: { type: String as PropType<string>, required: false, default: '' },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.hidden {
  display: none;
}
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
