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

import ISearchModel from '@/interfaces/ISearchModel';

export default defineComponent({
  name: 'DishSearchBar',
  emits: ['search'],
  props: {
    isSearchPage: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const searchInputText = ref<string>('');
    const searchInput = ref<HTMLInputElement | null>(null);
    const searchModel: Ref<ISearchModel> = computed<ISearchModel>(() => store.getters['search/searchModel']);

    onBeforeMount((): void => {
      if (!route.query.q || !route.query.q.length) {
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
      await router.push(`/dev`);
      return;
      // searchModel.value.suggester = true;
      // searchModel.value.query = queryString;
      // searchModel.value.options = [];
      // searchModel.value.searchGroup.options = [];
      // await store.dispatch('search/searchV1', searchModel.value);
      // const options = searchModel.value.options.map((opt: IOption) => {
      //   return { label: opt.value, value: opt.label };
      // });
      // cb(options);
    };

    const submitSearch = async () => {
      await router.push(`/search?q=${searchModel.value.query}`);
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
