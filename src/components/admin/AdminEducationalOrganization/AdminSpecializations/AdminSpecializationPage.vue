<template>
  <div v-if="mounted" class="flex-column">
    <el-form ref="form" v-model="specialization" :model="specialization" label-position="top" :rules="rules">
      <el-card>
        <el-form-item label="Код" prop="code">
          <el-input v-model="specialization.code" placeholder="Код"></el-input>
        </el-form-item>
        <el-form-item label="Название" prop="name">
          <el-input v-model="specialization.name" placeholder="Название"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Specialization from '@/classes/Specialization';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminSpecializationPage',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const specialization: ComputedRef<Specialization> = computed<Specialization>(() => store.getters['specializations/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();
    const rules = ref({
      code: [{ required: true, message: 'Необходимо указать код', trigger: 'blur' }],
      name: [{ required: true, message: 'Необходимо указать наименование', trigger: 'blur' }],
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = true;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('specializations/update', specialization.value);
        } else {
          await store.dispatch('specializations/create', specialization.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/educational/specializations');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('specializations/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить шаблон', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить шаблон', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(specialization, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('specializations/resetItem');
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      specialization,
      mounted,
      form,
      rules,
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
