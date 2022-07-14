<template>
  <div v-if="filteredFields().length">
    <div class="mobile-container">
      <el-table :data="filteredFields()">
        <el-table-column label="">
          <template #default="scope">
            {{ scope.row.name }}<br /><br />
            <FieldValuesFormItem :form="formValue" :field="scope.row" />
            <h4 v-if="scope.row.file.fileSystemPath">Образец:</h4>
            <a v-if="scope.row.file.fileSystemPath" :href="scope.row.file.getFileUrl()" target="_blank">
              {{ scope.row.file.originalName }}
            </a>
            <h4 v-if="showModComments">Замечания:</h4>
            {{ form.findFieldValue(scope.row.id)?.modComment }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-container">
      <div>
        <EditorContent :content="form.description" />
      </div>

      <el-table :data="filteredFields()">
        <el-table-column label="Наименование" min-width="300">
          <template #default="scope">
            {{ scope.row.name }}
            <span v-if="scope.row.required" class="red">*</span>
          </template>
        </el-table-column>

        <el-table-column v-if="showModComments" label="Замечания" width="200px">
          <template #default="scope">
            {{ form.findFieldValue(scope.row.id).modComment }}
          </template>
        </el-table-column>

        <el-table-column label="Комментарий" min-width="300">
          <template #default="scope">
            {{ scope.row.comment }}
          </template>
        </el-table-column>

        <el-table-column label="Данные" min-width="300">
          <template #default="scope">
            <FieldValuesFormItem :form="formValue" :field="scope.row" />
          </template>
        </el-table-column>

        <el-table-column label="Образец" min-width="200">
          <template #default="scope">
            <a v-if="scope.row.file.fileSystemPath" :href="scope.row.file.getFileUrl()" target="_blank">
              {{ scope.row.file.originalName }}
            </a>
            <!-- <span v-else>Нет файла</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import EditorContent from '@/components/EditorContent.vue';
import FieldValuesFormItem from '@/components/FormConstructor/FieldValuesFormItem.vue';
import IField from '@/interfaces/IField';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';

export default defineComponent({
  name: 'FieldValuesForm',
  components: { FieldValuesFormItem, EditorContent },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
    showModComments: {
      type: Boolean,
      default: false,
    },
    leaveFieldsWithCode: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    filterFieldsWithCode: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);
    const formValue: Ref<IForm | undefined> = ref();

    onBeforeMount(async () => {
      formValue.value = props.form;
      await store.dispatch('formStatuses/getAll');
      if (!formValue.value.formStatus.label && formValue.value.defaultFormStatus) {
        formValue.value.setStatus(formValue.value.defaultFormStatus, formStatuses.value);
      }
      if (props.showModComments) {
        formValue.value.fields = formValue.value.fields.filter((el: IField) => {
          if (!el.id) return;
          return props.form.findFieldValue(el.id)?.modComment;
        });
      }
    });

    const filteredFields = (): IField[] => {
      if (props.leaveFieldsWithCode?.length > 0) {
        return props.form.fields.filter((field: IField) => props.leaveFieldsWithCode?.includes(field.code));
      }
      if (props.filterFieldsWithCode?.length > 0) {
        return props.form.fields.filter((field: IField) => !props.filterFieldsWithCode?.includes(field.code));
      }
      return props.form.fields;
    };

    return {
      filteredFields,
      formValue,
    };
  },
});
</script>

<style scoped lang="scss">
.mobile-container {
  display: none;
}

@media screen and (max-width: 1024px) {
  .size {
    width: calc(100% - 6px);
    padding: 0 3px;
  }
  :deep(.card-item) {
    padding: 15px 2px;
  }

  .table-container {
    display: none;
  }

  .mobile-container {
    display: block;
  }
}

.red {
  color: red;
}
</style>
