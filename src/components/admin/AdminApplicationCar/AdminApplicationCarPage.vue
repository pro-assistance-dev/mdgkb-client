<template>
  <div v-if="mounted">
    <el-form ref="form" :model="applicationCar" label-position="top">
      <AdminFormValue
        :validate-email="false"
        :active-fields="UserFormFields.CreateWithAllChildFields({ userPhone: true })"
        :form="applicationCar.formValue"
        :is-edit-mode="isEditMode"
      />
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import UserFormFields from '@/classes/UserFormFields';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IFormStatus from '@/interfaces/IFormStatus';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminApplicationCarPage',
  components: { AdminFormValue },

  setup() {
    const route = useRoute();
    const form = ref();
    const applicationCar: ComputedRef<IApplicationCar> = computed(() => Provider.store.getters['applicationsCars/item']);
    const isEditMode: Ref<boolean> = ref(false);

    const editButtonTitle: ComputedRef<string> = computed(() => {
      if (isEditMode.value) {
        return 'Режим просмотра';
      } else {
        return 'Режим редактиварония';
      }
    });

    const changeEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const submit = async (next?: NavigationGuardNext) => {
      applicationCar.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !applicationCar.value.formValue.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        applicationCar.value.formValue.updateViewedByUser(initialStatus);
        await Provider.store.dispatch('applicationsCars/update');
      } else {
        applicationCar.value.formValue.clearIds();
        await Provider.store.dispatch('applicationsCars/create');
      }
      next ? next() : await Provider.router.go(-1);
    };

    let initialStatus: IFormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await Provider.store.dispatch('applicationsCars/get', route.params['id']);
        initialStatus = applicationCar.value.formValue.formStatus;
        pageTitle = `Заявка на въезд. Заявление от ${applicationCar.value.formValue.user.email}`;
      } else {
        pageTitle = 'Добавить заявку на въезд';
        Provider.store.commit('applicationsCars/resetItem');
        isEditMode.value = true;
      }
      Provider.store.commit('admin/setHeaderParams', {
        title: pageTitle,
        showBackButton: true,
        buttons: [{ text: editButtonTitle, type: 'primary', action: changeEditMode }, { action: submit }],
      });
    };

    const updateNew = async () => {
      if (!route.params['id']) {
        return;
      }
      if (!applicationCar.value.formValue.isNew) {
        return;
      }
      applicationCar.value.formValue.isNew = false;
      await Provider.store.dispatch('applicationsCars/update');
    };

    const load = async () => {
      await loadItem();
      await updateNew();
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(applicationCar, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(load);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      form,
      mounted: Provider.mounted,
      isEditMode,
      applicationCar,
      UserFormFields,
    };
  },
});
</script>
