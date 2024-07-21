<template>
  <el-table v-if="mounted" :data="candidateApplications">
    <el-table-column label="Статус">
      <template #default="scope">
        <el-tag v-if="scope.row.formValue.isNew" size="small" type="warning">Не просмотрено</el-tag>
        <el-tag
          v-if="scope.row.formValue.formStatus.label"
          size="small"
          :style="`background-color: inherit; color: ${scope.row.formValue.formStatus.color}; border-color: ${scope.row.formValue.formStatus.color}`"
          >{{ scope.row.formValue.formStatus.label }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="Дата подачи заявления" sortable>
      <template #default="scope">
        {{
          $dateTimeFormatter.format(scope.row.formValue.createdAt, {
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
          })
        }}
      </template>
    </el-table-column>
    <el-table-column label="Email заявителя" sortable>
      <template #default="scope">
        {{ scope.row.formValue.user.email }}
      </template>
    </el-table-column>
    <el-table-column label="ФИО заявителя" sortable>
      <template #default="scope">
        {{ scope.row.formValue.user.human.getFullName() }}
      </template>
    </el-table-column>
    <el-table-column label="Специальности для защиты" sortable>
      <template #default="scope">
        <div v-for="(candidateSpecialization, i) in scope.row.candidateApplicationSpecializations" :key="candidateSpecialization.id">
          {{ i + 1 }}. {{ candidateSpecialization.specialization.name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';

import CandidateApplication from '@/classes/CandidateApplication';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminCandidateApplicationsList',
  components: { TableButtonGroup },

  setup() {
    const mounted: Ref<boolean> = ref(false);
    const router = useRouter();
    const route = useRoute();

    const candidateApplications: CandidateApplication[] = CandidateApplicationsStore.Items();

    onBeforeMount(async () => {
      CandidateApplicationsStore.GetAll();
      mounted.value = true;
    });

    const create = () => router.push(`${route.path}/new`);
    // const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => router.push(`${route.path}/${id}`);

    return {
      mounted,
      candidateApplications,
      edit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
:deep(.el-tag) {
  margin: 2px;
}
</style>
