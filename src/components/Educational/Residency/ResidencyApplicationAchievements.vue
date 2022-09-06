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
        <td>{{ achievement.code }}</td>
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
            <el-button @click="residencyApplication.removeAchievementByAchievementId(achievement.id)">Удалить достижение </el-button>
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
          <el-button v-else @click="addAchievement(achievement)">Добавить</el-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import FileUploader from '@/components/FileUploader.vue';
import IPointsAchievement from '@/interfaces/IPointsAchievement';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import removeFromClass from '@/services/removeFromClass';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ResidencyApplicationAchievements',
  components: { FileUploader },
  props: {
    residencyApplication: {
      type: Object as PropType<IResidencyApplication>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props) {
    const pointsAchievements: Ref<IPointsAchievement[]> = computed<IPointsAchievement[]>(
      () => Provider.store.getters['pointsAchievements/items']
    );
    const selectedAchievement: Ref<IPointsAchievement | undefined> = ref(undefined);
    const addAchievement = (achievement: IPointsAchievement) => {
      if (!achievement.id || props.residencyApplication.achievementExists(achievement.id)) {
        ElMessage({ message: 'Данное достижение уже добавлено', type: 'error' });
        selectedAchievement.value = undefined;
        return;
      }
      props.residencyApplication.addAchievement(achievement);
      selectedAchievement.value = undefined;
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('pointsAchievements/getAll');
    });
    return {
      selectedAchievement,
      addAchievement,
      pointsAchievements,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
thead th {
  // font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #ededed;
  font-size: 14px;
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
