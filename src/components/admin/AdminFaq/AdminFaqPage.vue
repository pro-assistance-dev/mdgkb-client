<template>
  <div v-if="mounted" class="flex-column">
    <el-form ref="form" :model="faq" :rules="rules" label-position="top">
      <el-card>
        <el-form-item label="Вопрос" prop="question">
          <el-input v-model="faq.question" placeholder="Вопрос"></el-input>
        </el-form-item>
        <el-form-item label="Ответ" prop="answer">
          <QuillEditor
            v-model:content="faq.answer"
            style="min-height: 200px; max-height: 700px"
            aria-placeholder="Ответ"
            content-type="html"
            theme="snow"
          ></QuillEditor>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IFaq from '@/interfaces/IFaq';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminFaqPage',
  components: { QuillEditor },

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
      store.commit('admin/setSubmit', submit);
      if (route.params['id']) {
        await store.dispatch('faqs/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: 'Обновить вопрос', saveButton: true });
      } else {
        store.commit('admin/setPageTitle', { title: 'Добавить вопрос', saveButton: true });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(faq, formUpdated, { deep: true });
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
