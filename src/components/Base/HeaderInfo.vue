<template>
  <div class="mainblock">
    <div
      class="mainblock-right1-mobile"
      :style="{
        paddingBottom: isBufet ? '0' : '60px',
      }"
    >
      <div class="mainblock-right1-item1">
        <slot name="small-title" />
      </div>
      <div class="mainblock-right1-item2">
        <div class="animation">
          <slot name="big-title" />
        </div>
      </div>
      <div v-if="!isBufet" class="mainblock-right1-item3">
        <slot name="tags" />
      </div>
      <div class="mainblock-right1-item4">
        <slot name="contact" />
      </div>
      <div v-if="!isBufet" class="mainblock-right1-item5">
        <slot name="icons" />
      </div>
    </div>

    <div class="mainline">
      <div
        class="mainblock-left"
        :style="{
          minWidth: leftWidth,
          background: background,
          display: leftWidth !== '0px' ? 'flex' : 'none',
          borderRight: !isSingle ? '' : 'none',
          borderTopRightRadius: !isSingle ? '' : '0',
          borderBottomRightRadius: !isSingle ? '' : '0',
          marginRight: !isSingle ? '' : '0',
          padding: isBufet ? '16px 0' : '25px 0',
        }"
      >
        <slot name="foto" />
      </div>
      <div
        class="mainblock-right"
        :style="{
          background: background,
          borderLeft: !isSingle ? '' : 'none',
          borderTopLeftRadius: !isSingle ? '' : '0',
          borderBottomLeftRadius: !isSingle ? '' : '0',
          padding: isBufet ? '16px 0' : '25px',
        }"
      >
        <div
          class="mainblock-right1"
          :style="{
            paddingBottom: isBufet ? '0' : '60px',
          }"
        >
          <div class="mainblock-right1-item1">
            <slot name="small-title" />
          </div>
          <div class="mainblock-right1-item2">
            <slot name="big-title" />
          </div>
          <div v-if="!isBufet" class="mainblock-right1-item3">
            <slot name="tags" />
          </div>
          <div class="mainblock-right1-item4">
            <slot name="contact" />
          </div>
          <div v-if="!isBufet" class="mainblock-right1-item5">
            <slot name="icons" />
          </div>
        </div>
        <div class="mainblock-right2">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'HeaderInfo',
  props: {
    leftWidth: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },
    isSingle: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    isBufet: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.mainblock {
  display: flex;
  justify-content: left;
  width: 100%;
  height: auto;
}

.mainline {
  display: flex;
  justify-content: left;
  width: 100%;
  height: auto;
}

.mainblock-left {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  border-radius: $border-radius;
  border: $normal-border;
  background: $base-background;
  padding: 25px 0;
}

.mainblock-left-item1 {
  position: absolute;
  bottom: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 266px;
  height: 60px;
  background: #e3e3e3;
}

.mainblock-right {
  display: flex;
  align-items: start;
  justify-content: right;
  width: 100%;
  border-radius: $border-radius;
  border: $normal-border;
  background: $base-background;
}

.mainblock-right1 {
  position: relative;
  height: calc(100% - 60px);
  width: calc(100% - 25px);
  margin-right: 25px;
}

.mainblock-right1-mobile {
  display: none;
}

.mainblock-right2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 230px;
  max-width: 230px;
  margin-top: auto;
  margin-bottom: auto;
}

.mainblock-right1-item1 {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 20px;
  color: #a1a7bd;
  font-size: 13px;
  letter-spacing: 1px;
}

.mainblock-right1-item1-mobile {
  display: none;
}

.mainblock-right1-item2-mobile {
  display: none;
}

.mainblock-right1-item2 {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 687px;
  min-height: 40px;
  overflow: hidden;
  letter-spacing: 1px;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
  color: #343e5c;
}

.mainblock-right1-item3 {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 687px;
  min-height: 40px;
}

.mainblock-right1-item4 {
  max-width: 687px;
  min-height: 40px;
}

.mainblock-right1-item5 {
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 687px;
  height: 60px;
}

@media screen and (max-width: 768px) {
  .mainblock-right2 {
    min-width: 140px;
    max-width: 140px;
  }
}

@media screen and (max-width: 600px) {
  .mainblock {
    display: block;
  }

  .mainblock-right1-mobile {
    display: block;
    align-items: start;
    justify-content: right;
    width: calc(100% - 34px);
    border-radius: $border-radius;
    border: $normal-border;
    padding: 16px;
    background: $base-background;
    margin-bottom: 10px;
  }

  .mainblock-right1 {
    display: none;
  }

  // .mainblock-right1-item1-mobile {
  //   display: flex;
  //   align-items: center;
  //   justify-content: left;
  // }

  // .mainblock-right1-item2-mobile {
  //   display: flex;
  //   align-items: center;
  //   justify-content: left;
  // }

  // .mainblock-right1-item1 {
  //   display: none;
  //   background: #343e5c;
  // }

  // .mainblock-right1-item2 {
  //   display: none;
  //   background: #343e5c;
  // }

  // .mainblock-right1-item3 {
  //   display: flex;
  //   align-items: center;
  //   justify-content: left;
  //   max-width: 687px;
  //   min-height: 40px;
  // }

  // .mainblock-right1-item4 {
  //   max-width: 687px;
  //   min-height: 40px;
  // }

  // .mainblock-right1-item5 {
  //   position: absolute;
  //   bottom: 0px;
  //   left: 0px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: left;
  //   max-width: 687px;
  //   height: 60px;
  // }
}
</style>
