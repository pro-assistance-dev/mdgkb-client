<template>
  <div v-if="mounted">
    <el-card v-if="formValue.formStatus.label">
      <template #header>
        <span>{{ statusHeader }}</span>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="Статус">
          <el-tag :style="`background-color: inherit; color: ${formValue.formStatus.color}; border-color: ${formValue.formStatus.color}`">
            {{ formValue.formStatus.label }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="formValue.withApprovingDate" label="Время">
          <el-form-item style="margin: 0" prop="content">
            <DatePicker v-model="formValue.approvingDate" />
          </el-form-item>
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
        <span>{{ infoHeader }}</span>
      </template>
      <!--      UserForm крашилось раньше в проде -->
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
      <template v-if="formHeader" #header>
        <span>{{ formHeader }}</span>
      </template>
      <FieldValuesForm :active-fields="activeFields" :form="formValue" :show-additional-files="showAdditionalFiles" />
    </el-card>

    <div v-else>
      <el-card v-if="formValue.fieldValues.length" id="form-data">
        <template v-if="formHeader" #header>
          <div class="flex-between">
            <span>{{ formHeader }}</span>
            <div v-if="checkFields" class="flex">
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
              <!--            ЕСТЬ СЛУЧАИ КРАША СЕРВЕРА - НЕ ВКЛЮЧАТЬ-->
              <!--            <el-button style="margin-left: 5px" size="small" @click="downloadFiles">Печать всех документов</el-button>-->
              <el-button style="margin-left: 5px" size="small" @click="downloadZip">Скачать документы в архиве zip</el-button>
            </div>
          </div>
        </template>
        <FieldValuesFormResult :form="formValue" :check-fields="checkFields" />
        <div v-for="file in formValue.formValueFiles" :key="file">
          <a v-if="file.file.fileSystemPath" :href="file.file.getFileUrl()" target="_blank">
            {{ file.file.originalName }}
          </a>
        </div>
      </el-card>
    </div>
    <el-card v-if="formValue.fieldValues.length && checkFields" id="form-comment" header="Общий комментарий">
      <el-form-item prop="content">
        <WysiwygEditor v-model="formValue.modComment" />
      </el-form-item>
    </el-card>
    <!-- TODO: ошибка на бэке -->
    <!-- <Chat :user-id="user.id" user-name="Администратор" :chat-id="formValue.chatId" margin="0px" :icon-close="false" /> -->
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Form from '@/classes/Form';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import DatePicker from '@/components/DatePicker.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import AdminUserInfo from '@/components/FormConstructor/AdminUserInfo.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FieldValuesFormResult from '@/components/FormConstructor/FieldValuesFormResult.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import IUserFormFields from '@/interfaces/IUserFormFields';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'AdminFormValue',
  components: {
    FieldValuesFormResult,
    FieldValuesForm,
    UserForm,
    AdminUserInfo,
    WysiwygEditor,
    DatePicker,
    // Chat,
  },
  props: {
    form: {
      type: Object as PropType<Form>,
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
    showAdditionalFiles: {
      type: Boolean,
      required: true,
      default: true,
    },
    statusHeader: {
      type: String,
      default: 'Статус заявления',
    },
    infoHeader: {
      type: String,
      default: 'Информация о заявителе',
    },
    formHeader: {
      type: String,
      default: 'Данные формы',
    },
    checkFields: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['findEmail'],

  setup(props, { emit }) {
    const formValue = ref(new Form());
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const mounted: Ref<boolean> = ref(false);
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    const changeFormStatusHandler = (status: IFormStatus) => {
      if (!formValue.value) return;
      if (props.checkFields) {
        if (status.isClarifyRequired() && !formValue.value.haveModComments() && !formValue.value.modComment) {
          ElMessage({
            message: 'Необходимо добавить замечания',
            type: 'error',
          });
          return;
        }
        if ((status.isConsidering() || status.isAccepted()) && !formValue.value.isFieldValuesModChecked()) {
          ElMessage({
            message: 'Проверьте данные формы',
            type: 'error',
          });
          scroll('#form-data');
          return;
        }
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

    const downloadZip = async () => {
      if (formValue.value) {
        await Provider.store.dispatch('formValues/documentsToZip', {
          id: formValue.value.id,
          name: formValue.value.user.human.getFullName(),
        });
      }
    };

    return {
      user,
      downloadZip,
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
