<template>
  <AdminListWrapper show-header pagination :store="QuestionsStore">
    <template #header>
      <SortSelect @load="loadQuestions" />
      <FiltersButtonsSelect :models="[onlyNewFilter]" @load="loadQuestions" />
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
            @show-more="$router.push(`/admin/questions/${scope.row.id}`)"
            @check="changeNewStatus(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import Question from '@/classes/Question';
import QuestionsFiltersLib from '@/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/libs/sorts/QuestionsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';

const questions: Question[] = QuestionsStore.Items();
const onlyNewFilter: Ref<FilterModel> = ref(new FilterModel());
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: Ref<boolean> = ref(true);

// const sourceSSE: EventSource | undefined = undefined;

const mounted = ref(false);

const edit = () => {
  if (isEditMode.value) {
    return;
  }
  isEditMode.value = true;
  isNotEditMode.value = false;
};

// const save = async (next?: NavigationGuardNext) => {
//   if (!isEditMode.value) {
//     return;
//   }
//   saveButtonClick.value = true;
//   await QuestionsStore.UpdateMany();
//   isEditMode.value = false;
//   isNotEditMode.value = true;
//   if (next) next();
// };

const loadQuestions = async () => {
  await QuestionsStore.FTSP();
};

const load = async () => {
  FTSP.Get().setS(QuestionsSortsLib.byDate(Orders.Desc));
  // SortListConst.Set(...createSortModels(QuestionsSortsLib, Orders.Desc));
  await loadQuestions();
  onlyNewFilter.value = QuestionsFiltersLib.onlyNew(true);
  PHelp.AdminUI.Head.Set('Вопросы', [
    Button.Success('Статистика', open),
    Button.Success('Редактировать', edit, isNotEditMode),
    Button.Success('Соханить', open, isEditMode),
  ]);
  mounted.value = true;
};

Hooks.onBeforeMount(load, {
  sortsLib: QuestionsSortsLib,
});

// const publish = async (question: Question) => {
//   question.publish();
//   await QuestionsStore.Publish(question.id);
// };

onBeforeUnmount(async () => {
  // sourceSSE?.close();
});

const changeNewStatus = async (question: Question) => {
  question.changeNewStatus();
  await QuestionsStore.ChangeNewStatus(question);
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
