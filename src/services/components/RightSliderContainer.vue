<template>
  <div
    class="right-slider"
    :style="{
      marginRight: isToggle ? `calc(${sliderOffWidth} - ${sliderOnWidth})` : `0`,
      width: sliderOnWidth,
    }"
  >
    <div class="click-line" @click="toggleSlider(!isToggle)">
      <StringItem v-if="isToggle" :string="titleClose" font-size="16px" padding="0" color="#343E5C" />
      <StringItem v-if="!isToggle" :string="titleOpen" font-size="16px" padding="0" color="#343E5C" />
    </div>
    <div class="right-slider-content">
      <div class="right-slider-content-header">
        <slot name="header" />
      </div>
      <div class="right-slider-content-box">
        <slot />
      </div>
    </div>
    <div class="right-slider-button">
      <slot name="button" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import StringItem from '@/services/components/StringItem.vue';

const props = defineProps({
  sliderOffWidth: {
    type: String as PropType<string>,
    required: false,
    default: '30px',
  },
  sliderOnWidth: {
    type: String as PropType<string>,
    required: false,
    default: '260px',
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
  titleOpen: {
    type: String as PropType<string>,
    required: false,
    default: 'Скрыть список исследований',
  },
  titleClose: {
    type: String as PropType<string>,
    required: false,
    default: 'Показать список исследований',
  },
});
const emit = defineEmits(['toggle']);
const isToggle = ref(false);
watch(
  () => props.toggle,
  () => {
    isToggle.value = !isToggle.value;
  }
);

// const mobileWindow = ref(window.matchMedia('(max-width: 768px)').matches);
const toggleSlider = (toggle: boolean) => {
  isToggle.value = !isToggle.value;
  emit('toggle', toggle);
};
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

* {
  box-sizing: border-box;
}

.right-slider {
  position: fixed;
  display: flex;
  top: 165px;
  right: 0px;
  background: #f5f5f5;
  z-index: 3;
  height: 75vh;
  border: $dark-border;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  transition: 0.3s;
}

.click-line {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 100%;
  writing-mode: vertical-lr;
  background: #c1efeb;
  background: #f5f5f5;
  cursor: pointer;
  border-right: $normal-darker-border;
}

.right-slider-content {
  width: 100%;
  height: calc(100% - 90px);
}

.right-slider-content-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 62px;
  border-bottom: $normal-darker-border;
  margin-left: -1px;
  background: #f5f5f5;
}

.right-slider-content-box {
  width: 100%;
  height: calc(100% - 33px);
  overflow: hidden;
  overflow-y: auto;
  padding: 0px 3px 10px 7px;
  border-bottom: $normal-darker-border;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: #f5f5f5;
}

.right-slider-button {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 62px;
  width: calc(100% - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -1px;
  background: #f5f5f5;
}

@media (max-width: 1690px) {
  .right-slider {
    height: 65vh;
    top: 205px;
  }
}

@media (max-width: 1436px) {
  .right-slider {
    top: 205px;
  }
}

@media (max-width: 1050px) {
  .right-slider {
    top: 245px;
  }
}

@media (max-width: 992px) {
  .right-slider {
    top: 205px;
  }
}

@media screen and (max-width: 822px) {
  .right-slider {
    top: 245px;
  }
}
</style>
