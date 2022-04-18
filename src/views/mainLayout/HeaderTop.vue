<template>
  <div id="header-top" class="header-top">
    <div class="container">
      <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="$router.push('/')" />
      <div class="search">
        <div class="search-block">
          <SeacrhBar v-show="currentRoute !== 'SearchPage'" />
        </div>
      </div>
      <div class="login-menu">
        <LoginDropdownMenu :show-button-name="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';
import SeacrhBar from '@/views/mainLayout/elements/SearchBar.vue';

export default defineComponent({
  name: 'HeaderTop',
  components: { LoginDropdownMenu, SeacrhBar },

  //   setup () {
  //   const currentRoute = computed(() => {
  //     return useRoute().name
  //   })
  //   return { currentRoute }
  // },

  setup() {
    const currentRoute = computed(() => {
      return useRouter().currentRoute.value.name;
    });
    return { currentRoute };
  },
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
  padding-left: 10px;
  // padding-right: 10px;
}

@media screen and (max-width: 768px) {
  .container {
    justify-content: space-between;
  }
  .search {
    display: none;
    max-width: 400px;
  }
}

@media screen and (max-width: 480px) {
  .header-top {
    display: none;
  }
}
</style>
