<template>
  <div>
    <h2>Информация о госпитализации</h2>
    <HospitalizationsTable @download-docs="downloadDocs" @sendApplication="sendApplication" />
    <div id="hospitalization-info">
      <HospitalizationQuestions v-if="showQuestions" @allQuestionsAnswered="allQuestionsAnswered" />
      <HospitalizationsHowSendApplication v-if="showHowSendApplication" />
      <HospitalizationStages v-if="showStages" />
      <HospitalizationAnalyzes v-if="showStages" />
      <HospitalizationDocuments v-if="showStages" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import HospitalizationAnalyzes from '@/components/Hospitalizations/HospitalizationAnalyzes.vue';
import HospitalizationDocuments from '@/components/Hospitalizations/HospitalizationDocuments.vue';
import HospitalizationQuestions from '@/components/Hospitalizations/HospitalizationQuestions.vue';
import HospitalizationsHowSendApplication from '@/components/Hospitalizations/HospitalizationsHowSendApplication.vue';
import HospitalizationsTable from '@/components/Hospitalizations/HospitalizationsTable.vue';
import HospitalizationStages from '@/components/Hospitalizations/HospitalizationStages.vue';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import scroll from '@/services/Scroll';
export default defineComponent({
  name: 'HospitalizationsPage',
  components: {
    HospitalizationStages,
    HospitalizationsTable,
    HospitalizationsHowSendApplication,
    HospitalizationQuestions,
    HospitalizationAnalyzes,
    HospitalizationDocuments,
  },
  setup() {
    const store = useStore();
    const showHowSendApplication: Ref<boolean> = ref(false);
    const showQuestions: Ref<boolean> = ref(false);
    const showStages: Ref<boolean> = ref(false);

    const getPDF = (id: string) => {
      store.dispatch('hospitalizations/pdf', id);
    };

    const downloadDocs = (hospitalization: IHospitalizationType): void => {
      console.log('dummy');
    };

    const sendApplication = (hospitalization: IHospitalizationType): void => {
      scroll('hospitalization-info');
      showQuestions.value = true;
      showHowSendApplication.value = false;
      showStages.value = false;
    };

    const allQuestionsAnswered = (hospitalization: IHospitalizationType): void => {
      scroll('hospitalization-info');
      showQuestions.value = false;
      showHowSendApplication.value = true;
      showStages.value = true;
      return;
    };

    return {
      showStages,
      allQuestionsAnswered,
      showQuestions,
      showHowSendApplication,
      sendApplication,
      downloadDocs,
      getPDF,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-evenly;
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
