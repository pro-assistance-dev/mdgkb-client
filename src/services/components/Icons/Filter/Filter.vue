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
    <use xlink:href="#filter"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="filter">
      <path d="M8.58216 5.14236C6.22884 5.77558 4.70721 8.02494 5.04745 10.3688C5.61452 14.2627 10.3684 15.8127 13.0714 12.9962C13.6385 12.4103 14.319 11.2194 14.319 10.8225C14.319 10.6902 14.9428 10.6713 20.3771 10.6713H26.4353L26.7094 10.3972C27.0969 10.0097 27.0969 9.44261 26.7094 9.05511L26.4353 8.78103H20.396H14.3662L14.1867 8.23287C13.4589 5.9646 10.8599 4.52803 8.58216 5.14236ZM10.9638 7.21215C13.0525 8.24232 13.0336 11.2194 10.9355 12.2496C10.2172 12.5993 9.20593 12.6276 8.54436 12.2968C6.21939 11.1533 6.43676 7.81702 8.8846 7.01368C9.45166 6.8341 10.3495 6.91916 10.9638 7.21215Z" ></path>
      <path d="M21.5953 17.6266C21.1133 17.7211 20.2155 18.0519 19.8752 18.2599C18.9868 18.7986 18.0322 20.0083 17.8054 20.8778L17.6826 21.3504H12.3616C6.66257 21.3504 6.63422 21.3504 6.37904 21.8135C6.20892 22.1443 6.26562 22.6452 6.51135 22.9287L6.73818 23.1933L12.1915 23.2406L17.6448 23.2878L17.8621 23.8738C18.4292 25.4427 19.7334 26.6052 21.2929 26.936C22.1057 27.1061 23.3154 27.0021 24.062 26.6997C25.3379 26.1799 26.4059 25.0174 26.8029 23.7037C26.9635 23.165 27.0013 22.8625 26.9635 22.0781C26.9352 21.1991 26.8974 21.0479 26.5855 20.3864C25.8105 18.7513 24.2794 17.7117 22.5499 17.6172C22.1529 17.5983 21.7276 17.6077 21.5953 17.6266ZM23.5517 19.8004C24.081 20.0556 24.5913 20.5754 24.8748 21.1519C24.9977 21.4071 25.045 21.7095 25.045 22.3427C25.045 23.1555 25.0261 23.2311 24.7236 23.7415C23.5611 25.6412 20.8014 25.5656 19.7902 23.5997C19.5066 23.0421 19.4405 22.0119 19.6484 21.3787C20.1682 19.8004 22.0206 19.0537 23.5517 19.8004Z" ></path>
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
