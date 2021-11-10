<template>
  <div class="header-top">
    <div class="container">
      <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="$router.push('/')" />
      <div class="search">
        <SeacrhBar />
      </div>
      <div class="login-menu">
        <LoginDropdownMenu :show-button-name="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';
import SeacrhBar from '@/views/mainLayout/elements/SearchBar.vue';

export default defineComponent({
  name: 'HeaderTop',
  components: { LoginDropdownMenu, SeacrhBar },
});
</script>

<style lang="scss" scoped>
.login-menu {
  margin-right: 10px;
}
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.header-logo-img {
  transition: all 0.3s;
  margin-left: 10px;
}

.header-logo-img:hover {
  cursor: pointer;
  opacity: 0.7;
}

.flex {
  display: flex;
  justify-content: center;
}

.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.search {
  width: 100%;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .container {
    justify-content: space-between;
  }
  .search {
    display: none;
  }
}
</style>
