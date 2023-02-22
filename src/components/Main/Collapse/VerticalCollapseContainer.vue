Н
<template>
  <div class="tab">
    <slot name="main" />
    <div :style="{ width: !isDrawerOpen ? '20px' : '50%', transition: '0.3s' }" class="left">
      <div :style="{ width: !isDrawerOpen ? '0' : '100%', transition: '0.3s' }" class="left-content">
        <slot name="inside-content-left" />
      </div>
      <div class="arrow-bar" @click="toggleDrawer">
        <div class="rotate">
          <slot name="inside-title" />
        </div>
        <svg v-if="!isDrawerOpen" class="icon-arrow">
          <use xlink:href="#arrow-right"></use>
        </svg>
        <svg v-else class="icon-arrow">
          <use xlink:href="#arrow-left"></use>
        </svg>
      </div>
    </div>
    <div :style="{ width: !isDrawerOpen ? '100%' : '50%', transition: '0.3s' }" class="right">
      <slot name="inside-content-right" />
    </div>
  </div>

  <Arrows />
  <ArrowLeft />
  <ArrowRight />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import ArrowLeft from '@/assets/svg/Buffet/ArrowLeft.svg';
import ArrowRight from '@/assets/svg/Buffet/ArrowRight.svg';
import Arrows from '@/assets/svg/CollapseItem/Arrows.svg';

export default defineComponent({
  name: 'VerticalCollapseContainer',
  components: { Arrows, ArrowRight, ArrowLeft },
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false);

    const toggleDrawer = async () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    return {
      isDrawerOpen,
      toggleDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.tab {
  display: flex;
  height: 100%;
  position: relative;
}

.left {
  display: flex;
  justify-content: space-between;
  width: 50%;
  height: 100%;
  background: #ffffff;
  margin-right: 6px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.left-content {
  overflow: hidden;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.right {
  width: 50%;
}

.arrow-bar {
  display: flex;
  justify-content: center;
  width: 20px;
  background: #00b5a4;
  color: #ffffff;
  position: relative;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.arrow-bar:hover {
  background: #009f90;
}

.rotate {
  padding-top: 5px;
  writing-mode: vertical-rl;
}

.icon-arrow {
  position: absolute;
  top: calc(50% - 10px);
  width: 20px;
  height: 20px;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  fill: #ffffff;
}
</style>
