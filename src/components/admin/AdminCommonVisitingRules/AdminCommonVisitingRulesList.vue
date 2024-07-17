<template>
  <el-card v-if="mounted">
    <el-form ref="form" :model="visitingRules">
      <el-table v-if="visitingRules" :data="visitingRules">
        <el-table-column v-if="isEdit" width="50" align="center">
          <template #default="scope">
            <TableMover :store-module="'visitingRules'" :store-getter="'items'" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="Правила посещения">
          <template #default="scope">
            <span v-if="!isEdit" style="white-space: pre-line">{{ scope.row.text }}</span>
            <el-form-item
              v-else
              style="margin: 0"
              :rules="[{ required: true, message: 'Необходимо указать текст правила', trigger: 'blur' }]"
              :prop="scope.$index + '.text'"
            >
              <el-input v-model="scope.row.text" placeholder="Правило" type="textarea" :autosize="{ minRows: 2 }"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="Тип" width="200" align="center">
          <template #default="scope">
            <template v-if="!isEdit">
              <span v-if="scope.row.isListItem">Список</span>
              <span v-else>Текст</span>
            </template>
            <el-switch v-else v-model="scope.row.isListItem" active-text="Список" inactive-text="Текст"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column v-if="isEdit" width="50" align="center">
          <template #default="scope">
            <TableButtonGroup :show-remove-button="true" @remove="remove(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import IVisitingRule from '@/interfaces/IVisitingRule';
import validate from '@/services/validate';

const form = ref();
const visitingRules: IVisitingRule[] = VisitingRulesStore.Items();
const isEdit: Ref<boolean> = ref(false);
const isNotEdit: Ref<boolean> = ref(true);
const mounted: Ref<boolean> = ref(false);

const edit = () => {
  isEdit.value = true;
  isNotEdit.value = false;
};
const save = async () => {
  if (!validate(form)) {
    return;
  }
  await VisitingRulesStore.UpdateAll();
  isEdit.value = false;
  isNotEdit.value = true;
};
const create = () => {
  VisitingRulesStore.Create();
};
const remove = (index: number) => {
  VisitingRulesStore.Remove(index);
};

onBeforeMount(async () => {
  await VisitingRulesStore.GetAll();
  PHelp.AdminUI.Head.Set('Общие правила посещения', [
    Button.Success('Сохранить', save, isNotEdit),
    Button.Success('Редактировать', edit, isNotEdit),
    Button.Success('Создать', create, isEdit),
  ]);
  mounted.value = true;
});
</script>
