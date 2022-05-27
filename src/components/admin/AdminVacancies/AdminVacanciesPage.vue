<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="vacancy" label-position="top" :model="vacancy">
      <el-container direction="vertical">
        <el-card>
          <el-form-item label="Название">
            <el-input v-model="vacancy.title" placeholder="Название"> </el-input>
          </el-form-item>
          <el-form-item label="Активна">
            <el-switch v-model="vacancy.active" />
          </el-form-item>
          <el-form-item label="Минимальная заработная плата">
            <el-input-number v-model="vacancy.minSalary" placeholder="Минимальная заработная плата" />
          </el-form-item>
          <el-form-item label="Максимальная заработная плата">
            <el-input-number v-model="vacancy.maxSalary" placeholder="Максимальная заработная плата" />
          </el-form-item>
          <el-form-item label="График работы">
            <el-input v-model="vacancy.schedule" placeholder="График работы"> </el-input>
          </el-form-item>

          <el-form-item label="Должностные обязанности">
            <SortableInputsList
              :sortable-list="vacancy.vacancyDuties"
              :sortable-list-for-delete="vacancy.vacancyDutiesForDelete"
              @add-element="vacancy.addDuty()"
            />
          </el-form-item>
          <el-form-item label="Требования к кандидату">
            <SortableInputsList
              :sortable-list="vacancy.vacancyRequirements"
              :sortable-list-for-delete="vacancy.vacancyRequirementsForDelete"
              @add-element="vacancy.addRequirement()"
            />
          </el-form-item>
          <el-form-item label="Стаж">
            <el-input v-model="vacancy.experience" placeholder="Стаж"> </el-input>
          </el-form-item>
          <el-form-item label="Отделение">
            <el-select v-model="vacancy.divisionId" clearable>
              <el-option v-for="division in divisions" :key="division.id" :label="division.name" :value="division.id" />
            </el-select>
          </el-form-item>
          <el-form-item label-width="100px" label="Дата добавления вакансии">
            <el-date-picker v-model="vacancy.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату" />
          </el-form-item>
          <el-form-item label="Шаблон формы">
            <el-select v-model="vacancy.formPattern" value-key="id" placeholder="Шаблон формы">
              <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-card>

        <el-card>
          <template #header>
            <CardHeader :label="'Отклики'" :add-button="false" />
          </template>
          <AdminVacanciesPageResponses :vacancy-responses="vacancy.vacancyResponses" :vacancy="vacancy" />
        </el-card>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import AdminVacanciesPageResponses from '@/components/admin/AdminVacancies/AdminVacanciesPageResponses.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import SortableInputsList from '@/components/admin/SortableInputsList.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IForm from '@/interfaces/IForm';
import IVacancy from '@/interfaces/IVacancy';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminVacanciesPage',
  components: { SortableInputsList, CardHeader, AdminVacanciesPageResponses },
  setup() {
    const route = useRoute();
    const form = ref();
    const vacancy: Ref<IVacancy> = computed<IVacancy>(() => Provider.store.getters['vacancies/vacancy']);
    const divisions: Ref<IDivision[]> = computed<IDivision[]>(() => Provider.store.getters['divisions/divisions']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const formPatterns: ComputedRef<IForm[]> = computed<IForm[]>(() => Provider.store.getters['formPatterns/items']);

    const load = async () => {
      await Provider.store.dispatch('divisions/getAll');
      if (route.params['id']) {
        await Provider.store.dispatch('vacancies/get', route.params['id']);
        Provider.store.commit('admin/setHeaderParams', { title: vacancy.value.title, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        Provider.store.commit('vacancies/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить вакансию', showBackButton: true, buttons: [{ action: submit }] });
      }
      await Provider.store.dispatch('documentTypes/getDocumentsTypesForTables');
      await Provider.store.dispatch('documentTypes/getAll');
      await Provider.store.dispatch('formPatterns/getAll');

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(vacancy, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(load);

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!route.params['id']) {
        await Provider.store.dispatch('vacancies/create', vacancy.value);
        await Provider.router.push('/admin/vacancies');
        return;
      }
      await Provider.store.dispatch('vacancies/update', vacancy.value);
      next ? next() : await Provider.router.push('/admin/vacancies');
    };

    return {
      divisions,
      submit,
      vacancy,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
      formPatterns,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
