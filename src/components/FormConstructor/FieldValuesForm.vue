<template>
  <el-table :data="formValue.fields">
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
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FieldValuesFormItem from '@/components/FormConstructor/FieldValuesFormItem.vue';
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
    });

    return {
      formValue,
    };
  },
});
</script>
