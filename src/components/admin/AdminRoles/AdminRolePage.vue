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
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';

import Role from '@/services/classes/Role';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminRolePage',
  components: {},

  setup() {
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const role: Role = RolesStore.Item();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (Router.Id()) {
          await RolesStore.Update();
        } else {
          await RolesStore.Create();
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/roles');
    };

    onBeforeMount(async () => {
      if (Router.Id()) {
        RolesStore.Get(Router.Id());
        PHelp.AdminUI.Head.Set('Обновить роль', [Button.Success('Сохранить', submit)]);
      } else {
        PHelp.AdminUI.Head.Set('Добавить роль', [Button.Success('Сохранить', submit)]);
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(role, formUpdated, { deep: true });
    });

    onBeforeUnmount(() => {
      RolesStore.ResetItem();
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
