<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <ModeButtons
          :second-mode-active="teachersMode"
          :store-mode="false"
          first-mode="Преподаватели"
          second-mode="Руководство"
          @changeMode="changeMode"
        />
        <TeachersFilters v-if="teachersMode" />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <TeachersList v-if="teachersMode" />
        <EducationalManagersList v-else />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import EducationalManagersList from '@/components/EducationalOrganization/TeachersManagers/EducationalManagersList.vue';
import TeachersFilters from '@/components/EducationalOrganization/TeachersManagers/TeachersFilters.vue';
import TeachersList from '@/components/EducationalOrganization/TeachersManagers/TeachersList.vue';
import ModeButtons from '@/components/ModeButtons.vue';

export default defineComponent({
  name: 'TeachersManagers',
  components: {
    EducationalManagersList,
    TeachersList,
    TeachersFilters,
    ModeButtons,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const teachersMode: Ref<boolean> = ref(route.path === '/teachers');

    const changeMode = async (baseCoursesModeActive: boolean) => {
      teachersMode.value = baseCoursesModeActive;
      if (baseCoursesModeActive) {
        await router.replace('/teachers');
      } else {
        await router.replace('/educational-managers');
      }
    };

    return { teachersMode, changeMode };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
