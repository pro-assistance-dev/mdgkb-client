<template>
  <div class="mainblock">
    <div
      class="slider-block"
      :style="{
        marginRight: mobileWindow ? (isToggle ? '49px' : `calc(49px - ${sliderOnWidth})`) : isToggle ? sliderOffWidth : `calc(${sliderOffWidth} - ${sliderOnWidth})`,
        width: sliderOnWidth,
        minHeight: sliderOffWidth,
        height: isToggle ? 'auto' : '100px',
      }"
    >
      <div
        class="slider-icon"
        :style="{
          border: isToggle ? '1px solid #379FFF' : '1px solid #00B5A4',
          background: isToggle ? '#ffffff' : '#C7ECEA',
        }"
        @click="toggleSlider(!isToggle)"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div
          class="icon-block"
          :style="{
            transform: hovering ? (isToggle ? 'rotate(-225deg) scale(1.2, 1.2)' : 'rotate(0deg) scale(1.2, 1.2)') : isToggle ? 'rotate(-225deg)' : 'rotate(0deg)',
            fill: isToggle ? '#379FFF' : '#00B5A4',
          }"
        >
          <slot name="icon" />
        </div>
      </div>

      <div
        class="slider-info"
        :style="{
          width: `calc(${sliderOnWidth} - ${sliderOffWidth})`,
        }"
      >
        <slot name="slider-body" />
      </div>
    </div>

    <div class="body-block">
      <slot name="body" />
    </div>

    <div class="tab-block">
      <slot name="tabs" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';

export default defineComponent({
  name: 'RightTabsContainer',
  props: {
    sliderOffWidth: {
      type: String as PropType<string>,
      required: false,
      default: '101px',
    },
    sliderOnWidth: {
      type: String as PropType<string>,
      required: false,
      default: '332px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
    isToggle: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    mobileWidth: {
      type: String as PropType<string>,
      required: false,
      default: '768px',
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const mounted = ref(false);
    const mobileWindow = ref(window.matchMedia('(max-width: 768px)').matches);
    const toggleSlider = (toggle: boolean) => {
      emit('toggle', toggle);
    };
    const hovering = ref(false);

    onBeforeMount(async () => {
      window.addEventListener('resize', () => {
        switch (props.mobileWidth) {
          case '1330px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches);
          case '1215px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1215px)').matches);
          case '1024px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1024px)').matches);
          case '768px':
            return (mobileWindow.value = window.matchMedia('(max-width: 768px)').matches);
        }
        return (mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches);
      });
      mounted.value = true;
    });

    return {
      toggleSlider,
      hovering,
      mobileWindow,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.mainblock {
  position: relative;
  display: flex;
  justify-content: left;
  width: auto;
  height: 100%;
  padding: 0;
  background: $custom-background;
  overflow: hidden;
}

.slider-block {
  position: absolute;
  top: 8px;
  right: 0;
  display: flex;
  justify-content: left;
  cursor: pointer;
  transition: 0.3s;
  z-index: 10;
}

.slider-icon {
  min-width: 91px;
  height: 91px;
  margin-right: 10px;
  border-radius: $border-radius;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-block {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.tab-block {
  width: 110px;
  background: $custom-background;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 109px;
}

.body-block {
  position: relative;
  width: calc(100% - 110px);
  height: calc(100% - 10px);
  background: $custom-background;
  overflow: hidden;
  overflow-y: auto;
  // padding-right: 3px;
}

@media screen and (max-width: 768px) {
  .slider-icon {
    min-width: 42px;
    height: 42px;
    margin-right: 8px;
    border-radius: $border-radius;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab-block {
    width: 50px;
    background: $custom-background;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 55px;
    cursor: pointer;
  }

  .body-block {
    position: relative;
    width: calc(100% - 55px);
    height: 100%;
    background: $custom-background;
  }
}
</style>
