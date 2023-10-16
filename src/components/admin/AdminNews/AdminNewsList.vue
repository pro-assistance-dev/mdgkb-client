<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <template #header>
      <RemoteSearch :key-value="schema.news.key" @select="selectSearch" />
      <FiltersList class="filters-block" :models="createFilterModels()" @load="loadNews" />
      <FilterSelectDate
        class="filters-block"
        :table="schema.news.tableName"
        :col="schema.news.publishedOn"
        placeholder="Дата публикации"
        @load="loadNews"
      />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadNews" />
    </template>
    <el-table :data="news">
      <el-table-column prop="title" label="Заголовок" width="400px" class-name="sticky-left"> </el-table-column>
      <el-table-column prop="created_by" label="Автор"> </el-table-column>
      <el-table-column prop="viewsCount" label="Просмотров"> </el-table-column>
      <el-table-column prop="status" label="Статус"> </el-table-column>
      <el-table-column label="Тэги">
        <template #default="scope">
          <span v-for="(item, i) in scope.row.tags" :key="item.id">
            {{ i + 1 === scope.row.tags.length ? item.label : `${item.label}, ` }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Дата создания" align="center" width="200">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="Дата публикации" align="center" width="200">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.publishedOn) }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
  <el-dialog v-model="isModalOpened" title="Назначить главную новость" center :show-close="true" top="15vh" @open="loadMain">
    <el-form-item>
      <el-select
        v-model="newsMain"
        :fit-input-width="true"
        style="width: 100%"
        value-key="id"
        placeholder="Выберите главную новость"
        @change="changeMain"
      >
        <el-option
          v-for="item in news"
          :key="item.id"
          :label="item.title + ' ' + $dateTimeFormatter.format(item.publishedOn)"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="newsSubMain1"
        :fit-input-width="true"
        style="width: 100%"
        value-key="id"
        placeholder="Выберите первую подглавную новость"
        @change="changeSubMain1"
      >
        <el-option
          v-for="item in news"
          :key="item.id"
          :label="item.title + ' ' + $dateTimeFormatter.format(item.publishedOn)"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="newsSubMain2"
        :fit-input-width="true"
        style="width: 100%"
        value-key="id"
        placeholder="Выберите вторую подглавную новость"
        @change="changeSubMain2"
      >
        <el-option
          v-for="item in news"
          :key="item.id"
          :label="item.title + ' ' + $dateTimeFormatter.format(item.publishedOn)"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import INews from '@/interfaces/news/INews';
import Hooks from '@/services/Hooks/Hooks';
import IFilterModel from '@/services/interfaces/IFilterModel';
import ISearchObject from '@/services/interfaces/ISearchObject';
import ISortModel from '@/services/interfaces/ISortModel';
import NewsFiltersLib from '@/services/Provider/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/services/Provider/libs/sorts/NewsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminNewsList',
  components: { FiltersList, FilterSelectDate, TableButtonGroup, Pagination, RemoteSearch, SortList, AdminListWrapper },
  setup() {
    const news = computed(() => Provider.store.getters['news/news']);
    const newsMain = computed(() => Provider.store.getters['news/main']);
    const newsSubMain1 = computed(() => Provider.store.getters['news/subMain1']);
    const newsSubMain2 = computed(() => Provider.store.getters['news/subMain2']);
    const addNews = () => {
      Provider.router.push('/admin/news/new');
    };
    const sortList: Ref<ISortModel[]> = ref([]);
    const edit = async (id: string): Promise<void> => {
      const item = news.value.find((i: INews) => i.id === id);
      if (item) await Provider.router.push(`/admin/news/${item.slug}`);
    };
    const isModalOpened: Ref<boolean> = ref(false);

    const remove = async (id: string) => {
      await Provider.store.dispatch('news/remove', id);
    };

    const loadNews = async (): Promise<void> => {
      await Provider.store.dispatch('news/getAll', Provider.filterQuery.value);
    };

    const load = async (): Promise<void> => {
      sortList.value = [NewsSortsLib.byPublishedOn(), NewsSortsLib.byViewsCount(), NewsSortsLib.byTitle(), NewsSortsLib.byCreatedAt()];
      Provider.store.commit('news/clearNews');
      Provider.setSortModels(NewsSortsLib.byPublishedOn());
      await loadNews();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Новости',
        buttons: [
          { text: 'Назначить главную новость', type: 'success', action: openModal },
          { text: 'Добавить новость', type: 'primary', action: addNews },
        ],
      });
    };

    const loadMain = async () => {
      await Promise.all([Provider.store.dispatch('news/getMain'), Provider.store.dispatch('news/getSubMain')]);
    };

    const openModal = () => {
      isModalOpened.value = true;
    };

    const changeMain = async (item: INews) => {
      newsMain.value.main = false;
      await Provider.store.dispatch('news/update', newsMain.value);
      item.main = true;
      Provider.store.commit('news/setMain', { news: [item] });
      await Provider.store.dispatch('news/update', newsMain.value);
    };

    const changeSubMain1 = async (item: INews) => {
      newsSubMain1.value.subMain = false;
      await Provider.store.dispatch('news/update', newsSubMain1.value);
      item.subMain = true;
      Provider.store.commit('news/setSubMain1', item);
      await Provider.store.dispatch('news/update', newsSubMain1.value);
    };

    const changeSubMain2 = async (item: INews) => {
      newsSubMain2.value.subMain = false;
      await Provider.store.dispatch('news/update', newsSubMain2.value);
      item.subMain = true;
      Provider.store.commit('news/setSubMain2', item);
      await Provider.store.dispatch('news/update', newsSubMain2.value);
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'news', action: 'getAll' },
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminNewsPageEdit`, params: { id: event.id, slug: event.value } });
    };

    const createFilterModels = (): IFilterModel[] => {
      return [NewsFiltersLib.withoutDrafts(), NewsFiltersLib.withDrafts()];
    };

    return {
      news,
      edit,
      remove,
      selectSearch,
      sortList,
      loadNews,
      createFilterModels,
      mounted: Provider.mounted,
      schema: Provider.schema,
      isModalOpened,
      loadMain,
      newsMain,
      newsSubMain1,
      newsSubMain2,
      changeMain,
      changeSubMain1,
      changeSubMain2,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}
</style>
