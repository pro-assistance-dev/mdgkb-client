<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="buildings" :data="buildings">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
        <el-table-column prop="number" label="Номер корпуса" sortable> </el-table-column>
        <el-table-column prop="address" label="Адрес" sortable> </el-table-column>
        <el-table-column label="Этажи" width="200px" align="center">
          <template #default="scope">
            <span v-for="(item, i) in scope.row.floors" :key="item.id">
              {{ i + 1 === scope.row.floors.length ? item.number : `${item.number}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Входы" width="200px" align="center">
          <template #default="scope">
            <span v-for="(item, i) in scope.row.entrances" :key="item.id">
              {{ i + 1 === scope.row.entrances.length ? item.number : `${item.number}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminSideOrganizationsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const buildings = computed(() => store.getters['buildings/buildings']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadBuildings();
      store.commit('admin/closeLoading');
    });
    const loadBuildings = async (): Promise<void> => {
      await store.dispatch('buildings/getAll');
      store.commit('admin/setHeaderParams', { title: 'Здания' });
    };

    const edit = (id: string): void => {
      router.push(`/admin/buildings/${id}`);
    };

    return { buildings, edit };
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
