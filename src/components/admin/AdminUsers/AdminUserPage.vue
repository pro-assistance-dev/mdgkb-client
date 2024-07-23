<template>
  <div class="flex-column">
    <el-form ref="form" :model="user" label-position="top">
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
        <HumanForm v-model="user.human" :with-styles="false" />
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import User from '@/classes/User';
import HumanForm from '@/components/admin/HumanForm.vue';
import Role from '@/services/classes/Role';

const mounted: Ref<boolean> = ref(false);
const isNew: ComputedRef<boolean> = computed(() => !Router.Id());
const user: User = UsersStore.Item();
const form = ref();
const roles: Role[] = RolesStore.Items();

// const submit = async () => {
//   saveButtonClick.value = true;
//   try {
//     if (Router.Id()) {
//       await UsersStore.Update();
//     } else {
//       await UsersStore.Create();
//     }
//   } catch (error) {
//     ElMessage({ message: 'Что-то пошло не так', type: 'error' });
//     return;
//   }
//   Router.To('/admin/users');
// };
// const findEmail = async (email: string) => {
//   if (email.length < 3) {
//     return;
//   }
// };

onBeforeMount(async () => {
  await RolesStore.GetAll();
  mounted.value = true;
  // watch(user, formUpdated, { deep: true });
});

onBeforeUnmount(() => {
  UsersStore.ResetItem();
});
</script>

<style scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
