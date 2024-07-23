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
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import FormStatus from '@/classes/FormStatus';
import ResidencyApplication from '@/classes/ResidencyApplication';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';

export default defineComponent({
  name: 'EditResidencyApplication',
  components: { FieldValuesForm },

  setup() {
    const mounted = ref(false);

    const form = ref();
    const questionsForm = ref();
    const achievementsForm = ref();
    const formStatuses: FormStatus[] = FormStatusesStore.Items();

    const application: ResidencyApplication = ResidencyApplicationsStore.Item();
    const buttonOff: Ref<boolean> = ref(false);

    const submit = async () => {
      await loadStatuses();
      application.formValue.validate(false, true);
      if (!application.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: application.formValue.getErrorMessage(),
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
      application.formValue.setCanceledStatus(formStatuses.value);
      await FormValuesStore.Update(application.formValue);

      buttonOff.value = false;
      loading.close();
      ElMessage({
        type: 'success',
        message: 'Заявление успешно отозвано',
      });
      Router.To('/profile/residency-applications');
    };

    const loadStatuses = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await FormStatusesStore.GetAll(filterQuery);
    };

    onBeforeMount(async () => {
      await ResidencyApplicationsStore.Get(Router.Id());
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

.el-form-item {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
