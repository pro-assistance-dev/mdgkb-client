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

import Specialization from '@/classes/Specialization';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminSpecializationPage',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const specialization: Specialization = SpecializationsStore.Item();
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
          await SpecializationsStore.Update();
        } else {
          await SpecializationsStore.Create();
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/educational/specializations');
    };

    onBeforeMount(async () => {
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(specialization, formUpdated, { deep: true });
    });

    onBeforeUnmount(() => {
      SpecializationsStore.ResetItem();
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
@import '@/assets/styles/base-style.scss';
.flex-column {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
</style>
