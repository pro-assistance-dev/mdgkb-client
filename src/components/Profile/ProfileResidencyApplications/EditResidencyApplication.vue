<template>
  <div v-if="mounted">
    <div class="header">
      <h3>Редактирования заявки на обучение по программе {{ application.residencyCourse.getFullName() }}</h3>
      <div style="margin-left: 10px">
        <el-button type="success" size="small" :disabled="buttonOff" @click="submit">Сохранить</el-button>
      </div>
    </div>
    <div v-if="application.formValue.modComment" class="card-item">
      <h3>Общий комментарий по замечаниям</h3>
      <div v-html="application.formValue.modComment"></div>
    </div>
    <div
      v-if="application.userEdit || application.formValue.formStatus.isNew() || application.formValue.formStatus.isAccepted()"
      class="card-item"
    >
      <h3>Вопросы к заявлению</h3>
      <div>
        <el-form ref="questionsForm" :model="application" label-position="top">
          <AdmissionQuestionsFormV2 :residency-application="application" />
          <el-button size="small" type="success" @click="filledApplicationDownload">Скачать заявление</el-button>
        </el-form>
      </div>
    </div>
    <div class="card-item">
      <h3>Данные формы</h3>
      <el-form ref="form" v-model="application.formValue" :model="application" label-position="top">
        <el-button size="small" type="success" @click="filledApplicationDownload">Скачать заявление</el-button>
        <FieldValuesForm
          :form="application.formValue"
          :show-mod-comments="true"
          :show-additional-files="true"
          :filter-fields-with-code="['ContractDzm']"
        />
      </el-form>
    </div>
    <div
      v-if="application.userEdit || application.formValue.formStatus.isNew() || application.formValue.formStatus.isAccepted()"
      class="card-item"
    >
      <h3>Индивидуальные достижения</h3>
      <el-form ref="achievementsForm" :model="application" label-position="top">
        <ResidencyApplicationAchievements :residency-application="application" />
      </el-form>
    </div>
    <el-button type="success" :disabled="buttonOff" @click="submit">Сохранить</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElLoading } from 'element-plus';

import FormStatus from '@/classes/FormStatus';
import ResidencyApplication from '@/classes/ResidencyApplication';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import validate from '@/services/validate';

const mounted = ref(false);

const form = ref();
const questionsForm = ref();
const achievementsForm = ref();
const formStatuses: FormStatus[] = FormStatusesStore.Items();
const application: ResidencyApplication = ResidencyApplicationsStore.Item();
const buttonOff: Ref<boolean> = ref(false);

const submit = async () => {
  await loadFilters();
  application.formValue.validate();
  if (
    (form.value && !validate(form, true)) ||
    !application.formValue.validated ||
    !application.validateAchievementsPoints() ||
    (questionsForm.value && !validate(questionsForm))
  ) {
    return;
  }
  buttonOff.value = true;
  const loading = ElLoading.service({
    lock: true,
    text: 'Загрузка',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  application.formValue.isNew = true;
  application.formValue.setCpecifyStatus(formStatuses);
  application.changeUserEdit(false);
  await ResidencyApplicationsStore.Update(application);
  buttonOff.value = false;
  loading.close();
  Router.To('/profile/residency-applications');
};

const load = async () => {
  await ResidencyApplicationsStore.Get(Router.Id());
  mounted.value = true;
};

const loadFilters = async () => {
  const filterQuery = new FilterQuery();
  filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
  await FormStatusesStore.GetAll(filterQuery);
};

onBeforeMount(async () => {
  await load();
});

const filledApplicationDownload = async () => {
  // ElMessageBox.alert(
  //   'Заполните данные и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
  //   'После закрытия этого окна скачается предзаполненное заявление',
  //   {
  // confirmButtonText: 'OK',
  // callback: () => {
  await ResidencyApplicationsStore.FilledApplicationDownload(application);
  //       return;
  //     },
  //   }
  // );
  // return;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.card-item {
  margin-bottom: 10px;
}
.card-item:empty {
  display: none;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
}
</style>
