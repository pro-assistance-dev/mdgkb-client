<template>
  <div class="mainblock">
    <div v-if="collapsed1 | collapsed2" class="blur" @click="handClick()"></div>
    <div class="body">
      <div
        class="visability-block"
        :style="{
          maxWidth: mobileWindow ? '100%' : '300px',
        }"
      >
        <slot name="visability" />
      </div>
      <div
        class="filter-block"
        :style="{
          position: mobileWindow ? 'absolute' : '',
          top: mobileWindow ? '10px' : '',
          right: mobileWindow ? '0px' : '',
          width: mobileWindow ? '100%' : '100%',
          zIndex: mobileWindow ? '4' : '',
          padding: mobileWindow ? '0px 0px 26px 0px' : '0',
          marginRight: mobileWindow ? (collapsed1 ? '0' : '-200%') : '0',
          transition: mobileWindow ? '0.3s' : '',
          background: mobileWindow ? '#F5f5f5' : '',
          borderTopLeftRadius: mobileWindow ? '5px' : '',
          borderBottomLeftRadius: mobileWindow ? '5px' : '',
          boxShadow: mobileWindow ? 'rgba(0, 0, 0, 0.35) 0px 5px 5px' : 'rgba(0, 0, 0, 0.35) 0px 5px 5px',
          height: mobileWindow ? '60vh' : '60vh',
        }"
      >
        <div v-if="mobileWindow" class="title">
          <div class="title-line">
            <svg
              class="icon-filter"
              :style="{
                stroke: '#B0A4C0',
                paddingLeft: '10px',
              }"
            >
              <use xlink:href="#filter"></use>
            </svg>
            <svg
              class="icon-close"
              :style="{
                marginRight: '5px',
              }"
              @click="handClick1()"
            >
              <use xlink:href="#close"></use>
            </svg>
          </div>
          <slot name="title-tools" />
        </div>
        <slot name="filter" />
      </div>
      <div v-if="!mobileWindow" class="help-block"></div>
      <div
        class="download-block"
        :style="{
          position: mobileWindow ? 'absolute' : '',
          top: mobileWindow ? '60px' : '',
          right: mobileWindow ? '0px' : '',
          width: mobileWindow ? '77px' : '',
          zIndex: mobileWindow ? '4' : '',
          padding: mobileWindow ? '0px 0px 26px 0px' : '0 0 0 10px',
          marginRight: mobileWindow ? (collapsed2 ? '-2px' : '-130px') : '0',
          transition: mobileWindow ? '0.3s' : '',
          background: mobileWindow ? '#F5f5f5' : '',
          borderTopLeftRadius: mobileWindow ? '5px' : '',
          borderBottomLeftRadius: mobileWindow ? '5px' : '',
          boxShadow: mobileWindow ? 'rgba(0, 0, 0, 0.35) 0px 5px 5px' : '',
          height: mobileWindow ? '150px' : '',
        }"
      >
        <div v-if="mobileWindow" class="title">
          <div class="title-line">
            <svg
              class="icon-download"
              :style="{
                stroke: '#B0A4C0',
                paddingLeft: '10px',
              }"
            >
              <use xlink:href="#download"></use>
            </svg>
            <svg class="icon-close" @click="handClick2()">
              <use xlink:href="#close"></use>
            </svg>
          </div>
        </div>
        <slot name="download" />
      </div>

      <div v-if="mobileWindow" class="icons">
        <PButton skin="icon" margin="0 0 0 10px" @click="handClick1()" ><Filter color="#006BB4"/></PButton>
        <PButton skin="icon" margin="13px 0 0 10px" @click="handClick2()" ><Download color="#006BB4"/></PButton>
      </div>
    </div>
  </div>
    <svg width="0" height="0" class="hidden">
      <symbol id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 10.5857L16.95 5.63574L18.364 7.04974L13.414 11.9997L18.364 16.9497L16.95 18.3637L12 13.4137L7.04999 18.3637L5.63599 16.9497L10.586 11.9997L5.63599 7.04974L7.04999 5.63574L12 10.5857Z"></path>
      </symbol>
    </svg>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import PButton from '@/services/components/PButton.vue';
import Filter from '@/services/components/Icons/Filter/Filter.vue';
import Download from '@/services/components/Icons/Filter/Download.vue';

  const props = defineProps({
    menuWidth: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    mobileWidth: {
      type: String as PropType<string>,
      required: false,
      default: '6000px',
    },
  });
    const mounted = ref(false);
    const collapsed1: Ref<boolean> = ref(false);
    const collapsed2: Ref<boolean> = ref(false);
    const mobileWindow = ref(window.matchMedia('(max-width: 6000px)').matches);

    const handClick = () => {
      collapsed1.value = false;
      collapsed2.value = false;
    };

    const handClick1 = () => {
      collapsed1.value = !collapsed1.value;
    };
    const handClick2 = () => {
      collapsed2.value = !collapsed2.value;
    };

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
        return (mobileWindow.value = window.matchMedia('(max-width: 6000px)').matches);
      });
      mounted.value = true;
    });
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.hidden {
  display: none;
}

.filter-block {
  box-sizing: border-box;
  overflow: hidden;
  max-width: 600px;
}

.hidden {
  display: none;
}

.mainblock {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 20px);
  padding: 10px;
  background: #f5f5f5;
  height: 100px;
  border-bottom: 1px solid #c4c4c4;
}

.blur {
  position: fixed;
  height: 20000px;
  width: 20000px;
  background: #000000;
  opacity: 0.2;
  z-index: 4;
}

.body {
  display: flex;
  justify-content: space-between;
  min-height: 20px;
  height: auto;
  width: 100%;
}

.visability-block {
  width: 100%;
}

:deep(.icon-filter) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

:deep(.icon-download) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #343e5c;
  fill: red;
}

.icon-close:hover {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #006bb4;
}

.help-block {
  height: 92px;
  width: 1px;
}

.title {
  position: sticky;
  top: 0px;
  z-index: 10;
  margin-bottom: 0px;
  background: #f5f5f5;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
} 

.title-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
</style>
