<template>
  <div class="flex-column">
    <!-- <div class="flex-row-between"> -->
    <!-- <el-button type="primary" @click="create">Добавить организацию</el-button> -->
    <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    <!-- </div> -->
    <el-card>
      <el-table v-if="sideOrganizations" :data="sideOrganizations">
        <el-table-column prop="name" label="Наименование организации" sortable> </el-table-column>
        <el-table-column prop="address" label="Адрес" sortable> </el-table-column>
        <el-table-column prop="site" label="Веб-сайт" sortable> </el-table-column>
        <el-table-column prop="phone" label="Телефон" sortable> </el-table-column>
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
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminBuildingsList',
  components: { TableButtonGroup },
  setup() {
    const router = useRouter();
    const sideOrganizations = SideOrganizationsStore.Items();

    onBeforeMount(async () => {
      await loadSideOrganizations();
    });

    const loadSideOrganizations = async (): Promise<void> => {
      PHelp.AdminUI.Head.Set('Организации здравоохранения', [Button.Success('Создать', create)]);
      await SideOrganizationsStore.GetAll();
    };

    const create = (): void => {
      router.push('/admin/side-organizations/new');
    };
    const edit = (id: string): void => {
      router.push(`/admin/side-organizations/${id}`);
    };
    const remove = async (id: string): Promise<void> => {
      await SideOrganizationsStore.Remove(id);
    };

    return { sideOrganizations, create, edit, remove };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
