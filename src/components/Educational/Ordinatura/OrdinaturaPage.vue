<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Ординатура</h4>
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
      <!-- <el-tabs type="border-card" :active-name="pageTitle" :before-leave="test">
      <el-tab-pane label="Текущая информация для поступающих" name="Этапы поступления"><OrdinaturaStages /></el-tab-pane>
      <el-tab-pane label="Документы для поступления" name="Документы для поступления"><OrdinaturaDocumentsForAdmission /></el-tab-pane>
      <el-tab-pane label="Вступительные испытания" name="Вступительные испытания"><OrdinaturaExams /></el-tab-pane>
      <el-tab-pane label="План набора и поданные заявления" name="План набора и поданные заявления"><OrdinaturaExams /></el-tab-pane>
      <el-tab-pane label="Образцы документов" name="Образцы документов"><OrdinaturaExams /></el-tab-pane>
    </el-tabs> -->
      <OrdinaturaStages v-if="activeMenuName === 'Текущая информация для поступающих'" />
      <OrdinaturaDocumentsForAdmission v-if="activeMenuName === 'Документы для поступления'" />
      <OrdinaturaExams v-if="activeMenuName === 'Вступительные испытания'" />
      <OrdinaturaPlan v-if="activeMenuName === 'План набора и поданные заявления'" />
      <OrdinaturaDocs v-if="activeMenuName === 'Образцы документов'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import OrdinaturaDocs from '@/components/Educational/Ordinatura/OrdinaturaDocs.vue';
import OrdinaturaDocumentsForAdmission from '@/components/Educational/Ordinatura/OrdinaturaDocumentsForAdmission.vue';
import OrdinaturaExams from '@/components/Educational/Ordinatura/OrdinaturaExams.vue';
import OrdinaturaPlan from '@/components/Educational/Ordinatura/OrdinaturaPlan.vue';
import OrdinaturaStages from '@/components/Educational/Ordinatura/OrdinaturaStages.vue';

export default defineComponent({
  name: 'OrdinaturaPage',
  components: { OrdinaturaStages, OrdinaturaExams, OrdinaturaDocumentsForAdmission, OrdinaturaPlan, OrdinaturaDocs },

  setup() {
    const pageTitle: Ref<string> = ref('Этапы поступления');
    const activeMenuName: Ref<string> = ref('Текущая информация для поступающих');
    const menu = [
      { name: 'Текущая информация для поступающих' },
      { name: 'Документы для поступления' },
      { name: 'Вступительные испытания' },
      { name: 'План набора и поданные заявления' },
      { name: 'Образцы документов' },
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

    return {
      test,
      menu,
      isActive,
      changeTab,
      pageTitle,
      activeMenuName,
    };
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

// .ordinatura-menu {
//   display: flex;
//   flex-wrap: wrap;
//   align-items: flex-start;
// }
// .anticon {
//   font-size: 40px;
//   margin-right: 10px;
// }
// .ordinatura-menu-item {
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   margin: 5px;
//   border: 1px solid rgb(black, 0.1);
//   border-radius: 5px;
//   background-color: #f5f6f8;
//   &:hover {
//     cursor: pointer;
//     background-color: darken(#f5f6f8, 1.2);
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   }
// }
.is-active {
  color: #42a4f5;
}
</style>
