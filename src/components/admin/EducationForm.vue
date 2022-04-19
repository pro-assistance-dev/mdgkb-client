<template>
  <el-button @click="addEducation">Добавить образование</el-button>
  <div v-for="(education, i) in educations" :key="education.id">
    <el-form-item label="Тип образования" prop="human.isMale">
      <el-select v-model="education.type" placeholder="Выберите пол">
        <el-option label="Основное образование" :value="'Основное образование'"></el-option>
        <el-option label="Дополнительно образование" :value="'Дополнительно образование'"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Учебное заведение">
      <el-input v-model="education.institution" />
    </el-form-item>
    <el-form-item label="Диплом">
      <el-input v-model="education.document" />
    </el-form-item>
    <el-row :gutter="1">
      <el-col :span="11">
        <el-card>
          <template #header>
            <CardHeader
              :label="'Сертификация'"
              :add-button="!education.educationCertification"
              :remove-button="education.educationCertification"
              :add-button-text="'Добавить сертификацию'"
              :remove-button-text="'Удалить сертификацию'"
              @add="addCertification(i)"
              @remove="removeCertification(i)"
            />
          </template>
          <div v-if="education.educationCertification">
            <el-date-picker v-model="education.educationCertification.certificationDate" />
            <el-date-picker v-model="education.educationCertification.endDate" />
            <el-input v-model="education.educationCertification.place" />
            <el-input v-model="education.educationCertification.specialization" />
            <el-input v-model="education.educationCertification.document" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-card>
          <template #header>
            <CardHeader
              :label="'Аккредитация'"
              :add-button="!education.educationAccreditation"
              :remove-button="education.educationAccreditation"
              :add-button-text="'Добавить аккредитацию'"
              :remove-button-text="'Удалить аккредитацию'"
              @add="addAccreditation(i)"
              @remove="removeAccreditation(i)"
            />
          </template>
          <div v-if="education.educationAccreditation">
            <el-date-picker v-model="education.educationAccreditation.startDate" />
            <el-date-picker v-model="education.educationAccreditation.endDate" />
            <el-input v-model="education.educationAccreditation.specialization" />
            <el-input v-model="education.educationAccreditation.document" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import CardHeader from '@/components/admin/CardHeader.vue';

export default defineComponent({
  name: 'EducationForm',
  components: { CardHeader },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const form = ref();

    const educations = computed(() => store.getters[`${props.storeModule}/educations`]);

    const addEducation = () => {
      store.commit(`${props.storeModule}/addEducation`);
    };

    const removeEducation = (educationIndex: number) => {
      store.commit(`${props.storeModule}/removeEducation`, educationIndex);
    };

    const addCertification = (educationIndex: string) => {
      store.commit(`${props.storeModule}/addCertification`, educationIndex);
    };

    const removeCertification = (educationIndex: string) => {
      store.commit(`${props.storeModule}/removeCertification`, educationIndex);
    };

    const addAccreditation = (educationIndex: string) => {
      store.commit(`${props.storeModule}/addAccreditation`, educationIndex);
    };

    const removeAccreditation = (educationIndex: string) => {
      store.commit(`${props.storeModule}/removeAccreditation`, educationIndex);
    };

    return {
      addCertification,
      removeCertification,
      addAccreditation,
      removeAccreditation,
      addEducation,
      removeEducation,
      educations,
      form,
    };
  },
});
</script>
