<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="questions" :data="questions">
        <el-table-column label="Тема вопроса" sortable>
          <template #default="scope">
            {{ scope.row.theme }}
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
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';
import { useStore } from 'vuex';

import AdminQuestionStatus from '@/components/admin/AdminQuestions/AdminQuestionStatus.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'AdminQuestionsList',
  components: { TableButtonGroup, AdminQuestionStatus },
  setup() {
    const store = useStore();

    const questions: Ref<IQuestion[]> = computed(() => store.getters['questions/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('questions/getAll', false);
      store.commit('admin/setHeaderParams', { title: 'Вопросы' });
      store.commit('admin/closeLoading');
    });

    const publish = async (question: IQuestion) => {
      question.publish();
      await store.dispatch('questions/publish', question.id);
    };

    const changeNewStatus = async (question: IQuestion) => {
      question.changeNewStatus();
      await store.dispatch('questions/changeNewStatus', question);
    };
    return { questions, publish, changeNewStatus };
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
