<template>
  <div class="tab">
    <svg v-if="isCollaps && collapsed" class="icon-arrow" @click="handleItemClick">
      <use xlink:href="#arrow-down"></use>
    </svg>
    <svg v-else-if="isCollaps && !collapsed" class="icon-arrow" @click="handleItemClick">
      <use xlink:href="#arrow-up"></use>
    </svg>
    <label :for="tabId" @click="handleItemClick">
      <div :style="{ cursor: isCollaps ? 'pointer' : 'default' }" class="tab-name">
        <div class="insade-icon">
          <slot name="icon" />
        </div>
        <div v-if="title" class="title-in">
          {{ title }}
        </div>
        <slot v-else name="inside-title" />
        <div class="tools-bar">
          <slot name="tools" />
        </div>
      </div>
    </label>
    <div :style="{ maxHeight: isCollaps ? '' : '1000000vh' }" :class="collapsed ? 'tab-content-down' : 'tab-content-up'">
      <slot name="inside-content" />
    </div>
  </div>
  <Arrows />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, PropType, Ref, ref } from 'vue';

import Arrows from '@/assets/svg/CollapsContainer/Arrows.svg';

export default defineComponent({
  name: 'CollapsContainer',
  components: { Arrows },
  props: {
    tabId: { type: Number as PropType<number>, required: false },
    activeId: { type: Number as PropType<number>, default: 0 },
    isCollaps: { type: Boolean as PropType<boolean>, default: true },
    title: { type: String as PropType<string>, default: '' },
  },
  emits: ['changeActiveId'],

  setup(props, { emit }) {
    const collapsed: Ref<boolean> = ref(true);

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
        collapsed.value = true;
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
@import '@/assets/styles/elements/base-style.scss';

.tab {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgb(black, 0.1);
  border-radius: $normal-border-radius;
  background: #ffffff;
  margin-top: 10px;

  &-name {
    position: relative;
    display: flex;
    height: 60px;
    align-items: center;
    font-weight: bold;
    padding: 0 20px;
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
  // padding: 0 5px;
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
  // padding-right: 5px;
}

.tab input:checked ~ .icon-arrow {
  transform: rotate(180deg);
}

.tab input:checked ~ .tab-content-down {
  max-height: 100vh;
  // overflow: hidden;
  // overflow-y: scroll;
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

.tools-bar {
  display: flex;
  position: absolute;
  top: 20px;
  right: 60px;
  justify-content: space-between;
  align-items: center;
  visibility: hidden;
  opacity: 0;
}

.insade-icon {
  display: flex;
  position: absolute;
  top: 20px;
  left: 0px;
  align-items: center;
  padding-left: 4px;
}

.tab-name:active > .tools-bar {
  visibility: visible;
  opacity: 1;
}

.tab-name {
  padding-left: 30px;
}

.tab-name:hover > .tools-bar {
  visibility: visible;
  opacity: 1;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}
</style>
