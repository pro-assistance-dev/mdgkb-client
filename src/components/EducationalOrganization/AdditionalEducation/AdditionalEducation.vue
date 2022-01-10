<template>
  <div class="ques-answ-container">
    <h1>Дополнительное профессиональное образование</h1>
    <el-tabs type="border-card" active-name="Программы">
      <el-tab-pane label="Программы" name="Программы">
        <AdditionalEducationPrograms />
      </el-tab-pane>
      <el-tab-pane label="Документы для обучения" name="Документы для обучения">
        <AdditionalEducationDocumentsForAdmission />
      </el-tab-pane>
      <el-tab-pane label="Нормативные документы" name="Нормативные документы">
        <AdditionalEducationNormativeDocuments />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdditionalEducationDocumentsForAdmission from '@/components/EducationalOrganization/AdditionalEducation/AdditionalEducationDocumentsForAdmission.vue';
import AdditionalEducationNormativeDocuments from '@/components/EducationalOrganization/AdditionalEducation/AdditionalEducationNormativeDocuments.vue';
import AdditionalEducationPrograms from '@/components/EducationalOrganization/AdditionalEducation/AdditionalEducationPrograms.vue';

export default defineComponent({
  name: 'AdditionalEducation',
  components: { AdditionalEducationDocumentsForAdmission, AdditionalEducationPrograms, AdditionalEducationNormativeDocuments },

  setup() {
    return {};
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
