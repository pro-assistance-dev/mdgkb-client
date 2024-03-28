<template>
  <div v-if="filteredFields().length">
    <div v-if="mobileWindow || !table" class="mobile-container">
      <FieldValuesFormItem
        v-for="item in filteredFields()"
        :key="item.id"
        show-label
        :form="formValue"
        :show-mod-comments="showModComments"
        :field="item"
      />
    </div>

    <div v-else class="table-container" :style="hideColumnsCommentAndFile() ? { margin: '0 15%' } : ''">
      <div>
        <EditorContentRenderer :content="form.description" />
      </div>

      <el-table :data="fields" :header-cell-style="headerCellStyle">
        <el-table-column :label="getNameLabel" min-width="300">
          <template #default="scope">
            {{ scope.row.name }}
            <span v-if="scope.row.required" class="red">*</span>
          </template>
        </el-table-column>

        <el-table-column v-if="showModComments" label="Замечания" width="200px">
          <template #default="scope">
            {{ form.findFieldValue(scope.row.id)?.modComment }}
          </template>
        </el-table-column>

        <el-table-column v-if="showColumnComment()" label="Комментарий" min-width="300">
          <template #default="scope">
            {{ scope.row.comment }}
          </template>
        </el-table-column>

        <el-table-column :label="getDataLabel" min-width="300">
          <template #default="scope">
            <FieldValuesFormItem :form="formValue" :field="scope.row" />
          </template>
        </el-table-column>

        <el-table-column v-if="showColumnFile()" label="Образец" min-width="200">
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
  <el-form-item v-if="showAdditionalFiles" style="margin: 0" label="Добавить дополнительные файлы">
    <el-button style="margin-bottom: 5px" size="mini" type="success" icon="el-icon-document-add" @click="form.addForValueFile()" />
    <div v-for="(fieldValueFile, i) in form.formValueFiles" :key="fieldValueFile.id" style="display: flex; margin-bottom: 5px">
      <FileUploader :file-info="fieldValueFile.file" />
      <el-button
        size="mini"
        icon="el-icon-document-delete"
        style="padding: 5px; margin: 0; min-height: unset; border: none"
        @click="$classHelper.RemoveFromClassByIndex(i, form.formValueFiles, form.formValueFilesForDelete)"
      />
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Field from '@/classes/Field';
import FileInfo from '@/classes/FileInfo';
import Form from '@/classes/Form';
import FormStatus from '@/classes/FormStatus';
import EditorContentRenderer from '@/components/EditorContentRenderer.vue';
import FileUploader from '@/components/FileUploader.vue';
import FieldValuesFormItem from '@/components/FormConstructor/FieldValuesFormItem.vue';

export default defineComponent({
  name: 'FieldValuesForm',
  components: { FieldValuesFormItem, EditorContentRenderer, FileUploader },
  props: {
    form: {
      type: Object as PropType<Form>,
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
    requiredForCancelOnly: {
      type: Boolean,
      default: false,
    },
    table: {
      type: Boolean,
      default: false,
    },
    showAdditionalFiles: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const formStatuses: ComputedRef<FormStatus[]> = computed<FormStatus[]>(() => store.getters['formStatuses/items']);
    const formValue: Ref<Form | undefined> = ref();
    const getNameLabel = 'Наименование';
    const getDataLabel = 'Данные';
    const fields: Ref<Field[]> = ref([]);
    const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);
    onBeforeMount(async () => {
      formValue.value = props.form;
      await store.dispatch('formStatuses/getAll');
      if (!formValue.value.formStatus.label && formValue.value.defaultFormStatus) {
        formValue.value.setStatus(formValue.value.defaultFormStatus, formStatuses.value);
      }
      if (props.showModComments && !props.form.formStatus.isNew() && !props.form.formStatus.isAccepted()) {
        formValue.value.fields = formValue.value.fields.filter((el: Field) => {
          if (!el.id) return;
          return props.form.findFieldValue(el.id)?.modComment;
        });
      }
      fields.value = filteredFields();
    });

    onMounted(() => {
      window.addEventListener('resize', () => {
        mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches;
      });
    });

    const filteredFields = (): Field[] => {
      if (props.leaveFieldsWithCode?.length > 0) {
        return props.form.fields.filter((field: Field) => props.leaveFieldsWithCode?.includes(field.code));
      }
      if (props.filterFieldsWithCode?.length > 0) {
        return props.form.fields.filter((field: Field) => !props.filterFieldsWithCode?.includes(field.code));
      }
      if (props.requiredForCancelOnly) {
        return props.form.fields.filter((field: Field) => field.requiredForCancel);
      }
      return props.form.fields;
    };

    return {
      fields,
      filteredFields,
      formValue,
      getNameLabel,
      getDataLabel,
      mobileWindow,
    };
  },
  methods: {
    showColumn(dataTable: Field[], fieldData: string, secondFieldData?: string) {
      const showColumn = !!dataTable.filter((item: Field) => {
        const firstField = item[fieldData as keyof Field];
        const firstFieldAsIFileInfo = item[fieldData as keyof Field] as FileInfo;
        return !secondFieldData ? firstField : firstFieldAsIFileInfo[secondFieldData as keyof FileInfo];
      }).length;
      return showColumn;
    },

    showColumnComment() {
      return this.showColumn(this.filteredFields(), 'comment');
    },

    showColumnFile() {
      return this.showColumn(this.filteredFields(), 'file', 'originalName');
    },

    hideColumnsCommentAndFile() {
      return !this.showColumnComment() && !this.showColumnFile();
    },

    headerCellStyle(object: any /* { row, column, rowIndex, columnIndex } */) {
      if (
        (object.column.label === this.getNameLabel && this.hideColumnsCommentAndFile()) ||
        (object.column.label === this.getDataLabel && this.hideColumnsCommentAndFile())
      ) {
        return { display: 'none' };
      }
    },
  },
});
</script>

<style scoped lang="scss">
// .mobile-container {
//   display: none;
// }
.el-table {
  --el-table-border: none;
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

  // .mobile-container {
  //   display: block;
  // }
}

.red {
  color: red;
}
.el-form-item {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
