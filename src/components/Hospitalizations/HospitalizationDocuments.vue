<template>
  <div class="block">
    <h4>Необходимые документы</h4>
    <div class="wrapper">
      <div class="card-space">
        <HospitalizationDocumentsCard title="Ребенку" :documents="hospitalizationTypeDocuments.filter((item) => item.children)" />
      </div>
      <div class="card-space">
        <HospitalizationDocumentsCard title="Представителю" :documents="hospitalizationTypeDocuments.filter((item) => !item.children)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import HospitalizationDocumentsCard from '@/components/Hospitalizations/HospitalizationDocumentsCard.vue';
import IHospitalizationTypeDocument from '@/interfaces/IHospitalizationTypeDocument';
export default defineComponent({
  name: 'HospitalizationDocuments',
  components: { HospitalizationDocumentsCard },
  props: {
    hospitalizationTypeDocuments: { type: Array as PropType<IHospitalizationTypeDocument[]>, required: true },
  },
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
