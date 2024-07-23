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
    <use xlink:href="#double-arrow-left"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="double-arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        d="M529.408 149.376C532.121 146.589 535.365 144.374 538.949 142.862C542.532 141.35 546.382 140.57 550.272 140.57C554.161 140.57 558.011 141.35 561.595 142.862C565.178 144.374 568.422 146.589 571.136 149.376C576.699 155.088 579.813 162.746 579.813 170.72C579.813 178.694 576.699 186.352 571.136 192.064L259.264 511.936L571.136 831.872C573.943 834.746 576.157 838.145 577.651 841.875C579.145 845.605 579.889 849.593 579.842 853.61C579.794 857.628 578.956 861.597 577.374 865.29C575.792 868.984 573.499 872.329 570.624 875.136C567.886 877.812 564.647 879.922 561.092 881.344C557.538 882.767 553.738 883.475 549.91 883.427C546.081 883.38 542.3 882.578 538.782 881.067C535.264 879.556 532.079 877.367 529.408 874.624L197.76 534.272C191.935 528.296 188.675 520.281 188.675 511.936C188.675 503.591 191.935 495.576 197.76 489.6L529.408 149.376ZM785.408 149.376C788.121 146.589 791.365 144.374 794.949 142.862C798.532 141.35 802.382 140.57 806.272 140.57C810.161 140.57 814.011 141.35 817.595 142.862C821.178 144.374 824.422 146.589 827.136 149.376C832.699 155.088 835.813 162.746 835.813 170.72C835.813 178.694 832.699 186.352 827.136 192.064L515.264 511.936L827.136 831.872C829.943 834.746 832.157 838.145 833.651 841.875C835.145 845.605 835.889 849.593 835.842 853.61C835.794 857.628 834.956 861.597 833.374 865.29C831.792 868.984 829.499 872.329 826.624 875.136C823.886 877.812 820.647 879.922 817.092 881.344C813.538 882.767 809.738 883.475 805.91 883.427C802.081 883.38 798.3 882.578 794.782 881.067C791.264 879.556 788.079 877.367 785.408 874.624L453.76 534.272C447.935 528.296 444.675 520.281 444.675 511.936C444.675 503.591 447.935 495.576 453.76 489.6L785.408 149.376Z"
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
