<template>
  <div class="questions-container">
    <h4 v-if="questionNum === 1">Вы подаёте заявление на платное обучение?</h4>
    <h4 v-if="questionNum === 2">Вы подаёте заявление на приоритетную или дополнительную специальность?</h4>
    <h4 v-if="questionNum === 3">Вы проходили первичную аккредитацию?</h4>
    <div v-if="questionNum !== 0">
      <button class="select" @click.prevent="answer(true)">Да</button>
      <button class="select_dont" @click.prevent="answer(false)">Нет</button>
    </div>
    <div v-if="questionNum === 0 && residencyApplication.primaryAccreditationPoints">
      <el-form-item
        label="Баллы первичной аккредитации"
        prop="primaasdfasdfryAccreditationPoints"
        :rules="rules.primaryAccreditationPoints"
      >
        <el-input-number v-model="residencyApplication.primaryAccreditationPoints">Баллы первичной аккредитации</el-input-number>
      </el-form-item>
      <el-form-item label="Первичная аккредитация пройдена в: " prop="primaryAccreditationPlace" :rules="rules.primaryAccreditationPlace">
        <el-input v-model="residencyApplication.primaryAccreditationPlace">Первичная аккредитация пройдена в: </el-input>
      </el-form-item>
    </div>
    <div v-if="questionNum === 0 && !residencyApplication.primaryAccreditationPoints">
      <el-form-item label="Вступительные испытания прохожу в:" prop="primaryAccreditationPlace" :rules="rules.primaryAccreditationPlace">
        <el-input v-model="residencyApplication.primaryAccreditationPlace" placeholder="Вступительные испытания прохожу в:" />
      </el-form-item>
    </div>
    <button v-if="questionNum === 0" class="select" @click.prevent="allAnswered()">Подтвердить</button>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import IResidencyApplication from '@/interfaces/IResidencyApplication';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'AdmissionQuestionsForm',
  emits: ['allQuestionsAnswered'],
  setup(props, { emit }) {
    const residencyApplication: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );
    const questionNum: Ref<number> = ref(1);

    const rules = {
      primaryAccreditationPoints: [{ required: true, message: 'Пожалуйста, укажите баллы первичной аккредитации', trigger: 'blur' }],
      primaryAccreditationPlace: [{ required: true, message: 'Пожалуйста, укажите место первичной аккредитации', trigger: 'blur' }],
    };

    const answer = (result: boolean) => {
      if (questionNum.value === 1) {
        residencyApplication.value.paid = result;
        questionNum.value++;
        return;
      }
      if (questionNum.value === 2) {
        residencyApplication.value.main = result;
        questionNum.value++;
        return;
      }
      if (questionNum.value === 3) {
        residencyApplication.value.primaryAccreditation = result;
        questionNum.value = 0;
      }
    };

    const allAnswered = async () => {
      emit('allQuestionsAnswered');
    };

    return {
      rules,
      residencyApplication,
      answer,
      allAnswered,
      questionNum,
    };
  },
});
</script>

<style lang="scss" scoped>
.questions-container {
  text-align: center;
}

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
  &:hover {
    cursor: pointer;
  }
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
  &:hover {
    cursor: pointer;
  }
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
