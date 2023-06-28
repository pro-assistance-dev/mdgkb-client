<template>
  <el-form-item label="ВУЗ" prop="diploma.universityName" :rules="[{ required: true, message: 'Необходимо указать ВУЗ', trigger: 'blur' }]">
    <el-input v-model="diploma.universityName" placeholder="ВУЗ"></el-input>
  </el-form-item>
  <el-form-item
    label="Дата окончания"
    prop="diploma.universityEndDate"
    :rules="[{ required: true, message: 'Необходимо указать дату окончания', trigger: 'change' }]"
  >
    <DatePicker v-model="diploma.universityEndDate" />
  </el-form-item>
  <img :src="require(`@/assets/img/diplomaexample.png`)" />
  <el-form-item label="Серия" prop="diploma.series" :rules="[{ required: true, message: 'Необходимо указать серию', trigger: 'blur' }]">
    <el-input v-model="diploma.series" placeholder="Серия" @input="(e) => (diploma.series = e.replace(/\D+/g, ''))"></el-input>
  </el-form-item>
  <el-form-item label="Номер" prop="diploma.number" :rules="[{ required: true, message: 'Необходимо указать номер', trigger: 'blur' }]">
    <!-- <div style="display: flex"> -->
    <el-input v-model="diploma.number" placeholder="Номер" @input="(e) => (diploma.number = e.replace(/\D+/g, ''))"></el-input>
    <!-- <el-button style="margin-left: 10px" icon="el-icon-document-copy" @click="clickCopyHandler"></el-button> -->
    <!-- </div> -->
  </el-form-item>
  <el-form-item
    label="Когда выдан"
    prop="diploma.date"
    :rules="[{ required: true, message: 'Необходимо указать дату выдачи', trigger: 'change' }]"
  >
    <DatePicker v-model="diploma.date" />
  </el-form-item>
  <el-form-item
    label="Специальность по диплому КОД (например, 31.05.02)"
    prop="diploma.specialityCode"
    :rules="[{ required: true, message: 'Необходимо указать код специальности', trigger: 'blur' }]"
  >
    <el-input v-model="diploma.specialityCode" placeholder="Код специальности"></el-input>
  </el-form-item>
  <el-form-item
    label="Расшифровка специальности (например, педиатрия)"
    prop="diploma.speciality"
    :rules="[{ required: true, message: 'Необходимо указать расшифровку специальности', trigger: 'blur' }]"
  >
    <el-input v-model="diploma.speciality" placeholder="Расшифровка специальности"></el-input>
  </el-form-item>
</template>

<script lang="ts">
import { CopyDocument } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent } from 'vue';

import Diploma from '@/classes/Diploma';
import DatePicker from '@/components/DatePicker.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DiplomaForm',
  components: { DatePicker },
  setup() {
    const diploma: ComputedRef<Diploma> = computed<Diploma>(() => Provider.store.getters['residencyApplications/item'].diploma);

    const clickCopyHandler = async () => {
      await navigator.clipboard.writeText(diploma.value.getSeriesAndNumber());
    };

    return {
      diploma,
      CopyDocument,
      clickCopyHandler,
    };
  },
});
</script>
