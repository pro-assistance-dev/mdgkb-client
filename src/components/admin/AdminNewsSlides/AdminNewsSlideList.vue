<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="create">Добавить</el-button>
    </div>
    <el-card>
      <el-table v-if="slides" :data="slides">
        <el-table-column label="Название" sortable>
          <template #default="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Кнопки" sortable>
          <template #default="scope">
            <span v-for="(item, i) in scope.row.newsSlideButtons" :key="item.id">
              {{ i + 1 === scope.row.newsSlideButtons.length ? item.name : `${item.name}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @remove="remove(scope.row.id)"
              @edit="edit(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';

export default defineComponent({
  name: 'AdminNewsSlideList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const slides: ComputedRef<INewsSlide[]> = computed(() => store.getters['newsSlides/items']);

    const create = (): void => {
      router.push('/admin/news-slides/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('newsSlides/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/news-slides/${id}`);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('newsSlides/getAll');
      store.commit('admin/setPageTitle', { title: 'Новости (слайдер)' });
    });

    onBeforeUnmount(() => {
      store.commit('admin/resetState');
    });

    return {
      slides,
      create,
      remove,
      edit,
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
