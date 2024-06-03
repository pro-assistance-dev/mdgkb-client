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
    <use xlink:href="#close"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="close">
      <path d="M7.53508 7.18138C7.03684 7.5158 6.86132 8.14496 7.1161 8.66643C7.18971 8.8138 8.02201 9.69236 9.44881 11.1207C10.6718 12.345 11.8211 13.49 12.0023 13.6714L12.3251 14.0058L9.80551 16.5224C7.92576 18.4043 7.25199 19.1184 7.14441 19.3225C6.83867 19.9346 7.0425 20.5865 7.637 20.8926C7.89745 21.0286 8.41268 21.0343 8.6618 20.9096C8.76372 20.8585 10.0037 19.6626 11.4191 18.2455L14.001 15.6666L16.5432 18.2229C18.1964 19.8723 19.1703 20.8132 19.3232 20.8869C19.5779 21.0116 20.0309 21.0399 20.2913 20.9379C20.5178 20.8529 20.8632 20.5015 20.9368 20.2747C21.0274 19.9913 21.0161 19.5719 20.9028 19.3508C20.8519 19.2431 19.6516 17.9961 18.2361 16.5791L15.6656 14.0001L18.2191 11.4495C19.7138 9.95309 20.8179 8.80813 20.8858 8.6721C21.0104 8.42837 21.0387 7.98058 20.9425 7.73119C20.8519 7.50446 20.5971 7.23239 20.3593 7.11336C20.0988 6.97733 19.6516 6.96599 19.3628 7.08502C19.2212 7.14737 18.3097 8.01459 16.5771 9.74904L14.001 12.328L11.4191 9.75471C9.6583 7.99192 8.77504 7.14737 8.63349 7.08502C8.51459 7.03968 8.28246 7 8.1126 7C7.86347 7 7.76156 7.03401 7.53508 7.18138Z" ></path>
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
