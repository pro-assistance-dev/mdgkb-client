<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/carousels/new')">Добавить карусель</el-button>
      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
    </div>
    <el-card>
      <el-table :data="carousels" v-if="carousels">
        <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
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
import { useRouter } from 'vue-router';
import INewsParams from '@/interfaces/news/INewsParams';
import INews from '@/interfaces/news/INews';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminCarouselList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();

    store.commit('admin/setPageTitle', 'Карусели');

    const load = async (): Promise<void> => {
      const defaultParams: INewsParams = { limit: 100 };
      await store.dispatch('carousels/getAll', defaultParams);
    };

    const carousels = computed(() => store.getters['carousels/items']);

    const edit = async (id: string): Promise<void> => {
      const item = carousels.value.find((i: INews) => i.id === id);
      if (item) await router.push(`/admin/carousels/${item.id}`);
    };

    const remove = async (id: string) => {
      await store.dispatch('carousels/remove', id);
    };

    onMounted(load);

    return { carousels, edit, remove };
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
