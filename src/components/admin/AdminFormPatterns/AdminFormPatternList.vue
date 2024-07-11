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

<script lang="ts" setup>
import Form from '@/classes/Form';

const formPatterns: ComputedRef<Form[]> = Store.Items('formPatterns');

const create = (): void => {
  Router.ToAdmin('/form-patterns/new');
};
const remove = async (id: string): Promise<void> => {
  await Store.Remove('formPatterns', id);
};

const edit = (id: string): void => {
  Router.ToAdmin(`form-patterns/${id}`);
};

onBeforeMount(async () => {
  await Store.FTSP('formPatterns');
  PHelp.AdminUI.Head.Set('Шаблоны форм для заявок', [Button.Success('Создать', create)]);
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
