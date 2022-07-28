<template>
  <el-form v-if="mounted" ref="form" :key="division" :model="division" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Наименование отделения" prop="name">
              <el-input v-model="division.name" placeholder="Наименование отделения"></el-input>
            </el-form-item>
            <el-form-item label="Заведующий отделением">
              <RemoteSearch :key-value="schema.doctor.key" @select="selectDoctorSearch" />
              <div v-if="division.chief">{{ division.chief.human.getFullName() }}</div>
            </el-form-item>
            <el-form-item label="Общая информация">
              <WysiwygEditor v-model:content="division.info" />
            </el-form-item>
            <el-form-item label="Адрес">
              <el-input v-model="division.address" placeholder="Адрес" disabled></el-input>
            </el-form-item>
          </el-card>

          <AdminDivisionVisitingRules />
          <TimetableConstructorV2 :store-module="'divisions'" />
          <ScheduleConstructor :store-module="'divisions'" />
          <AdminDivisionGallery />
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
        <el-container direction="vertical">
          <!-- <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button> -->
          <el-card>
            <el-form-item label="Телефон">
              <el-input v-model="division.phone" placeholder="Телефон"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="division.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="Здание" prop="buildingId">
              <el-select v-model="division.buildingId" filterable placeholder="Выберите здание" @change="changeBuildingHandler">
                <el-option v-for="item in buildingsOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <template v-if="division.buildingId && buildingOption">
              <el-form-item label="Этаж" prop="floorId">
                <el-select
                  v-model="division.floorId"
                  placeholder="Выберите этаж"
                  :disabled="division.buildingId ? false : true"
                  @change="changeDivisionAddress"
                >
                  <el-option v-for="item in buildingOption.floors" :key="item.id" :label="item.number" :value="item.id">
                    {{ item.number }}</el-option
                  >
                </el-select>
              </el-form-item>
              <el-form-item label="Вход" prop="entranceId">
                <el-select
                  v-model="division.entranceId"
                  placeholder="Выберите вход"
                  :disabled="division.buildingId && buildingOption.entrances.length ? false : true"
                  @change="changeDivisionAddress"
                >
                  <el-option v-for="item in buildingOption.entrances" :key="item.id" :label="item.number" :value="item.id" />
                </el-select>
              </el-form-item>
            </template>
          </el-card>

          <el-card>
            <div class="flex-between">
              <el-select v-model="newDoctorId" size="mini" filterable placeholder="Выберите доктора">
                <el-option v-for="item in filteredDoctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
              </el-select>
              <el-button size="mini" type="success" style="margin: 20px" @click="addDoctor">Добавить доктора</el-button>
            </div>

            <el-table :data="divisionDoctors">
              <el-table-column label="ФИО" sortable>
                <template #default="scope">
                  {{ scope.row.human.getFullName() }}
                </template>
              </el-table-column>
              <el-table-column label="Должность" sortable>
                <template #default="scope">
                  {{ scope.row.position.name }}
                </template>
              </el-table-column>
              <el-table-column label="Отображать" sortable>
                <template #default="scope">
                  <el-switch v-model="scope.row.show" />
                </template>
              </el-table-column>
              <el-table-column width="50" fixed="right" align="center">
                <template #default="scope">
                  <TableButtonGroup
                    :show-more-button="true"
                    :show-remove-button="true"
                    @remove="removeFromClass(index, division.doctors, division.doctorsForDelete)"
                    @showMore="$router.push(`/admin/doctors/${scope.row.id}`)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
  <ImageCropper />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import DivisioinRules from '@/classes/buildings/DivisioinRules';
