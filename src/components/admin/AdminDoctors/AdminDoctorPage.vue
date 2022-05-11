<template>
  <el-form v-if="mounted" ref="form" :model="doctor" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <CardHeader :label="'Личная информация'" :add-button="false" />
            </template>
            <HumanForm :with-styles="false" store-module="doctors" @input-name-complete="completeInput" />
          </el-card>
          <TimetableConstructorV2 :store-module="'doctors'" />
          <el-card>
            <EducationForm :store-module="'doctors'" />
          </el-card>
          <el-card>
            <el-button @click="doctor.addExperience()">Добавить опыт работы</el-button>
            <div v-for="(experience, i) in doctor.experiences" :key="experience.id">
              <el-form-item label="Место работы">
                <el-input v-model="experience.place" />
              </el-form-item>
              <el-form-item label="Должность">
                <el-input v-model="experience.position" />
              </el-form-item>
              <el-form-item label="Начало">
                <el-input-number v-model="experience.start" />
              </el-form-item>
              <el-form-item label="Конец">
                <el-input-number v-model="experience.end" />
              </el-form-item>
              <el-form-item label="Должность">
                <el-button @click="doctor.removeExperience(i)">Удалить опыт работы</el-button>
              </el-form-item>
            </div>
          </el-card>

          <el-card>
            <el-button @click="doctor.addCertificate()">Добавить сертификат</el-button>
            <div v-for="(certificate, i) in doctor.certificates" :key="certificate.id">
              <el-form-item label="Название сертификата">
                <el-input v-model="certificate.description" />
              </el-form-item>
              <UploaderSingleScan :file-info="certificate.scan" />
              <el-button @click="doctor.removeCertificate(i)">Удалить сертификат</el-button>
            </div>
          </el-card>
          <!-- <el-card>
            <el-button @click="doctor.addDoctorPaidService()">Добавить услуги</el-button>
            <div v-for="(doctorPaidService, i) in doctor.doctorPaidServices" :key="doctorPaidService.id">
              <el-form-item label="Услуга">
                <RemoteSearch
                  :key-value="'paidService'"
                  :model-value="doctorPaidService.paidService.name"
                  @select="doctorPaidService.paidServiceId = $event.id"
                />
              </el-form-item>
              <el-button @click="doctor.removeDoctorPaidService(i)">Удалить услугу</el-button>
            </div>
          </el-card> -->
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Отображать на сайте">
              <el-switch v-model="doctor.show"></el-switch>
            </el-form-item>
            <el-form-item label="Член ученного совета">
              <el-switch :model-value="!!doctor.educationalOrganizationAcademic" @change="academicChangeHandler"></el-switch>
            </el-form-item>
          </el-card>
          <el-card header="Фото">
            <UploaderSingleScan :file-info="doctor.fileInfo" :height="300" :width="300" @remove-file="doctor.removeFileInfo()" />
          </el-card>
          <el-card header="Фото-миниатюра">
            <UploaderSingleScan :file-info="doctor.photoMini" :height="300" :width="300" @remove-file="doctor.removePhotoMini()" />
          </el-card>
          <el-card>
            <template #header>
              <CardHeader :label="'Регалии, звания'" :add-button="false" />
            </template>
            <!-- <el-form-item label="Должность" prop="position">
              <RemoteSearch :key-value="'position'" :model-value="doctor.position.name" @select="selectPosition" />
            </el-form-item> -->
            <el-form-item label="Учёная степень">
              <el-input v-model="doctor.academicDegree" />
            </el-form-item>
            <el-form-item label="Звание">
              <el-input v-model="doctor.academicRank" />
            </el-form-item>
            <el-form-item label="Ссылка на профиль в системе Московский врач">
              <el-input v-model="doctor.mosDoctorLink" />
            </el-form-item>
            <el-button @click="addRegalia"> Добавить регалию</el-button>
            <el-form-item label="Регалии">
              <el-input v-for="regalia in doctor.regalias" :key="regalia" v-model="regalia.name" />
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
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import Division from '@/classes/buildings/Division';
import FilterModel from '@/classes/filters/FilterModel';
import CardHeader from '@/components/admin/CardHeader.vue';
import EducationForm from '@/components/admin/EducationForm.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IDoctor from '@/interfaces/IDoctor';
import IHuman from '@/interfaces/IHuman';
import ISearchObject from '@/interfaces/ISearchObject';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminDoctorPage',
  components: {
    TimetableConstructorV2,
    HumanForm,
    EducationForm,
    CardHeader,
    UploaderSingleScan,
  },
  setup() {
    const route = useRoute();
    const form = ref();
    const rules = ref(DoctorRules);
    const mounted = ref(false);

    const divisionOptions = ref([new Division()]);
    const doctor: Ref<IDoctor> = computed(() => Provider.store.getters['doctors/item']);
    const doctors: Ref<IDoctor[]> = computed(() => Provider.store.getters['doctors/items']);
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
        if (route.params['id']) {
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
      console.log('onbeforemount');
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

    const loadDoctor = async (): Promise<void> => {
      if (route.params['id']) {
        await Provider.store.dispatch('doctors/get', route.params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: doctor.value.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        Provider.store.commit('doctors/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить врача', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
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
          await Provider.router.push(`/admin/doctors/${existingDoctor.human.slug}`);
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
      mounted,
      academicChangeHandler,
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
