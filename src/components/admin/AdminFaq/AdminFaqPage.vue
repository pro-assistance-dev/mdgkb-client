<template>
  <div v-if="mounted" class="flex-column">
    <el-form ref="form" :model="faq" :rules="rules" label-position="top">
      <el-card>
        <el-form-item label="Вопрос" prop="question">
          <el-input v-model="faq.question" placeholder="Вопрос"></el-input>
        </el-form-item>
        <el-form-item label="Ответ" prop="answer">
          <WysiwygEditor v-model="faq.answer" />
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import Faq from '@/classes/Faq';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const form = ref();
const mounted: Ref<boolean> = ref(false);
const faq: Faq = FaqsStore.Item();
const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

const rules = {
  question: [{ required: true, message: 'Необходимо указать вопрос', trigger: 'blur' }],
  answer: [{ required: true, message: 'Необходимо указать ответ', trigger: 'blur' }],
};

const submit = async (next?: NavigationGuardNext) => {
  saveButtonClick.value = true;
  if (!validate(form)) {
    saveButtonClick.value = false;
    return;
  }
  try {
    if (Router.Id()) {
      await FaqsStore.Update();
    } else {
      await FaqsStore.Create();
    }
  } catch (error) {
    PHelp.Notification.Error('Что-то пошло не так');
    return;
  }
  next ? next() : Router.To('/admin/faqs');
};

onBeforeMount(async () => {
  if (Router.Id()) {
    await FaqsStore.Get(Router.Id());
    PHelp.AdminUI.Head.Set('Обновить вопрос', [Button.Success('Обновить вопрос', submit)]);
  } else {
    PHelp.AdminUI.Head.Set('Добавить вопрос', [Button.Success('Обновить вопрос', submit)]);
  }
  mounted.value = true;
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(faq, formUpdated, { deep: true });
});

onBeforeUnmount(() => {
  FaqsStore.ResetItem();
});

onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showConfirmModal(submit, next);
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
