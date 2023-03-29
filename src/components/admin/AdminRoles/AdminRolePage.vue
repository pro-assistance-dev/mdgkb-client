<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="role" label-position="top">
      <el-card>
        <el-form-item label="Название" prop="label">
          <el-input v-model="role.name" placeholder="Название"></el-input>
        </el-form-item>
        <el-form-item label="Отображаемое название" prop="label">
          <el-input v-model="role.label" placeholder="Отображаемое название"></el-input>
        </el-form-item>
        <el-form-item label="Стартовая страница админки" prop="label">
          <el-input v-model="role.startPage" placeholder="Стартовая страница админки"></el-input>
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

import Role from '@/services/classes/Role';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminRolePage',
  components: {},

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const role: ComputedRef<Role> = computed<Role>(() => store.getters['roles/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (route.params['id']) {
          await store.dispatch('roles/update', role.value);
        } else {
          await store.dispatch('roles/create', role.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/roles');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('roles/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить роль', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить роль', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(role, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('roles/resetItem');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      role,
      form,
      mounted,
    };
  },
});
</script>
