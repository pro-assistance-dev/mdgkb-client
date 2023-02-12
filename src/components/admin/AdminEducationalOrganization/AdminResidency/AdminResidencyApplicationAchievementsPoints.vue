<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <h2 class="title article-title">Индивидуальные достижения</h2>
      </div>
      <span>Всего баллов: {{ residencyApplication.calculateAchievementsPoints(true) }}</span>
    </template>

    <el-table :data="residencyApplication.residencyApplicationPointsAchievements">
      <el-table-column label="№" min-width="300">
        <template #default="scope">
          {{ scope.row.pointsAchievement.code }}
        </template>
      </el-table-column>
      <el-table-column label="Наименование" min-width="300">
        <template #default="scope">
          {{ scope.row.pointsAchievement.name }}
        </template>
      </el-table-column>

      <el-table-column label="Баллы" align="center" min-width="100">
        <template #default="scope">
          {{ scope.row.pointsAchievement.points }}
        </template>
      </el-table-column>

      <el-table-column label="Образец" min-width="200">
        <template #default="scope">
          <template v-if="!isEditMode">
            <a
              v-if="scope.row.fileInfo.fileSystemPath"
              :href="scope.row.fileInfo.getFileUrl()"
              target="_blank"
              :download="scope.row.fileInfo.originalName"
            >
              {{ scope.row.fileInfo.originalName }}
            </a>
          </template>
          <FileUploader v-else :file-info="scope.row.fileInfo" />
          <!-- <span v-else>Нет файла</span> -->
        </template>
      </el-table-column>

      <el-table-column label="Подтверждено" align="center" width="200">
        <template #default="scope">
          <el-checkbox v-model="scope.row.approved" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ResidencyApplication from '@/classes/ResidencyApplication';
import FileUploader from '@/components/FileUploader.vue';

export default defineComponent({
  name: 'AdminResidencyApplicationAchievementsPoints',
  components: { FileUploader },
  props: {
    residencyApplication: {
      type: Object as PropType<ResidencyApplication>,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}
table {
  height: 100%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dcdfe6;
  padding: 5px 7px 5px 7px;
}

th {
  text-align: left;
  padding: 5px;
  border-right: 1px solid #f2f2f2;
}

th:last-child {
  border-right: 1px solid #dcdfe6;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
