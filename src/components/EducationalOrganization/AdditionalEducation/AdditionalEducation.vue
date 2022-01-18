<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Дополнительное профессиональное образование</h4>
          <el-divider />
          <el-table :data="menu" cell-class-name="cell-row" :show-header="false">
            <el-table-column>
              <template #default="scope">
                <div :class="isActive(scope.row.name)" @click="changeTab(scope.row.name)">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="content-container">
      <AdditionalEducationPrograms v-if="activeMenuName === 'Программы'" />
      <AdditionalEducationDocumentsForAdmission v-if="activeMenuName === 'Документы для обучения'" />
      <AdditionalEducationNormativeDocuments v-if="activeMenuName === 'Нормативные документы'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import AdditionalEducationDocumentsForAdmission from '@/components/EducationalOrganization/AdditionalEducation/AdditionalEducationDocumentsForAdmission.vue';
import AdditionalEducationNormativeDocuments from '@/components/EducationalOrganization/AdditionalEducation/AdditionalEducationNormativeDocuments.vue';
import AdditionalEducationPrograms from '@/components/EducationalOrganization/AdditionalEducation/AdditionalEducationPrograms.vue';

export default defineComponent({
  name: 'AdditionalEducation',
  components: { AdditionalEducationDocumentsForAdmission, AdditionalEducationPrograms, AdditionalEducationNormativeDocuments },
  setup() {
    const pageTitle: Ref<string> = ref('Программы');
    const activeMenuName: Ref<string> = ref('Программы');

    const menu = [{ name: 'Программы' }, { name: 'Документы для обучения' }, { name: 'Нормативные документы' }];

    const isActive = (name: string): string => {
      return name === activeMenuName.value ? 'is-active' : '';
    };
    const changeTab = (name: string) => {
      activeMenuName.value = name;
    };
    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    return { test, menu, isActive, changeTab, pageTitle, activeMenuName };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
$side-cotainer-max-width: 300px;
$content-max-width: 1000px;
$card-margin-size: 30px;

h4 {
  margin: 0;
}
.el-divider {
  margin: 10px 0 0;
}
:deep(.cell) {
  padding: 0 !important;
}
:deep(.cell-row) {
  cursor: pointer;
}
.ordinatura-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}
</style>
