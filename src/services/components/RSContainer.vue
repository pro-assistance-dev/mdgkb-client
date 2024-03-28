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
          width: mobileWindow ? '220px' : '100%',
          zIndex: mobileWindow ? '4' : '',
          padding: mobileWindow ? '10px 20px 26px 0px' : '0',
          marginRight: mobileWindow ? (collapsed1 ? '0' : '-250px') : '0',
          transition: mobileWindow ? '0.3s' : '',
          background: mobileWindow ? '#F5f5f5' : '',
          borderTopLeftRadius: mobileWindow ? '5px' : '',
          borderBottomLeftRadius: mobileWindow ? '5px' : '',
          boxShadow: mobileWindow ? 'rgba(0, 0, 0, 0.35) 0px 5px 5px' : '',
          height: mobileWindow ? '370px' : '',
        }"
      >
        <div v-if="mobileWindow" class="title">
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
              marginRight: '-10px',
            }"
            @click="handClick1()"
          >
            <use xlink:href="#close"></use>
          </svg>
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
          padding: mobileWindow ? '10px 10px 26px 0px' : '0 0 0 10px',
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
        <slot name="download" />
      </div>

      <div v-if="mobileWindow" class="icons">
        <Button
          :with-icon="true"
          width="42px"
          height="42px"
          color="#006BB4"
          background="#ffffff"
          background-hover="#DFF2F8"
          margin="0 0 0 10px"
          icon-class="icon-filter"
          icon="filter"
          @click="handClick1()"
        />

        <Button
          :with-icon="true"
          width="42px"
          height="42px"
          color="#006BB4"
          background="#ffffff"
          background-hover="#DFF2F8"
          margin="13px 0 0 10px"
          icon="download"
          icon-class="icon-download"
          @click="handClick2()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Button from '@/services/components/Button.vue';

export default defineComponent({
  name: 'RSContainer',
  components: {
    Button,
  },
  props: {
    menuWidth: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    mobileWidth: {
      type: String as PropType<string>,
      required: false,
      default: '1330px',
    },
  },
  setup(props) {
    const mounted = ref(false);
    const collapsed1: Ref<boolean> = ref(false);
    const collapsed2: Ref<boolean> = ref(false);
    const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);

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
        return (mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches);
      });
      mounted.value = true;
    });

    return {
      collapsed1,
      collapsed2,
      handClick,
      handClick1,
      handClick2,
      mobileWindow,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
