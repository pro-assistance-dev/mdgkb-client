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
    <use xlink:href="#ellipsis"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="ellipsis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <path
        d="M65 135C73.2843 135 80 128.284 80 120C80 111.716 73.2843 105 65 105C56.7157 105 50 111.716 50 120C50 128.284 56.7157 135 65 135Z"
      ></path>
      <path
        d="M120 135C128.284 135 135 128.284 135 120C135 111.716 128.284 105 120 105C111.716 105 105 111.716 105 120C105 128.284 111.716 135 120 135Z"
      ></path>
      <path
        d="M175 135C183.284 135 190 128.284 190 120C190 111.716 183.284 105 175 105C166.716 105 160 111.716 160 120C160 128.284 166.716 135 175 135Z"
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
@import '@/services/assets/style/index.scss';
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
