<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent="submitSearch">
      <el-autocomplete
        ref="searchInput"
        v-model="searchModel.query"
        placeholder="Введите свой запрос"
        style="width: 100%; margin-right: 10px"
        popper-class="wide-dropdown"
        :fetch-suggestions="suggestSearch"
        @select="submitSearch"
      />
      <button type="submit" @click="search"><i class="el-icon-search"></i></button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IOption from '@/interfaces/IOption';
import SearchModel from '@/services/classes/SearchModel';

export default defineComponent({
  name: 'SearchBar',
  props: {
    isSearchPage: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['search'],

  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const searchInputText = ref<string>('');
    const searchInput = ref<HTMLInputElement | null>(null);
    const searchModel: Ref<SearchModel> = computed<SearchModel>(() => store.getters['search/searchModel']);

    onBeforeMount((): void => {
      if (!route.query.query || !route.query.query.length) {
        searchModel.value.query = '';
        return;
      }
      searchModel.value.query = route.query.q as string;
    });

    const showDrawer = () => {
      store.commit('search/toggleDrawer', true);
      // searchModel.value.query.blur();
    };

    const suggestSearch = async (queryString: string, cb: (arg: any) => void) => {
      console.log(queryString);
      if (queryString.length < 3) {
        cb([]);
        return;
      }
      searchModel.value.suggester = true;
      searchModel.value.query = queryString;
      searchModel.value.options = [];
      searchModel.value.searchGroup.options = [];
      await store.dispatch('search/full', searchModel.value);
      const options = searchModel.value.options.map((opt: IOption) => {
        return { label: opt.value, value: opt.label };
      });
      cb(options);
    };

    const submitSearch = async () => {
      await router.push(`/search?query=${searchModel.value.query}`);
      emit('search');
    };

    const search = async () => {
      emit('search');
    };

    return {
      suggestSearch,
      search,
      searchModel,
      searchInput,
      searchInputText,
      showDrawer,
      submitSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$border-color: #e3e8f0;
$text-color: #a7adc2;
$bg-color: #ff4d3b;

.search-container {
  display: inline;
  text-align: center;
  width: 100%;
}
:deep(.el-input__inner) {
  padding: 10px;
  padding-left: 15px;
  height: 40px;
  margin-top: 1px;
  margin-right: -20px;
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

  &:hover {
    background-color: lighten($bg-color, 10%);
    cursor: pointer;
  }
}

.search-form {
  display: flex;
  justify-content: center;
}
</style>
