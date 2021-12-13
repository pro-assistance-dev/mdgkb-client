<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="faqs" :data="faqs">
        <el-table-column v-if="isEdit" width="50" fixed="left" align="center">
          <template #default="scope">
            <TableMover :store-module="'faqs'" :store-getter="'items'" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="Вопрос" sortable>
          <template #default="scope">
            <span>{{ scope.row.question }}</span>
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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import IFaq from '@/interfaces/IFaq';

export default defineComponent({
  name: 'AdminFaqList',
  components: { TableMover, TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const faqs: ComputedRef<IFaq[]> = computed<IFaq[]>(() => store.getters['faqs/items']);
    const isEdit: Ref<boolean> = ref(false);
    const isNotEdit: Ref<boolean> = ref(true);

    const create = (): void => {
      router.push('/admin/faqs/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('faqs/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/faqs/${id}`);
    };
    const editOrder = () => {
      isEdit.value = true;
      isNotEdit.value = false;
    };
    const saveOrder = async () => {
      await store.dispatch('faqs/updateAll', { faqs: faqs.value, faqsWithDeleted: [] });
      isEdit.value = false;
      isNotEdit.value = true;
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('faqs/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Часто задаваемые вопросы',
        buttons: [
          { text: 'Редактировать порядок', type: 'primary', action: editOrder, condition: isNotEdit },
          { text: 'Сохранить порядок', type: 'success', action: saveOrder, condition: isEdit },
          { text: 'Добавить', type: 'primary', action: create },
        ],
      });
      store.commit('admin/closeLoading');
    });

    return {
      faqs,
      create,
      remove,
      edit,
      isEdit,
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
