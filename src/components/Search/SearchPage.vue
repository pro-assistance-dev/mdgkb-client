<template>
  <!-- <el-form>
      <el-form-item>
        <el-select-v2
          ref="searchInput"
          v-model="value"
          remote
          :options="searchModel.searchGroups"
          filterable
          :remote-method="find"
          style="width: 100%"
          placeholder="Введите свой запрос"
          @change="handleSelect"
          @focus="searchModel.searchGroups = []"
          @blur="searchModel.searchGroups = []"
        >
          <template #default="{ item }">
            <span class="result-item">{{ item.label }}</span>
          </template>
        </el-select-v2>
      </el-form-item>
    </el-form> -->
  <div class="search">
    <SeacrhBar />
  </div>
  <div class="filters">
    <div>
      <ul class="tag-list">
        <li><button class="tag-item-batton">Все</button></li>
        <li v-for="searchGroup in searchGroups" :key="searchGroup.id" cancelable="true" :label="searchGroup.id">
          <button v-if="searchGroup.label" class="tag-item-batton" @click="register">{{ searchGroup.label }}</button>
        </li>
      </ul>
    </div>
  </div>
  <div class="search-result">
    <div v-for="result in searchModel.searchGroup.options" :key="result.value">
      <div class="search-result-title">
        {{ result.label }}
      </div>
      <div class="search-result-description" v-html="result.description.substring(0, 100)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';
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
    const route = useRoute();

    const searchModel: ComputedRef<ISearchModel> = computed<ISearchModel>(() => store.getters['search/searchModel']);
    const searchGroups: ComputedRef<ISearchGroup[]> = computed<ISearchGroup[]>(() => store.getters['search/searchGroups']);
    const isDrawerOpen: ComputedRef<boolean> = computed<boolean>(() => store.getters['search/isSearchDrawerOpen']);

    const openDrawer = () => {
      searchModel.value.searchGroups = [];
      searchInput.value.inputRef.focus();
    };

    const closeDrawer = () => store.commit('search/toggleDrawer', false);

    onBeforeMount(async () => {
      searchModel.value.query = route.query.q && typeof route.query.q === 'string' ? route.query.q : '';
      // await store.dispatch('search/searchGroups');
      await store.dispatch('search/searchV1', searchModel.value);
    });

    const find = async (query: string) => {
      searchModel.value.searchGroups = [];
      if (query.length > 2) {
        searchModel.value.query = query;
        await store.dispatch('search/mainSearch', searchModel.value);
      }
    };

    const handleSelect = async (link: string) => {
      store.commit('search/toggleDrawer', false);
      await router.push(link);
    };
    const changeFilter = (searchGroupIds: string[]) => {
      if (searchGroupIds.length) {
        searchModel.value.searchGroupId = searchGroupIds[0];
      }
    };

    return {
      groups,
      changeFilter,
      searchGroups,
      value: ref([]),
      searchModel,
      handleSelect,
      searchString,
      find,
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
  &:active {
    cursor: pointer;
    background-color: #133dcc;
    color: #ffffff;
    border: 1px solid #133dcc;
  }
}

:deep(.el-select-v2__wrapper) {
  border-radius: 40px;
}

.search-result {
  height: 400px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
</style>
