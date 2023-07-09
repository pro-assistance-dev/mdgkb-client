<template>
  <div v-if="mounted">
    <h3>Редактирования заявки на обучение по программе {{ application.residencyCourse.getFullName() }}</h3>
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
    <el-button type="success" @click="submit">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';

import ResidencyApplication from '@/classes/ResidencyApplication';
import AdmissionQuestionsFormV2 from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsFormV2.vue';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'EditResidencyApplication',
  components: { FieldValuesForm, AdmissionQuestionsFormV2, ResidencyApplicationAchievements },

  setup() {
    const mounted = ref(false);

    const form = ref();
    const questionsForm = ref();
    const achievementsForm = ref();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const application: ComputedRef<ResidencyApplication> = computed<ResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );

    const submit = async () => {
      await loadFilters();
      application.value.formValue.validate();
      if (
        (form.value && !validate(form, true)) ||
        !application.value.formValue.validated ||
        !application.value.validateAchievementsPoints() ||
        (questionsForm.value && !validate(questionsForm))
      ) {
        return;
      }
      application.value.formValue.isNew = true;
      application.value.formValue.setCpecifyStatus(formStatuses.value);
      application.value.changeUserEdit(false);
      await Provider.store.dispatch('residencyApplications/update', application.value);
      Provider.router.push('/profile/residency-applications');
    };

    const load = async () => {
      await Provider.store.dispatch('residencyApplications/get', Provider.route().params.id);
      mounted.value = true;
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    onBeforeMount(async () => {
      await load();
    });

    const filledApplicationDownload = () => {
      ElMessageBox.alert(
        'Заполните данные и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          confirmButtonText: 'OK',
          callback: () => {
            Provider.store.dispatch('residencyApplications/filledApplicationDownload', application.value);
            return;
          },
        }
      );
      return;
    };

    return {
      mounted,
      submit,
      form,
      questionsForm,
      filledApplicationDownload,
      application,
      achievementsForm,
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
