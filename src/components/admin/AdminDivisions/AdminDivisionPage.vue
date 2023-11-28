<template>
  <el-form v-if="mounted" ref="form" :key="division" :model="division" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Наименование отделения" prop="name">
              <el-input v-model="division.name" placeholder="Наименование отделения" />
            </el-form-item>
            <el-form-item label="Общая информация">
              <WysiwygEditor v-model="division.info" />
            </el-form-item>
            <el-form-item label="Адрес">
              <el-input v-model="division.address" placeholder="Адрес" disabled />
            </el-form-item>
          </el-card>

          <el-card>
            <SetEntity
              :link="`/admin/doctors/${division.chief.employee.human.slug}`"
              :search-key="Doctor.GetClassName()"
              label="Выбрать заведующего"
              :entity-name="division.chief.employee.human.getFullName()"
              @select-search="selectDoctorSearch"
              @reset="division.removeChief()"
            />
          </el-card>

          <AdminDivisionVisitingRules />
          <TimetableConstructorV2 :store-module="'divisions'" />
          <ScheduleConstructor :store-module="'divisions'" />
          <CollapseItem :collapsed="false">
            <template #inside-title>
              <div class="title-in">Фотографии</div>
            </template>
            <template #inside-content>
              <div class="tools-buttons">
                <button class="admin-add" @click.prevent="division.addImage()">+ Добавить</button>
              </div>
              <div v-if="division.divisionImages.length" class="background-container">
                <AdminGallery
                  :default-ratio="4 / 3"
                  :file-list="division.divisionImages"
                  :file-list-for-delete="division.divisionImagesForDelete"
                />
              </div>
            </template>
          </CollapseItem>

          <!--          <AdminDivisionGallery />-->
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
        <el-container direction="vertical">
          <CollapseItem title="Контакты" :tab-id="1012">
            <template #inside-content>
              <ContactsForm :contact-info="division.contactInfo" />
            </template>
          </CollapseItem>
          <!-- <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button> -->
          <el-card>
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
                    {{ item.number }}
                  </el-option>
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
              <el-form-item>
                <el-checkbox v-model="division.hasAmbulatory"> Осуществляет амбулаторную помощь </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="division.hasDiagnostic"> Осуществляет услуги диагностики </el-checkbox>
              </el-form-item>
            </template>
          </el-card>

          <el-card>
            <div class="flex-between">
              <RemoteSearch placeholder="Найдите доктора" :key-value="schema.doctor.key" @select="addDoctor" />
            </div>

            <el-table :data="division.doctorsDivisions">
              <el-table-column label="ФИО" sortable>
                <template #default="scope">
                  {{ scope.row.doctor.employee.human.getFullName() }}
                </template>
              </el-table-column>
              <el-table-column label="Должность" sortable>
                <template #default="scope">
                  {{ scope.row.doctor.position.name }}
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
                    @remove="
                      $classHelper.RemoveFromClassByIndex(scope.$index, division.doctorsDivisions, division.doctorsDivisionsForDelete)
                    "
                    @showMore="Provider.routerPushBlank(`/admin/doctors/${scope.row.doctor.employee.human.id}`)"
                  />
                </template>
              </el-table-column>
            </el-table>
            {{ division.divisionDoctors }}
          </el-card>
        </el-container>
        <el-container>
          <el-card>
            <el-button size="mini" type="success" style="margin: 20px" @click="division.addDivisionVideo()"> Добавить видео </el-button>
            <div v-for="(video, i) in division.divisionVideos" :key="video">
              <el-input v-model="video.youTubeVideoId" /><el-button
                @click="$classHelper.RemoveFromClassByIndex(i, division.divisionVideos, division.divisionVideosForDelete)"
              >
                Удалить
              </el-button>
            </div>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';

import Building from '@/classes/Building';
import DivisioinRules from '@/classes/DivisioinRules';
import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import AdminDivisionVisitingRules from '@/components/admin/AdminDivisions/AdminDivisionVisitingRules.vue';
import ContactsForm from '@/components/admin/Contacts/ContactsForm.vue';
import ScheduleConstructor from '@/components/admin/ScheduleConstructor.vue';
import SetEntity from '@/components/admin/SetEntity.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import ClassHelper from '@/services/ClassHelper';
import AdminGallery from '@/services/components/AdminGallery.vue';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminDivisionPage',
  components: {
    ContactsForm,
    TableButtonGroup,
    TimetableConstructorV2,
    ScheduleConstructor,
    AdminGallery,
    AdminDivisionVisitingRules,
    RemoteSearch,
    SetEntity,
    WysiwygEditor,
    CollapseItem,
  },

  setup() {
    const form = ref();
    Provider.form = form;
    const rules = ref(DivisioinRules);

    const division: ComputedRef<Division> = computed<Division>(() => Provider.store.getters['divisions/item']);
    const doctors: ComputedRef<Doctor[]> = computed(() => Provider.store.getters['doctors/items']);
    const doctor: ComputedRef<Doctor> = computed(() => Provider.store.getters['doctors/item']);
    const filteredDoctors = computed(() => Provider.store.getters['doctors/filteredDoctors']);
    const divisionDoctors = computed(() => Provider.store.getters['doctors/divisionDoctors']);
    const newDoctorId = ref();
    const buildingOption = computed(() => Provider.store.getters['buildings/item']);
    const buildingsOptions = computed(() => Provider.store.getters['buildings/items']);

    const load = async (): Promise<void> => {
      await Provider.store.dispatch('buildings/getAll');
      await Provider.loadItem(ClassHelper.GetPropertyName(Division).id);
      if (division.value.floorId) {
        Provider.store.commit('buildings/setBuildingByFloorId', division.value.floorId);
        division.value.buildingId = buildingOption.value.id;
      }
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? division.value.name : 'Добавить отделение')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave(Hooks.submit);

    const changeBuildingHandler = (id: string) => {
      const building = buildingsOptions.value.find((item: Building) => item.id == id);
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
      division.value.setChief(doctor.value);
    };

    const changeDivisionAddress = () => {
      division.value.setAddressFromBuilding(buildingOption.value);
    };

    const addDoctor = async (search: ISearchObject) => {
      await Provider.store.dispatch('doctors/get', search.value);
      division.value.addDoctorDivision(doctor.value);
    };

    return {
      division,
      buildingsOptions,
      changeBuildingHandler,
      changeDivisionAddress,
      buildingOption,
      form,
      rules,
      doctors,
      divisionDoctors,
      newDoctorId,
      addDoctor,
      filteredDoctors,
      mounted: Provider.mounted,
      Doctor,
      selectDoctorSearch,

      Provider,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';
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

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: $normal-border-radius;
  border: 1px solid #c3c3c3;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
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

@media screen and (max-width: 400px) {
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
