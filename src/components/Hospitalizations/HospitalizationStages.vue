<template>
  <h4>Что нужно сделать для госпитализации</h4>
  <div v-for="stage in hospitalization.selectedHospitalisation.hospitalizationStages" :key="stage.id">
    <HospitalizationStageCard :stage="stage" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import HospitalizationStageCard from '@/components/Hospitalizations/HospitalizationStageCard.vue';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
export default defineComponent({
  name: 'HospitalizationAnalyzes',
  components: { HospitalizationStageCard },
  setup() {
    const store = useStore();
    const hospitalization: ComputedRef<IHospitalizationType> = computed(() => store.getters['hospitalizations/selectedHospitalisation']);

    return {
      hospitalization,
    };
  },
});
</script>

<style lang="scss" scoped>
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
