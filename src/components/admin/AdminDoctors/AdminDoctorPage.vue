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
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-container direction="vertical">
          <AdminDoctorImage v-if="mounted" title="Загрузить фото" />
          <el-card>
            <el-form-item label="Отображать на сайте" prop="position">
              <el-switch v-model="doctor.show"></el-switch>
            </el-form-item>
          </el-card>
          <el-card>
            <template #header>
              <CardHeader :label="'Регалии, звания'" :add-button="false" />
            </template>
            <el-form-item label="Должность" prop="position">
              <el-input v-model="doctor.position"></el-input>
            </el-form-item>
            <el-form-item label="Учёная степень">
              <el-input v-model="doctor.academicDegree" />
            </el-form-item>
            <el-form-item label="Звание">
              <el-input v-model="doctor.academicRank" />
            </el-form-item>
            <el-button @click="addRegalia"> Добавить регалию</el-button>
            <el-form-item label="Регалии">
              <el-input v-for="regalia in doctor.doctorRegalias" :key="regalia" v-model="regalia.name" />
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
import DoctorRules from '@/classes/DoctorRules';
import AdminDoctorImage from '@/components/admin/AdminDoctors/AdminDoctorImage.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import EducationForm from '@/components/admin/EducationForm.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import IDoctor from '@/interfaces/IDoctor';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminDoctorPage',
  components: { TimetableConstructorV2, HumanForm, ImageCropper, AdminDoctorImage, EducationForm, CardHeader },
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
      next ? next() : router.push('/admin/doctors');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
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

    return {
      addRegalia,
      rules,
      submit,
      doctor,
      divisionOptions,
      form,
      mounted,
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
