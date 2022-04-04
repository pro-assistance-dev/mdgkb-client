<template>
  <el-card>
    <template #header>
      <span>Информация о заявителе</span>
    </template>
    <div v-if="isEditMode">
      <UserForm
        :form="formValue"
        :show-error-message="false"
        :from-admin="true"
        :email-exists="emailExists"
        :validate-email="validateEmail"
        @findEmail="findEmail"
      />
    </div>
    <el-descriptions v-else :column="1">
      <el-descriptions-item label="Email">{{ formValue.user.email }}</el-descriptions-item>
      <el-descriptions-item label="ФИО">{{ formValue.user.human.getFullName() }}</el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-card v-if="isEditMode">
    <template #header>
      <span>Форма для подачи заявления</span>
    </template>
    <FieldValuesForm :form="formValue" />
  </el-card>

  <el-card v-else>
    <template #header>
      <div class="flex-between">
        <span>Данные формы</span>
        <div class="flex">
          <span style="margin-right: 5px">Статус:</span>
          <el-tag v-if="formValue.isFieldValuesModChecked()" size="small" type="success">Данные проверены</el-tag>
          <el-tag v-else size="small" type="danger">Данные не проверены</el-tag>
          <el-button
            :disabled="formValue.isFieldValuesModChecked()"
            :type="formValue.isFieldValuesModChecked() ? 'success' : 'primary'"
            size="small"
            style="margin-left: 5px"
            @click="formValue.changeFieldValuesModChecked(true)"
          >
            Пометить все
          </el-button>
        </div>
      </div>
    </template>
    <FieldValuesFormResult :form="formValue" />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FieldValuesFormResult from '@/components/FormConstructor/FieldValuesFormResult.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'AdminFormValue',
  components: { FieldValuesFormResult, FieldValuesForm, UserForm },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
    emailExists: {
      type: Boolean,
      default: false,
    },
    validateEmail: {
      type: Boolean,
      default: true,
    },
    isEditMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['findEmail'],

  setup(props, { emit }) {
    const formValue: Ref<IForm | undefined> = ref();

    onBeforeMount(() => {
      formValue.value = props.form;
    });

    const findEmail = () => {
      if (props.validateEmail) emit('findEmail');
    };

    return {
      formValue,
      findEmail,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
