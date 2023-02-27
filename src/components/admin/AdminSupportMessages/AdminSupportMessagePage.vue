<template>
  <div class="wrapper">
    <el-form ref="form" :key="supportMessage" :rules="rules" :model="supportMessage" label-position="top">
      <div class="flex-column">
        <el-card>
          <template #header>
            <div class="info-header">
              <span>Информация о пользователе</span>
            </div>
          </template>
          <div>
            <span><b>ФИО заявителя: </b></span>
            <span>{{ supportMessage.user?.human?.getFullName() }}</span>
          </div>
          <div>
            <span><b>Email: </b></span>
            <span>{{ supportMessage.user?.email }}</span>
          </div>
          <div>
            <span><b>Дата обращения: </b></span>
            <span>{{ $dateTimeFormatter.format(supportMessage.date, { hour: 'numeric', minute: 'numeric' }) }}</span>
          </div>
          <div>
            <span><b>Тема вопроса: </b></span>
            <span>{{ supportMessage.theme }}</span>
          </div>
          <div>
            <span><b>Содержание обращения: </b></span>
            <div style="white-space: pre-line">{{ supportMessage.question }}</div>
          </div>
        </el-card>

        <el-card header="Ответ пользователю">
          <el-form-item prop="originalAnswer">
            <WysiwygEditor v-model="supportMessage.answer" />
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
import ISupportMessage from '@/interfaces/ISupportMessage';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminSupportMessagePage',
  components: { WysiwygEditor },
  setup() {
    const form = ref();
    const supportMessage: Ref<ISupportMessage> = computed<ISupportMessage>(() => Provider.store.getters['supportMessages/item']);
    const { confirmLeave, saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const rules = {
      answer: [{ required: true, message: 'Необходимо указать ответ', trigger: 'blur' }],
    };

    const save = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      await Provider.store.dispatch('supportMessages/update', supportMessage.value);
      next ? next() : Provider.router.push('/admin/support-messages');
      ElMessage({
        type: 'info',
        message: 'Изменения сохранены',
      });
      Provider.store.commit('supportMessages/resetSupportMessage');
    };

    Hooks.onBeforeMount(async () => {
      await Provider.store.dispatch('supportMessages/get', Provider.route().params['id']);
      if (supportMessage.value.isNew) {
        supportMessage.value.changeNewStatus();
        await Provider.store.dispatch('supportMessages/changeNewStatus', supportMessage.value);
      }
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Ответить на вопрос',
        showBackButton: true,
        buttons: [{ text: 'Сохранить и выйти', type: 'primary', action: save, condition: confirmLeave }],
      });
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(supportMessage, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    return {
      mounted: Provider.mounted,
      supportMessage,
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
