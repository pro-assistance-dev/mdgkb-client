<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="vacancyResponse" :model="vacancyResponse" label-position="top">
      <AdminFormValue :form="vacancyResponse.formValue" :is-edit-mode="isEditMode" :email-exists="emailExists" @findEmail="findEmail" />
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import FormStatus from '@/classes/FormStatus';
import VacancyResponse from '@/classes/VacancyResponse';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const mounted = ref(false);
const form = ref();
const isEditMode: Ref<boolean> = ref(false);
const editButtonTitle: Ref<string> = ref('Режим редактирования');

const vacancyResponse: VacancyResponse = VacancyResponsesStore.Items();
const emailExists: Ref<boolean> = VacancyResponsesStore.emailExists;

const changeEditMode = () => {
  isEditMode.value = !isEditMode.value;
  if (isEditMode.value) {
    editButtonTitle.value = 'Режим просмотра';
  } else {
    editButtonTitle.value = 'Режим редактирования';
  }
};

const submit = async (next?: NavigationGuardNext) => {
  vacancyResponse.formValue.validate();
  saveButtonClick.value = true;
  if (!validate(form, true) || !vacancyResponse.formValue.validated) {
    saveButtonClick.value = false;
    return;
  }
  if (Router.Id()) {
    vacancyResponse.formValue.updateViewedByUser(initialStatus);
    await VacancyResponsesStore.Update();
  } else {
    vacancyResponse.formValue.clearIds();
    await VacancyResponsesStore.Create();
  }
  next ? next() : await Router.Back();
};

let initialStatus: FormStatus;
const loadItem = async () => {
  let pageTitle = '';
  if (Router.Id()) {
    await VacancyResponsesStore.Get(Router.Id());
    initialStatus = vacancyResponse.formValue.formStatus;
    pageTitle = `Вакансии. Заявление от ${vacancyResponse.formValue.user.email}`;
  } else {
    pageTitle = 'Добавить отклик';
    VacancyResponsesStore.ResetItem();
    isEditMode.value = true;
  }
  PHelp.AdminUI.Head.Set(pageTitle, [Button.Success(editButtonTitle, changeEditMode), Button.Success('Сохранить', submit)]);
  mounted.value = true;
};

const findEmail = async () => {};

const updateNew = async () => {
  if (Router.Id()) {
    return;
  }
  if (!vacancyResponse.formValue.isNew) {
    return;
  }
  vacancyResponse.formValue.isNew = false;
  await VacancyResponsesStore.Update();
};

onBeforeMount(async () => {
  await loadItem();
  await updateNew();
  // await findEmail();
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(vacancyResponse, formUpdated, { deep: true });
});

const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showConfirmModal(submit, next);
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}
</style>
