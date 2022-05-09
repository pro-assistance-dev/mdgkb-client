<template>
  <div v-if="mounted" class="flex-column">
    <el-card>
      <el-table v-if="news" :data="news">
        <el-table-column prop="title" label="Заголовок" sortable width="400px"> </el-table-column>
        <el-table-column prop="created_by" label="Автор" sortable> </el-table-column>
        <el-table-column prop="viewsCount" label="Просмотров" sortable> </el-table-column>
        <el-table-column prop="status" label="Статус" sortable> </el-table-column>
        <el-table-column label="Тэги">
          <template #default="scope">
            <span v-for="(item, i) in scope.row.tags" :key="item.id">
              {{ i + 1 === scope.row.tags.length ? item.label : `${item.label}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Дата создания" align="center" width="200" sortable>
          <template #default="scope">
            {{ $dateFormatRu(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="Дата публикации" align="center" width="200" sortable>
          <template #default="scope">
            {{ $dateFormatRu(scope.row.publishedOn) }}
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import SortModel from '@/classes/filters/SortModel';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { Orders } from '@/interfaces/filters/Orders';
import INews from '@/interfaces/news/INews';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminNewsList',
  components: { TableButtonGroup, Pagination },
  setup() {
    const news = computed(() => Provider.store.getters['news/news']);
    const mounted = ref(false);
    const addNews = () => {
      Provider.router.push('/admin/news/new');
    };

    const edit = async (id: string): Promise<void> => {
      const item = news.value.find((i: INews) => i.id === id);
      if (item) await Provider.router.push(`/admin/news/${item.slug}`);
    };

    const remove = async (id: string) => {
      await Provider.store.dispatch('news/remove', id);
    };

    const loadNews = async (): Promise<void> => {
      Provider.store.commit('news/clearNews');
      Provider.filterQuery.value.limit = 25;

      await Provider.store.dispatch('news/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Новости',
        buttons: [{ text: 'Добавить новость', type: 'primary', action: addNews }],
      });
      const sortModel = SortModel.CreateSortModel(
        Provider.schema.value.news.tableName,
        Provider.schema.value.news.publishedOn,
        Orders.Desc
      );
      Provider.setSortModels(sortModel);
      mounted.value = true;
    };
    Hooks.onBeforeMount(loadNews, {
      pagination: { storeModule: 'news', action: 'getAll' },
      sortModels: [],
    });

    return { news, edit, remove, mounted };
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
