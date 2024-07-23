<template>
  <div class="wrapper">
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
            <!-- <TimetableConstructorV2 :store-module="'divisions'" /> -->
            <!-- <ScheduleConstructor :store-module="'divisions'" /> -->
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
                <ContactForm :contact="division.contact" />
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
              <div class="flex-between"></div>

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
                        ClassHelper.RemoveFromClassByIndex(scope.$index, division.doctorsDivisions, division.doctorsDivisionsForDelete)
                      "
                      @show-more="Router.RouterPushBlank(`/admin/doctors/${scope.row.doctor.employee.human.id}`)"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-container>
          <el-container>
            <el-card>
              <PButton skin="text" type="success" text="+ Добавить видео" margin="0" @click="division.addDivisionVideo()" />
              <div v-for="(video, i) in division.divisionVideos" :key="video.id">
                <el-input v-model="video.youTubeVideoId" /><el-button
                  @click="ClassHelper.RemoveFromClassByIndex(i, division.divisionVideos, division.divisionVideosForDelete)"
                >
                  Удалить
                </el-button>
              </div>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import Building from '@/classes/Building';
import DivisioinRules from '@/classes/DivisioinRules';
import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';

const form = ref();
const rules = ref(DivisioinRules);
const mounted = ref(false);
const division: Division = DivisionsStore.Item();
const doctor: Doctor = DoctorsStore.Item();
const buildingOption = BuildingsStore.Item();
const buildingsOptions = BuildingsStore.Items();

const load = async (): Promise<void> => {
  await DivisionsStore.Get(Router.Id());
  await BuildingsStore.GetAll();
  await DivisionsStore.Get(Router.Id());
  if (division.floorId) {
    division.buildingId = buildingOption.id;
  }
  PHelp.AdminUI.Head.Set(division.name, [Button.Success('Сохранить', Hooks.submit)]);
  mounted.value = true;
};

Hooks.onBeforeMount(load, {});
Hooks.onBeforeRouteLeave(Hooks.submit);

const changeBuildingHandler = (id: string) => {
  const building = buildingsOptions.find((item: Building) => item.id == id);
  BuildingsStore.Set(building);
  if (buildingOption.floors.length === 1) {
    division.floorId = buildingOption.floors[0].id;
  } else {
    division.floorId = '';
  }
  if (buildingOption.entrances.length === 1) {
    division.entranceId = buildingOption.entrances[0].id;
  } else {
    division.entranceId = '';
  }
  changeDivisionAddress();
};

const selectDoctorSearch = async (item: ISearchObject) => {
  await DoctorsStore.Get(item.value);
  division.setChief(doctor);
};

const changeDivisionAddress = () => {
  division.setAddressFromBuilding(buildingOption);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 80px);
  overflow: hidden;
  overflow-y: auto;
}

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
  border-radius: $border-radius;
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
    color: $base-light-font-color;
    transition: 0.3s;
    cursor: pointer;
    padding: 1px 0px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }
}
</style>
