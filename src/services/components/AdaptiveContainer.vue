<template>
  <div v-if="mounted" class="mainblock">
    <div
      class="mainblock-left"
      :style="{
        minWidth: mobileWindow ? '100%' : menuWidth,
        marginLeft: mobileWindow ? '-110%' : '0',
        top: mobileWindow ? '50px' : '',
      }"
    >
      <div
        class="left-menu"
        :style="{
          display: mobileWindow ? 'block' : 'flex',
          justifyContent: mobileWindow ? '' : 'center',
          minWidth: mobileWindow ? 'auto' : '100%',
          boxShadow: '0 0px 10px 0px rgba(0 0 0 / 20%)',
          marginLeft: !collapsed && mobileWindow ? '110%' : '0',
          borderTopLeftRadius: !mobileWindow ? '' : '0',
          borderBottomLeftRadius: !mobileWindow ? '' : '0',
          left: mobileWindow ? '0' : '50%',
          transform: mobileWindow ? 'none' : 'translateX(-50%)',
        }"
        @click="handClick()"
      >
        <slot name="menu" />
      </div>
    </div>
      <div class="title">
        <div
          class="icon"
          :style="{
            display: mobileWindow ? 'flex' : 'none',
          }"
          @click="handClick()"
        >
          <slot name="icon" />
        </div>
      </div>
    </div>
  <Menu />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Menu from '@/services/assets/svg/Menu.svg';

export default defineComponent({
  name: 'AdaptiveContainer',
  components: {
    Menu,
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
      default: '768px',
    },
  },
  setup(props) {
    const mounted = ref(false);
    const collapsed: Ref<boolean> = ref(true);
    const mobileWindow = ref(window.matchMedia('(max-width: 768px)').matches);

    const handClick = () => {
      collapsed.value = !collapsed.value;
    };

    onBeforeMount(async () => {
      window.addEventListener('resize', () => {
        switch (props.mobileWidth) {
          case '1330px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches);
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
      collapsed,
      handClick,
      mobileWindow,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.mainblock {
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 100;
}

.mainblock-left {
  position: relative;
  display: flex;
  justify-content: left;
  height: 100%;
  left: 0px;
  width: 100%;
}

.left-menu {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  max-height: 70vh;
  transition: 0.3s;
  overflow: hidden;
  overflow-y: auto;
  background: #f57e20;
}

.icon {
  position: absolute;
  top: 0px;
  left: 16px;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 20px;
  }
}

@media screen and (max-width: 500px) {
  .title {
    font-size: 16px;
  }
}
</style>
