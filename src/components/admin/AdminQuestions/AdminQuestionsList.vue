<template>
  <AdminListWrapper show-header pagination>
    <template #header>
      <SortSelect @load="loadQuestions" />
      <FiltersButtonsSelect @load="loadQuestions" :models="[onlyNewFilter]" />
    </template>
    <el-table v-if="questions" :data="questions">
      <el-table-column label="Тема вопроса" sortable>
        <template #default="scope">
          {{ scope.row.getThemeOrFirstPhrase() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата" sortable>
        <template #default="scope">
          {{
            $dateTimeFormatter.format(scope.row.date, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </template>
      </el-table-column>
      <el-table-column label="Статус">
        <template #default="scope">
          <AdminQuestionStatus :question="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="Публикация">
        <template #default="scope">
          <template v-if="isEditMode">
            <el-switch v-model="scope.row.published" active-text="Да" inactive-text="Нет" />
          </template>
          <template v-else>
            <el-tag v-if="scope.row.published" size="small" type="success">Опубликован</el-tag>
            <el-tag v-else size="small" type="danger">Не опубликован</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-check-button="true"
            :show-more-button="true"
            @showMore="$router.push(`/admin/questions/${scope.row.id}`)"
            @check="changeNewStatus(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import { NavigationGuardNext } from 'vue-router';

import Question from '@/classes/Question';
import FilterModel from '@/services/classes/filters/FilterModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import QuestionsFiltersLib from '@/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/libs/sorts/QuestionsSortsLib';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

const questions: Ref<Question[]> = Store.Items('questions');
const onlyNewFilter: Ref<FilterModel> = ref(new FilterModel());
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: Ref<boolean> = ref(true);
const { saveButtonClick } = useConfirmLeavePage();
const applicationsCount: ComputedRef<number> = Store.Getters('admin/applicationsCount');

let sourceSSE: EventSource | undefined = undefined;

const mounted = ref(false);

const edit = () => {
  if (isEditMode.value) {
    return;
  }
  isEditMode.value = true;
  isNotEditMode.value = false;
};

const save = async (next?: NavigationGuardNext) => {
  if (!isEditMode.value) {
    return;
  }
  saveButtonClick.value = true;
  await Store.Dispatch('questions/updateMany');
  isEditMode.value = false;
  isNotEditMode.value = true;
  if (next) next();
};

const loadQuestions = async () => {
  await Store.FTSP('questions');
};

const load = async () => {
  FTSP.Get().setS(QuestionsSortsLib.byDate(Orders.Desc));
  Provider.sortList.push(...createSortModels(QuestionsSortsLib, Orders.Desc));
  await loadQuestions();
  onlyNewFilter.value = QuestionsFiltersLib.onlyNew(true);
  PHelp.AdminHead().Set('Вопросы', [
    Button.Success('Статистика', open),
    Button.Success('Редактировать', edit, isNotEditMode),
    Button.Success('Соханить', open, isEditMode),
  ]);
  mounted.value = true;
};

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'questions', action: 'ftsp' },
  sortsLib: QuestionsSortsLib,
});

const publish = async (question: Question) => {
  question.publish();
  await Store.Dispatch('questions/publish', question.id);
};

onBeforeUnmount(async () => {
  sourceSSE?.close();
});

const changeNewStatus = async (question: Question) => {
  question.changeNewStatus();
  await Store.Dispatch('questions/changeNewStatus', question);
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
</style>
