<template>
  <el-table :data="residencyApplication.residencyApplicationPointsAchievements">
    <el-table-column label="Наименование" min-width="300">
      <template #default="scope">
        {{ scope.row.pointsAchievement.name }}
        <span v-if="scope.row.required" class="red">*</span>
      </template>
    </el-table-column>

    <el-table-column label="Комментарий" min-width="300">
      <template #default="scope">
        {{ scope.row.pointsAchievement.points }}
      </template>
    </el-table-column>

    <el-table-column label="Образец" min-width="200">
      <template #default="scope">
        <a v-if="scope.row.fileInfo.fileSystemPath" :href="scope.row.fileInfo.getFileUrl()" target="_blank">
          {{ scope.row.fileInfo.originalName }}
        </a>
        <!-- <span v-else>Нет файла</span> -->
      </template>
    </el-table-column>

    <el-table-column label="Подтверждено" width="200px">
      <template #default="scope">
        <el-checkbox v-model="scope.row.approved" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IResidencyApplication from '@/interfaces/IResidencyApplication';

export default defineComponent({
  name: 'AdminResidencyApplicationAchievementsPoints',
  components: {},
  props: {
    residencyApplication: {
      type: Object as PropType<IResidencyApplication>,
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
