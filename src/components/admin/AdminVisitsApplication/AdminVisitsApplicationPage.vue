<template>
  <div v-if="mounted">
    <el-form ref="form" :model="visitsApplication" label-position="top">
      <AdminFormValue
        :validate-email="false"
        :active-fields="UserFormFields.CreateWithAllChildFields({ userPhone: true, userCarModel: true, userCarNumber: true })"
        :form="visitsApplication.formValue"
        :is-edit-mode="isEditMode"
      />
      <el-card>
        <el-table :data="visitsApplication.visits">
          <el-table-column label="Дата и время посещения" width="150">
            <template #default="scope">
              {{ $dateTimeFormatter.format(scope.row.date, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
            </template>
          </el-table-column>
          <el-table-column label="Прибыл" align="center" width="100">
            <template #default="scope">
              <el-switch v-model="scope.row.entered" />
            </template>
          </el-table-column>
          <el-table-column label="Убыл" align="center" width="100">
            <template #default="scope">
              <el-switch v-model="scope.row.exited" />
            </template>
          </el-table-column>
          <el-table-column> </el-table-column>
        </el-table>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import UserFormFields from '@/classes/UserFormFields';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminVisitsApplicationPage',
  components: { AdminFormValue },

  setup() {
    const route = useRoute();
    const form = ref();
    const visitsApplication: ComputedRef<IVisitsApplication> = computed(() => Provider.store.getters['visitsApplications/item']);
    const isEditMode: Ref<boolean> = ref(false);

    const editButtonTitle: ComputedRef<string> = computed(() => {
      if (isEditMode.value) {
        return 'Режим просмотра';
      } else {
        return 'Режим редактирования';
      }
    });

    const changeEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const submit = async (next?: NavigationGuardNext) => {
      visitsApplication.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !visitsApplication.value.formValue.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        visitsApplication.value.formValue.updateViewedByUser(initialStatus);
        await Provider.store.dispatch('visitsApplications/update');
      } else {
        visitsApplication.value.formValue.clearIds();
        await Provider.store.dispatch('visitsApplications/create');
      }
      next ? next() : await Provider.router.go(-1);
    };

    let initialStatus: IFormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await Provider.store.dispatch('visitsApplications/get', route.params['id']);
        initialStatus = visitsApplication.value.formValue.formStatus;
        pageTitle = `Заявка на посещение. Заявление от ${visitsApplication.value.formValue.user.email}`;
      } else {
        pageTitle = 'Добавить заявку на посещение';
        Provider.store.commit('visitsApplications/resetItem');
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
      if (!visitsApplication.value.formValue.isNew) {
        return;
      }
      visitsApplication.value.formValue.isNew = false;
      await Provider.store.dispatch('visitsApplications/update', visitsApplication.value);
    };

    const load = async () => {
      await loadItem();
      // await updateNew();
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(visitsApplication, formUpdated, { deep: true });
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
      visitsApplication,
      UserFormFields,
    };
  },
});
</script>
