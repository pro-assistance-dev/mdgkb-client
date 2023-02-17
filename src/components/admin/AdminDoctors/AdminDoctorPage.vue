<template>
  <div v-if="mounted && !doctor.id" class="employee-name">
    <div class="search-line">
      <div class="search-label">Выберите сотрудника для добавления:</div>
      <RemoteSearch :key-value="schema.employee.key" :max-width="2000" @select="selectEmployeeSearch" />
    </div>
    <div v-if="doctor.employee.id" class="container-item">
      <button class="admin-employee-del" @click.prevent="doctor.resetEmployee()">Удалить</button>
      <div class="division-name">
        {{ doctor.employee.human.getFullName() }}
      </div>
    </div>
  </div>
  <el-form v-if="mounted && doctor.employee.id" ref="form" :model="doctor" label-position="top" :rules="rules">
    <div class="margin-container">
      <CollapsContainer :tab-id="1036" :collapsed="true">
        <template #inside-title>
          <div class="title-in">Отделения</div>
        </template>
        <template #inside-content>
          <div class="background-container">
            <div class="search-line">
              <div class="search-label">Выберите отделение для добавления:</div>
              <RemoteSearch :key-value="schema.division.key" :max-width="2000" @select="addDoctorDivision" />
            </div>
            <div v-for="(doctorDivision, i) in doctor.doctorsDivisions" :key="doctorDivision" class="container-item">
              <button
                class="admin-del"
                @click.prevent="$classHelper.RemoveFromClassByIndex(i, doctor.doctorsDivisions, doctor.doctorsDivisionsForDelete)"
              >
                Удалить
              </button>
              <div class="list-number">{{ i + 1 }}</div>
              <div class="division-name">{{ doctorDivision.division.name }}</div>
            </div>
          </div>
        </template>
      </CollapsContainer>
    </div>
    <div class="margin-container">
      <CollapsContainer :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Прочая информация</div>
        </template>
        <template #inside-content>
          <div class="background-container">
            <el-form-item label="Ссылка на профиль в системе Московский врач">
              <el-input v-model="doctor.mosDoctorLink" />
            </el-form-item>
            <el-form-item label="Краткое описание сферы интересов">
              <el-input v-model="doctor.description" />
            </el-form-item>
          </div>
        </template>
      </CollapsContainer>
    </div>
    <el-container direction="vertical">
      <el-checkbox v-model="doctor.hasAppointment" label="Включить расписание приёма" />
      <div v-if="doctor.hasAppointment" class="margin-container">
        <CollapsContainer title="Расписание" :tab-id="2017" :is-collaps="false">
          <template #inside-content>
            <div class="background-container">
              <TimetableConstructorV2New :store-module="'doctors'" />
            </div>
          </template>
        </CollapsContainer>
      </div>
    </el-container>
  </el-form>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Division from '@/classes/Division';
