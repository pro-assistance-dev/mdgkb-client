<template>
  <el-form ref="form" :model="doctor" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Фамилия" prop="human.surname">
              <el-input v-model="doctor.human.surname"></el-input>
            </el-form-item>
            <el-form-item label="Имя" prop="human.name">
              <el-input v-model="doctor.human.name"></el-input>
            </el-form-item>
            <el-form-item label="Отчество" prop="human.patronymic">
              <el-input v-model="doctor.human.patronymic"></el-input>
            </el-form-item>
            <el-form-item label="Пол" prop="human.isMale">
              <el-select v-model="doctor.human.isMale" placeholder="Выберите пол">
                <el-option label="Мужчина" :value="true"></el-option>
                <el-option label="Женщина" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Дата рождения" prop="human.dateBirth">
              <el-date-picker v-model="doctor.human.dateBirth" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
            </el-form-item>
            <el-form-item label="Отделение">
              <el-select v-model="doctor.divisionId" placeholder="Выберите отделение" filterable default-first-option style="width: 100%;">
                <el-option v-for="item in divisionOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
        <el-container direction="vertical">
          <!-- <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button> -->
          <el-card>
            <el-form-item label="Образование" prop="education">
              <el-input v-model="doctor.education"></el-input>
            </el-form-item>
            <el-form-item label="Должность" prop="position">
              <el-input v-model="doctor.position"></el-input>
            </el-form-item>
            <el-form-item label="График работы" prop="schedule">
              <el-input v-model="doctor.schedule"></el-input>
            </el-form-item>
            <el-form-item label="Тэги" prop="tags">
              <el-input v-model="doctor.tags"></el-input>
            </el-form-item>
          </el-card>

          <AdminDoctorImage
            v-if="mounted"
            :file-list="fileList"
            :file-info="doctor.fileInfo"
            title="Загрузить фото"
            @toggleUpload="toggleUpload"
            @handlePictureCardPreview="handlePictureCardPreview"
          />
        </el-container>
      </el-col>
    </el-row>
  </el-form>

  <el-dialog v-model="isCropOpen" title="Кроппер" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <ImageCropper :src="imageCropSrc" :ratio="1" @save="saveFromCropper" @cancel="cancelCropper" />
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Division from '@/classes/buildings/Division';
import Doctor from '@/classes/doctors/Doctor';
import DoctorRules from '@/classes/doctors/DoctorRules';
import AdminDoctorImage from '@/components/admin/AdminDoctors/AdminDoctorImage.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'AdminDoctorPage',
  components: { ImageCropper, AdminDoctorImage },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const rules = ref(DoctorRules);
    const mounted = ref(false);

    const divisionOptions = ref([new Division()]);
    const doctor = computed(() => store.getters['doctors/doctor']);
    const loadDivisionOptions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      divisionOptions.value = store.getters['divisions/divisions'];
    };

    // Doctor image loading
    let fileList: Ref<IFilesList[]> = ref([]);
    let imageCropSrc = ref('');
    let isCropOpen = ref(false);
    const fileToUpload = () => {
      if (doctor.value.fileInfo?.fileSystemPath) {
        fileList.value.push({ name: doctor.value.fileInfo, url: doctor.value.fileInfo.getImageUrl() });
        console.log('check', doctor.value.fileInfo.getImageUrl());
      }
    };
    const toggleUpload = (url: string) => {
      imageCropSrc.value = url;
      isCropOpen.value = true;
    };
    const handlePictureCardPreview = (file: any) => {
      imageCropSrc.value = file.url;
      isCropOpen.value = true;
    };
    const saveFromCropper = (file: any) => {
      doctor.value.fileInfo.file = file.blob;
      doctor.value.fileInfo.category = 'previewFile';
      fileList.value = [];
      isCropOpen.value = false;
      fileList.value.push({ name: doctor.value.fileInfo.fileSystemPath, url: file.src });
    };
    const cancelCropper = () => {
      isCropOpen.value = false;
    };

    // Submit
    const submit = async () => {
      let validationResult;
      form.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
      });
      if (!validationResult) return;
      if (!doctor.value.fileInfo.fileSystemPath) {
        ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
        return;
      }
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
      router.push('/admin/doctors');
    };

    // Mount
    onBeforeMount(() => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
    });

    const loadDoctor = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('doctors/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: doctor.value.human.getFullName(), saveButton: true });
        fileToUpload();
      } else {
        store.commit('doctors/set', new Doctor());
        store.commit('admin/setPageTitle', { title: 'Добавить врача', saveButton: true });
      }
      mounted.value = true;
    };

    const load = async (): Promise<void> => {
      await loadDivisionOptions();
      await loadDoctor();
    };
    onMounted(load);

    return {
      rules,
      submit,
      doctor,
      divisionOptions,
      form,
      fileList,
      toggleUpload,
      handlePictureCardPreview,
      isCropOpen,
      saveFromCropper,
      cancelCropper,
      mounted,
      imageCropSrc,
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
