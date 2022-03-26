<template>
  <el-table :data="form.fields">
    <el-table-column label="Наименование">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>

    <el-table-column label="Данные">
      <template #default="scope">
        <FieldValuesFormItem :form="form" :field="scope.row" />
      </template>
    </el-table-column>

    <el-table-column label="Образец" sortable>
      <template #default="scope">
        <a v-if="scope.row.file.fileSystemPath" :href="scope.row.file.getFileUrl()" target="_blank">
          {{ scope.row.file.originalName }}
        </a>
        <!-- <span v-else>Нет файла</span> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FieldValuesFormItem from '@/components/FormConstructor/FieldValuesFormItem.vue';
import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'FieldValuesForm',
  components: { FieldValuesFormItem },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },
});
</script>
