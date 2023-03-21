<template>
  <div class="body">
    <div class="icon-close">
      <slot name="icon" />
    </div>
    <div class="title">
      <slot name="title" />
    </div>
    <div class="line">
      <div class="line-left">
        <slot name="left" />
      </div>
      <div class="line-center"></div>
      <div class="line-right">
        <slot name="right" />
      </div>
    </div>
  </div>
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
  height: 24px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
  padding: 0;
  margin: 0;
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
// .container-bufet {
//   position: relative;
//   width: 100%;
//   color: #ffffff;
// }

// .header {
//   display: block;
//   position: sticky;
//   top: 59px;
//   width: 100%;
//   z-index: 2;
// }

// .header-top {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: calc(100% - 40px);
//   height: 60px;
//   background: #205bb8;
//   padding: 0 20px;
// }

// .icon-cart {
//   width: 40px;
//   height: 40px;
//   fill: #d2def1;
//   cursor: pointer;
//   transition: 0.3s;
// }

// .icon-cart:hover {
//   fill: #ffffff;
// }

// .header-left {
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   font-size: 14px;
//   color: inherit;
// }

// input[type='text'] {
//   font-family: inherit;
//   font-size: inherit;
//   line-height: inherit;
//   margin: 0 0 0 10px;
//   border: none;
//   border-radius: 20px;
//   outline: none;
//   background: #ffffff;
//   text-transform: uppercase;
//   padding-left: 12px;
//   width: 33px;
//   color: #205bb8;
// }

// .header-right {
//   display: flex;
//   align-items: center;
//   justify-content: right;
//   position: relative;
// }

// .sup {
//   position: absolute;
//   top: -3px;
//   right: -8px;
//   width: 20px;
//   height: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: #449d7c;
//   color: #ffffff;
//   border-radius: 20px;
//   font-size: 12px;
//   font-weight: bold;
// }

// .menu-bufet {
//   width: 100%;
//   height: 34px;
//   background: #379fff;
//   display: flex;
//   align-items: center;
//   justify-content: left;
// }

// .item {
//   height: 34px;
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   margin: 0 10px;
//   color: #343e5c;
// }
// .active-item {
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   margin: 0 10px;
//   color: #ffffff;
// }

// .table-main {
//   width: calc(100% - 32px);
//   display: block;
//   padding: 16px;
//   height: 100vh;
// }

// .main > div {
//   object-fit: cover;
// }

// .footer {
//   width: calc(100% - 40px);
//   padding: 0 20px;
//   height: 40px;
//   background: #449d7c;
//   display: flex;
//   align-content: center;
//   justify-content: space-between;
//   cursor: pointer;
//   position: sticky;
//   bottom: 0px;
//   z-index: 2;
// }

// .footer:hover {
//   background: lighten(#449d7c, 10%);
// }

// .footer-info {
//   display: flex;
//   align-items: center;
//   justify-content: right;
// }

// .add-to-card {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 12px;
//   margin: 0;
//   border: none;
//   padding: 0px;
//   background: inherit;
//   color: #ffffff;
//   font-size: 16px;
//   cursor: pointer;
// }

// .field1 {
//   font-size: 10px;
//   color: #2754eb;
//   margin-right: 20px;
// }

// .field2 {
//   font-size: 16px;
//   color: #ffffff;
// }

// .menu-title {
//   font-size: 18px;
//   color: #ffffff;
//   margin-left: 20px;
// }

// .bufet {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 14px;
//   margin: 0;
//   cursor: pointer;
//   color: #d2def1;
//   border: none;
//   padding: 0px;
//   background: inherit;
// }

// .bufet:hover {
//   color: #ffffff;
// }

@media screen and (max-width: 768px) {
  // .menu-bufet {
  //   width: 100%;
  //   height: 34px;
  //   background: #379fff;
  //   display: flex;
  //   align-items: center;
  //   justify-content: left;
  // }

  // .container-bufet {
  //   margin-top: -20px;
  // }
}
</style>
