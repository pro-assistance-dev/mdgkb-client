<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <el-table v-if="questions" :data="questions">
      <el-table-column label="Тема вопроса" sortable>
        <template #default="scope">
          {{ scope.row.getThemeOrFirstPhrase() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="Статус">
        <template #default="scope">
          <AdminQuestionStatus :question="scope.row" />
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
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
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import AdminQuestionStatus from '@/components/admin/AdminQuestions/AdminQuestionStatus.vue';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IQuestion from '@/interfaces/IQuestion';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import QuestionsSortsLib from '@/services/Provider/libs/sorts/QuestionsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminQuestionsList',
  components: { TableButtonGroup, AdminQuestionStatus, AdminListWrapper, Pagination },
  setup() {
    const questions: Ref<IQuestion[]> = computed(() => Provider.store.getters['questions/items']);

    const loadDivisions = async () => {
      await Provider.getAll('questions');
    };

    const load = async () => {
      Provider.setSortModels(QuestionsSortsLib.byDate(Orders.Desc));
      await loadDivisions();
      Provider.store.commit('admin/setHeaderParams', { title: 'Вопросы' });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'questions', action: 'getAll' },
      sortModels: [],
    });

    const publish = async (question: IQuestion) => {
      question.publish();
      await Provider.store.dispatch('questions/publish', question.id);
    };

    const changeNewStatus = async (question: IQuestion) => {
      question.changeNewStatus();
      await Provider.store.dispatch('questions/changeNewStatus', question);
    };
    return { questions, publish, changeNewStatus, mounted: Provider.mounted };
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