import Doctor from '@/classes/Doctor';
import AdminDivisionGallery from '@/components/admin/AdminDivisions/AdminDivisionGallery.vue';
import AdminDivisionVisitingRules from '@/components/admin/AdminDivisions/AdminDivisionVisitingRules.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import ScheduleConstructor from '@/components/admin/ScheduleConstructor.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IBuilding from '@/interfaces/buildings/IBuilding';
import IDivision from '@/interfaces/buildings/IDivision';
import IEntrance from '@/interfaces/buildings/IEntrance';
import IFloor from '@/interfaces/buildings/IFloor';
import IDoctor from '@/interfaces/IDoctor';
import ISearchObject from '@/interfaces/ISearchObject';
import removeFromClass from '@/mixins/removeFromClass';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminDivisionPage',
  components: {
    ImageCropper,
    TableButtonGroup,
    TimetableConstructorV2,
    ScheduleConstructor,
    AdminDivisionGallery,
    AdminDivisionVisitingRules,
    RemoteSearch,
    WysiwygEditor,
  },

  setup() {
    const form = ref();
    const rules = ref(DivisioinRules);

    const division: ComputedRef<IDivision> = computed<IDivision>(() => Provider.store.getters['divisions/division']);
    const doctors: ComputedRef<IDoctor[]> = computed(() => Provider.store.getters['doctors/items']);
    const doctor: ComputedRef<IDoctor> = computed(() => Provider.store.getters['doctors/item']);
    const filteredDoctors = computed(() => Provider.store.getters['doctors/filteredDoctors']);
    const divisionDoctors = computed(() => Provider.store.getters['doctors/divisionDoctors']);
    const newDoctorId = ref();
    const buildingOption = computed(() => Provider.store.getters['buildings/building']);
    const buildingsOptions = computed(() => Provider.store.getters['buildings/buildings']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const load = async (): Promise<void> => {
      await Provider.store.dispatch('buildings/getAll');
      // await Provider.store.dispatch('doctors/getAll');
      Provider.store.commit('divisions/resetState');
      if (Provider.route().params['id']) {
        Provider.filterQuery.value.setParams(Provider.schema.value.division.id, Provider.route().params['id'] as string);
        await Provider.store.dispatch('divisions/get', Provider.filterQuery.value);
        await Provider.store.dispatch('doctors/setDivisionDoctorsByDivisionId', Provider.route().params['id']);
        if (division.value.floorId) {
          Provider.store.commit('buildings/setBuildingByFloorId', division.value.floorId);
          division.value.buildingId = buildingOption.value.id;
        }
        Provider.store.commit('admin/setHeaderParams', { title: division.value.name, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        Provider.store.commit('admin/setHeaderParams', { title: 'Создать отделение', showBackButton: true, buttons: [{ action: submit }] });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(division, formUpdated, { deep: true });
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
      division.value.doctors = divisionDoctors.value;
      try {
        if (Provider.route().params['id']) {
          await Provider.store.dispatch('divisions/update', division.value);
        } else {
          await Provider.store.dispatch('divisions/create', division.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : Provider.router.push('/admin/divisions');
    };

    const changeBuildingHandler = (id: string) => {
      const building = buildingsOptions.value.find((item: IBuilding) => item.id == id);
      Provider.store.commit('buildings/set', building);
      if (buildingOption.value.floors.length === 1) {
        division.value.floorId = buildingOption.value.floors[0].id;
      } else {
        division.value.floorId = '';
      }
      if (buildingOption.value.entrances.length === 1) {
        division.value.entranceId = buildingOption.value.entrances[0].id;
      } else {
        division.value.entranceId = '';
      }
      changeDivisionAddress();
    };

    const selectDoctorSearch = async (item: ISearchObject) => {
      await Provider.store.dispatch('doctors/get', item.value);
      division.value.chief = new Doctor(doctor.value);
      division.value.chiefId = item.id;
    };

    const changeDivisionAddress = () => {
      const floor = buildingOption.value.floors.find((item: IFloor) => item.id == division.value.floorId);
      const entrance = buildingOption.value.entrances.find((item: IEntrance) => item.id == division.value.entranceId);
      division.value.address = `${buildingOption.value.address}${entrance?.number ? `, ${entrance.number} вход` : ''}${
        floor?.number ? `, ${floor.number} этаж` : ''
      }`;
    };

    const addDoctor = () => {
      const newDoctor = doctors.value?.find((i: IDoctor) => i.id === newDoctorId.value);
      if (newDoctor) {
        newDoctor.divisionId = Provider.route().params['id'] as string;
      }
      Provider.store.dispatch('doctors/addDoctorToDivisionDoctors', newDoctor);
      newDoctorId.value = '';
    };

    return {
      division,
      buildingsOptions,
      changeBuildingHandler,
      changeDivisionAddress,
      buildingOption,
      submit,
      form,
      rules,
      doctors,
      divisionDoctors,
      newDoctorId,
      addDoctor,
      filteredDoctors,
      mounted: Provider.mounted,
      schema: Provider.schema,
      selectDoctorSearch,
      removeFromClass,
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

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-checkbox {
    margin: 5px !important;
  }
}

/* .hideUpload {
  :deep(.el-upload) {
    display: none;
  }
} */

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.content-card {
  height: 450px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
