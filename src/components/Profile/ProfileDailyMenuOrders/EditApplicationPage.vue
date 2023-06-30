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

import User from '@/classes/User';
import AdmissionQuestionsForm from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsForm.vue';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'EditApplicationPage',
  components: { FieldValuesForm, AdmissionQuestionsForm, ResidencyApplicationAchievements },

  setup() {
    const mounted = ref(true);
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
    const user: ComputedRef<User> = computed(() => Provider.store.getters['users/item']);

    const form = ref();
    const formValue: ComputedRef<IForm> = computed(() => Provider.store.getters['formValues/item']);
    const questionsForm = ref();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);

    const submit = async () => {
      await loadFilters();
      const application = user.value.residencyApplications[0];
      application.formValue.validate();
      if (!validate(form, true) || !application.formValue.validated) {
        return;
      }
      application.formValue.isNew = true;
      application.formValue.setCpecifyStatus(formStatuses.value);
      if (application.formValue.residencyApplication?.id) {
        application.formValue.residencyApplication.changeUserEdit(false);
      }
      await Provider.store.dispatch('residencyApplications/updateForm', application.formValue);
      Provider.router.push('/profile/education');
    };

    const setHeaderParams = () => {
      Provider.store.commit('admin/showHeader', true);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Редактировать заявление',
        showBackButton: true,
        buttons: [{ action: submit }],
      });
    };

    const load = async () => {
      await Provider.store.dispatch('users/get', userId.value);
      // await Provider.store.dispatch('formValues/get', Prov?ider.route().params.id);
      mounted.value = true;
      setHeaderParams();
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    onBeforeMount(() => load);

    onBeforeUnmount(async () => {
      user.value.setResidencyApplicationsViewed();
      await Provider.store.dispatch('formValues/updateMany', user.value.formValues);
      Provider.store.commit('admin/resetState');
    });

    const filledApplicationDownload = () => {
      const application = user.value.residencyApplications[0];
      ElMessageBox.alert(
        'Заполните данные и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          confirmButtonText: 'OK',
          callback: () => {
            Provider.store.dispatch('residencyApplications/filledApplicationDownload', application.formValue.residencyApplication);
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
.card-item {
  margin-bottom: 10px;
}
.card-item:empty {
  display: none;
}
</style>
