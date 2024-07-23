<template>
  <div class="mainblock">
    <div
      ref="menuRef"
      class="top-menu"
      :style="{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minMenuItemWidth}, 1fr))`,
      }"
    >
      <slot name="menu" />
    </div>
    {{ h }}
    <div
      class="body-container"
      :style="{
        height: h,
        background: background,
      }"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  height: {
    type: String as PropType<string>,
    required: false,
    default: '',
  },
  minMenuItemWidth: {
    type: String as PropType<string>,
    required: false,
    default: '150px',
  },
  background: {
    type: String as PropType<string>,
    required: false,
    default: '#ffffff',
  },
});
const windowWidth = ref(window.innerWidth);
const menuRef = ref();
const menuH = ref(50);
const onWidthChange = () => {
  windowWidth.value = window.innerWidth;
  menuH.value = menuRef.value ? menuRef.value.clientHeight : 50;
};
onMounted(() => window.addEventListener('resize', onWidthChange));
onUnmounted(() => window.removeEventListener('resize', onWidthChange));

const h = computed(() => {
  return `calc(100%-${menuH.value}px)`;
});
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

.mainblock {
  display: block;
  border-radius: $big-border-radius;
  border: $custom-border;
  overflow: hidden;
  margin: 0 10px 10px 0;
  height: calc(100% - 10px);
}

.top-menu {
  position: relative;
  margin: -1px;
  display: grid;
  grid-gap: 0;
  grid-template-rows: repeat(0 0px);
  z-index: 6;
}

.top-menu > div {
  object-fit: cover;
}

.body-container {
  margin-top: 1px;
  border-top: 0.5px solid #343d5c;
  box-sizing: border-box;
  overflow: scroll;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 50px;
}

@media (max-width: 992px) {
  .mainblock {
    margin: 0 10px;
    width: calc(100% - 22px);
  }
}

@media (max-width: 502px) {
  .top-menu {
    max-height: 123px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
