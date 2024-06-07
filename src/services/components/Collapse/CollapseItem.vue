<template>
  <div
    class="tab"
    :style="{
      margin: margin,
      height: isCollaps && collapsed ? '60px' : '',
      'box-shadow': selectable && activeId === tabId ? '0px 0px 1px 2px #1979cf' : '',
    }"
  >
    <!-- width: `calc(100% - ${margin.prototype.slice()}`
      width: 'calc(100% - $margin.prototype.slice())' -->
    <svg v-if="isCollaps && collapsed" class="icon-arrow" @click="handleItemClick">
      <use xlink:href="#arrow-down" />
    </svg>
    <svg v-else-if="isCollaps && !collapsed" class="icon-arrow" @click="handleItemClick">
      <use xlink:href="#arrow-up" />
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
        <div
          v-if="title"
          class="title-in"
          :style="{
            marginRight: isCollaps ? '50px' : '0',
            width: isCollaps ? 'calc(100% - 50px)' : '100%',
          }"
        >
          {{ title }}
        </div>
        <div
          v-else
          class="title-in"
          :style="{
            marginRight: isCollaps ? '50px' : '0',
            width: isCollaps ? 'calc(100% - 50px)' : '100%',
          }"
        >
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
  <!-- <Arrows /> -->
  <svg width="0" height="0" class="hidden">
    <symbol id="arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" />
    </symbol>

    <symbol id="arrow-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M15 14L10 9L5 14L3 13L10 6L17 13L15 14Z" />
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
    tabId: { type: String as PropType<number>, required: false, default: '' },
    activeId: { type: String as PropType<number>, default: '' },
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
@import '@/services/assets/style/index.scss';

.hidden {
  display: none;
}

.tab {
  position: relative;
  width: calc(100% - 10px);
  border: $light-pink-border;
  background: #ffffff;
  margin: 10px 8px 2px 2px;
  cursor: pointer;
  transition: 0.15s;

  &-name {
    position: relative;
    display: flex;
    min-height: 60px;
    height: auto;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
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
  padding-right: 5px;
}

.tab input:checked ~ .icon-arrow {
  transform: rotate(180deg);
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

.icon-arrow {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 28px;
  height: 28px;
  fill: $site_dark_gray;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  fill: $site_dark_gray;
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

.tools-bar {
  display: flex;
  position: absolute;
  top: 20px;
  right: 60px;
  justify-content: space-between;
  align-items: center;
}

.inside-icon {
  display: flex;
  position: absolute;
  top: 20px;
  left: 0;
  align-items: center;
  padding-left: 4px;
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
  box-shadow: 0px 0px 1px 2px #1979cf;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: auto;
  align-items: center;
  font-weight: normal;
  border-radius: 5px;
}
</style>
