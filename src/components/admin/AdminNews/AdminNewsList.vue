<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <template #header>
      <RemoteSearch :key-value="'news'" @select="selectSearch" />
      <FiltersList class="filters-block" :models="createFilterModels()" @load="loadNews" />
      <FilterSelectDate
        class="filters-block"
        :table="News.GetClassName()"
        :col="$classHelper.GetPropertyName(News).publishedOn"
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
      <el-table-column label="Статус">
        <template #default="scope">
          {{ scope.row.getStatusString() }}
        </template>
      </el-table-column>
      <el-table-column label="Тэги">
        <template #default="scope">
          <span v-for="(item, i) in scope.row.newsToTags" :key="item.id">
            {{ i + 1 === scope.row.newsToTags.length ? item.tag.label : `${item.tag.label}, ` }}
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

  <el-dialog v-model="isModalOpened" title="Назначить главную новость" center :show-close="true" top="10px" width="80%" @open="loadMain">
    <div style="display: flex; width: 100%; justify-content: center; margin-bottom: 20px">
      <RemoteSearch
        ref="searchMainNewsRef"
        :clear-after-select="false"
        max-width="500px"
        :key-value="'news'"
        placeholder="Выберите новость"
        @select="selectSearchMainNews"
      />
      <el-button size="small" type="success" round @click="makeNewsMain(newsMain, 'setMain', true)"> Сделать главной </el-button>
      <el-button size="small" type="primary" round @click="makeNewsMain(newsSubMain1, 'setSubMain1', false)"
        >Сделать подглавной #1
      </el-button>
      <el-button size="small" type="primary" round @click="makeNewsMain(newsSubMain2, 'setSubMain2', false)"
        >Сделать подглавной #2
      </el-button>
    </div>

    <!-- <el-form-item>
      <el-select
        v-model="newsMain"
        :fit-input-width="true"
        style="width: 100%"
        value-key="id"
        placeholder="Выберите главную новость"
        clearable
        @change="(value: ISearch) => selectMainNewsHandler(value, newsMain, 'setMain', true)"
        @clear="clearHandler(newsMain, 'setMain', true)"
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
        clearable
        @change="(value: News) => selectMainNewsHandler(value, newsSubMain1, 'setSubMain1', false)"
        @clear="clearHandler(newsSubMain1, 'setSubMain1', false)"
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
        clearable
        @change="(value: News) => selectMainNewsHandler(value, newsSubMain2, 'setSubMain2', false)"
        @clear="clearHandler(newsSubMain2, 'setSubMain2', false)"
      >
        <el-option
          v-for="item in news"
          :key="item.id"
          :label="item.title + ' ' + $dateTimeFormatter.format(item.publishedOn)"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item> -->

    <div class="main-news-block">
      <div class="main-news-block-left">
        <MainBigNewsCard v-if="newsMain.id" :news="newsMain" :show-close="true" @close="clearHandler(newsMain, 'setMain', true)" />
      </div>
      <div class="main-news-block-middle">
        <div class="size">
          <NewsCard
            v-if="newsSubMain1.id"
            :news="newsSubMain1"
            :main="true"
            :show-close="true"
            @close="clearHandler(newsSubMain1, 'setSubMain1', false)"
          />
        </div>
        <div class="size">
          <NewsCard
            v-if="newsSubMain2.id"
            :news="newsSubMain2"
            :main="true"
            :show-close="true"
            @close="clearHandler(newsSubMain2, 'setSubMain2', false)"
          />
        </div>
      </div>
    </div>
  </el-dialog>
  <ChartsModal ref="ChartsModalRef" />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';

