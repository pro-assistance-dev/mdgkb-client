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
  <template v-if="mounted">
    <div v-for="item in faqList" :key="item.id" class="faq-card card-item">
      <div class="faq-card-title">
        <QuestionCircleOutlined />
        <b>{{ item.question }}</b>
      </div>
      <div v-html="item.answer"></div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
// import StoreModules from '@/store/StoreModules';
const faqList: ComputedRef<Faq[]> = FaqsStore.Items();
// const faqList1: ComputedRef<Faq[]> = StoreModules.Faqs1.Items();
const mounted = ref(false);

onBeforeMount(async () => {
  await FaqsStore.GetAll().then(() => {
    mounted.value = true;
  });
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
