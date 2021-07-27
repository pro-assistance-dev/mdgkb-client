<template>
  <div class="flex-column">
    <el-card>
      <el-table :data="buildings" v-if="buildings">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
        <el-table-column prop="address" label="Адрес" sortable> </el-table-column>
        <el-table-column label="Этажи" width="200px" align="center">
          <template #default="scope">
            <span v-for="(item, i) in scope.row.floors" :key="item.id">
              {{ i + 1 === scope.row.floors.length ? item.number : `${item.number}, ` }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" :showEditButton="true" />
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted, ref } from 'vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminBuildingsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const buildings = computed(() => store.getters['buildings/buildings']);

    store.commit('admin/setPageTitle', 'Здания');
    const loadBuildings = async (): Promise<void> => {
      await store.dispatch('buildings/getAll');
    };

    onMounted(loadBuildings);

    return { buildings };
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
