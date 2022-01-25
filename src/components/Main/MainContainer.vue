<template>
  <div :style="{ 'background-color': backgroundColor }">
    <div class="main-page-container container">
      <div class="main-page-container-header">
        <div class="main-page-container-header-title">{{ headerTitle }}</div>
        <button v-if="headerButtonTitle">
          {{ headerButtonTitle }}
          <el-icon><right /></el-icon>
        </button>
      </div>
      <slot></slot>
      <div v-if="footerButtonTitle" class="main-page-container-footer">
        <button>{{ footerButtonTitle }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Right } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainContainer',
  components: { Right },
  props: {
    headerTitle: {
      type: String,
      required: true,
    },
    headerButtonTitle: {
      type: String,
      default: '',
    },
    footerButtonTitle: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
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
      display: flex;
      align-items: center;
      background-color: inherit;
      border: none;
      font-size: 16px;
      color: blue;
      letter-spacing: 2px;
      cursor: pointer;
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
</style>
