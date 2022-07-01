<template>
  <el-form-item label="Вы подаёте заявление на платное обучение?" prop="paid" :rules="rules.paid">
    <el-radio-group v-model="residencyApplication.paid">
      <el-radio :label="true" size="large">Да</el-radio>
      <el-radio :label="false" size="large">Нет</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Вы подаёте заявление на приоритетную или дополнительную специальность?" prop="main" :rules="rules.main">
    <el-radio-group v-model="residencyApplication.main">
      <el-radio :label="true" size="large">Приоритетную</el-radio>
      <el-radio :label="false" size="large">Дополнительную</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Вы проходили первичную аккредитацию?" prop="primaryAccreditation" :rules="rules.primaryAccreditation">
    <el-radio-group v-model="residencyApplication.primaryAccreditation">
      <el-radio :label="true" size="large">Да</el-radio>
      <el-radio :label="false" size="large">Нет</el-radio>
    </el-radio-group>
  </el-form-item>
  <template v-if="residencyApplication.primaryAccreditation === undefined"></template>
  <template v-else-if="residencyApplication.primaryAccreditation">
    <el-form-item label="Первичная аккредитация пройдена в: " prop="primaryAccreditationPlace" :rules="rules.primaryAccreditationPlace">
      <el-input v-model="residencyApplication.primaryAccreditationPlace">Первичная аккредитация пройдена в: </el-input>
    </el-form-item>
    <el-form-item label="Баллы первичной аккредитации" prop="primaryAccreditationPoints" :rules="rules.primaryAccreditationPoints">
      <el-input-number v-model="residencyApplication.primaryAccreditationPoints" min="0">Баллы первичной аккредитации</el-input-number>
    </el-form-item>
  </template>
  <template v-else>
    <el-form-item label="Вступительные испытания прохожу в:" prop="primaryAccreditation" :rules="rules.primaryAccreditation">
      <el-radio-group v-model="residencyApplication.mdgkbExam">
        <el-radio :label="true" size="large">Морозовской больнице</el-radio>
        <el-radio :label="false" size="large">В другом месте (указать)</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="residencyApplication.mdgkbExam">
      <el-form-item
        label="Указать программу специалитета, по которой сдаются вступительные экзамены: "
        prop="entranceExamSpecialisation"
        :rules="rules.entranceExamSpecialisation"
      >
        <el-input v-model="residencyApplication.entranceExamSpecialisation" />
      </el-form-item>
    </template>
    <template v-if="!residencyApplication.mdgkbExam && residencyApplication.mdgkbExam !== undefined">
      <el-form-item label="Вступительные испытания прохожу в: " prop="primaryAccreditationPlace" :rules="rules.primaryAccreditationPlace">
        <el-input v-model="residencyApplication.primaryAccreditationPlace">Вступительные экзамены прохожу в: </el-input>
      </el-form-item>
      <el-form-item
        label="Баллы вступительных испытаний (если пройдены)"
        prop="primaryAccreditationPoints"
        :rules="rules.primaryAccreditationPoints"
      >
        <el-input-number v-model="residencyApplication.primaryAccreditationPoints" min="0" />
      </el-form-item>
    </template>
  </template>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import IResidencyApplication from '@/interfaces/IResidencyApplication';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'AdmissionQuestionsForm',
  emits: ['allQuestionsAnswered'],
  setup(props, { emit }) {
    const residencyApplication: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );

    const rules = {
      primaryAccreditation: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'blur' }],
      main: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'blur' }],
      paid: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'blur' }],
      primaryAccreditationPoints: [{ required: true, message: 'Пожалуйста, укажите баллы первичной аккредитации', trigger: 'blur' }],
      primaryAccreditationPlace: [{ required: true, message: 'Пожалуйста, укажите место первичной аккредитации', trigger: 'blur' }],
      entranceExamSpecialisation: [
        {
          required: true,
          message: 'Пожалуйста, укажите программу специалитета, по которой сдаются вступительные экзамены',
          trigger: 'blur',
        },
      ],
    };

    return {
      rules,
      residencyApplication,
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