import Employee from '@/classes/Employee';
import FilterModel from '@/classes/filters/FilterModel';
import TimetableConstructorV2New from '@/components/admin/TimetableConstructorV2New.vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IDivision from '@/interfaces/IDivision';
import IDoctor from '@/interfaces/IDoctor';
import IHuman from '@/interfaces/IHuman';
import ISearchObject from '@/interfaces/ISearchObject';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminDoctorPage',
  components: {
    RemoteSearch,
    TimetableConstructorV2New,
    CollapsContainer,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);

    const divisionOptions = ref([new Division()]);
    const doctor: Ref<IDoctor> = computed(() => Provider.store.getters['doctors/item']);
    const doctors: Ref<IDoctor[]> = computed(() => Provider.store.getters['doctors/items']);
    const division: Ref<IDivision> = computed(() => Provider.store.getters['divisions/division']);
    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);
    let filterModel: IFilterModel | undefined = undefined;
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }

      try {
        if (Provider.route().params['id']) {
          await Provider.store.dispatch('doctors/update', doctor.value);
        } else {
          await Provider.store.dispatch('doctors/create', doctor.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push('/admin/doctors');
    };

    const { saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await Provider.store.dispatch('search/searchGroups');
      await loadDivisionOptions();
      await loadDoctor();
    };

    Hooks.onBeforeMount(load);

    const loadDivisionOptions = async (): Promise<void> => {
      await Provider.store.dispatch('divisions/getAll');
      divisionOptions.value = Provider.store.getters['divisions/divisions'];
    };

    const toEmployeeInfo = async (): Promise<void> => {
      await Provider.router.push(`/admin/employees/${doctor.value.employee.id}`);
    };

    const loadDoctor = async (): Promise<void> => {
      if (Provider.route().params['id']) {
        await Provider.store.dispatch('doctors/get', Provider.route().params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: doctor.value.employee.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: toEmployeeInfo, text: 'Личная информация', type: 'warning' }, { action: submit }],
        });
      } else {
        Provider.store.commit('doctors/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить врача', showBackButton: true, buttons: [{ action: submit }] });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);

      filterModel = FilterModel.CreateFilterModel(
        Provider.schema.value.doctor.tableName,
        Provider.schema.value.doctor.fullName,
        DataTypes.String
      );
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const addRegalia = () => Provider.store.commit('doctors/addRegalia');

    const selectPosition = async (event: ISearchObject) => {
      doctor.value.positionId = event.id;
      await Provider.store.dispatch('');
    };

    const selectPaidService = (event: ISearchObject) => {
      doctor.value.positionId = event.id;
    };

    const completeInput = async (human: IHuman) => {
      if (!filterModel) {
        return;
      }
      filterModel.value1 = human.getFullName();
      Provider.setFilterModels(filterModel);
      await Provider.store.dispatch('doctors/getAll', Provider.filterQuery.value);
      if (doctors.value.length === 0) {
        return;
      }
      await offerEditExistingDoctor();
    };

    const offerEditExistingDoctor = async () => {
      const existingDoctor = doctors.value[0];
      if (!existingDoctor) {
        return;
      }
      ElMessageBox.confirm('Врач с введённым именем уже существует в системе', 'Отредактировать существующего врача?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Перейти к редактированию',
        cancelButtonText: 'Остаться в создании нового',
      })
        .then(async () => {
          // Provider.router.push({ name: 'AdminEditDoctorPage', params: { id: existingDoctor.human.slug } });
          await Provider.router.push(`/admin/doctors/${existingDoctor.employee.human.slug}`);
          await loadDoctor();
        })
        .catch((action: string) => {
          if (action === 'cancel') {
            ElMessage({
              type: 'warning',
              message: 'Врач с введённым именем уже существует в системе',
            });
          }
        });
    };

    const addDoctorDivision = async (searchObject: ISearchObject) => {
      Provider.filterQuery.value.setParams(Provider.schema.value.division.id, searchObject.id);
      await Provider.store.dispatch('divisions/get', Provider.filterQuery.value);
      doctor.value.addDoctorDivision(division.value);
    };

    const selectEmployeeSearch = async (searchObject: ISearchObject) => {
      await Provider.store.dispatch('employees/get', searchObject.value);
      doctor.value.setEmployee(employee.value);
    };

    return {
      doctors,
      completeInput,
      selectPaidService,
      selectPosition,
      addRegalia,
      rules,
      submit,
      doctor,
      divisionOptions,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
      addDoctorDivision,
      selectEmployeeSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-card {
  background: #f9fafb;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
    background: #f9fafb;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-form--label-top .el-form-item) {
  display: flex;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-form) {
  padding: 0;
}

.search-line {
  display: block;
  align-items: center;
  justify-content: left;
}

.search-label {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
}

.margin-container {
  margin: 0 0 10px 0;
}

.margin-container:first-child {
  margin: -10px 0 10px 0;
}

.container-item {
  position: relative;
  width: calc(100% - 20px);
  margin: 10px 0px 10px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
}

.employee-name {
  height: auto;
  position: relative;
  width: calc(100% - 40px);
  margin: 10px 0px 20px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 20px;
  background: #dff2f8;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.admin-del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.admin-employee-del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
  padding: 1px 0;
}

.admin-employee-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.list-number {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

.division-name {
  width: calc(100% - 100px);
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
  .admin-del {
    position: absolute;
    top: 23px;
    right: 36px;
    border: none;
    background: inherit;
    color: #a3a9be;
    transition: 0.3s;
    cursor: pointer;
    padding: 1px 0px;
  }
  .background-container {
    margin: 0 10px 20px 10px;
  }
}
</style>
