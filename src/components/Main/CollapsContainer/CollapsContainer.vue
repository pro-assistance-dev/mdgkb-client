<template>
  <div class="tab">
    <input id="tab-window" type="checkbox" name="tabs" />
    <label for="tab-window">
      <div class="tab-name">
        {{ headerTitle }}
      </div>
    </label>
    <div class="tab-content">
      aldifuhadf
      <!-- <div class="main-page-container-main">
        <slot></slot>
      </div> -->
    </div>
  </div>
  <!-- <div :style="{ 'background-color': backgroundColor }">
    <div class="main-page-container container">
      <div class="main-page-container-header">
        <div class="main-page-container-header-title">{{ headerTitle }}</div>
        <div class="collaps-button">

        </div>
      </div>
      <div class="main-page-container-main">
        <slot></slot>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
// import { Right } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CollapsContainer',
  // components: { Right },
  props: {
    headerTitle: {
      type: String,
      required: true,
    },

    backgroundColor: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.main-page-container {
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    letter-spacing: 2px;
    &-title {
      font-size: 28px;
      font-weight: bold;
    }
    button {
      margin-right: 15px;
      display: flex;
      align-items: center;
      background-color: inherit;
      border: none;
      font-size: 16px;
      color: blue;
      letter-spacing: 2px;
      cursor: pointer;
      &:hover {
        color: darken(blue, 20%);
      }
    }
    .el-icon {
      margin-left: 10px;
      font-size: 22px;
    }
  }
  &-footer {
    text-align: center;
    margin: 25px 0 45px 0;
    button {
      padding: 15px 35px;
      background-color: #2754ec;
      color: white;
      border: none;
      border-radius: 20px;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 1px;
      cursor: pointer;
      &:hover {
        background-color: darken(#2754ec, 10%);
      }
    }
  }
}
:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
:deep(.el-carousel__container) {
  max-height: auto;
  // height: unset;
}






.tab {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgb(black, 0.1);
  border-radius: $normal-border-radius;
  background: #ffffff;

  &-name {
    position: relative;
    display: flex;
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
    font-size: 22px;
    letter-spacing: 0.1em;
    color: $site_dark_gray;
    height: 60px;
    align-items: center;
    font-weight: bold;
    padding-bottom: 20px;
  }
}

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
// .tab label {
//   position: sticky;
//   fill: #ffffff;
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   height: 50px;
//   width: 100%;
// }

.tab-content {
  max-height: 0;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
  color: #343e5c;
  padding-right: 5px;
}

.tab input:checked ~ .tab-content {
  max-height: 100vh;
}

.tab label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  text-align: center;
  -webkit-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
}

.tab-window {
  width: 100%;
}

// @media screen and (max-width: 1400px) {
//   .main-page-container {
//     &-main,
//     &-header,
//     &-footer {
//       padding: 0 10px;
//     }
//     &-header-title {
//       letter-spacing: 0;
//     }
//   }
// }

// @media screen and (max-width: 480px) {
//   .main-page-container-header {
//     button {
//       font-size: 12px;
//       margin: 0px;
//     }
//     &-title {
//       font-size: 18px;
//     }
//   }

//   :deep(.el-icon) {
//     width: 0.5em;
//     height: 0.5em;
//   }
//   :deep(.el-icon svg) {
//     width: 0.5em;
//     height: 0.5em;
//     padding-bottom: 6px;
//   }
// }
</style>
