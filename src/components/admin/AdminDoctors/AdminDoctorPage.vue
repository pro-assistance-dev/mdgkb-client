<template>
  <el-form v-if="mounted" ref="form" :model="doctor" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <CardHeader :label="'Личная информация'" :add-button="false" />
            </template>
            <HumanForm :store-module="'doctors'" />
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
            <UploaderSingleScan :file-info="doctor.fileInfo" :height="300" :width="300" />
          </el-card>
          <el-card header="Фото-миниатюра">
            <UploaderSingleScan :file-info="doctor.photoMini" :height="300" :width="300" />
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

  <ImageCropper />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Division from '@/classes/buildings/Division';
import CardHeader from '@/components/admin/CardHeader.vue';
import EducationForm from '@/components/admin/EducationForm.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IDoctor from '@/interfaces/IDoctor';
import ISearchObject from '@/interfaces/ISearchObject';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
import DoctorRules from '@/rules/DoctorRules';

export default defineComponent({
  name: 'AdminDoctorPage',
  components: {
    TimetableConstructorV2,
    HumanForm,
    ImageCropper,
    EducationForm,
    CardHeader,
    UploaderSingleScan,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const rules = ref(DoctorRules);

    const mounted = ref(false);

    const divisionOptions = ref([new Division()]);
    const doctor: Ref<IDoctor> = computed(() => store.getters['doctors/item']);

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
          await store.dispatch('doctors/update', doctor.value);
        } else {
          await store.dispatch('doctors/create', doctor.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await router.push('/admin/doctors');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('search/searchGroups');
      await loadDivisionOptions();
      await loadDoctor();
      store.commit('admin/closeLoading');
    });

    const loadDivisionOptions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      divisionOptions.value = store.getters['divisions/divisions'];
    };

    const loadDoctor = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('doctors/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: doctor.value.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('doctors/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить врача', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(doctor, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const addRegalia = () => store.commit('doctors/addRegalia');

    const selectPosition = async (event: ISearchObject) => {
      doctor.value.positionId = event.id;
      await store.dispatch('');
    };

    const selectPaidService = (event: ISearchObject) => {
      doctor.value.positionId = event.id;
    };

    const academicChangeHandler = () => {
      doctor.value.setAcademic();
    };

    return {
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
