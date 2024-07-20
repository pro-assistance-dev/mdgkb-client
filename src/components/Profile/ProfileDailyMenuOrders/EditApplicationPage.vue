<template>
  <div v-if="!mounted">Загрузка</div>
  <div v-for="application in user.residencyApplications" v-else :key="application.id">
    <h2>Заявка на специальность "{{ application.residencyCourse.getFullName() }}"</h2>
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
        <el-form ref="questionsForm" :model="application.formValue" label-position="top">
          <AdmissionQuestionsForm :residency-application="application" />
          <el-button size="small" type="success" @click="filledApplicationDownload">Скачать заявление</el-button>
        </el-form>
      </div>
    </div>
    <div class="card-item">
      <h3>Данные формы</h3>
      <el-form ref="form" v-model="application.formValue" :model="formValue" label-position="top">
        <FieldValuesForm :form="formValue" :show-mod-comments="true" :show-additional-files="true" />
      </el-form>
    </div>
    <div
      v-if="application.userEdit || application.formValue.formStatus.isNew() || application.formValue.formStatus.isAccepted()"
      class="card-item"
    >
      <h3>Индивидуальные достижения</h3>
      <el-form ref="questionsForm" :model="application" label-position="top">
        <ResidencyApplicationAchievements :residency-application="application" />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';

import Form from '@/classes/Form';
import FormStatus from '@/classes/FormStatus';
import User from '@/classes/User';
import AdmissionQuestionsForm from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsForm.vue';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'EditApplicationPage',
  components: { FieldValuesForm, AdmissionQuestionsForm, ResidencyApplicationAchievements },

  setup() {
    const mounted = ref(true);
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
    const user: User = UsersStore.Item();

    const form = ref();
    const formValue: Form = FormValuesStore.Item();
    const questionsForm = ref();
    const formStatuses: FormStatus[] = FormStatusesStore.Items();

    const submit = async () => {
      await loadFilters();
      const application = user.residencyApplications[0];
      application.formValue.validate();
      if (!validate(form, true) || !application.formValue.validated) {
        return;
      }
      application.formValue.isNew = true;
      application.formValue.setCpecifyStatus(formStatuses);
      if (application.formValue.residencyApplication?.id) {
        application.formValue.residencyApplication.changeUserEdit(false);
      }
      await ResidencyApplicationsStore.UpdateForm(application.formValue);
      Provider.router.push('/profile/education');
    };

    const load = async () => {
      await UsersStore.Get(userId.value);
      await FormValuesStore.Get(Router.Id());
      mounted.value = true;
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await FormStatusesStore.GetAll(filterQuery);
    };

    onBeforeMount(() => load);

    onBeforeUnmount(async () => {
      user.setResidencyApplicationsViewed();
      await FormValuesStore.UpdateMany(user.formValues);
    });

    const filledApplicationDownload = () => {
      const application = user.residencyApplications[0];

      ElMessageBox.alert(
        'Заполните данные и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          confirmButtonText: 'OK',
          callback: () => {
            ResidencyApplicationsStore.FilledApplicationDownload(applcation.formValue.residencyApplication);
            return;
          },
        }
      );
      return;
    };

    return {
      user,
      mounted,
      formValue,
      submit,
      form,
      questionsForm,
      filledApplicationDownload,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.card-item {
  margin-bottom: 10px;
}
.card-item:empty {
  display: none;
}
</style>
