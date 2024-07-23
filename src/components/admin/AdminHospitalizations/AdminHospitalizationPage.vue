<template>
  <div v-if="mounted" class="wrapper">
    <el-form
      ref="form"
      v-model="hospitalization"
      :model="hospitalization"
      label-width="150px"
      style="max-width: 700px"
      label-position="left"
    >
      <AdminFormValue
        :form="hospitalization.formValue"
        :validate-email="false"
        :active-fields="UserFormFields.CreateWithAllChildFields({ userPhone: true, userName: true })"
        :is-edit-mode="isEditMode"
      />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Hospitalization from '@/classes/Hospitalization';
import UserFormFields from '@/classes/UserFormFields';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminHospitalizationPage',
  components: {
    AdminFormValue,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);
    const isEditMode: Ref<boolean> = ref(false);
    const hospitalization: Hospitalization = HospitalizationsStore.Item();
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await HospitalizationsStore.Update();
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Router.To('/admin/hospitalizations');
    };

    const updateNew = async () => {
      if (!hospitalization.formValue.isNew) {
        return;
      }
      hospitalization.formValue.isNew = false;
      await HospitalizationsStore.Update();
    };

    const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await loadHospitalization();
      await updateNew();
    };

    Hooks.onBeforeMount(load);

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const loadHospitalization = async (): Promise<void> => {
      if (Router.Id()) {
        await HospitalizationsStore.Get(Router.Id());
        PHelp.AdminUI.Head.Set(hospitalization.formValue.user.human.getFullName(), [
          Button.Success('Редактировать заявление', toggleEditMode),
          Button.Success('Сохранить', submit),
        ]);
      } else {
        HospitalizationsStore.ResetState();
      }
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      isEditMode,
      UserFormFields,
      hospitalization,
      rules,
      submit,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.wrapper {
  height: calc(100% - 80px);
  overflow: hidden;
  overflow-y: auto;
}

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
