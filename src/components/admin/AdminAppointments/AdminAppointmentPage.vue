<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" v-model="appointment" :model="appointment" label-width="150px" style="max-width: 700px" label-position="left">
      <AdminFormValue
        :form="appointment.formValue"
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

import Appointment from '@/classes/Appointment';
import UserFormFields from '@/classes/UserFormFields';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminAppointmentPage',
  components: {
    AdminFormValue,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);
    const isEditMode: Ref<boolean> = ref(false);
    const appointment: Appointment = AppointmentsStore.Item();
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await AppointmentsStore.Update();
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Router.To('/admin/appointments');
    };

    const updateNew = async () => {
      if (!appointment.formValue.isNew) {
        return;
      }
      appointment.formValue.isNew = false;
      await AppointmentsStore.Update();
    };

    const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await loadAppointment();
      await updateNew();
    };

    Hooks.onBeforeMount(load);

    const loadAppointment = async (): Promise<void> => {
      if (Router.Route().params['id']) {
        AppointmentsStore.Get(Router.Id());
      } else {
        AppointmentsStore.ResetState();
      }
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      isEditMode,
      UserFormFields,
      appointment,
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
