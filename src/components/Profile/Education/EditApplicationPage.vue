<template>
  <div v-if="mounted">
    <h2>Заявка на специальность "{{ formValue.residencyApplication.residencyCourse.getFullName() }}"</h2>
    <div v-if="formValue.modComment" class="card-item">
      <h3>Общий комментарий по замечаниям</h3>
      <div v-html="formValue.modComment"></div>
    </div>

    <div
      v-if="formValue.residencyApplication?.userEdit || formValue.formStatus.isNew() || formValue.formStatus.isAccepted()"
      class="card-item"
    >
      <h3>Вопросы к заявлению</h3>
      <div>
        <el-form ref="questionsForm" v-model="formValue.residencyApplication" :model="formValue.residencyApplication" label-position="top">
          <AdmissionQuestionsForm :residency-application="formValue.residencyApplication" />
          <el-button size="small" type="success" @click="filledApplicationDownload">Скачать заявление</el-button>
        </el-form>
      </div>
    </div>
    <div class="card-item">
      <h3>Данные формы</h3>
      <el-form ref="form" v-model="formValue" :model="formValue" label-position="top">
        <FieldValuesForm :form="formValue" :show-mod-comments="true" :show-additional-files="true" />
      </el-form>
    </div>
    <div
      v-if="formValue.residencyApplication?.userEdit || formValue.formStatus.isNew() || formValue.formStatus.isAccepted()"
      class="card-item"
    >
      <h3>Индивидуальные достижения</h3>
      <el-form ref="questionsForm" v-model="formValue.residencyApplication" :model="formValue.residencyApplication" label-position="top">
        <ResidencyApplicationAchievements :residency-application="formValue.residencyApplication" />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeUnmount, ref } from 'vue';

import FilterQuery from '@/services/classes/filters/FilterQuery';
import AdmissionQuestionsForm from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsForm.vue';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import Hooks from '@/services/Hooks/Hooks';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'EditApplicationPage',
  components: { FieldValuesForm, AdmissionQuestionsForm, ResidencyApplicationAchievements },

  setup() {
    const form = ref();
    const formValue: ComputedRef<IForm> = computed(() => Provider.store.getters['formValues/item']);
    const questionsForm = ref();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);

    const submit = async () => {
      await loadFilters();
      formValue.value.validate();
      if (!validate(form, true) || !formValue.value.validated) {
        return;
      }
      formValue.value.isNew = true;
      formValue.value.setCpecifyStatus(formStatuses.value);
      if (formValue.value.residencyApplication?.id) {
        formValue.value.residencyApplication.changeUserEdit(false);
      }
      await Provider.store.dispatch('residencyApplications/updateForm', formValue.value);
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
      await Provider.store.dispatch('formValues/get', Provider.route().params.id);
      setHeaderParams();
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    Hooks.onBeforeMount(load, {});

    onBeforeUnmount(() => {
      Provider.store.commit('admin/resetState');
    });

    const filledApplicationDownload = () => {
      ElMessageBox.alert(
        'Заполните данные и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          confirmButtonText: 'OK',
          callback: () => {
            Provider.store.dispatch('residencyApplications/filledApplicationDownload', formValue.value.residencyApplication);
            return;
          },
        }
      );
      return;
    };

    return {
      mounted: Provider.mounted,
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
