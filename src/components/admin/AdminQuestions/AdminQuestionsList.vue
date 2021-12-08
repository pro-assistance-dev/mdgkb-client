<template>
  <div class="flex-column">
    <!-- <div class="flex-row-between">
      <el-button v-if="newQuestionsExists()" type="warning">Показать новые вопросы</el-button>
    </div> -->
    <el-card>
      <el-table v-if="questions" :data="questions">
        <el-table-column label="Тема вопроса" sortable>
          <template #default="scope">
            {{ scope.row.theme }}
          </template>
        </el-table-column>
        <el-table-column label="Дата" sortable>
          <template #default="scope">
            {{ $dateFormatRu(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="Статус">
          <template #default="scope">
            <el-tag v-if="scope.row.isNew" size="small" type="warning">Новый</el-tag>
            <el-tag v-if="!scope.row.publishAgreement" size="small" type="info">Публикация запрещена</el-tag>
            <el-tag v-else-if="scope.row.published" size="small" type="success">Опубликован</el-tag>
            <el-tag v-else size="small" type="danger">Неопубликован</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="archived" label="Опубликован" sortable>
          <template #default="scope">
            <i v-if="scope.row.published" class="el-icon-check"></i>
            <i v-else class="el-icon-minus"></i>
          </template>
        </el-table-column> -->
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-more-button="true"
              :show-remove-button="true"
              @showMore="$router.push(`/admin/questions/${scope.row.id}`)"
              @remove="remove(scope.row.id)"
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

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'AdminQuestionsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();

    const questions: Ref<IQuestion[]> = computed(() => store.getters['questions/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('questions/getAll', false);
      store.commit('admin/setPageTitle', { title: 'Вопросы' });
    });

    const remove = async (id: string) => {
      await store.dispatch('questions/remove', id);
    };

    const newQuestionsExists = (): boolean => {
      return questions.value.some((item: IQuestion) => item.isNew);
    };

    const publish = async (question: IQuestion) => {
      question.publish();
      await store.dispatch('questions/publish', question.id);
    };

    return { questions, remove, newQuestionsExists, publish };
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

.el-tag {
  margin: 3px;
}
</style>
