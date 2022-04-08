<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="formStatus" label-position="top">
      <el-card>
        <!-- <el-form-item label="Кодовое название" prop="name">
          <el-input v-model="formStatus.name" placeholder="Кодовое название"></el-input>
        </el-form-item> -->
        <el-form-item label="Название" prop="label">
          <el-input v-model="formStatus.label" placeholder="Название"></el-input>
        </el-form-item>
        <el-form-item label="Название действия для модератора" prop="modActionName">
          <el-input v-model="formStatus.modActionName" placeholder="Название действия для модератора"></el-input>
        </el-form-item>
        <el-form-item label="Название действия для пользователя" prop="userActionName">
          <el-input v-model="formStatus.userActionName" placeholder="Название действия для пользователя"></el-input>
        </el-form-item>
        <el-form-item label="Форма доступна для редакторивания" prop="isEditable">
          <el-switch v-model="formStatus.isEditable" active-text="Да" inactive-text="Нет" />
        </el-form-item>
        <el-form-item label="Цвет" prop="color">
          <el-color-picker v-model="formStatus.color"></el-color-picker>
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

import IForm from '@/interfaces/IForm';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminFormStatusPage',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const formStatus: ComputedRef<IForm> = computed<IForm>(() => store.getters['formStatuses/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (route.params['id']) {
          await store.dispatch('formStatuses/update', formStatus.value);
        } else {
          await store.dispatch('formStatuses/create', formStatus.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/form-statuses');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('formStatuses/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить статус', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить статус', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(formStatus, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('formStatuses/resetItem');
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      formStatus,
      form,
      mounted,
    };
  },
});
</script>
