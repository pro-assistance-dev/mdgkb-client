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
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Hospitalization from '@/classes/Hospitalization';
import UserFormFields from '@/classes/UserFormFields';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
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
    const hospitalization: Ref<Hospitalization> = computed(() => Provider.store.getters['hospitalizations/item']);
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await Provider.store.dispatch('hospitalizations/update');
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push('/admin/hospitalizations');
    };

    const updateNew = async () => {
      if (!hospitalization.value.formValue.isNew) {
        return;
      }
      hospitalization.value.formValue.isNew = false;
      await Provider.store.dispatch('hospitalizations/update');
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
      if (Provider.route().params['id']) {
        await Provider.store.dispatch('hospitalizations/get', Provider.route().params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: hospitalization.value.formValue.user.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: toggleEditMode, text: 'Редактировать заявление', type: 'primary' }, { action: submit }],
        });
      } else {
        Provider.store.commit('hospitalizations/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить врача', showBackButton: true, buttons: [{ action: submit }] });
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
      mounted: Provider.mounted,
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
