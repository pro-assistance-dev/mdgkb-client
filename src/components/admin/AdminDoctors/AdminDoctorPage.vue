<template>
  <el-form v-if="mounted" ref="form" :model="doctor" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-card>
          <RemoteSearch :key-value="schema.division.key" @select="addDoctorDivision" />
          <div v-for="(doctorDivision, i) in doctor.doctorsDivisions" :key="doctorDivision">
            <span> {{ doctorDivision.division.name }}</span>
            <el-button @click="removeFromClass(i, doctor.doctorsDivisions, doctor.doctorsDivisionsForDelete)">
              Удалить отделение
            </el-button>
          </div>
        </el-card>
        <el-container direction="vertical">
          <el-checkbox v-model="doctor.hasAppointment" label="Включить расписание приёма" />
          <div v-if="doctor.hasAppointment">
            <TimetableConstructorV2 :store-module="'doctors'" />
          </div>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <CardHeader :label="'Прочая информация'" :add-button="false" />
            </template>
            <el-form-item label="Ссылка на профиль в системе Московский врач">
              <el-input v-model="doctor.mosDoctorLink" />
            </el-form-item>
            <el-divider />
            <el-form-item label="Краткое описание сферы интересов">
              <el-input v-model="doctor.description" />
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Division from '@/classes/Division';
import FilterModel from '@/classes/filters/FilterModel';
import CardHeader from '@/components/admin/CardHeader.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
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
import removeFromClass from '@/services/removeFromClass';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminDoctorPage',
  components: {
    RemoteSearch,
    TimetableConstructorV2,
    CardHeader,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);

    const divisionOptions = ref([new Division()]);
    const doctor: Ref<IDoctor> = computed(() => Provider.store.getters['doctors/item']);
    const doctors: Ref<IDoctor[]> = computed(() => Provider.store.getters['doctors/items']);
    const division: Ref<IDivision> = computed(() => Provider.store.getters['divisions/division']);
    let filterModel: IFilterModel | undefined = undefined;
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }

      // if (!doctor.value.fileInfo.fileSystemPath) {
      //   ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
      //   saveButtonClick.value = false;
      //   return;
      // }

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

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await Provider.store.dispatch('search/searchGroups');
      await loadDivisionOptions();
      await loadDoctor();
    };

    Hooks.onBeforeMount(load);
    // watch(
    //   () => route.path,
    //   async () => {
    //     await load();
    //   }
    // );

    const loadDivisionOptions = async (): Promise<void> => {
      await Provider.store.dispatch('divisions/getAll');
      divisionOptions.value = Provider.store.getters['divisions/divisions'];
    };

    const toEmployeeInfo = async (): Promise<void> => {
      await Provider.router.push(`/admin/employees/${doctor.value.employee.human.slug}`);
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
      // watch(doctor, formUpdated, { deep: true });

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

    const academicChangeHandler = () => {
      doctor.value.setAcademic();
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
      academicChangeHandler,
      removeFromClass,
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

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
