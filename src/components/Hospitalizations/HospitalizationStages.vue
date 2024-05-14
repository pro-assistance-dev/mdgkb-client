<template>
  <div class="block">
    <h4>Что нужно сделать для госпитализации</h4>
    <div class="wrapper">
      <div v-for="stage in hospitalizationTypeStages" :key="stage.id" class="card-space">
        <HospitalizationStageCard :stage="stage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import HospitalizationTypeStage from '@/classes/HospitalizationTypeStage';
import HospitalizationStageCard from '@/components/Hospitalizations/HospitalizationStageCard.vue';

export default defineComponent({
  name: 'HospitalizationStages',
  props: {
    hospitalizationTypeStages: { type: Array as PropType<HospitalizationTypeStage[]>, required: true },
  },
  components: { HospitalizationStageCard },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

li {
  list-style-position: inside;
}
</style>
