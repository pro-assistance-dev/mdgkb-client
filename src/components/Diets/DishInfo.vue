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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DishInfo',
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/base-style.scss';

.body {
  position: relative;
  width: 938px;
  min-height: 10px;
  border: $normal-border;
  border-radius: $border-radius;
  background: #ffffff;
  padding: 16px;
}

.icon-close {
  width: auto;
  height: auto;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
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

@media screen and (max-width: 768px) {
  .body {
    width: auto;
  }

  .main {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .main-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 360px;
  }

  .main-right {
    width: 100%;
    margin-left: 0px;
    width: 360px;
  }
}

@media screen and (max-width: 400px) {
  .body {
    width: auto;
    padding: 10px;
  }

  .main {
    display: block;
  }

  .main-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
  }

  .main-right {
    width: 100%;
    margin-left: 0px;
    width: 300px;
  }
}
</style>
