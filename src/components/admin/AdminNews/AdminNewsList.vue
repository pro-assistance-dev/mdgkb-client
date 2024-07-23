<template>
  <AdminListWrapper v-if="mounted" show-header :store="NewsStore">
    <template #header>
      <RemoteSearch :key-value="'news'" @select="selectSearch" />
      <!-- <RemoteSearchNew :key-value="'news'" @select="selectSearch" /> -->
      <!-- <RemoteSearchNew :key /> -->
      <FiltersList class="filters-block" :models="createFilterModels()" @load="loadNews" />
      <FilterSelectDate
        class="filters-block"
        :table="News.GetClassName()"
        :col="ClassHelper.GetPropertyName(News).publishedOn"
        placeholder="Дата публикации"
        @load="loadNews"
      />
      <SortSelect :max-width="400" @load="loadNews" />
    </template>
    <template #sort> </template>
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
  </AdminListWrapper>

  <el-dialog v-model="isModalOpened" title="Назначить главную новость" center :show-close="true" top="10px" width="80%" @open="loadMain">
    <div style="display: flex; width: 100%; justify-content: center; align-items: center; margin-bottom: 20px">
      <RemoteSearch
        ref="searchMainNewsRef"
        :clear-after-select="false"
        max-width="500px"
        :key-value="'news'"
        placeholder="Выберите новость"
        @select="selectSearchMainNews"
      />
      <PButton
        skin="profile"
        type="success"
        text="Сделать главной"
        width="190px"
        margin="0 0 0 10px"
        @click="makeNewsMain(newsMain, 'setMain', true)"
      />
      <PButton
        skin="profile"
        type="primary"
        text="Сделать подглавной #1"
        width="190px"
        margin="0 0 0 10px"
        @click="makeNewsMain(newsSubMain1, 'setSubMain1', false)"
      />
      <PButton
        skin="profile"
        type="primary"
        text="Сделать подглавной #2"
        width="190px"
        margin="0 0 0 10px"
        @click="makeNewsMain(newsSubMain2, 'setSubMain2', false)"
      />
    </div>

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

<script lang="ts" setup>
import News from '@/classes/News';
import NewsFiltersLib from '@/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/libs/sorts/NewsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel`';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import SortListConst from '@/services/SortList';
const news = NewsStore.Items();

const newsMain = NewsStore.Main();
// const searchResult = Store.Item('news');
const newsSubMain1 = NewsStore.SubMain1();
const newsSubMain2 = NewsStore.SubMain2();

const mounted = ref(false);

const edit = async (id: string): Promise<void> => {
  await Router.To(`/admin/news/${id}`);
};

const isModalOpened: Ref<boolean> = ref(false);

const remove = async (id: string) => {
  await NewsStore.Remove(id);
};

const loadNews = async (): Promise<void> => {
  await NewsStore.FTSP();
};

const load = async (): Promise<void> => {
  // sortList.value = [NewsSortsLib.byPublishedOn(), NewsSortsLib.byViewsCount(), NewsSortsLib.byTitle(), NewsSortsLib.byCreatedAt()];
  SortListConst.Set([NewsSortsLib.byPublishedOn(), NewsSortsLib.byViewsCount(), NewsSortsLib.byTitle(), NewsSortsLib.byCreatedAt()]);
  // FTSP.Get().setS(NewsSortsLib.byPublishedOn());
  await loadNews();

  PHelp.AdminUI.Head.Set('Новости', [
    Button.Success('Статистика', open),
    Button.Success('Назначить главную новость', openModal),
    Button.Success('Добавить новость', open),
  ]);

  mounted.value = true;
};

const loadMain = async () => {
  await Promise.all([NewsStore.GetMain(), NewsStore.GetSubMain()]);
};

const openModal = () => {
  isModalOpened.value = true;
};

// const clearMain = async () => {
//   newsMain.main = false;
//   await NewsStore.Update(newsMain.value);
//   // Store.Update('news/setMain', { news: [new News()] });
// };

const clearHandler = async (previousItem: News, storeName: string, isMain: boolean) => {
  if (isMain) {
    previousItem.main = false;
  } else {
    previousItem.subMain = false;
  }
  await Store.Update('news', previousItem);
  // Store.Commit(`news/${storeName}`, { news: [new News()] });
};

// const selectMainNewsHandler = async (newItem: News, previousItem: News, storeName: string, isMain: boolean) => {
//   if (isMain) {
//     previousItem.main = false;
//   } else {
//     previousItem.subMain = false;
//   }
//   await NewsStore.Update(previousItem);
//   if (newItem) {
//     if (isMain) {
//       newItem.main = true;
//     } else {
//       newItem.subMain = true;
//     }
//     // Store.Commit(`news/${storeName}`, { news: [newItem] });
//     await NewsStore.Update(newItem);
//   }
// };

Hooks.onBeforeMount(load, {
  sortsLib: NewsSortsLib,
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  console.log(event);
  await Router.ToAdmin(`news/${event.value}`);
};

const createFilterModels = (): FilterModel[] => {
  return [NewsFiltersLib.withoutDrafts(), NewsFiltersLib.withDrafts()];
};

const selectSearchMainNews = async (event: ISearchObject) => {
  await Store.Get('news', event.value);
};

interface RemoteSearchType {
  clear(): void;
}

const searchMainNewsRef: Ref<RemoteSearchType | null> = ref(null);

// const clickHadler = () => {
//   searchMainNewsRef.value?.clear();
// };

const makeNewsMain = async (previousItem: News, storeName: string, isMain: boolean) => {
  if (isMain) {
    previousItem.main = false;
  } else {
    previousItem.subMain = false;
  }

  await Store.Update('news', previousItem);

  // if (searchResult.value) {
  //   if (isMain) {
  //     searchResult.value.main = true;
  //   } else {
  //     searchResult.value.subMain = true;
  //   }
  //   Store.Commit(`news/${storeName}`, { items: [searchResult.value] });
  //   await Store.Update('news', searchResult.value);
  // }

  searchMainNewsRef.value?.clear();
};

interface ChartsModalType {
  open(): void;
}

const ChartsModalRef: Ref<ChartsModalType | null> = ref(null);

const open = () => {
  ChartsModalRef.value?.open();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
