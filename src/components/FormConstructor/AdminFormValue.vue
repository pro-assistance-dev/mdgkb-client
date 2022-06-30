<template>
  <div v-if="mounted">
    <el-card v-if="formValue.formStatus.label">
      <template #header>
        <span>Информация о заявлении</span>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="Статус">
          <el-tag :style="`background-color: inherit; color: ${formValue.formStatus.color}; border-color: ${formValue.formStatus.color}`">
            {{ formValue.formStatus.label }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div class="buttons-block">
        <div v-for="item in formValue.formStatus.formStatusToFormStatuses" :key="item.id">
          <button
            v-if="item.childFormStatus.modActionName"
            size="small"
            :style="`background-color: ${item.childFormStatus.color}; color: white; border: 1px solid ${item.childFormStatus.color}`"
            @click.prevent="changeFormStatusHandler(item.childFormStatus)"
          >
            {{ item.childFormStatus.modActionName }}
          </button>
        </div>
      </div>
    </el-card>

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
          :active-fields="activeFields"
          @findEmail="findEmail"
        />
      </div>
      <AdminUserInfo v-else :form="formValue" :active-fields="activeFields" />
    </el-card>

    <el-card v-if="isEditMode">
      <template #header>
        <span>Форма для подачи заявления</span>
      </template>
      <FieldValuesForm :active-fields="activeFields" :form="formValue" />
    </el-card>

    <el-card v-else>
      <template #header>
        <div class="flex-between">
          <span>Данные формы</span>
          <div class="flex">
            <!-- <span style="margin-right: 5px">Статус:</span> -->
            <el-tag v-if="formValue.isFieldValuesModChecked()" type="success">Полный комплект документов</el-tag>
            <el-tag v-else type="danger">Не все документы проверены</el-tag>
            <el-button
              :disabled="formValue.isFieldValuesModChecked()"
              :type="formValue.isFieldValuesModChecked() ? 'success' : 'primary'"
              size="small"
              style="margin-left: 5px"
              @click="formValue.changeFieldValuesModChecked(true)"
            >
              Проверить все
            </el-button>
            <el-button style="margin-left: 5px" size="small" @click="downloadFiles">Печать всех документов</el-button>
          </div>
        </div>
      </template>
      <FieldValuesFormResult :form="formValue" />
    </el-card>
    <el-card header="Общий комментарий">
      <el-form-item prop="content">
        <WysiwygEditor v-model="formValue.modComment" />
      </el-form-item>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Form from '@/classes/Form';
import UserFormFields from '@/classes/UserFormFields';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import AdminUserInfo from '@/components/FormConstructor/AdminUserInfo.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FieldValuesFormResult from '@/components/FormConstructor/FieldValuesFormResult.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import IUserFormFields from '@/interfaces/IUserFormFields';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminFormValue',
  components: {
    FieldValuesFormResult,
    FieldValuesForm,
    UserForm,
    AdminUserInfo,
    WysiwygEditor,
  },
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
    activeFields: {
      type: Object as PropType<IUserFormFields>,
      default: UserFormFields.CreateWithFullName(),
    },
  },
  emits: ['findEmail'],

  setup(props, { emit }) {
    const formValue: Ref<IForm> = ref(new Form());
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const mounted: Ref<boolean> = ref(false);
    const changeFormStatusHandler = (status: IFormStatus) => {
      if (!formValue.value) return;
      if (status.isClarifyRequired() && !formValue.value.haveModComments()) {
        ElMessage({
          message: 'Необходимо добавить замечания',
          type: 'error',
        });
        return;
      }
      if ((status.isConsidering() || status.isAccepted()) && !formValue.value.isFieldValuesModChecked()) {
        ElMessage({
          message: 'Не все данные формы проверены',
          type: 'error',
        });
        return;
      }
      formValue.value.setStatus(status, formStatuses.value);
    };

    const load = async () => {
      await Provider.store.dispatch('formStatuses/getAll');
      formValue.value = props.form;
      mounted.value = true;
    };
    onBeforeMount(load);

    const findEmail = () => {
      if (props.validateEmail) emit('findEmail');
    };

    const downloadFiles = async () => {
      if (formValue.value) {
        await Provider.store.dispatch('formValues/documentsToPdf', formValue.value.id);
      }
    };

    return {
      downloadFiles,
      formValue,
      findEmail,
      formStatuses,
      mounted,
      changeFormStatusHandler,
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
.buttons-block {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 10px 0;
  button {
    margin: 0 5px;
    padding: 5px 10px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }
  }
}
</style>
