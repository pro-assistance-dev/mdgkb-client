<template>
  <!--  <el-select v-model="selectedAchievement" value-key="id" placeholder="Выберите индивидуальное достижение" @change="addAchievement">-->
  <!--    <el-option v-for="item in pointsAchievements" :key="item.id" :label="item.name" :value="item" />-->
  <!--  </el-select>-->
  <div>{{ residencyApplication.calculateAchievementsPoints(false) }}</div>
  <table>
    <thead>
      <th>Достижение</th>
      <th style="text-align: center">Баллы</th>
      <th style="text-align: center">Файл (название аналогично достижению)</th>
    </thead>
    <tbody>
      <tr v-for="achievement in pointsAchievements" :key="achievement.id">
        <td>{{ achievement.code }}</td>
        <td>
          {{ achievement.name }}
        </td>
        <td style="text-align: center">
          {{ achievement.points > 0 ? achievement.points : '' }}
        </td>
        <td v-if="achievement.points > 0" style="text-align: center">
          <div v-if="residencyApplication.achievementExists(achievement.id)">
            <FileUploader :file-info="residencyApplication.getAchievementResultByAchievementId(achievement.id).fileInfo" />
            <el-button @click="residencyApplication.removeAchievementByAchievementId(achievement.id)">Удалить достижение </el-button>
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
import removeFromClass from '@/mixins/removeFromClass';
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
:deep(.el-form-item__label) {
  line-height: 1.2;
}
//:deep(a) {
//  color: blue !important;
//}

a {
  color: #2754eb;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: darken(#2754eb, 30%);
  }
}
</style>
