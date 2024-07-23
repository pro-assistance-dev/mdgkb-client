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
    <use xlink:href="#edit"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="M21.993 4.16087C21.6831 4.26049 21.2404 4.48185 20.9969 4.64787C20.1778 5.22342 4.60489 20.9402 4.39459 21.4051C4.11789 22.0138 3 25.8434 3 26.1865C3 26.5961 3.30991 27.1938 3.65302 27.4373C4.2507 27.8689 4.58275 27.8468 6.88493 27.1716C8.06923 26.8174 9.23138 26.4411 9.47488 26.3194C10.0062 26.0537 25.4795 10.6468 26.0772 9.79458C26.8519 8.67669 26.9626 7.32637 26.3871 6.10887C25.6234 4.48185 23.6754 3.61853 21.993 4.16087ZM24.0406 6.25276C24.7379 6.70655 25.0035 7.69162 24.6272 8.44426C24.4501 8.78737 9.331 24.0393 8.73332 24.471C8.48982 24.6481 5.2247 25.6995 5.13616 25.6331C5.11402 25.611 5.42393 24.5042 5.82239 23.1871L6.12123 22.1909L14.1125 14.1886C22.5243 5.76576 22.4911 5.79896 23.3101 5.94285C23.4983 5.97605 23.8192 6.11994 24.0406 6.25276Z"
        fill="currentColor"
      ></path>
      <path
        d="M15.098 25.9216C14.5446 26.1872 14.4118 27.1169 14.8656 27.5265C15.0759 27.7146 15.4743 27.7257 21.1302 27.7589C25.325 27.781 27.273 27.7478 27.4722 27.6703C28.0367 27.4268 28.1806 26.6521 27.7489 26.154L27.4833 25.8441L21.4069 25.822C17.2674 25.8109 15.264 25.833 15.098 25.9216Z"
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
  margin: { type: String as PropType<string>, default: '0 15px 0 0' },
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
