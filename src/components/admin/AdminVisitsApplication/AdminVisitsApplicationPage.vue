<template>
  <div v-if="mounted" class="wrapper">
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

<script lang="ts" setup>
import FormStatus from '@/classes/FormStatus';
import UserFormFields from '@/classes/UserFormFields';
import VisitsApplication from '@/classes/VisitsApplication';
import Hooks from '@/services/Hooks/Hooks';
import validate from '@/services/validate';

const form = ref();
const visitsApplication: VisitsApplication = VisitsApplicationsStore.Item();
const isEditMode: Ref<boolean> = ref(false);
const mounted = ref(false);
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

const submit = async () => {
  visitsApplication.formValue.validate();
  // saveButtonClick.value = true;
  if (!validate(form, true) || !visitsApplication.formValue.validated) {
    // saveButtonClick.value = false;
    return;
  }
  if (Router.Id()) {
    visitsApplication.formValue.updateViewedByUser(initialStatus);
    await VisitsApplicationsStore.Update();
  } else {
    visitsApplication.formValue.clearIds();
    await VisitsApplicationsStore.Create();
  }
  await Router.Back();
};

let initialStatus: FormStatus;
const loadItem = async () => {
  let pageTitle = '';
  if (Router.Id()) {
    await VisitsApplicationsStore.Get(Router.Id());
    initialStatus = visitsApplication.formValue.formStatus;
    pageTitle = `Заявка на посещение. Заявление от ${visitsApplication.formValue.user.email}`;
  } else {
    pageTitle = 'Добавить заявку на посещение';
    VisitsApplicationsStore.ResetItem();
    isEditMode.value = true;
  }
  PHelp.AdminUI.Head.Set(pageTitle, [Button.Success(editButtonTitle, changeEditMode), Button.Success('Сохранить', submit)]);
  mounted.value = true;
};

// const updateNew = async () => {
//   if (!Router.Id()) {
//     return;
//   }
//   if (!visitsApplication.formValue.isNew) {
//     return;
//   }
//   visitsApplication.formValue.isNew = false;
//   await VisitsApplicationsStore.Update();
// };

const load = async () => {
  await loadItem();
  // await updateNew();
  // window.addEventListener('beforeunload', beforeWindowUnload);
  // watch(visitsApplication, formUpdated, { deep: true });
};

Hooks.onBeforeMount(load);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 80px);
  overflow: hidden;
  overflow-y: auto;
}
</style>
