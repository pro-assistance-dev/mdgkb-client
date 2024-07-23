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
    <use xlink:href="#icon-menu-lines"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="icon-menu-lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="M4.39158 7.29195C3.75169 7.93591 3.91166 8.79835 4.75724 9.15482C5.32857 9.39631 26.6736 9.39631 27.245 9.15482C28.1362 8.78685 28.2619 7.72892 27.4963 7.10796C27.2678 6.92397 26.4908 6.90097 16.0125 6.90097H4.78009L4.39158 7.29195Z"
      ></path>
      <path
        d="M4.40006 15.1949C3.81741 15.7812 3.90881 16.5515 4.6057 16.9884C4.98271 17.2184 5.14266 17.2184 16.1559 17.1954L27.3405 17.1609L27.6718 16.7815C28.1517 16.2526 28.1288 15.7122 27.6147 15.1949L27.2263 14.804H16.0074H4.7885L4.40006 15.1949Z"
      ></path>
      <path
        d="M4.40176 23.0913C3.88782 23.6085 3.86498 24.1487 4.34465 24.6774L4.67586 25.0566H16.0053H27.3347L27.6659 24.6774C28.1114 24.1717 28.1114 23.643 27.6659 23.1373L27.3347 22.758L16.0624 22.7235L4.79007 22.7005L4.40176 23.0913Z"
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
