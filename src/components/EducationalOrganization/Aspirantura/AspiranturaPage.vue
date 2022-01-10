<template>
  <div class="ques-answ-container">
    <h1>Аспирантура</h1>
    <el-tabs type="border-card" active-name="Вступительные испытания" :before-leave="test">
      <el-tab-pane label="Вступительные испытания" name="Вступительные испытания">
        <AspiranturaExams />
      </el-tab-pane>
      <el-tab-pane label="Документы для поступления" name="Документы для поступления">
        <AspiranturaDocumentsForAdmission />
      </el-tab-pane>
      <el-tab-pane label="Образцы заявлений" name="Образцы заявлений">
        <AspiranturaForms />
      </el-tab-pane>
      <el-tab-pane label="Положения и нормативные документы">
        <AspiranturaNormativeDocuments />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AspiranturaDocumentsForAdmission from '@/components/EducationalOrganization/Aspirantura/AspiranturaDocumentsForAdmission.vue';
import AspiranturaExams from '@/components/EducationalOrganization/Aspirantura/AspiranturaExams.vue';
import AspiranturaForms from '@/components/EducationalOrganization/Aspirantura/AspiranturaForms.vue';
import AspiranturaNormativeDocuments from '@/components/EducationalOrganization/Aspirantura/AspiranturaNormativeDocuments.vue';

export default defineComponent({
  name: 'AspiranturaPage',
  components: { AspiranturaExams, AspiranturaDocumentsForAdmission, AspiranturaForms, AspiranturaNormativeDocuments },

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
