<template>
  <div v-if="mounted">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <ModeButtons
          :second-mode-active="baseCoursesMode"
          :store-mode="false"
          first-mode="Базовые программы"
          second-mode="Дополнительные программы"
          @changeMode="changeMode"
        />
        <DpoCoursesFilters v-if="!baseCoursesMode" />
        <DpoBaseCoursesFilters v-else />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <DpoBaseCoursesList v-if="baseCoursesMode" />
        <DpoCoursesList v-else />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DpoBaseCoursesFilters from '@/components/EducationalOrganization/Dpo/DpoBaseCoursesFilters.vue';
import DpoBaseCoursesList from '@/components/EducationalOrganization/Dpo/DpoBaseCoursesList.vue';
import DpoCoursesFilters from '@/components/EducationalOrganization/Dpo/DpoCoursesFilters.vue';
import DpoCoursesList from '@/components/EducationalOrganization/Dpo/DpoCoursesList.vue';
import ModeButtons from '@/components/ModeButtons.vue';

export default defineComponent({
  name: 'DpoCourses',
  components: { DpoBaseCoursesFilters, DpoCoursesFilters, DpoCoursesList, ModeButtons, DpoBaseCoursesList },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);

    const baseCoursesMode: Ref<boolean> = ref(route.path === '/dpo/base-courses');

    onBeforeMount(async () => {
      // await store.dispatch('dpoCourses/getAll');
      mounted.value = true;
    });

    const changeMode = async (baseCoursesModeActive: boolean) => {
      baseCoursesMode.value = baseCoursesModeActive;
      if (baseCoursesModeActive) {
        await router.replace('/dpo/base-courses');
      } else {
        await router.replace('/dpo/courses');
      }
    };

    return { baseCoursesMode, changeMode, mounted };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
