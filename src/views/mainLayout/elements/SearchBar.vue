<template>
  <div class="search-container">
    <input ref="searchInput" type="text" placeholder="Введите свой запрос" @focus="showDrawer" />
    <button><i class="el-icon-search"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'SearchBar',
  setup() {
    const store = useStore();
    const searchInput = ref<HTMLElement | null>(null);
    const showDrawer = () => {
      store.commit('search/toggleDrawer', true);
      searchInput.value?.blur();
    };
    return {
      searchInput,
      showDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
$border-color: #e3e8f0;
$text-color: #a7adc2;
$bg-color: #ff4d3b;

.search-container {
  display: inline;
  text-align: center;
  width: 100%;
}
input {
  padding: 10px;
  padding-left: 15px;
  height: 20px;
  margin: 0;
  border: 1px solid $border-color;
  border-right: none;
  border-radius: 20px 0 0 20px;
  color: $text-color;
  width: 70%;
  max-width: 400px;
  &:focus {
    outline: none;
  }
}
button {
  padding: 10px 15px 10px 10px;
  height: 42px;
  margin: 0;
  border: 1px solid $border-color;
  border-left: none;
  border-radius: 0 20px 20px 0;
  color: white;
  background-color: $bg-color;
}
</style>
