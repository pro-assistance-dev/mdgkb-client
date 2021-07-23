<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/news/item')">Добавить новость</el-button>
      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
    </div>
    <el-card>
      <el-table :data="news" v-if="news">
        <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="created_by" label="Автор" sortable> </el-table-column>
        <el-table-column prop="status" label="Статус" sortable> </el-table-column>
        <el-table-column label="Тэги">
          <template #default="scope">
            <span v-for="(item, i) in scope.row.tags" :key="item.id">
              {{ i + 1 === scope.row.tags.length ? item.label : `${item.label}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Дата создания" align="center" width="200" sortable>
          <!-- <template #default="scope">
            {{ $dateFormatRu(scope.row.created_at) }} 
          </template> -->
        </el-table-column>
        <el-table-column label="Дата публикации" align="center" width="200" sortable>
          <template #default="scope">
            {{ $dateFormatRu(scope.row.published_on) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted } from 'vue';

export default defineComponent({
  name: 'AdminNewsList',

  setup() {
    const store = useStore();
    store.commit('admin/setPageTitle', 'Все новости');
    const loadNews = async (): Promise<void> => {
      await store.dispatch('news/getAll');
    };

    onMounted(loadNews);

    const news = computed(() => store.getters['news/news']);
    return { news };
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
