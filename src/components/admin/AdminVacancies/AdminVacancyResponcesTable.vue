<template>
  <el-table :data="vacancyResponses">
    <el-table-column label="Статус" min-width="150">
      <template #default="scope">
        <el-tag v-if="scope.row.formValue.isNew" size="small" type="warning">Не просмотрено</el-tag>
        <el-tag
          v-if="scope.row.formValue.formStatus.label"
          size="small"
          :style="`background-color: inherit; color: ${scope.row.formValue.formStatus.color}; border-color: ${scope.row.formValue.formStatus.color}`"
        >
          {{ scope.row.formValue.formStatus.label }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column v-if="vacancyColumn" label="Вакансия" min-width="250">
      <template #default="scope">
        <router-link :to="`/admin/vacancies/${scope.row.vacancy.id}`">
          {{ scope.row.vacancy.title }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="coverLetter" label="Email" min-width="200" class-name="sticky-left">
      <template #default="scope">
        {{ scope.row.formValue.user.email }}
      </template>
    </el-table-column>
    <el-table-column prop="coverLetter" label="ФИО" min-width="300">
      <template #default="scope">
        {{ scope.row.formValue.user.human.getFullName() }}
      </template>
    </el-table-column>
    <el-table-column label="Дата" align="center" min-width="200">
      <template #default="scope">
        {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: 'long', hour: 'numeric', minute: 'numeric' }) }}
      </template>
    </el-table-column>
    <!-- Отображение докуметов и полей формы -->
    <!-- <el-table-column v-for="item in vacancy.formPattern.fields" :key="item.id" :label="item.name" min-width="300">
      <template #default="scope">
        <div
          v-if="
            scope.row.formValue.findFieldValue(item.id).field.valueType.isString() ||
            scope.row.formValue.findFieldValue(item.id).field.valueType.isText()
          "
        >
          {{ scope.row.formValue.findFieldValue(item.id).valueString }}
        </div>
        <div v-if="scope.row.formValue.findFieldValue(item.id).field.valueType.isNumber()">
          {{ scope.row.formValue.findFieldValue(item.id).valueNumber }}
        </div>
        <div
          v-if="
            scope.row.formValue.findFieldValue(item.id).field.valueType.isDate() && scope.row.formValue.findFieldValue(item.id).valueDate
          "
        >
          {{ $dateTimeFormatter.format(scope.row.formValue.findFieldValue(item.id).valueDate) }}
        </div>
        <a
          v-if="
            scope.row.formValue.findFieldValue(item.id).field.valueType.isFile() &&
            scope.row.formValue.findFieldValue(item.id).file.fileSystemPath
          "
          :href="scope.row.formValue.findFieldValue(item.id).file.getFileUrl()"
          target="_blank"
        >
          {{ scope.row.formValue.findFieldValue(item.id).file.originalName }}
        </a>
        <span v-else>Не продоставлены</span> 
      </template>
    </el-table-column> -->
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
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default defineComponent({
  name: 'AdminVacancyResponcesTable',
  components: { TableButtonGroup },
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

<style lang="scss" scoped>
:deep(.el-tag) {
  margin: 2px;
}
</style>
