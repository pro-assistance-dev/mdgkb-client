<template>
  <div class="mainblock">
    <div
      class="top-menu"
      :style="{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minMenuItemWidth}, 1fr))`,
      }"
    >
      <slot name="menu" />
    </div>
    <div
      class="body-container"
      :style="{
        background: background,
      }"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MenuContainer',
  props: {
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
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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
  overflow: auto;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 50px;
}

@media (max-width: 1436px) {
  .body-container {
    height: calc(100% - 55px);
    height: 100%;
  }
}

@media (max-width: 1050px) {
  .body-container {
    height: calc(100% - 81px);
  }
}

@media (max-width: 992px) {
  .mainblock {
    margin: 0 10px;
    width: calc(100% - 22px);
  }
  .body-container {
    height: calc(100% - 40px);
    // height: 100%;
    // height: calc(100vh - 10px);
  }
}

@media (max-width: 822px) {
  .body-container {
    height: calc(100% - 45px);
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
