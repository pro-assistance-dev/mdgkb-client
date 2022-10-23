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

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IFaq from '@/interfaces/IFaq';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminFaqPage',
  components: { WysiwygEditor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const faq: ComputedRef<IFaq> = computed<IFaq>(() => store.getters['faqs/item']);
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
        if (route.params['id']) {
          await store.dispatch('faqs/update', faq.value);
        } else {
          await store.dispatch('faqs/create', faq.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/faqs');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('faqs/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить вопрос', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить вопрос', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(faq, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('faqs/resetItem');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      faq,
      mounted,
      form,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
</style>
