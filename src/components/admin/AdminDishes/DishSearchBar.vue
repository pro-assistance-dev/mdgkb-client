<template>
  <div class="search-container">
    <form class="search-form">
      <el-input
        ref="searchInput"
        v-model="searchText"
        placeholder="Введите свой запрос"
        style="width: 100%; margin-right: 10px"
        popper-class="wide-dropdown"
        @input="search"
      />
      <button type="submit"><i class="el-icon-search"></i></button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'DishSearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchText = ref<string>('');

    const search = async () => {
      emit('search', searchText.value);
    };

    return {
      searchText,
      search,
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
:deep(.el-input__inner) {
  padding: 0px;
  padding-left: 15px;
  height: 24px;
  margin-top: px;
  margin-right: -20px;
  border: 1px solid #1979cf;
  border-right: none;
  border-radius: 20px 0 0 20px;
  color: $text-color;
  width: 100%;
  &:focus {
    outline: none;
  }
}
button {
  padding: 0px 15px 0px 10px;
  height: 24px;
  margin: 8px 0 0 0;
  border: none;
  border-left: none;
  border-radius: 0 20px 20px 0;
  color: white;
  background-color: #1979cf;

  &:hover {
    background-color: lighten(#1979cf, 10%);
    cursor: pointer;
    transition: 0.3s;
  }
}

.search-form {
  display: flex;
  justify-content: center;
}
</style>
