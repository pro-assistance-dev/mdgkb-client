<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="create">Создать вакансию</el-button>
    </div>
    <el-card>
      <el-table v-if="vacancies" :data="vacancies">
        <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="description" label="Описание" sortable> </el-table-column>
        <el-table-column prop="specialization" label="Специализация" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="$router.push(`/admin/vacancies/${scope.row.id}`)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminVacanciesList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('vacancies/getAll');
      store.commit('admin/setPageTitle', { title: 'Вакансии' });
    });

    const vacancies = computed(() => store.getters['vacancies/vacancies']);

    const remove = async (id: string) => {
      await store.dispatch('vacancies/remove', id);
    };

    const create = () => router.push(`/admin/vacancies/new`);

    return { vacancies, remove, create };
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
