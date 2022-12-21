<template>
  <div class="card">
    <div class="flex-between-columm front">
      <div class="card-content">
        <div class="title">{{ title }}</div>
        <div v-for="analysis in analyzes" :key="analysis.name" class="text">
          <ul>
            <li>{{ analysis.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IHospitalizationTypeAnalize from '@/interfaces/IHospitalizationTypeAnalize';

export default defineComponent({
  name: 'HospitalizationAnalysisCard',
  props: {
    analyzes: {
      type: Object as PropType<IHospitalizationTypeAnalize[]>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
$card-border-radius: 15px;
$card-content-padding: 15px;
$card-content-outpadding: 0px;
$card-width: 100%;

.card {
  background: #f2f2f2;
  background-clip: padding-box;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  height: 100%;
  width: $card-width;
  display: flex;

  .card-content {
    padding-left: $card-content-padding;
    padding-right: $card-content-padding;
    padding-bottom: $card-content-padding;
    height: auto;
    overflow-wrap: break-word;
    height: 100%;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #343e5c;
      margin-top: 10px;
    }

    .text {
      font-size: 14px;
      font-weight: normal;
      color: #4a4a4a;
      margin-top: 5px;
      :deep(p) {
        margin: 0;
      }
    }
  }
}
</style>
