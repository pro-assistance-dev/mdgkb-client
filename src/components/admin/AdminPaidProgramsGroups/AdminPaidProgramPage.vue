<template>
  <div class="wrapper">
    <el-form ref="form" :key="paidProgram" :model="paidProgram" label-position="top">
      <AdminPaidProgramOptions />
      <AdminPaidProgramPackages />
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdminPaidProgramOptions from '@/components/admin/AdminPaidProgramsGroups/AdminPaidProgramOptions.vue';
import AdminPaidProgramPackages from '@/components/admin/AdminPaidProgramsGroups/AdminPaidProgramPackages.vue';
import IPaidProgram from '@/interfaces/IPaidProgram';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminQuestionPage',
  components: { AdminPaidProgramOptions, AdminPaidProgramPackages },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const form = ref();
    const paidProgram: Ref<IPaidProgram> = computed<IPaidProgram>(() => store.getters['paidPrograms/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      await store.dispatch('paidPrograms/update', paidProgram.value);
      next ? next() : await router.push('/admin/paid-programs-groups');
      store.commit('paidPrograms/reset');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('paidPrograms/get', route.params['id']);
      store.commit('admin/setHeaderParams', {
        title: 'Программа',
        showBackButton: true,
        buttons: [{ text: 'Сохранить и выйти', type: 'primary', action: submit }],
      });
      // question.value.isNew = false;
      mounted.value = true;
      store.commit('admin/closeLoading');
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(paidProgram, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      submit,
      paidProgram,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
:deep(.el-card__body) {
  font-size: 14px;
}
.flex-column {
  display: flex;
  flex-grow: 1;
}
</style>
