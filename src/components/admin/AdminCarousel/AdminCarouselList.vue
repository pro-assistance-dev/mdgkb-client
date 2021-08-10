<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/carousels/new')">Добавить карусель</el-button>
    </div>
    <el-card>
      <el-table v-if="carousels" :data="carousels">
        <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="systemKey" label="Системный ключ" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import INews from '@/interfaces/news/INews';
import INewsParams from '@/interfaces/news/INewsParams';

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
