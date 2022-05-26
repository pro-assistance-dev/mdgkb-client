<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="formStatus" label-position="top">
      <el-card>
        <el-form-item label="Группа статусов">
          <el-select v-model="formStatus.formStatusGroup" value-key="id" placeholder="Группа статусов">
            <el-option v-for="item in formStatusGroups" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="Слать email при смене статуса" prop="isEditable">
          <el-switch v-model="formStatus.sendEmail" active-text="Да" inactive-text="Нет" />
        </el-form-item>
        <el-form-item label="Цвет" prop="color">
          <el-color-picker v-model="formStatus.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="Исконка" prop="icon">
          <UploaderSingleScan :file-info="formStatus.icon" :crop-ratio="false" />
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

import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminFormStatusPage',
  components: { UploaderSingleScan },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const formStatus: ComputedRef<IFormStatus> = computed<IFormStatus>(() => store.getters['formStatuses/item']);
    const formStatusGroups: ComputedRef<IFormStatusGroup[]> = computed(() => store.getters['formStatusGroups/items']);
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
      next ? next() : router.go(-1);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('formStatuses/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить статус', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('formStatuses/setGroupId', route.params['groupId']);
        store.commit('admin/setHeaderParams', { title: 'Добавить статус', showBackButton: true, buttons: [{ action: submit }] });
      }
      await store.dispatch('formStatusGroups/getAll');
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
      formStatusGroups,
    };
  },
});
</script>
