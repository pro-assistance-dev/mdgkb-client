<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="faqs" :data="faqs">
        <el-table-column v-if="isEdit" width="50" fixed="left" align="center">
          <template #default="scope">
            <TableMover :ordered-items="faqs" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="Вопрос">
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

<script lang="ts" setup>
import Faq from '@/classes/Faq';

const faqs: Faq[] = FaqsStore.Items();
const isEdit: Ref<boolean> = ref(false);
const isNotEdit: Ref<boolean> = ref(true);

const create = (): void => {
  Router.To('/admin/faqs/new');
};
const remove = async (id: string): Promise<void> => {
  await FaqsStore.Remove(id);
};
const edit = (id: string): void => {
  Router.To(`/admin/faqs/${id}`);
};
const editOrder = () => {
  isEdit.value = true;
  isNotEdit.value = false;
};
const saveOrder = async () => {
  await FaqsStore.UpdateMany();
  isEdit.value = false;
  isNotEdit.value = true;
};

onBeforeMount(async () => {
  await FaqsStore.FTSP();
  PHelp.AdminUI.Head.Set('Часто задаваемые вопросы', [
    Button.Success('Редактировать порядок', editOrder, isNotEdit),
    Button.Success('Сохранить порядок', saveOrder, isEdit),
    Button.Success('Добавить', create),
  ]);
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
