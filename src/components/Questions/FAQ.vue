<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(item, i) in faqList" :key="item.id" :name="i">
      <template #title>
        <QuestionCircleOutlined />
        <b>{{ item.question }}</b>
      </template>
      <div v-html="item.answer"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import IFaq from '@/interfaces/IFaq';

export default defineComponent({
  name: 'FAQ',
  components: { QuestionCircleOutlined },

  setup() {
    const store = useStore();
    const faqList: ComputedRef<IFaq[]> = computed<IFaq[]>(() => store.getters['faqs/items']);

    onBeforeMount(async () => {
      await store.dispatch('faqs/getAll');
    });

    return {
      faqList,
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
</style>
