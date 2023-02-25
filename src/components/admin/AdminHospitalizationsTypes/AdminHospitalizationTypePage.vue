<template>
  <div class="wrapper">
    <el-form ref="form" :key="hospitalizationType" :rules="rules" :model="hospitalizationType" label-position="top">
      <div class="flex-column">
        <el-card>
          <template #header>
            <div class="info-header">
              <span>Информация о типе</span>
            </div>
          </template>
          <div>
            <span><b>Тип страховки: </b></span>
            <span>{{ hospitalizationType.policyType }}</span>
          </div>
          <div>
            <span><b>Регион/Москва: </b></span>
            <span>{{ hospitalizationType.referralType }}</span>
          </div>
          <div>
            <span><b>Тип пребывания: </b></span>
            <span>{{ hospitalizationType.stayType }}</span>
          </div>
          <div>
            <span><b>Тип лечения: </b></span>
            <span>{{ hospitalizationType.treatmentType }}</span>
          </div>
        </el-card>

        <el-card header="Описание типа">
          <el-form-item prop="originalAnswer">
            <WysiwygEditor v-model="hospitalizationType.description" />
          </el-form-item>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminHospitalizationTypePage',
  components: { WysiwygEditor },
  setup() {
    const form = ref();
    const hospitalizationType: Ref<IHospitalizationType> = computed<IHospitalizationType>(
      () => Provider.store.getters['hospitalizationsTypes/item']
    );
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const rules = {
      answer: [{ required: true, message: 'Необходимо указать ответ', trigger: 'blur' }],
    };

    const save = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      await Provider.store.dispatch('hospitalizationsTypes/update');
      next ? next() : await Provider.router.push('/admin/hospitalizations-types');
      ElMessage({
        type: 'info',
        message: 'Изменения сохранены',
      });
      Provider.store.commit('hospitalizationsTypes/resetSupportMessage');
    };

    Hooks.onBeforeMount(async () => {
      await Provider.store.dispatch('hospitalizationsTypes/get', Provider.route().params['id']);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Ответить на вопрос',
        showBackButton: true,
        buttons: [{ text: 'Сохранить и выйти', type: 'primary', action: save }],
      });
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(hospitalizationType, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    return {
      mounted: Provider.mounted,
      hospitalizationType,
      form,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
:deep(.el-card__body) {
  font-size: 14px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