import News from '@/classes/News';
import ChartsModal from '@/components/admin/AdminNews/ChartsModal.vue';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import MainBigNewsCard from '@/components/Main/MainBigNewsCard.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import SortModel from '@/services/classes/SortModel';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import NewsFiltersLib from '@/services/Provider/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/services/Provider/libs/sorts/NewsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminNewsList',
  components: {
    MainBigNewsCard,
    NewsCard,
    FiltersList,
    FilterSelectDate,
    TableButtonGroup,
    Pagination,
    RemoteSearch,
    SortList,
    AdminListWrapper,
    ChartsModal,
  },
  setup() {
    const news = computed(() => Provider.store.getters['news/items']);
    const searchResult = computed(() => Provider.store.getters['news/item']);
    const newsMain = computed(() => Provider.store.getters['news/main']);
    const newsSubMain1 = computed(() => Provider.store.getters['news/subMain1']);
    const newsSubMain2 = computed(() => Provider.store.getters['news/subMain2']);
    const filterExists: ComputedRef<boolean> = computed(() => Provider.store.getters['filter/filterExists']);

    const addNews = () => {
      Provider.router.push('/admin/news/new');
    };

    watch(
      () => filterExists.value,
      async () => {
        if (!filterExists.value) {
          Provider.store.commit('filter/filterExists', true);
          await loadNews();
        }
      }
    );

    const sortList: Ref<SortModel[]> = ref([]);
    const edit = async (id: string): Promise<void> => {
      const item = news.value.find((i: News) => i.id === id);
      if (item) await Provider.router.push(`/admin/news/${item.id}`);
    };
    const isModalOpened: Ref<boolean> = ref(false);

    const remove = async (id: string) => {
      await Provider.store.dispatch('news/remove', id);
    };

    const loadNews = async (): Promise<void> => {
      await Provider.store.dispatch('news/ftsp', {
        qid: Provider.getQid(),
        ftsp: Provider.filterQuery.value,
      });
    };

    const load = async (): Promise<void> => {
      sortList.value = [NewsSortsLib.byPublishedOn(), NewsSortsLib.byViewsCount(), NewsSortsLib.byTitle(), NewsSortsLib.byCreatedAt()];
      // Provider.store.commit('news/clearNews');
      Provider.setSortModels(NewsSortsLib.byPublishedOn());
      await loadNews();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Новости',
        buttons: [
          { text: 'Статистика', action: open },
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

    const clearMain = async () => {
      newsMain.value.main = false;
      await Provider.store.dispatch('news/update', newsMain.value);
      Provider.store.commit('news/setMain', { news: [new News()] });
    };

    const clearHandler = async (previousItem: News, storeName: string, isMain: boolean) => {
      if (isMain) {
        previousItem.main = false;
      } else {
        previousItem.subMain = false;
      }
      await Provider.store.dispatch('news/update', previousItem);
      Provider.store.commit(`news/${storeName}`, { news: [new News()] });
    };

    const selectMainNewsHandler = async (newItem: News, previousItem: News, storeName: string, isMain: boolean) => {
      if (isMain) {
        previousItem.main = false;
      } else {
        previousItem.subMain = false;
      }
      await Provider.store.dispatch('news/update', previousItem);
      if (newItem) {
        if (isMain) {
          newItem.main = true;
        } else {
          newItem.subMain = true;
        }
        Provider.store.commit(`news/${storeName}`, { news: [newItem] });
        await Provider.store.dispatch('news/update', newItem);
      }
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'news', action: 'ftsp' },
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({
        name: `AdminNewsPageEdit`,
        params: { id: event.id, slug: event.value },
      });
    };

    const createFilterModels = (): FilterModel[] => {
      return [NewsFiltersLib.withoutDrafts(), NewsFiltersLib.withDrafts()];
    };

    const selectSearchMainNews = async (event: ISearchObject) => {
      await Provider.store.dispatch('news/get', event.value);
    };

    interface RemoteSearchType extends InstanceType<typeof RemoteSearch> {
      clear(): void;
    }

    const searchMainNewsRef: Ref<RemoteSearchType | null> = ref(null);

    const clickHadler = () => {
      searchMainNewsRef.value?.clear();
    };

    const makeNewsMain = async (previousItem: News, storeName: string, isMain: boolean) => {
      console.log(searchResult.value);
      if (isMain) {
        previousItem.main = false;
      } else {
        previousItem.subMain = false;
      }

      await Provider.store.dispatch('news/update', previousItem);
      if (searchResult.value) {
        if (isMain) {
          searchResult.value.main = true;
        } else {
          searchResult.value.subMain = true;
        }
        Provider.store.commit(`news/${storeName}`, { items: [searchResult.value] });
        await Provider.store.dispatch('news/update', searchResult.value);
      }
      searchMainNewsRef.value?.clear();
    };

    interface ChartsModalType extends InstanceType<typeof ChartsModal> {
      open(): void;
    }

    const ChartsModalRef: Ref<ChartsModalType | null> = ref(null);

    const open = () => {
      ChartsModalRef.value?.open();
    };

    return {
      News,
      news,
      edit,
      remove,
      selectSearch,
      sortList,
      loadNews,
      createFilterModels,
      mounted: Provider.mounted,

      isModalOpened,
      loadMain,
      newsMain,
      newsSubMain1,
      newsSubMain2,
      clearMain,
      selectMainNewsHandler,
      clearHandler,
      selectSearchMainNews,
      searchMainNewsRef,
      clickHadler,
      makeNewsMain,
      ChartsModalRef,
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

.main-news-block {
  display: flex;
  justify-content: center;
  height: auto;
}

.main-news-block-left {
  display: flex;
  width: 47%;
  padding-right: 10px;
  min-height: 400px;
  max-height: 800px;
}

.main-news-block-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
}

.main-news-block-middle > .size:first-child {
  margin-bottom: 10px;
}

.main-news-block-right {
  width: 270px;
  padding-left: 15px;
}
</style>
