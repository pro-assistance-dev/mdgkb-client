<template>
  <div class="flex-column">
    <el-form>
      <el-card header="Название">
        <el-form-item>
          <el-input v-model="timetablePattern.title" placeholder="Название"></el-input>
        </el-form-item>
      </el-card>
      <TimetableConstructorV2 :pattern="true" :store-module="'timetablePatterns'" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Timetable from '@/classes/Timetable';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminTimetablePatternPage',
  components: { TimetableConstructorV2 },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const timetablePattern: ComputedRef<Timetable> = computed<Timetable>(() => store.getters['timetablePatterns/item']);
    const weekdays = computed(() => store.getters['timetables/weekdays']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (route.params['id']) {
          await store.dispatch('timetablePatterns/update', timetablePattern.value);
        } else {
          await store.dispatch('timetablePatterns/create', timetablePattern.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/timetable-patterns');
    };

    onBeforeMount(async () => {
      await store.dispatch('timetables/getAllWeekdays');
      if (route.params['id']) {
        await store.dispatch('timetablePatterns/get', route.params['id']);
      } else {
        store.commit(`timetablePatterns/set`, Timetable.CreateStandartTimetable(weekdays.value));
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(timetablePattern, formUpdated, { deep: true });
    });

    onBeforeUnmount(() => {
      store.commit('timetablePatterns/resetState');
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
