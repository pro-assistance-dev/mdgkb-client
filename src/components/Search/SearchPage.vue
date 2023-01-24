<template>
  <div class="search">
    <SeacrhBar :is-search-page="true" @search="search" />
  </div>
  <div class="filters">
    <div>
      <ul class="tag-list">
        <li>
          <button class="tag-item-batton" :class="{ 'tag-active': !searchModel.searchGroup.id }" @click="selectSearchGroup(undefined)">
            Все
          </button>
        </li>
        <li v-for="searchGroup in searchModel.searchGroups" :key="searchGroup.id" cancelable="true" :label="searchGroup.id">
          <button
            v-if="searchGroup.label"
            class="tag-item-batton"
            :class="{ 'tag-active': searchGroup.id === searchModel.searchGroup.id }"
            @click="selectSearchGroup(searchGroup.id)"
          >
            {{ searchGroup.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="search-result">
    <div v-for="result in results" :key="result.value">
      <div class="search-result-title" @click="$router.push(result.route)" v-html="result.label.substring(0, 100)"></div>
      <div class="search-result-meta">
        {{ result.searchGroup.label }}
        <template v-for="meta in result.searchElementMetas" :key="meta.value">
          <hr class="search-result-meta-delimitter" />
          {{ meta.value }}
        </template>
      </div>
      <div class="search-result-description" v-html="result.description.substring(0, 100)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onUnmounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SearchModel from '@/classes/SearchModel';
import ISearchElement from '@/interfaces/ISearchElement';
import SeacrhBar from '@/views/mainLayout/elements/SearchBar.vue';

export default defineComponent({
  name: 'SearchPage',
  components: {
    SeacrhBar,
  },

  setup() {
    const store = useStore();
    const searchInput = ref();
    const searchString: Ref<string> = ref('');
    let groups: Ref<string[]> = ref([]);
    const router = useRouter();
    const results: Ref<ISearchElement[]> = ref([]);

    const searchModel: Ref<SearchModel> = computed<SearchModel>(() => store.getters['search/searchModel']);
    const isDrawerOpen: ComputedRef<boolean> = computed<boolean>(() => store.getters['search/isSearchDrawerOpen']);

    const openDrawer = () => {
      searchInput.value.inputRef.focus();
    };

    const closeDrawer = () => store.commit('search/toggleDrawer', false);

    onBeforeMount(async () => {
      await store.dispatch('search/searchGroups');
      await searchModel.value.reproduceFromRoute();
      await search();
      // await selectSearchGroup(undefined);
    });

    onUnmounted(() => {
      searchModel.value.query = '';
    });
    const handleSelect = async (link: string) => {
      store.commit('search/toggleDrawer', false);
      await router.push(link);
    };
    const changeFilter = (searchGroupIds: string[]) => {
      if (searchGroupIds.length) {
        searchModel.value.searchGroupId = searchGroupIds[0];
      }
    };

    const selectSearchGroup = async (searchGroupId: string | undefined) => {
      await searchModel.value.setSearchGroup(searchGroupId);
      await search();
    };

    const search = async () => {
      searchModel.value.options = [];
      searchModel.value.searchGroup.options = [];
      await store.dispatch('search/full', searchModel.value);
      results.value = searchModel.value.searchGroup.options;
      results.value = searchModel.value.options;
    };

    return {
      results,
      search,
      selectSearchGroup,
      groups,
      changeFilter,
      value: ref([]),
      searchModel,
      handleSelect,
      searchString,
      searchInput,
      isDrawerOpen,
      closeDrawer,
      openDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
.filters {
  margin-top: 10px;
}
:deep(.el-drawer__header) {
  margin: 0 !important;
}

.result-item {
  padding-left: 20px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  font-weight: lighter;
  color: #4a4a4a;
}

:deep(.el-select-v2__combobox-input) {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  font-weight: lighter;
  color: #4a4a4a;
}

.tag-list {
  list-style-type: none;
  display: flex;
  justify-content: left;
  padding-left: 0px;
}

.tag-item-batton {
  background: #ffffff;
  border-radius: 40px;
  border: 1px solid #2754eb;
  font-family: roboto;
  font-size: 0.8rem;
  color: #2754eb;
  margin-left: 5px;
  padding: 3px 18px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #133dcc;
    color: #ffffff;
    border: 1px solid #133dcc;
  }
}

.tag-active {
  background-color: #133dcc;
  color: #ffffff;
  border: 1px solid #133dcc;
}

:deep(.el-select-v2__wrapper) {
  border-radius: 40px;
}

.search-result {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 20px;

  &-title {
    font-family: Roboto, Verdana, sans-serif;
    font-size: 14px;
    font-weight: lighter;
    color: #343e5c;

    &:hover {
      cursor: pointer;
      color: #133dcc;
    }
  }

  &-meta {
    font-family: Roboto, Verdana, sans-serif;
    font-size: 12px;
    font-weight: lighter;
    color: #c4c4c4;

    &-delimitter {
      display: inline-block;
      width: 3px;
      height: 3px;
      margin: 0 5px 1px 5px;
      vertical-align: middle;
      border-radius: 1.5px;
      //background-color: #696c71;
      background-color: #c4c4c4;
      border: none;
    }
  }
  &-description {
    font-family: Roboto, Verdana, sans-serif;
    font-size: 12px;
    font-weight: lighter;
    margin-bottom: 40px;
  }
}
</style>
