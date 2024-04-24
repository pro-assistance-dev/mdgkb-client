<template>
  <div v-if="mounted">
    <div class="header">
      <h3>Редактирования отклика на вакансию {{ application.vacancy.title }}</h3>
      <div style="margin-left: 10px">
        <el-button type="success" size="small" :disabled="buttonOff" @click="submit">Сохранить</el-button>
      </div>
    </div>
    <div v-if="application.formValue.modComment" class="card-item">
      <h3>Общий комментарий по замечаниям</h3>
      <div v-html="application.formValue.modComment"></div>
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
        <VacancyResponseAchievements :residency-application="application" />
      </el-form>
    </div>
    <el-button type="success" :disabled="buttonOff" @click="submit">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import FormStatus from '@/classes/FormStatus';
import VacancyResponse from '@/classes/VacancyResponse';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'EditVacancyResponse',
  components: { FieldValuesForm },

  setup() {
    const mounted = ref(false);

    const form = ref();
    const achievementsForm = ref();
    const formStatuses: ComputedRef<FormStatus[]> = computed<FormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const application: ComputedRef<VacancyResponse> = computed<VacancyResponse>(() => Provider.store.getters['vacancyResponses/item']);
    const buttonOff: Ref<boolean> = ref(false);

    const submit = async () => {
      await loadFilters();
      application.value.formValue.validate();
      if ((form.value && !validate(form, true)) || !application.value.formValue.validated) {
        return;
      }
      buttonOff.value = true;
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      application.value.formValue.isNew = true;
      application.value.formValue.setCpecifyStatus(formStatuses.value);
      await Provider.store.dispatch('vacancyResponses/update', application.value);
      buttonOff.value = false;
      loading.close();
      Provider.router.push('/profile/vacancy-responses');
    };

    const load = async () => {
      await Provider.store.dispatch('vacancyResponses/get', Provider.route().params.id);
      mounted.value = true;
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('vacancy'));
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    onBeforeMount(async () => {
      await load();
    });

    return {
      mounted,
      submit,
      form,
      application,
      achievementsForm,
      buttonOff,
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
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
}
</style>
