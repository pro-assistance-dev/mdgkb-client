<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <div class="table-buttons">
        <el-button type="primary" @click="create">Создать меню</el-button>
        <el-button v-if="!isEdit" type="success" @click="editOrder">Редактировать порядок</el-button>
        <el-button v-else type="success" @click="saveOrder">Сохранить порядок</el-button>
      </div>
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
    <el-card>
      <el-table v-if="menus" :data="menus">
        <el-table-column v-if="isEdit" width="50" fixed="left" align="center">
          <template #default="scope">
            <TableMover :store-module="'menus'" :store-getter="'menus'" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="link" label="Ссылка" sortable> </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="$router.push(`/admin/menus/${scope.row.id}`)"
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
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import IMenu from '@/interfaces/menu/IMenu';

export default defineComponent({
  name: 'AdminMenusList',
  components: { TableMover, TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isEdit = ref(false);

    const menus: Ref<IMenu[]> = computed(() => store.getters['menus/menus']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('menus/getAll');
      store.commit('admin/setPageTitle', { title: 'Меню' });
    });

    const editOrder = () => {
      isEdit.value = true;
    };

    const saveOrder = async () => {
      await store.dispatch('menus/updateAll', menus.value);
      isEdit.value = false;
    };

    const remove = async (id: string) => {
      await store.dispatch('menus/remove', id);
    };

    const create = () => router.push(`/admin/menus/new`);

    return { menus, remove, create, saveOrder, editOrder, isEdit };
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
.table-buttons {
  display: flex;
  align-items: center;
  :deep(.el-button) {
    margin-right: 10px;
  }
}
</style>
