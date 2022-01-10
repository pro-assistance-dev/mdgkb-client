<template>
  <div class="ques-answ-container">
    <h1>Ординатура</h1>
    <el-tabs type="border-card" :active-name="pageTitle" :before-leave="test">
      <el-tab-pane label="Текущая информация для поступающих" name="Этапы поступления"><OrdinaturaStages /></el-tab-pane>
      <el-tab-pane label="Документы для поступления" name="Документы для поступления"><OrdinaturaDocumentsForAdmission /></el-tab-pane>
      <el-tab-pane label="Вступительные испытания" name="Вступительные испытания"><OrdinaturaExams /></el-tab-pane>
      <el-tab-pane label="План набора и поданные заявления" name="Вступительные испытания"><OrdinaturaExams /></el-tab-pane>
      <el-tab-pane label="Образцы документов" name="Вступительные испытания"><OrdinaturaExams /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import OrdinaturaDocumentsForAdmission from '@/components/EducationalOrganization/Ordinatura/OrdinaturaDocumentsForAdmission.vue';
import OrdinaturaExams from '@/components/EducationalOrganization/Ordinatura/OrdinaturaExams.vue';
import OrdinaturaStages from '@/components/EducationalOrganization/Ordinatura/OrdinaturaStages.vue';

export default defineComponent({
  name: 'OrdinaturaPage',
  components: { OrdinaturaStages, OrdinaturaDocumentsForAdmission, OrdinaturaExams },

  setup() {
    const pageTitle: Ref<string> = ref('Этапы поступления');

    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    return {
      test,
      pageTitle,
    };
  },
});
</script>

<style>
h1 {
  text-align: center;
  font-size: 24px;
}
.ques-answ-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
