<template>
  <el-card>
    <template #header>
      <CardHeader :label="'FAQ'" @add="addFaq" />
    </template>
    <el-form>
      <div v-for="(faq, i) in faqs" :key="faq.id">
        <el-form-item label="Вопрос">
          <el-input v-model="faq.question" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Ответ">
          <el-input v-model="faq.answer" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-delete" type="danger" @click="removeFaq(i)"></el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Faq from '@/classes/Faq';
import CardHeader from '@/components/admin/CardHeader.vue';
import IFaq from '@/interfaces/IFaq';

export default defineComponent({
  name: 'AdminFaqPage',
  components: { CardHeader },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const faqs: Ref<IFaq[]> = computed(() => store.getters['faqs/items']);

    onBeforeMount(async () => {
      store.commit('admin/setSubmit', submit);
      store.commit('admin/setPageTitle', { title: 'FAQ', saveButton: true });
      await store.dispatch('faqs/getAll');
    });

    const submit = async (next?: NavigationGuardNext) => {
      const faqsForDelete: Ref<IFaq[]> = computed(() => store.getters['faqs/faqsForDelete']);
      await store.dispatch('faqs/updateAll', { faqs: faqs.value, faqsForDelete: faqsForDelete.value });
      await router.push('/admin/news');
    };

    const addFaq = () => faqs.value.push(new Faq());
    const removeFaq = (index: number) => store.commit('faqs/remove', index);

    return {
      removeFaq,
      addFaq,
      mounted,
      submit,
      faqs,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
