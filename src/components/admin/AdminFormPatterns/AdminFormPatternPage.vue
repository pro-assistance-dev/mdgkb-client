<template>
  <div class="flex-column">
    <el-form>
      <el-card header="Название">
        <el-form-item>
          <el-input v-model="formPattern.title" placeholder="Название"></el-input>
        </el-form-item>
      </el-card>
      <FormConstructor :form="formPattern" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FormConstructor from '@/components/FormConstructor/FormConstructor.vue';
import IForm from '@/interfaces/IForm';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminFormPatternPage',
  components: { FormConstructor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const formPattern: ComputedRef<IForm> = computed<IForm>(() => store.getters['formPatterns/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (route.params['id']) {
          await store.dispatch('formPatterns/update', formPattern.value);
        } else {
          await store.dispatch('formPatterns/create', formPattern.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/form-patterns');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('formPatterns/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить шаблон', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить шаблон', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(formPattern, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('formPatterns/resetItem');
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      formPattern,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
</style>
