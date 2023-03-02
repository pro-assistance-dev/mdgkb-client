<template>
  <div v-if="mounted" class="mainblock">
    <div class="mainblock-left"
      :style="{
        minWidth: mobileWindow ? '100%' : menuWidth,
        display: leftWidth !== '0px' ? 'flex' : 'none',
        marginRight: !isSingle ? '' : '0',
        marginLeft: mobileWindow ? '-110%' : '0',
        position: mobileWindow ? 'absolute' : 'relative',
        top: mobileWindow ? '95px' : '',
      }"
    >
      <div class="left-menu"
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
    <div
      class="mainblock-right"
      :style="{
        borderLeft: !isSingle ? '' : 'none',
        borderTopLeftRadius: !isSingle ? '' : '0',
        borderBottomLeftRadius: !isSingle ? '' : '0',
      }"
    >

      <div class="title">
        <div class="icon" 
          @click="handClick()"
          :style="{
            display: mobileWindow ? 'flex' : 'none',
          }"
        >
          <slot name="icon"  />
        </div>
        <slot name="title" />
      </div>

      <div class="body"
        :style="{
          background: background,
        }"
      >
        <slot name="body" />
      </div>

    </div>
  </div>
  <RightMenu />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref, computed, } from 'vue';

import RightMenu from '@/assets/svg/Main/RightMenu.svg';

export default defineComponent({
  name: 'AdaptiveContainer',
  components: {
    RightMenu,
  },
  props: {
    menuWidth: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
    },
    mobileWidth: {
      type: String as PropType<string>,
      required: false,
      default: '1330px',
    },
    close: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    }
  },
  setup(props) {
    const mounted = ref(false);
    const collapsed: Ref<boolean> = ref(true);
    const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);
    const temp = ref(props.close);


    const handClick = () => {
      collapsed.value = !collapsed.value;
    };

    onBeforeMount(async() => {
      window.addEventListener('resize', () => {
        switch (props.mobileWidth) {
          case '1330px':
            return mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches;
          case '1024px':
            return mobileWindow.value = window.matchMedia('(max-width: 1024px)').matches;
          case '768px':
            return mobileWindow.value = window.matchMedia('(max-width: 768px)').matches;
        } return mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches;
      });
      close();
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
}

.left-menu {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  border-radius: $normal-border-radius;
  border: $normal-border;
  background: $base-background;
  max-height: auto;
  min-height: 40px;
  transition: 0.3s;
  background: #343D5C;
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
  padding: 25px 0;
  font-size: 24px;
  color: #343D5C;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  min-height: 10px;
}

.icon {
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  justify-content: center;
  align-items: center;
}

.body{
  min-height: 40px;
  max-height: calc(100% - 50px);
  width: calc(100% - 50px);
  padding: 25px;
  border-radius: $normal-border-radius;
  border: $normal-border;
}



@media screen and (max-width: 1024px) {
  .title {
    width: calc(100% - 120px);
    padding: 25px 60px;
  }
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 20px;
  }
}

@media screen and (max-width: 500px) {
  .title {
    width: calc(100% - 75px);
    font-size: 16px;
    padding: 15px 15px 15px 60px;
  }

  .body{
    max-height: calc(100% - 30px);
    width: calc(100% - 30px);
    padding: 15px;
  }
}

</style>
