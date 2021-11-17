<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <div class="table-buttons">
        <el-button type="primary" @click="create">Добавить баннер</el-button>
        <el-button v-if="!isEdit" type="success" @click="editOrder">Редактировать порядок</el-button>
        <el-button v-else type="success" @click="saveOrder">Сохранить порядок</el-button>
      </div>
      <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    </div>
    <el-card>
      <el-table :data="banners">
        <el-table-column v-if="isEdit" width="50" fixed="left" align="center">
          <template #default="scope">
            <div class="move-buttons">
              <el-button v-if="scope.$index !== 0" icon="el-icon-caret-top" @click="moveUp(scope.$index)" />
              <el-button v-if="scope.$index !== banners.length - 1" icon="el-icon-caret-bottom" @click="moveDown(scope.$index)" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Наименование" prop="name"> </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              :popconfirm-title="`Вы уверены что хотите удалить баннер '${scope.row.name}'?`"
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
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminBannersList',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const router = useRouter();
    const banners = computed(() => store.getters['banners/banners']);
    const isEdit = ref(false);

    onBeforeMount(() => store.commit('admin/showLoading'));

    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('banners/getAll');
      store.commit('admin/setPageTitle', { title: 'Рекламные баннеры' });
    };

    const create = () => router.push(`/admin/banners/new`);
    const edit = (id: string) => router.push(`/admin/banners/${id}`);
    const remove = async (id: string) => await store.dispatch('banners/remove', id);
    const moveUp = (index: number) => store.commit('banners/moveUp', index);
    const moveDown = (index: number) => store.commit('banners/moveDown', index);
    const editOrder = () => {
      isEdit.value = true;
    };
    const saveOrder = async () => {
      store.commit('banners/updateOrder');
      await store.dispatch('banners/updateAll', banners.value);
      isEdit.value = false;
    };

    onMounted(loadDivisions);

    return {
      banners,
      remove,
      edit,
      create,
      moveUp,
      moveDown,
      isEdit,
      editOrder,
      saveOrder,
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

.move-buttons {
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}
.table-buttons {
  display: flex;
  align-items: center;
  :deep(.el-button) {
    margin-right: 10px;
  }
}
</style>
