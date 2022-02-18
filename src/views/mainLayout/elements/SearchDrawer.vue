<template>
  <el-drawer v-model="isDrawerOpen" direction="ttb" title="Поиск по сайту" size="200px" @closed="closeDrawer" @opened="openDrawer">
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
        <span style="margin-right: 8px">{{ item.label }}</span>
      </template>
    </el-select-v2>
    <div class="filters">
      <el-checkbox-group v-model="groups" :min="0" :max="1" @change="changeFilter">
        <el-checkbox-button v-for="searchGroup in searchGroups" :key="searchGroup.id" cancelable="true" :label="searchGroup.id">
          {{ searchGroup.label }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';

export default defineComponent({
  name: 'SearchDrawer',
  setup() {
    const store = useStore();
    const searchInput = ref();
    const searchString: Ref<string> = ref('');
    let groups: Ref<string[]> = ref([]);
    const router = useRouter();

    const searchModel: ComputedRef<ISearchModel> = computed<ISearchModel>(() => store.getters['search/searchModel']);
    const searchGroups: ComputedRef<ISearchGroup[]> = computed<ISearchGroup[]>(() => store.getters['search/searchGroups']);
    const isDrawerOpen: ComputedRef<boolean> = computed<boolean>(() => store.getters['search/isSearchDrawerOpen']);

    const openDrawer = () => {
      searchModel.value.searchGroups = [];
      searchInput.value.inputRef.focus();
    };

    const closeDrawer = () => store.commit('search/toggleDrawer', false);

    onBeforeMount(async () => {
      await store.dispatch('search/searchGroups');
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
</style>
