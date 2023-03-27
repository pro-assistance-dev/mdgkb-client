<template>
  <el-table :data="vacancyResponses">
    <el-table-column label="Статус" min-width="200" class-name="sticky-left">
      <template #default="scope">
        <TableFormStatus :form="scope.row.formValue" />
      </template>
    </el-table-column>
    <el-table-column label="Дата" align="center" min-width="150">
      <template #default="scope">
        {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
      </template>
    </el-table-column>
    <el-table-column prop="coverLetter" label="Email" min-width="150" class-name="sticky-left">
      <template #default="scope">
        {{ scope.row.formValue.user.email }}
      </template>
    </el-table-column>
    <el-table-column prop="coverLetter" label="ФИО" min-width="200">
      <template #default="scope">
        {{ scope.row.formValue.user.human.getFullName() }}
      </template>
    </el-table-column>
    <el-table-column v-if="vacancyColumn" label="Вакансия" min-width="200">
      <template #default="scope">
        <router-link :to="`/admin/vacancies/${scope.row.vacancy?.id}`">
          {{ scope.row.vacancy.title }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column width="50" align="center" class-name="sticky-right">
      <template #default="scope">
        <TableButtonGroup
          :show-edit-button="true"
          :show-remove-button="true"
          @edit="$router.push(`/admin/vacancy-responses/${scope.row.id}`)"
          @remove="$emit('remove', scope.$index)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default defineComponent({
  name: 'AdminVacancyResponcesTable',
  components: { TableButtonGroup, TableFormStatus },
  props: {
    vacancyResponses: {
      type: Object as PropType<IVacancyResponse[]>,
      required: true,
    },
    vacancyColumn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove'],
});
</script>
