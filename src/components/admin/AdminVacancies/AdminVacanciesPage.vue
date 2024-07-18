<template>
  <div class="wrapper">
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

<script lang="ts" setup>
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Division from '@/classes/Division';
import Form from '@/classes/Form';
import Vacancy from '@/classes/Vacancy';
import AdminVacancyResponcesTable from '@/components/admin/AdminVacancies/AdminVacancyResponsesTable.vue';
import SortableInputsList from '@/components/admin/SortableInputsList.vue';
import ClassHelper from '@/services/ClassHelper';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const form = ref();
const vacancy: Vacancy = VacanciesStore.Item();
const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
const formPatterns: ComputedRef<Form[]> = Store.Items('formPatterns');

const load = async () => {
  await DivisionsStore.FTSP({ ftsp: new FTSP() });
  if (Router.Id()) {
    await VacanciesStore.Get(Router.Id());
    PHelp.AdminUI.Head.Set(vacancy.title, [Button.Success('Сохранить', submit)]);
  } else {
    VacanciesStore.ResetState();
    PHelp.AdminUI.Head.Set('Добавить вакансию', [Button.Success('Сохранить', submit)]);
  }
  await Store.FTSP('formPatterns', { ftsp: new FTSP() });
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
  if (Router.Id()) {
    await VacanciesStore.Create();
    await Router.ToAdmin('/vacancies');
    return;
  }
  await VacanciesStore.Update();
  next ? next() : await Router.To('/admin/vacancies');
};

const selectDivisionSearch = async (item: ISearchObject) => {
  vacancy.divisionId = item.id;
  vacancy.division = new Division();
  vacancy.division.name = item.label;
};

const removeResponse = (index: number) => {
  ClassHelper.RemoveFromClassByIndex(index, vacancy.vacancyResponses, vacancy.vacancyResponsesForDelete);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

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
