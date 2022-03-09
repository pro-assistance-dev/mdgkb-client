<template>
  <div v-if="mounted">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <DpoCoursesFilters v-if="!baseCoursesMode" />
        <DpoBaseCoursesFilters v-else />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24" style="height: 100%; padding-right: 40px">
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

import DpoBaseCoursesFilters from '@/components/Educational/Dpo/DpoBaseCoursesFilters.vue';
import DpoBaseCoursesList from '@/components/Educational/Dpo/DpoBaseCoursesList.vue';
import DpoCoursesFilters from '@/components/Educational/Dpo/DpoCoursesFilters.vue';
import DpoCoursesList from '@/components/Educational/Dpo/DpoCoursesList.vue';

export default defineComponent({
  name: 'DpoCourses',
  components: { DpoBaseCoursesFilters, DpoCoursesFilters, DpoCoursesList, DpoBaseCoursesList },

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
