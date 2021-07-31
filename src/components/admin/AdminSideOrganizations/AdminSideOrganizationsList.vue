<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="create">Добавить организацию</el-button>
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
    <el-card>
      <el-table :data="sideOrganizations" v-if="sideOrganizations">
        <el-table-column prop="name" label="Наименование организации" sortable> </el-table-column>
        <el-table-column prop="address" label="Адрес" sortable> </el-table-column>
        <el-table-column prop="site" label="Веб-сайт" sortable> </el-table-column>
        <el-table-column prop="phone" label="Телефон" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted, ref } from 'vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AdminBuildingsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const sideOrganizations = computed(() => store.getters['sideOrganizations/sideOrganizations']);

    store.commit('admin/setPageTitle', 'Организации здравоохранения');
    const loadSideOrganizations = async (): Promise<void> => {
      await store.dispatch('sideOrganizations/getAll');
    };

    const create = (id: string): void => {
      router.push('/admin/side-organizations/new');
    };
    const edit = (id: string): void => {
      router.push(`/admin/side-organizations/${id}`);
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('sideOrganizations/remove', id);
    };

    onMounted(loadSideOrganizations);

    return { sideOrganizations, create, edit, remove };
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
