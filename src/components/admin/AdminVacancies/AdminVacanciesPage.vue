<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="vacancy" label-position="top" :model="vacancy">
      <el-container direction="vertical">
        <el-card>
          <el-form-item label="Название">
            <el-input v-model="vacancy.title" placeholder="Название" />
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">
              <el-form-item label="Активна">
                <el-switch v-model="vacancy.active" />
              </el-form-item>
              <el-form-item label="Минимальная заработная плата">
                <el-input-number v-model="vacancy.minSalary" placeholder="Минимальная заработная плата" />
              </el-form-item>
              <el-form-item label="Максимальная заработная плата">
                <el-input-number v-model="vacancy.maxSalary" placeholder="Максимальная заработная плата" />
              </el-form-item>
            </div>
            <div style="flex: 1">
              <el-form-item label="Отделение">
                <RemoteSearch :key-value="Division.GetClassName()" @select="selectDivisionSearch" />
                <div v-if="vacancy.division">
                  {{ vacancy.division.name }}
                </div>
              </el-form-item>
              <el-form-item label-width="100px" label="Дата добавления вакансии">
                <DatePicker v-model="vacancy.date" />
              </el-form-item>
              <el-form-item label="Шаблон формы">
                <el-select v-model="vacancy.formPattern" value-key="id" placeholder="Шаблон формы">
                  <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="Стаж">
            <el-input v-model="vacancy.experience" placeholder="Стаж" />
          </el-form-item>
          <el-form-item label="График работы">
            <el-input v-model="vacancy.schedule" placeholder="График работы" />
          </el-form-item>

          <el-form-item>
            <SortableInputsList
              :sortable-list="vacancy.vacancyDuties"
              :sortable-list-for-delete="vacancy.vacancyDutiesForDelete"
              title="Должностные обязанности"
              @add-element="vacancy.addDuty()"
            />
          </el-form-item>
          <el-form-item>
            <SortableInputsList
              :sortable-list="vacancy.vacancyRequirements"
              :sortable-list-for-delete="vacancy.vacancyRequirementsForDelete"
              title="Требования к кандидату"
              @add-element="vacancy.addRequirement()"
            />
          </el-form-item>
        </el-card>

        <el-card>
          <template #header>
            <CardHeader :label="'Отклики'" :add-button="false" />
          </template>
          <AdminVacancyResponcesTable :vacancy-responses="vacancy.vacancyResponses" @remove="removeResponse" />
        </el-card>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import Division from '@/classes/Division';
import AdminVacancyResponcesTable from '@/components/admin/AdminVacancies/AdminVacancyResponsesTable.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import SortableInputsList from '@/components/admin/SortableInputsList.vue';
import DatePicker from '@/components/DatePicker.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IForm from '@/interfaces/IForm';
import IVacancy from '@/interfaces/IVacancy';
import ClassHelper from '@/services/ClassHelper';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminVacanciesPage',
  components: { DatePicker, SortableInputsList, CardHeader, AdminVacancyResponcesTable, RemoteSearch },
  setup() {
    const route = useRoute();
    const form = ref();
    const vacancy: Ref<IVacancy> = computed<IVacancy>(() => Provider.store.getters['vacancies/item']);
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

    const selectDivisionSearch = async (item: ISearchObject) => {
      vacancy.value.divisionId = item.id;
      vacancy.value.division = new Division();
      vacancy.value.division.name = item.label;
    };

    const removeResponse = (index: number) => {
      ClassHelper.RemoveFromClassByIndex(index, vacancy.value.vacancyResponses, vacancy.value.vacancyResponsesForDelete);
    };

    return {
      selectDivisionSearch,
      submit,
      removeResponse,
      vacancy,
      form,
      mounted: Provider.mounted,
      Division,
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
