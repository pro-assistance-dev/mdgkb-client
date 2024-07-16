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

<script lang="ts" setup>
import SupportMessage from '@/classes/SupportMessage';
import Hooks from '@/services/Hooks/Hooks';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

const form = ref();
const supportMessage: SupportMessage = SupportMessagesStore.Item();
const { confirmLeave, saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

const rules = {
  answer: [{ required: true, message: 'Необходимо указать ответ', trigger: 'blur' }],
};

const save = async () => {
  saveButtonClick.value = true;
  await SupportMessagesStore.Update();
  await Router.To('/admin/support-messages');
  PHelp.Notification.Success('Измениня успешно сохранены');
  SupportMessagesStore.ResetItem();
};

Hooks.onBeforeMount(async () => {
  await SupportMessagesStore.Get(Router.Id());
  if (supportMessage.isNew) {
    supportMessage.changeNewStatus();
    await SupportMessagesStore.ChangeNewStatus(supportMessage);
  }
  PHelp.AdminUI.Head.Set('Ответить на вопрос', [Button.Success('Сохранить и выйти', save)]);
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(supportMessage, formUpdated, { deep: true });
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

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
