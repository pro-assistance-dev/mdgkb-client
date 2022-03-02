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
        <div class="links">
          <a type="primary" round @click="$router.push('/public-documents')">Нормативные документы</a>
        </div>
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <DpoBaseCoursesList v-if="baseCoursesMode" />
        <DpoCoursesList v-else />
      </el-col>

      <svg width="0" height="0" class="hidden">
        <symbol id="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            d="M12 6.5H11C10.9996 6.1023 10.8414 5.721 10.5602 5.43978C10.279 5.15856 9.8977 5.0004 9.5 5V4C10.1628 4.00079 10.7982 4.26444 11.2669 4.73311C11.7356 5.20178 11.9992 5.8372 12 6.5Z"
          ></path>
          <path
            d="M14 6.5H13C12.9989 5.57207 12.6299 4.68244 11.9737 4.0263C11.3176 3.37015 10.4279 3.00106 9.5 3V2C10.6931 2.00132 11.8369 2.47585 12.6805 3.31948C13.5241 4.16311 13.9987 5.30693 14 6.5Z"
          ></path>
          <path
            d="M10.167 10.741L11.287 9.621C11.4369 9.47105 11.6275 9.36838 11.8352 9.32572C12.043 9.28306 12.2586 9.30228 12.4555 9.381L13.8195 9.927C14.0205 10.0074 14.1929 10.1463 14.3142 10.3256C14.4356 10.5049 14.5005 10.7165 14.5005 10.933V13.4135C14.5009 13.5609 14.4711 13.7069 14.4131 13.8424C14.3551 13.978 14.27 14.1002 14.1631 14.2018C14.0562 14.3033 13.9297 14.3819 13.7914 14.4329C13.653 14.4838 13.5057 14.506 13.3585 14.498C3.7975 13.903 1.8665 5.805 1.508 2.704C1.49063 2.5524 1.50556 2.39884 1.5518 2.25342C1.59805 2.108 1.67455 1.97402 1.77628 1.86029C1.87802 1.74656 2.00268 1.65566 2.14206 1.59356C2.28145 1.53146 2.43241 1.49958 2.585 1.5H5.0215C5.23803 1.5 5.4496 1.56487 5.62892 1.68625C5.80823 1.80764 5.94706 1.97996 6.0275 2.181L6.573 3.545C6.65172 3.74189 6.67094 3.95755 6.62828 4.16526C6.58562 4.37296 6.48295 4.56359 6.333 4.7135L5.213 5.8335C5.213 5.8335 5.834 10.1995 10.167 10.741Z"
          ></path>
        </symbol>
        <symbol id="email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22H17V20H12C7.66 20 4 16.34 4 12C4 7.66 7.66 4 12 4C16.34 4 20 7.66 20 12V13.43C20 14.22 19.29 15 18.5 15C17.71 15 17 14.22 17 13.43V12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C13.38 17 14.64 16.44 15.54 15.53C16.19 16.42 17.31 17 18.5 17C20.47 17 22 15.4 22 13.43V12C22 6.48 17.52 2 12 2ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
          ></path>
        </symbol>
      </svg>
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

.links {
  text-align: center;
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}
</style>
