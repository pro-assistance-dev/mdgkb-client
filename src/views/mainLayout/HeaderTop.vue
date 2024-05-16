<template>
  <div id="header-top" class="header-top">
    <div class="container">
      <img :src="MdgkbLogo" class="header-logo-img" alt="mdgkb-logo" @click="$router.push('/')" />
      <div class="search">
        <div class="search-block">
          <SearchBar v-show="currentRoute !== 'SearchPage'" />
        </div>
      </div>
      <div class="login-menu">
        <LoginDropdownMenu :show-button-name="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MdgkbLogo from "@/assets/img/mdgkb-logo.webp"
// documet.
const currentRoute = computed(() => {
  return Router.Route().name;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.login-menu {
  margin-right: 40px;
}

.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.header-logo-img {
  margin-left: 0px;
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
  display: flex;
  justify-content: center;
}

.search-block {
  width: 400px;
}

.header-top {
  padding: 10px 0 10px 10px;
  // padding-right: 10px;
}

@media screen and (max-width: 860px) {
  .container {
    justify-content: space-between;
  }

  .search {
    max-width: 300px;
  }
}

@media screen and (max-width: 760px) {
  .search {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .header-top {
    display: none;
  }
}
</style>
