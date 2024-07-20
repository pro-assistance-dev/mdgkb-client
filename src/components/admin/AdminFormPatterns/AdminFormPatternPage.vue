<template>
  <div v-if="mounted" class="flex-column">
    <el-form ref="form" label-position="top" :model="formPattern" :rules="rules">
      <el-card>
        <el-form-item label="Название" prop="title">
          <el-input v-model="formPattern.title" placeholder="Название"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="Описание">
          <WysiwygEditor v-model="formPattern.description" />
        </el-form-item>
        <el-form-item label="Группа статусов" prop="formStatusGroup">
          <el-select v-model="formPattern.formStatusGroup" value-key="id" placeholder="Группа статусов" @change="changeStatusGroup">
            <el-option v-for="item in formStatusGroups" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Статус, назначаемый при создании формы" prop="defaultFormStatusId">
          <el-select
            v-model="formPattern.defaultFormStatusId"
            value-key="id"
            placeholder="Группа статусов"
            :disabled="!formPattern.formStatusGroup"
          >
            <el-option v-for="item in formPattern.formStatusGroup?.formStatuses" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Запрашивать согласие на обработку персональных данных">
          <el-switch v-model="formPattern.withPersonalDataAgreement"></el-switch>
        </el-form-item>
        <el-form-item v-if="formPattern.withPersonalDataAgreement" label="Cогласие на обработку персональных данных">
          <FileUploader v-if="formPattern.personalDataAgreement" :file-info="formPattern.personalDataAgreement" />
        </el-form-item>
      </el-card>
      <FormConstructor :form="formPattern" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeUnmount, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Form from '@/classes/Form';
import FormStatusGroup from '@/classes/FormStatusGroup';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import FileUploader from '@/components/FileUploader.vue';
import FormConstructor from '@/components/FormConstructor/FormConstructor.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminFormPatternPage',
  components: { FormConstructor, FileUploader, WysiwygEditor },

  setup() {
    const formPattern: Form = FormPatternsStore.Item();
    const formStatusGroups: FormStatusGroup[] = FormStatusGroupsStore.Items();

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();
    const rules = ref({
      title: [{ required: true, message: 'Необходимо указать наименование', trigger: 'blur' }],
      formStatusGroup: [{ required: true, message: 'Необходимо выбрать группу статусов', trigger: 'change' }],
      defaultFormStatusId: [{ required: true, message: 'Необходимо выбрать cтатус, назначаемый при создании формы', trigger: 'change' }],
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (Provider.route().params['id']) {
          await FormPatternsStore.Update();
        } else {
          await FormPatternsStore.Create();
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : Provider.router.push('/admin/form-patterns');
    };

    const changeStatusGroup = () => {
      Provider.store.commit('formPatterns/resetDefaultFormStatus');
    };

    const load = async () => {
      const id = Provider.route().params['id'];
      if (id && typeof id === 'string') {
        await FormPatternsStore.Get(id);
        PHelp.AdminUI.Head.Set('Обновить шаблон', [Button.Success('Сохранить', submit)]);
      } else {
        PHelp.AdminUI.Head.Set('Добавиь шаблон', [Button.Success('Сохранить', submit)]);
      }
      await Store.GetAll('formStatusGroups');
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(formPattern, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(load);

    onBeforeUnmount(() => {
      FormPatternsStore.ResetItem();
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      formPattern,
      formStatusGroups,
      changeStatusGroup,
      mounted: Provider.mounted,
      rules,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.flex-column {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: scroll;
}

.el-card {
  margin-bottom: 20px;
}

:deep(.upload-container) {
  display: flex;
}
</style>
