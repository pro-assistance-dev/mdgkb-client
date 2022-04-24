<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="user" label-position="top">
      <el-card>
        <el-form ref="form" label-position="top" :model="user">
          <HumanForm :store-module="'users'" />
        </el-form>
        <el-select v-model="user.roleId">
          <el-option v-for="role in schema.role.options" :key="role.value" :label="role.label" :value="role.value" />
        </el-select>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import HumanForm from '@/components/admin/HumanForm.vue';
import IUser from '@/interfaces/IUser';
import ISchema from '@/interfaces/schema/ISchema';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminUserPage',
  components: { HumanForm },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const user: ComputedRef<IUser> = computed<IUser>(() => store.getters['users/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (route.params['id']) {
          await store.dispatch('users/update', user.value);
        } else {
          await store.dispatch('users/create', user.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/users');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('meta/getSchema');
      await store.dispatch('meta/getOptions', schema.value.role);
      if (route.params['id']) {
        await store.dispatch('users/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить роль', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить роль', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(user, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('users/resetItem');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      user,
      form,
      mounted,
      schema,
    };
  },
});
</script>
