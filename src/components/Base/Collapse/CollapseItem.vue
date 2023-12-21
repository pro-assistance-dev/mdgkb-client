<template>
  <div
    class="tab"
    :style="{
      margin: margin,
      height: isCollaps && collapsed ? '60px' : '',
      'box-shadow': selectable && activeId === tabId ? '0px 0px 1px 2px #1979cf' : '',
    }"
  >
    <svg v-if="isCollaps && collapsed" class="icon-checkbox" @click="handleItemClick">
      <use xlink:href="#checkbox"></use>
    </svg>
    <svg v-else-if="isCollaps && !collapsed" class="icon-checkbox" @click="handleItemClick">
      <use xlink:href="#checkbox-check"></use>
    </svg>
    <label :for="tabId" @click="handleItemClick">
      <div
        :style="{
          cursor: isCollaps ? 'pointer' : 'default',
          background: changeColor ? background : backgroundAttention,
          padding: padding,
          borderRadius: '5px',
        }"
        class="tab-name"
      >
        <div class="inside-icon">
          <slot name="icon" />
        </div>
        <div v-if="title" class="title-in">
          {{ title }}
        </div>
        <div v-else class="title-in">
          <slot name="inside-title" />
        </div>
        <div class="tools-bar" :class="{ 'hidden-part': showToolsOnHover }">
          <slot name="tools" />
        </div>
      </div>
    </label>
    <div
      :style="{ maxHeight: isCollaps ? '' : '1000000vh', background: changeColor ? background : backgroundAttention }"
      :class="collapsed ? 'tab-content-down' : 'tab-content-up'"
    >
      <slot name="inside-content" />
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="checkbox" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M4 16.8V7.2C4 6.08 4 5.52 4.218 5.092C4.41 4.715 4.715 4.41 5.092 4.218C5.52 4 6.08 4 7.2 4H16.8C17.92 4 18.48 4 18.907 4.218C19.284 4.41 19.59 4.715 19.782 5.092C20 5.519 20 6.079 20 7.197V16.804C20 17.922 20 18.481 19.782 18.908C19.5899 19.2844 19.2836 19.5903 18.907 19.782C18.48 20 17.921 20 16.803 20H7.197C6.079 20 5.519 20 5.092 19.782C4.71569 19.5903 4.40974 19.2843 4.218 18.908C4 18.48 4 17.92 4 16.8Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
    <symbol id="checkbox-check" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M8 12L11 15L16 9M4 16.8V7.2C4 6.08 4 5.52 4.218 5.092C4.41 4.715 4.715 4.41 5.092 4.218C5.52 4 6.08 4 7.2 4H16.8C17.92 4 18.48 4 18.907 4.218C19.284 4.41 19.59 4.715 19.782 5.092C20 5.519 20 6.079 20 7.197V16.804C20 17.922 20 18.481 19.782 18.908C19.5899 19.2844 19.2836 19.5903 18.907 19.782C18.48 20 17.921 20 16.803 20H7.197C6.079 20 5.519 20 5.092 19.782C4.71569 19.5903 4.40974 19.2843 4.218 18.908C4 18.48 4 17.92 4 16.8Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, PropType, Ref, ref } from 'vue';

// import Arrows from '@/assets/svg/CollapseItem/Arrows.svg';

export default defineComponent({
  name: 'CollapseItem',
  // components: { Arrows },
  props: {
    tabId: { type: Number as PropType<number>, required: false, default: 0 },
    activeId: { type: Number as PropType<number>, default: 0 },
    isCollaps: { type: Boolean as PropType<boolean>, default: true },
    title: { type: String as PropType<string>, default: '' },
    showToolsOnHover: { type: Boolean as PropType<boolean>, default: true },
    background: { type: String as PropType<string>, required: false, default: '#ffffff' },
    backgroundAttention: { type: String as PropType<string>, required: false, default: '#ffffff' },
    changeColor: { type: Boolean as PropType<boolean>, default: false },
    margin: { type: String as PropType<string>, default: '10px 8px 2px 2px' },
    padding: { type: String as PropType<string>, default: '0 10px' },
    selectable: { type: Boolean as PropType<boolean>, default: false },
  },
  emits: ['changeActiveId'],

  setup(props, { emit }) {
    const collapsed: Ref<boolean> = ref(props.activeId === 0);

    const handleItemClick = () => {
      collapsed.value = !collapsed.value;
      emit('changeActiveId', props.tabId);
    };

    onUpdated(() => {
      if (props.activeId && props.activeId !== props.tabId) {
        collapsed.value = true;
      }
    });

    onBeforeMount(() => {
      if (props.activeId && props.activeId !== props.tabId) {
        collapsed.value = false;
      }
    });

    return {
      collapsed,
      handleItemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.tab {
  position: relative;
  width: 100%;
  /*border: 1px solid #B0A4C0;
  border-radius: 5px;
  background: #ffffff;*/
  cursor: pointer;
  transition: 0.15s;

  &-name {
    position: relative;
    display: flex;
    min-height: 60px;
    height: auto;
    align-items: center;
    font-weight: bold;
  }
}

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.tab-content-down {
  max-height: 0;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.03s;
  -o-transition: max-height 0.03s;
  transition: max-height 0.03s;
  color: #343e5c;
  padding: 0 5px;
}

.tab-content-up {
  max-height: 500vh;
  overflow-y: scroll;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;
  color: #343e5c;
}

.tab input:checked ~ .tab-content-down {
  max-height: 100vh;
}

.tab input:checked ~ .tab-content-up {
  max-height: 0;
}

.tab label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  text-align: center;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.tab-window {
  width: 100%;
}

.hidden {
  display: none;
}

.icon-checkbox {
  position: absolute;
  left: 10px;
  top: 15px;
  width: 32px;
  height: 32px;
  stroke: #343d5c;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  z-index: 2;
}

:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

:deep(.el-carousel__container) {
  max-height: auto;
}

:deep(.el-form-item__label) {
  width: 100%;
  text-align: left;
}

:deep(.el-form-item) {
  display: block;
}

:deep(.el-input__inner) {
  height: 40px;
}

.hidden-part {
  visibility: hidden;
  opacity: 0;
}

.tab-name:active > .tools-bar {
  visibility: visible;
  opacity: 1;
}

.tab-name:hover > .tools-bar {
  visibility: visible;
  opacity: 1;
}

.tab:hover {
  // box-shadow: 0px 0px 1px 2px #1979cf;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #343e5c;
  height: auto;
  align-items: center;
  font-weight: normal;
  border-radius: 5px;
  padding-left: 40px;
}

@media screen and (max-width: 400px) {
  .title-in {
    font-size: 14px;
  }
}
</style>
