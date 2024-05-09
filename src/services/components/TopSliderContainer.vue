<template>
  <div v-if="!isToggle" class="blur" @click="isToggle = true"></div>
  <div
    class="top-slider"
    :style="{
      marginTop: isToggle ? `calc(${sliderOffHeight} - ${sliderOnHeight})` : `0`,
      height: sliderOnHeight,
    }"
  >
    <div class="top-slider-content">
      <div class="center">
        <slot />
      </div>
    </div>
    <div
      class="click-line"
      :style="{
        height: sliderOffHeight,
      }"
      @click="toggleSlider(!isToggle)"
    >
      <slot name="title" />
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'TopSliderContainer',
  props: {
    sliderOffHeight: {
      type: String as PropType<string>,
      required: false,
      default: '53px',
    },
    sliderOnHeight: {
      type: String as PropType<string>,
      required: false,
      default: '220px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
    toggle: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const isToggle = ref(true);
    watch(
      () => props.toggle,
      () => {
        isToggle.value = !isToggle.value;
      }
    );

    const mobileWindow = ref(window.matchMedia('(max-width: 768px)').matches);
    const toggleSlider = (toggle: boolean) => {
      isToggle.value = !isToggle.value;
      emit('toggle', toggle);
    };
    const hovering = ref(false);

    return {
      toggleSlider,
      hovering,
      mobileWindow,
      isToggle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

* {
  box-sizing: border-box;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.top-slider {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: #f5f5f5;
  z-index: 4;
  border: $dark-border;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  transition: 0.3s;
  width: calc(100% - 300px);
  max-width: 800px;
}

.top-slider-content {
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 53px);
  margin: auto;
  padding: 20px;
}

.center {
  width: 100%;
}

.click-line {
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  min-height: 40px;
  color: #343e5c;
  font-size: 12px;
  text-transform: uppercase;
  border-top: $normal-darker-border;
  cursor: pointer;
  padding: 0 10px;
}

@media screen and (max-width: 1024px) {
  .click-line {
    font-size: 12px;
  }
}

@media screen and (max-width: 768px) {
  .click-line {
    font-size: 11px;
  }
  .top-slider {
    width: calc(100% - 100px);
  }
  .top-slider-content {
    padding: 10px;
  }
}

@media screen and (max-width: 450px) {
  .click-line {
    line-height: 12px;
  }
}

@media screen and (max-width: 370px) {
  .click-line {
    font-size: 10px;
    line-height: 10px;
  }
  .top-slider-content {
    padding: 8px;
  }
}
</style>
