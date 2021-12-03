<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <div class="table-buttons">
        <el-button type="primary" @click="create">Добавить</el-button>
      </div>
    </div>
    <el-card>
      <el-table v-if="timetablePatterns" :data="timetablePatterns">
        <el-table-column label="Название" sortable>
          <template #default="scope">
            <span>{{ scope.row.title }}</span>
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
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default defineComponent({
  name: 'AdminTimetablePatternList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const timetablePatterns: ComputedRef<ITimetable[]> = computed<ITimetable[]>(() => store.getters['timetablePatterns/items']);

    const create = (): void => {
      router.push('/admin/timetable-patterns/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('timetablePatterns/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/timetable-patterns/${id}`);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('timetablePatterns/getAll');
      store.commit('admin/setPageTitle', { title: 'Шаблоны графика работы' });
    });

    return {
      timetablePatterns,
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
