<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="vacancyResponse" :model="vacancyResponse" label-position="top">
      <AdminFormValue :form="vacancyResponse.formValue" :is-edit-mode="isEditMode" :email-exists="emailExists" @findEmail="findEmail" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminVacancyResponsePage',
  components: { AdminFormValue },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактиварония');

    const vacancyResponse: ComputedRef<IVacancyResponse> = computed<IVacancyResponse>(() => store.getters['vacancyResponses/item']);
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['vacancyResponses/emailExists']);

    const changeEditMode = () => {
      isEditMode.value = !isEditMode.value;
      if (isEditMode.value) {
        editButtonTitle.value = 'Режим просмотра';
      } else {
        editButtonTitle.value = 'Режим редактиварония';
      }
    };

    const submit = async (next?: NavigationGuardNext) => {
      vacancyResponse.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !vacancyResponse.value.formValue.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        await store.dispatch('vacancyResponses/update', vacancyResponse.value);
      } else {
        vacancyResponse.value.formValue.clearIds();
        await store.dispatch('vacancyResponses/create', vacancyResponse.value);
      }
      next ? next() : await router.go(-1);
    };

    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('vacancyResponses/get', route.params['id']);
        pageTitle = `Вакансии. Заявление от ${vacancyResponse.value.formValue.user.email}`;
      } else {
        pageTitle = 'Добавить отклик';
        store.commit('vacancyResponses/resetItem');
        isEditMode.value = true;
      }
      store.commit('admin/setHeaderParams', {
        title: pageTitle,
        showBackButton: true,
        buttons: [{ text: editButtonTitle, type: 'primary', action: changeEditMode }, { action: submit }],
      });
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(vacancyResponse, formUpdated, { deep: true });
    };

    const findEmail = async () => {
      await store.dispatch('vacancyResponses/emailExists', vacancyResponse.value.vacancyId);
    };

    const updateNew = async () => {
      console.log('vacancyResponse.value', vacancyResponse.value);
      if (!route.params['id']) {
        return;
      }
      if (!vacancyResponse.value.formValue.isNew) {
        return;
      }
      vacancyResponse.value.formValue.isNew = false;
      await store.dispatch('vacancyResponses/update', vacancyResponse.value);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadItem();
      await updateNew();
      await findEmail();
      store.commit('admin/closeLoading');
    });

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      form,
      vacancyResponse,
      isEditMode,
      emailExists,
      findEmail,
    };
  },
});
</script>
