<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent="submitSearch">
      <input ref="searchInput" type="text" placeholder="Введите свой запрос" v-model="searchInputText"/>
      <button type="submit"><i class="el-icon-search"></i></button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const searchInputText = ref<string>('');
    const searchInput = ref<HTMLInputElement | null>(null);

    onBeforeMount((): void => {
      if (!route.query.q || !route.query.q.length) {
        return;
      }

      searchInputText.value = route.query.q as string;
    });
    
    const showDrawer = () => {
      store.commit('search/toggleDrawer', true);
      searchInput.value?.blur();
    };

    const submitSearch = async () => {
      await router.push(`/search?q=${searchInputText.value}`);
    };



    return {
      searchInput,
      searchInputText,
      showDrawer,
      submitSearch,
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
  width: 100%;
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

.search-form {
  display: flex;
  justify-content: center;
}
</style>
