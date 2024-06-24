<template>
  <table>
    <thead>
      <th>№</th>
      <th>Достижение</th>
      <th style="text-align: center">Баллы</th>
      <th style="text-align: center">Файл (название аналогично достижению)</th>
    </thead>
    <tbody>
      <tr v-for="achievement in pointsAchievements" :key="achievement.id">
        <td :class="{ bold: !Strings.ContainsNum(achievement.code) }">
          {{ achievement.code }}
        </td>
        <td>
          <em v-if="achievement.points === 0">{{ achievement.name }}</em>
          <span v-else>{{ achievement.name }}</span>
        </td>
        <td style="text-align: center">
          {{ achievement.points > 0 ? achievement.points : '' }}
        </td>
        <td v-if="achievement.points > 0" style="text-align: center">
          <div v-if="residencyApplication.achievementExists(achievement.id)">
            <FileUploader :file-info="residencyApplication.getAchievementResultByAchievementId(achievement.id).fileInfo" />
            <el-button style="margin-top: 5px" size="small" @click="residencyApplication.removeAchievementByAchievementId(achievement.id)">
              Удалить достижение
            </el-button>
            <div
              v-if="
                residencyApplication.getAchievementResultByAchievementId(achievement.id).showError &&
                residencyApplication.getAchievementResultByAchievementId(achievement.id).fileInfo &&
                !residencyApplication.getAchievementResultByAchievementId(achievement.id).fileInfo.fileSystemPath
              "
              class="form-item-error"
            >
              Необходимо добавить файл
            </div>
          </div>
          <el-button v-else size="small" @click="addAchievement(achievement)"> Добавить </el-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplication from '@/classes/ResidencyApplication';

const props = defineProps({
  residencyApplication: {
    type: Object as PropType<ResidencyApplication>,
    required: true,
  },
});
defineEmits(['close']);

const pointsAchievements: Ref<PointsAchievement[]> = Store.Items('pointsAchievements');
const selectedAchievement: Ref<PointsAchievement | undefined> = ref(undefined);
const addAchievement = (achievement: PointsAchievement) => {
  if (!achievement.id || props.residencyApplication.achievementExists(achievement.id)) {
    PHelp.Notification().Error('Данное достижение уже добавлено');
    selectedAchievement.value = undefined;
    return;
  }
  props.residencyApplication.addAchievement(achievement);
  selectedAchievement.value = undefined;
};

onBeforeMount(async () => {
  await Store.GetAll('pointsAchievements');
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
thead th {
  // font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #ededed;
  font-size: 14px;
}

.bold {
  font-weight: bold;
}

tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
tbody tr:nth-child(even) {
  background: #f8f8f8;
}
tbody tr:hover {
  background-color: #ecf5ff;
}
</style>
