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
      <div class="line-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CartContainer',
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.body {
  position: relative;
  width: 970px;
  min-height: 10px;
  max-height: 100vh;
  border: $normal-border;
  border-radius: $normal-border-radius;
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

@media screen and (max-width: 768px) {
  .body {
    width: auto;
  }
  .line {
    height: 90vh;
    display: block;
  }

  .line-left {
    width: calc(100% - 10px);
    padding: 0;
    margin-left: 10px;
  }

  .line-right {
    width: auto;
    padding-top: 0px;
  }
}

@media screen and (max-width: 400px) {
  .body {
    width: auto;
    padding: 10px;
    margin: 0 5px;
  }
}
</style>
