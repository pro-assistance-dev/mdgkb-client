<template>
  <slot name="main" />
  <div v-if="mounted" class="mainblock">
    <div
      class="mainblock-left"
      :style="{
        minWidth: mobileWindow ? '100%' : menuWidth,
        maxWidth: mobileWindow ? '100%' : menuWidth,
        marginLeft: mobileWindow ? '-110%' : '0',
        position: mobileWindow ? 'fixed' : 'relative',
        top: mobileWindow ? '140px' : '',
      }"
    >
      <div
        class="left-menu"
        :style="{
          minWidth: mobileWindow ? 'auto' : menuWidth,
          boxShadow: mobileWindow ? '0 0px 10px 0px rgba(0 0 0 / 20%)' : '',
          marginLeft: !collapsed && mobileWindow ? '110%' : '0',
          borderTopLeftRadius: !mobileWindow ? '' : '0',
          borderBottomLeftRadius: !mobileWindow ? '' : '0',
        }"
        @click="handClick()"
      >
        <slot name="menu" />
      </div>
    </div>
    <div class="mainblock-right">
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
        <slot name="title" />
      </div>

      <div class="body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
@import '@/assets/styles/base-style.scss';

.mainblock {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
}

.mainblock-left {
  position: relative;
  display: flex;
  justify-content: left;
  margin-right: 30px;
  height: 100%;
  left: 0px;
  z-index: 10;
}

.left-menu {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  max-height: 70vh;
  transition: 0.3s;
  overflow: hidden;
  overflow-y: auto;
  background: #ffffff;
  border: $normal-border;
}

.mainblock-right {
  position: relative;
  width: 100%;
  max-height: 100%;
}

.title {
  position: relative;
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
