<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button round size="medium" type="primary" @click="create">Создать вакансию</el-button>
      <el-button v-if="newResponsesExists()" round size="medium" type="warning">Показать новые отклики</el-button>
    </div>
    <el-card>
      <el-table v-if="vacancies" :data="vacancies">
        <el-table-column prop="title" label="Заголовок" sortable>
          <template #default="scope">
            <el-tag>Новых отзывов: {{ scope.row.countResponses(true) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Заголовок" sortable>
          <template #default="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="Описание" sortable> </el-table-column>
        <el-table-column prop="specialization" label="Специализация" sortable> </el-table-column>
        <el-table-column prop="archived" label="Архивирована" sortable>
          <template #default="scope">
            {{ scope.row.archived ? 'Архивирована' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Дата добавления" align="center" width="200" sortable>
          <template #default="scope">
            {{ $dateFormatRu(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-archive-button="true"
              :show-remove-button="true"
              @edit="$router.push(`/admin/vacancies/${scope.row.id}`)"
              @remove="remove(scope.row.id)"
              @archive="archive(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IVacancy from '@/interfaces/vacancies/IVacancy';

export default defineComponent({
  name: 'AdminVacanciesList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();

    const vacancies: Ref<IVacancy[]> = computed(() => store.getters['vacancies/vacancies']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('vacancies/getAllWithResponses');
      store.commit('admin/setHeaderParams', { title: 'Вакансии' });
      store.commit('admin/closeLoading');
    });

    const remove = async (id: string) => {
      await store.dispatch('vacancies/remove', id);
    };

    const create = () => router.push(`/admin/vacancies/new`);

    const newResponsesExists = (): boolean => {
      return vacancies.value.some((vacancy: IVacancy) => vacancy.withNewResponses());
    };

    const archive = async (vacancy: IVacancy) => {
      vacancy.archived = !vacancy.archived;
      await store.dispatch('vacancies/update', vacancy);
    };

    return { vacancies, remove, create, newResponsesExists, archive };
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
