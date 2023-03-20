<template>
  <div class="body">
    <div class="icon-close">
      <slot name="icon" />
    </div>
    <div class="main">
      <div class="main-left">
        <slot name="image" />
      </div>
      <div class="main-right">
        <div class="small-title">
          <slot name="small-title" />
        </div>
        <div class="title">
          <slot name="title" />
        </div>
        <div class="info">
          <slot name="info" />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="mainblock">
    <div
      class="mainblock-right1-mobile"
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
          padding: isBufet ? '16px 0' : '25px 0',
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
        <div class="mainblock-right2">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CartContainer',
  props: {
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '30px',
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.body {
  position: relative;
  width: 1200px;
  min-height: 10px;
  border: $normal-border;
  border-radius: $normal-border-radius;
  background: #ffffff;
  padding: 16px;
}

.icon-close {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.title {
  display: flex;
  justify-content: left;
}

.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
}
.line-left {
  width: calc(100% - 24px);
  padding-top: 16px;
  padding-right: 24px;
}

.line-right {
  width: 320px;
  padding-top: 16px;
}

.main {
  display: flex;
  justify-content: left;
}

.main-left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
}

.main-right {
  width: calc(100% - 16px);
  margin-left: 16px;
}

.small-title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 20px;
  color: #a1a7bd;
  font-size: 13px;
  letter-spacing: 1px;
}

// .mainblock-right1-item1-mobile {
//   display: none;
// }

// .mainblock-right1-item2-mobile {
//   display: none;
// }

// .title {
//   display: flex;
//   min-height: 40px;
//   letter-spacing: 1px;
//   font-size: 24px;
//   font-family: 'Open Sans', sans-serif;
//   color: #343e5c;
// }

@media screen and (max-width: 768px) {
}
</style>
