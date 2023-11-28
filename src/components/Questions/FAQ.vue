<template>
  <!-- <el-collapse>
    <el-collapse-item v-for="(item, i) in filteredFaqList" :key="item.id" :name="i">
      <template #title>
        <QuestionCircleOutlined />
        <b>{{ item.question }}</b>
      </template>
      <div v-html="item.answer"></div>
    </el-collapse-item>
  </el-collapse> -->
  <div v-for="item in filteredFaqList" :key="item.id" class="faq-card card-item">
    <div class="faq-card-title">
      <QuestionCircleOutlined />
      <b>{{ item.question }}</b>
    </div>
    <div v-html="item.answer"></div>
  </div>
</template>

<script lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Faq from '@/classes/Faq';

export default defineComponent({
  name: 'FAQ',
  components: { QuestionCircleOutlined },

  setup() {
    const filter: Ref<string> = ref('');
    const store = useStore();
    const faqList: ComputedRef<Faq[]> = computed<Faq[]>(() => store.getters['faqs/items']);
    const filteredFaqList = computed((): Faq[] => {
      if (filter.value) {
        return faqList.value.filter((faq: Faq) => {
          return (
            faq.question.toLowerCase().includes(filter.value.toLowerCase()) || faq.answer.toLowerCase().includes(filter.value.toLowerCase())
          );
        });
      } else {
        return faqList.value;
      }
    });

    onBeforeMount(async () => {
      await store.dispatch('faqs/getAll');
    });

    return {
      filter,
      filteredFaqList,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item) {
  margin-bottom: 20px;
  width: 100%;
  // background-color: #f5f7fa;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
:deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

:deep(.el-collapse-item__header) {
  background-color: #f5f7fa;
  padding: 0 10px;
  height: 50 px;
}

:deep(.el-collapse-item__content) {
  padding: 10px;
}

.collapse-content-container {
  margin-left: 10px;
}

.anticon {
  font-size: 20px;
  margin-right: 5px;
}
.faq-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.faq-card {
  margin-bottom: 20px;
  &-title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
}
h2 {
  font-size: 24px;
  text-align: center;
}
</style>
