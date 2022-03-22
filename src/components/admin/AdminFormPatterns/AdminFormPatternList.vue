<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="formPatterns" :data="formPatterns">
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
import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'AdminFormPatternList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const formPatterns: ComputedRef<IForm[]> = computed<IForm[]>(() => store.getters['formPatterns/items']);

    const create = (): void => {
      router.push('/admin/form-patterns/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('formPatterns/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/form-patterns/${id}`);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('formPatterns/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Шаблоны форм для заявок',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
      store.commit('admin/closeLoading');
    });

    return {
      formPatterns,
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
