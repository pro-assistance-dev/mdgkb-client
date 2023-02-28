<template>
  <div class="mainblock">
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
      }"
    >
      <div class="mainblock-right1">
        <div class="mainblock-right1-item1">
          <slot name="small-title" />
        </div>
        <div class="mainblock-right1-item2">
          <div class="animation">
            <slot name="big-title" />
          </div>
        </div>
        <div class="mainblock-right1-item3">
          <slot name="tags" />
        </div>
        <div class="mainblock-right1-item4">
          <slot name="contact" />
        </div>
        <div class="mainblock-right1-item5">
          <slot name="icons" />
        </div>
      </div>
      <div class="mainblock-right2">
        <slot name="buttons" />
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
    },
    isSingle: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.mainblock {
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
  border-radius: $normal-border-radius;
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
  align-items: center;
  justify-content: right;
  width: 100%;
  border-radius: $normal-border-radius;
  border: $normal-border;
  padding: 25px;
  background: $base-background;
}

.mainblock-right1 {
  position: relative;
  height: calc(100% - 60px);
  width: calc(100% - 25px);
  margin-right: 25px;
  padding-bottom: 60px;
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

.mainblock-right1-item2 {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 687px;
  min-height: 40px;
  // padding-bottom: 20px;
  overflow: hidden;
  // border-bottom: 1px solid #e9e9e9;
  letter-spacing: 1px;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
}

.mainblock-right1-item3 {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 687px;
  min-height: 40px;
  // border-bottom: 1px solid #e9e9e9;
}

.mainblock-right1-item4 {
  max-width: 687px;
  min-height: 40px;
  // border-bottom: 1px solid #e9e9e9;
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
  // background: #e3e3e3;
}
</style>
