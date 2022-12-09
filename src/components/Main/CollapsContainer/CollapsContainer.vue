<template>
  <div class="tab">
    <input :id="tabId" type="checkbox" name="tabs" />
    <svg v-if="isCollaps && collapsed" class="icon-arrow">
      <use xlink:href="#arrow-down"></use>
    </svg>
    <svg v-else-if="isCollaps && !collapsed" class="icon-arrow">
      <use xlink:href="#arrow-up"></use>
    </svg>
    <label :for="tabId">
      <div :style="{ cursor: isCollaps ? 'pointer' : 'default' }" class="tab-name">
        <slot name="inside-title" />
      </div>
    </label>
    <div v-if="collapsed" :style="{ maxHeight: isCollaps ? '' : '100vh' }" class="tab-content-down">
      <slot name="inside-content" />
    </div>
    <div v-else-if="!collapsed" class="tab-content-up">
      <slot name="inside-content" />
    </div>
  </div>
  <Arrows />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Arrows from '@/assets/svg/CollapsContainer/Arrows.svg';

export default defineComponent({
  name: 'CollapsContainer',
  components: { Arrows },

  props: {
    tabId: { type: String as PropType<string>, required: true },
    isCollaps: { type: Boolean as PropType<boolean>, default: true },
    collapsed: { type: Boolean as PropType<boolean>, default: true },
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
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;
  color: #343e5c;
  padding: 0 5px;
}

.tab-content-up {
  max-height: 500vh;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.35s;
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
</style>
