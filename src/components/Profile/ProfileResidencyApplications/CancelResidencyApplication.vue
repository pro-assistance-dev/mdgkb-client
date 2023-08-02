<template>
  <div v-if="mounted">
    <div class="header">
      <h3>Отзыв заявки на обучение по программе {{ application.residencyCourse.getFullName() }}</h3>
      <div style="margin-left: 10px">
        <el-button type="success" size="small" :disabled="buttonOff" @click="submit">Отозвать</el-button>
      </div>
    </div>
    <div class="card-item">
      <el-form ref="form" v-model="application.formValue" :model="application" label-position="top">
        <FieldValuesForm :form="application.formValue" required-for-cancel-only />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading, ElMessage, ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import ResidencyApplication from '@/classes/ResidencyApplication';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'EditResidencyApplication',
  components: { FieldValuesForm },

  setup() {
    const mounted = ref(false);

    const form = ref();
    const questionsForm = ref();
    const achievementsForm = ref();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const application: ComputedRef<ResidencyApplication> = computed<ResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );
    const buttonOff: Ref<boolean> = ref(false);

    const submit = async () => {
      await loadStatuses();
      application.value.formValue.validate(false, true);
      if (!application.value.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: application.value.formValue.getErrorMessage(),
        });
        return;
      }
      buttonOff.value = true;
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      application.value.formValue.setCanceledStatus(formStatuses.value);
      await Provider.store.dispatch('formValues/update', application.value.formValue);

      buttonOff.value = false;
      loading.close();
      ElMessage({
        type: 'success',
        message: 'Заявление успешно отозвано',
      });
      Provider.router.push('/profile/residency-applications');
    };

    const loadStatuses = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('residencyApplications/get', Provider.route().params.id);
      mounted.value = true;
    });

    return {
      mounted,
      submit,
      form,
      questionsForm,
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

.el-form-item {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
