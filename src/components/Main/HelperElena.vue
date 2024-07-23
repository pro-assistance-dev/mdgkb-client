<template>
  <div class="helper">
    <div class="helper-title">
      <div class="t1">Виртуальный&nbsp;помощник</div>
      <div class="t2">Логический Единый Навигационный Ассистент</div>
    </div>
    <div class="helper-body">
      <div class="dialog">
        <div class="t3">На данный момент наш портал работает в тестовом режиме</div>
      </div>
      <div class="avatar">
        <div class="helper-avatar">
          <img :src="ElenaImg" alt="avatar-helper-elena" />
        </div>
      </div>
    </div>
    <div class="search">
      <SeacrhBar :is-search-page="true" @search="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SeacrhBar from '@/views/mainLayout/elements/SearchBar.vue';

export default defineComponent({
  name: 'HelperElena',
  components: {
    SeacrhBar,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.helper {
  margin-top: 20px;
  background: #ffffff;
  background-clip: padding-box;
  border: rgba(0, 0, 0, 0.05) solid 1px;
  border-radius: 5px;
}

.helper-title {
  display: block;
  height: 60px;
  align-items: center;
  flex-wrap: nowrap;
  border-bottom: #e3e8f0 solid 1px;
}

.t1 {
  text-transform: uppercase;
  white-space: 100%;
  font-family: roboto;
  font-size: 14px;
  color: #888888;
  padding: 25px 0 0 20px;
  margin: 0;
  line-height: 100%;
}

.t2 {
  white-space: 100%;
  font-family: roboto;
  font-size: 11px;
  color: #a1a7bd;
  padding: 0 0 0 20px;
  margin: 0;
}

.t3 {
  font-family: roboto;
  font-size: 18px;
  font-style: italic;
  color: #00aba0;
  // color: #888888;
  padding: 0 0 0 20px;
  margin: 0;
  line-height: 100%;
}

.helper-body {
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
}

.dialog {
  display: flex;
  width: 55%;
  text-align: right;
  align-items: center;
}

.avatar {
  display: flex;
  width: 44%;
  width: 100px;
  height: 100px;
  background: #a1a7bd;
  align-items: center;
}

.avatar {
  display: block;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 102px;
    height: 102px;
    object-fit: cover;
  }
}

.search {
  padding: 0 20px 15px 8px;
}
</style>
