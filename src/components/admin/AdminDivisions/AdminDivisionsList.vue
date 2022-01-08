<template>
  <div class="flex-column">
    <!-- <div class="flex-row-between"> -->
    <!-- <el-button type="primary" @click="create">Добавить отделение</el-button> -->
    <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    <!-- </div> -->
    <el-card>
      <el-table :data="divisions">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
        <el-table-column prop="entrance.building.name" label="Корпус" sortable> </el-table-column>
        <el-table-column prop="address" label="Корпус" sortable> </el-table-column>
        <el-table-column prop="phone" label="Номер телефона" sortable> </el-table-column>
        <el-table-column prop="email" label="Email" sortable> </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.show" @change="update(scope.row)" />
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
      <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'AdminDivisionsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const divisions = computed(() => store.getters['divisions/divisions']);

    onBeforeMount(async () => {
      store.commit('divisions/setOnlyShowed', false);
      store.commit('admin/showLoading');
      await loadDivisions();
      store.commit('admin/closeLoading');
    });

    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Отделения',
        buttons: [{ text: 'Добавить отделение', type: 'primary', action: create }],
      });
    };

    const update = async (division: IDivision) => await store.dispatch('divisions/update', division);

    const create = () => router.push(`/admin/divisions/new`);
    const edit = (id: string) => router.push(`/admin/divisions/${id}`);
    const remove = async (id: string) => await store.dispatch('divisions/remove', id);

    return { divisions, remove, edit, create, update };
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
