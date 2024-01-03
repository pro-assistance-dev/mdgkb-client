<template>
  <slot />
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.4;
  z-index: 100;
}
.profile-page-container {
  display: flex;
  width: 100%;
  &-main {
    max-width: 1034px;
    width: 100%;
  }
}
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f6f6f6;
  // min-height: calc(100vh - 124px);
}
.main-carousel-container {
  // margin: 0 auto 30px; // + 20px от контейнера элемента = как в макете - 50px
  position: relative;
  z-index: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.main-box {
  padding-top: 0px;
  margin: 20px 0;
  min-height: 80vh;
}

:deep(.el-checkbox__inner) {
  width: 18px;
  height: 18px;
  border: 2px solid #b5b5b5;
}

:deep(.el-checkbox__inner::after) {
  height: 10px;
  width: 6px;
  top: 0px;
}

.icon-close {
  width: 16px;
  height: 16px;
  fill: #343d5c;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.7;
}

.icon-close:hover {
  opacity: 1;
}

.make-green {
  width: 230px;
  font-weight: $base-font-weight;
  font-size: 14px;
  border-radius: 10px;
  background: #31ae5e;
  padding: 15px 0px;
  height: auto;
  letter-spacing: 2px;
  color: #ffffff;
  border: 1px solid rgb(black, 0.05);
  margin: 20px 0 0 0;
  &:hover {
    cursor: pointer;
    background: #47cc77;
  }
}
</style>
