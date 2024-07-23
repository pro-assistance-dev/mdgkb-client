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
    <use xlink:href="#back"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M8 7V11L2 6L8 1V5H13C15.1217 5 17.1566 5.84285 18.6569 7.34315C20.1571 8.84344 21 10.8783 21 13C21 15.1217 20.1571 17.1566 18.6569 18.6569C17.1566 20.1571 15.1217 21 13 21H4V19H13C14.5913 19 16.1174 18.3679 17.2426 17.2426C18.3679 16.1174 19 14.5913 19 13C19 11.4087 18.3679 9.88258 17.2426 8.75736C16.1174 7.63214 14.5913 7 13 7H8Z"
        fill="currentColor"
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
