<template>
  <div class="flex-column">
    <el-form>
      <el-card header="Название">
        <el-form-item>
          <el-input v-model="timetablePattern.title" placeholder="Название"></el-input>
        </el-form-item>
      </el-card>
      <TimetableConstructor :pattern="true" :store-module="'timetablePatterns'" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Timetable from '@/classes/Timetable';
import TimetableConstructor from '@/components/admin/TimetableConstructor.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminTimetablePatternPage',
  components: { TimetableConstructor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const timetablePattern: Timetable = TimetablesPatternsStore.Item();
    const weekdays = TimetablesStore.Weekdays();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (route.params['id']) {
          await TimetablesPatternsStore.Update();
        } else {
          await TimetablesPatternsStore.Create();
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/timetable-patterns');
    };

    onBeforeMount(async () => {
      await TimetableStore.GetAllWeekdays();
      if (Router.Id()) {
        TimetablesPatternsStore.Get(Router.Id());
      } else {
        TimetablesPatternsStore.Set(Timetable.CreateStandartTimetable(weekdays.value));
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(timetablePattern, formUpdated, { deep: true });
    });

    onBeforeUnmount(() => {
      TimetablesPatternsStore.ResetState();
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      timetablePattern,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.flex-column {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
</style>
