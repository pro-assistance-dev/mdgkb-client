<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="user" label-position="top">
      <el-card>
        <el-form-item label="Роль">
          <el-select v-model="user.role" value-key="id" label="Роль">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item"> </el-option>
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
import User from '@/classes/User';
import HumanForm from '@/components/admin/HumanForm.vue';
import Role from '@/services/classes/Role';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminUserPage',
  components: { HumanForm },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const isNew: ComputedRef<boolean> = computed(() => !route.params['id']);
    const user: ComputedRef<User> = computed<User>(() => store.getters['users/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();
    const roles: Role[] = RolesStore.Items();

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
      await RolesStore.GetAll();
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(user, formUpdated, { deep: true });
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
      findEmail,
      isNew,
      roles,
    };
  },
});
</script>

<style scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
