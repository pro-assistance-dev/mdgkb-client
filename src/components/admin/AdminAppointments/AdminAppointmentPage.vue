<template>
  <div v-if="mounted">
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
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Appointment from '@/classes/Appointment';
import UserFormFields from '@/classes/UserFormFields';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
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
    const appointment: Ref<Appointment> = computed(() => Provider.store.getters['appointments/item']);
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await Provider.store.dispatch('appointments/update');
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push('/admin/appointments');
    };

    const updateNew = async () => {
      if (!appointment.value.formValue.isNew) {
        return;
      }
      appointment.value.formValue.isNew = false;
      await Provider.store.dispatch('appointments/update');
    };

    const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await loadAppointment();
      await updateNew();
    };

    Hooks.onBeforeMount(load);

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const loadAppointment = async (): Promise<void> => {
      if (Provider.route().params['id']) {
        await Provider.store.dispatch('appointments/get', Provider.route().params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: appointment.value.formValue.user.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: toggleEditMode, text: 'Редактировать заявление', type: 'primary' }, { action: submit }],
        });
      } else {
        Provider.store.commit('appointments/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить врача', showBackButton: true, buttons: [{ action: submit }] });
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
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

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
