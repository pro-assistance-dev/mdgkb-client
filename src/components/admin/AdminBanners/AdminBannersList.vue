<template>
  <AdminListWrapper v-if="mounted" show-header>
    <div class="flex-column">
      <el-card>
        <el-table :data="banners">
          <el-table-column v-if="isEditMode" width="50" fixed="left" align="center">
            <template #default="scope">
              <TableMover :ordered-items="banners" :index="scope.$index" />
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
    </div>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const mounted = ref(false);
const banners = BannersStore.Items();
const isEditMode = ref(false);

const load = async () => {
  await BannersStore.GetAll();
  mounted.value = true;
};

Hooks.onBeforeMount(load, {
  adminHeader: {
    title: 'Рекламные баннеры',

    buttons: [
      {
        text: computed(() => (isEditMode.value ? 'Сохранить' : 'Редактировать')),
        action: computed(() => (isEditMode.value ? saveOrder : () => (isEditMode.value = !isEditMode.value))),
      },
      { text: 'Добавить баннер', type: 'primary', action: Provider.createAdmin },
    ],
  },
});

const saveOrder = async () => {
  await BannersStore.UpdateMany();
  isEditMode.value = false;
};
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
