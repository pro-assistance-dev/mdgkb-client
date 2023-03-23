<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="user" label-position="top">
      <el-card>
        <el-form-item label="Роль">
          <el-select v-model="user.roleId">
            <el-option v-for="role in schema.role.options" :key="role.value" :label="role.label" :value="role.value" />
          </el-select>
        </el-form-item>
      </el-card>
      <el-card v-if="isNew">
        <el-form-item label="Email">
          <el-input v-model="user.email" placeholder="Email" type="email" @input="findEmail" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="user.password" placeholder="Пароль" type="password" />
        </el-form-item>
      </el-card>
      <el-card>
        <HumanForm :store-module="'users'" :with-styles="false" />
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
import ISchema from '@/interfaces/schema/ISchema';
import IUser from '@/services/interfaces/IUser';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminUserPage',
  components: { HumanForm },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const isNew: ComputedRef<boolean> = computed(() => !route.params['id']);
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
    const findEmail = async (email: string) => {
      if (email.length < 3) {
        return;
      }
      await store.dispatch('users/findEmail', email);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('meta/getSchema');
      await store.dispatch('meta/getOptions', schema.value.role);

      if (route.params['id']) {
        await store.dispatch('users/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: user.value.email, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить пользователя', showBackButton: true, buttons: [{ action: submit }] });
        user.value.setDefaultRole(schema.value.role.options);
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
      findEmail,
      isNew,
    };
  },
});
</script>

<style scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
