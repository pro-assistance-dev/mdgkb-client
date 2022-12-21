<template>
  <div class="block">
    <h4>Необходимые анализы</h4>
    <div class="wrapper">
      <div class="card-space">
        <HospitalizationAnalysisCard title="Ребенку" :analyzes="hospitalizationTypeAnalyzes.filter((item) => item.children)" />
      </div>
      <div class="card-space">
        <HospitalizationAnalysisCard title="Представителю" :analyzes="hospitalizationTypeAnalyzes.filter((item) => !item.children)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import HospitalizationAnalysisCard from '@/components/Hospitalizations/HospitalizationAnalysisCard.vue';
import IHospitalizationTypeAnalyze from '@/interfaces/IHospitalizationTypeAnalize';
export default defineComponent({
  name: 'HospitalizationAnalyzes',
  props: {
    hospitalizationTypeAnalyzes: { type: Array as PropType<IHospitalizationTypeAnalyze[]>, required: true },
  },
  components: { HospitalizationAnalysisCard },
});
</script>

<style lang="scss" scoped>
.card-space {
  padding-bottom: 20px;
}

.card-space:last-child {
  padding-bottom: 0;
}

.block {
  border: 1px solid #dcdfe6;
  background-clip: padding-box;
  border-radius: 5px;
  margin-top: 20px;
  width: auto;
  background: #ffffff;
  padding: 0 20px 20px 20px;
}

.hospitalization-table-wrapper {
  background: white;
}

.hospitalization-table {
  width: 100%;
  text-align: center;
}

.hospitalization-button {
  margin: 10px 0;
  width: 230px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  padding: 15px 0px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.application {
  background-color: #31af5e;
  &:hover {
    cursor: pointer;
    background-color: darken(#31af5e, 10%);
  }
}

.docs {
  background-color: #2754eb;
  &:hover {
    cursor: pointer;
    background-color: darken(#2754eb, 10%);
  }
}
</style>
