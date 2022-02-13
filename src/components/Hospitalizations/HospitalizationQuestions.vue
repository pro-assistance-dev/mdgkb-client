<template>
  <div v-if="firstQuestion">
    <h4>Отделение для госпитализации</h4>
    <FilterSelect
      placeholder="Отделение"
      :options="schema.division.options"
      :table="schema.doctor.tableName"
      :col="schema.doctor.divisionId"
      @load="setDivision"
    />
    <button @click="selectDivision(true)">Выбрать</button>
    <button @click="selectDivision(false)">Я не знаю, какое отделение мне нужно</button>
  </div>
  <div v-if="secondQuestion">
    <h4>Выберите предполагаемую дату госпитализации</h4>
    <el-date-picker v-model="hospitalization.selectedHospitalisation.date"></el-date-picker>
    <button @click="selectDate(true)">Выбрать</button>
    <button @click="selectDate(false)">Я не знаю, какая дата мне нужна</button>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FilterSelect from '@/components/Filters/FilterSelect.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import ISchema from '@/interfaces/schema/ISchema';
export default defineComponent({
  name: 'HospitalizationsQuestions',
  components: { FilterSelect },
  emits: ['allQuestionsAnswered'],
  setup(props, { emit }) {
    const hospitalization: ComputedRef<IHospitalizationType> = computed(() => store.getters['hospitalizations/selectedHospitalisation']);
    const store = useStore();
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
      await store.dispatch('meta/getOptions', schema.value.division);
    });

    const firstQuestion: Ref<boolean> = ref(true);
    const secondQuestion: Ref<boolean> = ref(false);

    const activeFirstQuestion = () => {
      firstQuestion.value = true;
      secondQuestion.value = false;
    };

    const activesSecondQuestion = () => {
      firstQuestion.value = false;
      secondQuestion.value = true;
    };

    const selectedDivisionId: Ref<string> = ref('');
    const selectedDivision: ComputedRef<IDivision> = computed(() => store.getters['divisions/division']);

    const setDivision = async (id: string) => {
      selectedDivisionId.value = id;
    };

    const selectDivision = async (divisionSelected: boolean) => {
      if (divisionSelected) {
        await store.dispatch('divisions/get', selectedDivisionId.value);
        hospitalization.value.selectedHospitalisation.divisionId = selectedDivisionId.value;
        hospitalization.value.selectedHospitalisation.division = selectedDivision.value;
        console.log(hospitalization.value.selectedHospitalisation.division);
      }
      activesSecondQuestion();
    };

    const selectDate = async (dateSelected: boolean) => {
      emit('allQuestionsAnswered');
    };

    return {
      selectDate,
      schema,
      selectDivision,
      firstQuestion,
      secondQuestion,
      setDivision,
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
