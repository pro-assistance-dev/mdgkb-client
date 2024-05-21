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
    <use xlink:href="#double-arrow-right"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="double-arrow-right">
      <path d="M495.111 874.624C492.397 877.411 489.153 879.626 485.57 881.138C481.987 882.65 478.136 883.43 474.247 883.43C470.357 883.43 466.507 882.65 462.924 881.138C459.34 879.626 456.096 877.411 453.383 874.624C447.819 868.912 444.706 861.254 444.706 853.28C444.706 845.306 447.819 837.648 453.383 831.936L765.255 512.064L453.383 192.128C450.575 189.254 448.361 185.855 446.867 182.125C445.374 178.395 444.629 174.407 444.677 170.39C444.724 166.372 445.563 162.403 447.145 158.71C448.726 155.016 451.02 151.671 453.895 148.864C456.633 146.188 459.872 144.078 463.426 142.656C466.981 141.233 470.781 140.525 474.609 140.573C478.437 140.62 482.219 141.422 485.737 142.933C489.254 144.444 492.44 146.633 495.111 149.376L826.759 489.728C832.584 495.704 835.844 503.719 835.844 512.064C835.844 520.409 832.584 528.424 826.759 534.4L495.111 874.624ZM239.111 874.624C236.397 877.411 233.153 879.626 229.57 881.138C225.987 882.65 222.136 883.43 218.247 883.43C214.357 883.43 210.507 882.65 206.924 881.138C203.34 879.626 200.096 877.411 197.383 874.624C191.819 868.912 188.706 861.254 188.706 853.28C188.706 845.306 191.819 837.648 197.383 831.936L509.255 512.064L197.383 192.128C194.575 189.254 192.361 185.855 190.867 182.125C189.374 178.395 188.629 174.407 188.677 170.39C188.724 166.372 189.563 162.403 191.145 158.71C192.726 155.016 195.02 151.671 197.895 148.864C200.633 146.188 203.872 144.078 207.426 142.656C210.981 141.233 214.781 140.525 218.609 140.573C222.437 140.62 226.219 141.422 229.737 142.933C233.254 144.444 236.44 146.633 239.111 149.376L570.759 489.728C576.584 495.704 579.844 503.719 579.844 512.064C579.844 520.409 576.584 528.424 570.759 534.4L239.111 874.624Z" ></path>
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
