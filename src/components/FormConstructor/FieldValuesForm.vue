<template>
  <div class="mobile-container">
    <el-table :data="showModComments ? formValue.getFieldsWithModComemnts() : formValue.fields">
      <el-table-column label="">
        <template #default="scope">
          {{ scope.row.name }}<br /><br />
          <FieldValuesFormItem :form="formValue" :field="scope.row" />
          <h4 v-if="scope.row.file.fileSystemPath">Образец:</h4>
          <a v-if="scope.row.file.fileSystemPath" :href="scope.row.file.getFileUrl()" target="_blank">
            {{ scope.row.file.originalName }}
          </a>
          <h4 v-if="scope.row.id.modComment">Замечания:</h4>
          {{ form.findFieldValue(scope.row.id).modComment }}
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="table-container">
    <el-table :data="showModComments ? formValue.getFieldsWithModComemnts() : formValue.fields">
      <el-table-column label="Наименование">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Данные">
        <template #default="scope">
          <FieldValuesFormItem :form="formValue" :field="scope.row" />
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

      <el-table-column label="Замечания" width="200px">
        <template #default="scope">
          {{ form.findFieldValue(scope.row.id).modComment }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FieldValuesFormItem from '@/components/FormConstructor/FieldValuesFormItem.vue';
import IField from '@/interfaces/IField';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';

export default defineComponent({
  name: 'FieldValuesForm',
  components: { FieldValuesFormItem },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
    showModComments: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);
    const formValue: Ref<IForm | undefined> = ref();

    onBeforeMount(async () => {
      formValue.value = props.form;
      await store.dispatch('formStatuses/getAll');
      if (!formValue.value.formStatus.label) {
        formValue.value.setNewStatus(formStatuses.value);
      }
      if (props.showModComments) {
        formValue.value.fields = formValue.value.fields.filter((el: IField) => {
          if (!el.id) return;
          return props.form.findFieldValue(el.id)?.modComment;
        });
      }
    });

    return {
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
</style>
