<template>
  <slot name="main" />
  <div
    v-if="mounted"
    class="mainblock"
    :style="{
      display: mobileWindow ? 'block' : 'flex',
    }"
  >
    <div
      class="mainblock-left"
      :style="{
        minWidth: mobileWindow ? '100%' : menuWidth,
        display: leftWidth !== '0px' ? 'flex' : 'none',
        top: mobileWindow ? '58px' : '80px',
      }"
    >
      <div
        class="left-menu"
        :style="{
          minWidth: mobileWindow ? '100%' : menuWidth,
          boxShadow: mobileWindow ? '0 0px 10px 0px rgba(0 0 0 / 20%)' : '',
          marginLeft: !collapsed && mobileWindow ? '0' : '0',
          overflowX: mobileWindow ? 'scroll' : 'hidden',
          display: mobileWindow ? 'flex' : 'block',
          background: mobileWindow ? '#ffffff' : '',
          overflowY: mobileWindow ? 'hidden' : 'auto',
        }"
        @click="handClick()"
      >
        <slot name="menu" />
      </div>
    </div>
    <div class="mainblock-right">
      <div
        class="title"
        :style="{
          position: titleSticky ? 'sticky' : 'relative',
          top: titleSticky ? (mobileWindow ? '108px' : '58px') : '0',
          zIndex: titleSticky ? '10' : '',
        }"
      >
        <div
          class="icon"
          :style="{
            display: mobileWindow ? 'flex' : 'none',
          }"
          @click="handClick()"
        >
          <slot name="icon" />
        </div>
        <slot name="title" />
      </div>

      <div class="body">
        <slot name="body" />
      </div>
    </div>
  </div>
  <RightMenu />
</template>

<script lang="ts" setup>
import RightMenu from '@/services/assets/svg/RightMenu.svg';

const props = defineProps({
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
  titleSticky: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
});
const mounted = ref(false);
const collapsed: Ref<boolean> = ref(true);
const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);

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
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

.mainblock {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
}

.mainblock-left {
  position: sticky;
  display: flex;
  justify-content: left;
  margin-right: 30px;
  height: 100%;
  left: 0px;
  z-index: 10;
}

.left-menu {
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 1;
  max-height: 80vh;
  transition: 0.3s;
}

.mainblock-right {
  position: relative;
  width: 100%;
  max-height: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  justify-content: center;
  align-items: center;
}

.body {
  width: 100%;
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
