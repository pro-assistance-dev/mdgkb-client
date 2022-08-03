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
    <button class="select" @click="selectDivision(true)">Выбрать</button>
    <button class="select_dont" @click="selectDivision(false)">Я не знаю, какое отделение мне нужно</button>
  </div>
  <div v-if="secondQuestion">
    <h4>Выберите предполагаемую дату госпитализации</h4>
    <DatePicker v-model="hospitalization.selectedHospitalisation.date" class="secondQuestion" /><br />
    <div class="select-block">
      <button class="select" @click="selectDate(true)">Выбрать</button>
      <button class="select_dont" @click="selectDate(false)">Я не знаю, какая дата мне нужна</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DatePicker from '@/components/DatePicker.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'HospitalizationsQuestions',
  components: { FilterSelect, DatePicker },
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

.select {
  background: #2754eb;
  margin: 10px 0;
  font-weight: normal;
  font-size: 14px;
  border-radius: 40px;
  padding: 12px 23px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: none;
  margin-right: 30px;
}

.select_dont {
  background: #f49524;
  margin: 10px 0;
  font-weight: normal;
  font-size: 14px;
  border-radius: 40px;
  padding: 12px 23px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: none;
}

.select:hover {
  background: darken(#2754eb, 10%);
}

.select_dont:hover {
  background: darken(#f49524, 10%);
}

.select-block {
  margin-top: 22px;
}
</style>
