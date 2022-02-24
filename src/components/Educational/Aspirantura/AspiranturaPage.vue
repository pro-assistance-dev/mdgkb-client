<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Аспирантура</h4>
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
      <AspiranturaExams v-if="activeMenuName === 'Вступительные испытания'" />
      <AspiranturaDocumentsForAdmission v-if="activeMenuName === 'Документы для поступления'" />
      <AspiranturaForms v-if="activeMenuName === 'Образцы заявлений'" />
      <AspiranturaNormativeDocuments v-if="activeMenuName === 'Положения и нормативные документы'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import AspiranturaDocumentsForAdmission from '@/components/Educational/Aspirantura/AspiranturaDocumentsForAdmission.vue';
import AspiranturaExams from '@/components/Educational/Aspirantura/AspiranturaExams.vue';
import AspiranturaForms from '@/components/Educational/Aspirantura/AspiranturaForms.vue';
import AspiranturaNormativeDocuments from '@/components/Educational/Aspirantura/AspiranturaNormativeDocuments.vue';

export default defineComponent({
  name: 'AspiranturaPage',
  components: { AspiranturaExams, AspiranturaDocumentsForAdmission, AspiranturaForms, AspiranturaNormativeDocuments },

  setup() {
    const pageTitle: Ref<string> = ref('Вступительные испытания');
    const activeMenuName: Ref<string> = ref('Вступительные испытания');

    const menu = [
      { name: 'Вступительные испытания' },
      { name: 'Документы для поступления' },
      { name: 'Образцы заявлений' },
      { name: 'Положения и нормативные документы' },
    ];

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
.is-active {
  color: #42a4f5;
}
</style>
