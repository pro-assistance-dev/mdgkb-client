<template>
  <el-form-item label="Выберите специальность для подачи заявления" prop="main" :rules="rules.main">
    <el-radio-group v-model="residencyApplicationValue.main" @change="checkTypeExists">
      <el-radio :label="true" size="large">Основная</el-radio>
      <el-radio :label="false" size="large">Дополнительная</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Выберите основу финансирования" prop="paid" :rules="rules.paid">
    <el-radio-group :model-value="residencyApplicationValue.paid" @change="selectPaid">
      <el-radio :label="false" size="large">На места, финансируемые за счет средств бюджета города Москвы (целевая
        ординатура ДЗМ)</el-radio>
      <el-radio :label="true" size="large">По договорам о платных образовательных услугах</el-radio>
    </el-radio-group>
    <div v-for="field in residencyApplicationValue.formValue.getFieldsByCodes(['ContractDzm'])" :key="field.id">
      <div v-if="residencyApplicationValue.formValue.findFieldValue(field.id)?.file?.fileSystemPath">
        <div style="margin-top: 10px">
          <span><b> Загрузите договор </b></span>
          <span>
            <FileUploader :file-info="residencyApplicationValue.formValue.findFieldValue(field.id).file" />
          </span>
        </div>
      </div>
    </div>
  </el-form-item>
  <el-form-item label="Вы проходили первичную аккредитацию?" prop="primaryAccreditation"
    :rules="rules.primaryAccreditation">
    <el-radio-group v-model="residencyApplicationValue.primaryAccreditation" @change="selectAccreditation()">
      <el-radio :label="true" size="large">Да</el-radio>
      <el-radio :label="false" size="large">Нет</el-radio>
    </el-radio-group>
  </el-form-item>
  <template v-if="residencyApplicationValue.primaryAccreditation">
    <el-form-item label="В каком году проходили вступительные испытания?">
      <el-select v-model="selectedYear" placeholder="Выберите год">
        <el-option v-for="year in years" :key="year" :label="year" :value="year" />
      </el-select>
    </el-form-item>
    <template v-if="selectedYear && selectedYear > 2022">
      <el-form-item label="Первичная аккредитация пройдена в: " prop="primaryAccreditationPlace"
        :rules="rules.primaryAccreditationPlace">
        <el-input v-model="residencyApplicationValue.primaryAccreditationPlace">Первичная аккредитация пройдена в:
        </el-input>
      </el-form-item>
      <el-form-item label="Баллы первичной аккредитации" prop="primaryAccreditationPoints">
        <el-input-number v-model="residencyApplicationValue.primaryAccreditationPoints">Баллы первичной
          аккредитации</el-input-number>
      </el-form-item>
      <el-form-item :rules="rules.primaryAccreditationApplication">
        <FieldValueFile required :form="residencyApplicationValue.formValue"
          :field="residencyApplicationValue.formValue.getFieldByCode('PrimaryAccreditationApplication')" />
      </el-form-item>
    </template>
    <template v-else="selectedYear && selectedYear < 2023">
      <el-form-item label="Где проходите вступительные испытания?" prop="primaryAccreditation"
        :rules="rules.primaryAccreditation">
        <el-radio-group v-model="residencyApplicationValue.mdgkbExam">
          <el-radio :label="true" size="large">Морозовской больнице</el-radio>
          <el-radio :label="false" size="large">В другом месте (указать)</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="residencyApplicationValue.mdgkbExam">
        <el-form-item label="Указать программу специалитета, по которой сдаются вступительные экзамены: "
          prop="entranceExamSpecialisation" :rules="rules.entranceExamSpecialisation">
          <el-input v-model="residencyApplicationValue.entranceExamSpecialisation" />
        </el-form-item>
        <el-form-item>
          <FieldValueFile :form="residencyApplicationValue.formValue"
            :field="residencyApplicationValue.formValue.getFieldByCode('MdgkbExamApplication')" />
        </el-form-item>
      </template>
      <template v-if="!residencyApplicationValue.mdgkbExam && residencyApplicationValue.mdgkbExam !== undefined">
        <el-form-item label="Вступительные испытания прохожу в: " prop="primaryAccreditationPlace"
          :rules="rules.primaryAccreditationPlace">
          <el-input v-model="residencyApplicationValue.primaryAccreditationPlace">Вступительные экзамены прохожу в:
          </el-input>
        </el-form-item>
        <el-form-item>
          <FieldValueFile :form="residencyApplicationValue.formValue"
            :field="residencyApplicationValue.formValue.getFieldByCode('ExamPlaceApplication')" />
        </el-form-item>
        <el-form-item label="Баллы вступительных испытаний (если баллы неизвестны - поставьте 0)"
          prop="primaryAccreditationPoints">
          <el-input-number v-model="residencyApplicationValue.primaryAccreditationPoints" min="0" />
        </el-form-item>
        <el-form-item>
          <FieldValueFile :form="residencyApplicationValue.formValue"
            :field="residencyApplicationValue.formValue.getFieldByCode('MdgkbExamPointsApplication')" />
        </el-form-item>
      </template>
    </template>
  </template>
  <template v-else>
  </template>

  <el-dialog v-model="showFreeDialog"
    title="Для выбора бесплатного обучения нужно загрузить 1. Гарантийное письмо 2. Целевой договор (специалитет) ИЛИ Справку о работе в медицинской организации"
    width="40%">
    <div v-for="field in residencyApplicationValue.formValue.getFieldsByCodes(['ContractDzm'])" :key="field.id">
      123
      <div style="margin-top: 10px">
        <span><b> Загрузите гарантийное письмо </b></span><span>
          <FileUploader :file-info="residencyApplicationValue.formValue.findFieldValue(field.id).file" />
        </span>
      </div>

      <div class="text-align-right margin-top-1">
        <el-button @click="showFreeDialog = false">Отмена</el-button>
        <el-button v-if="showUploadButton" type="primary" @click="submitFreeFile">
          Подтвердить загрузку
        </el-button>
      </div>
    </div>

    <span class="dialog-footer"> </span>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import "element-plus/theme-chalk/src/message-box.scss";
import ResidencyApplication from '@/classes/ResidencyApplication';
import FieldValueFile from '@/components/Educational/AdmissionCommittee/FieldValueFile.vue';
import FileUploader from '@/components/FileUploader.vue';

const props = defineProps({
  residencyApplication: {
    type: Object as PropType<ResidencyApplication>,
    required: true,
  },
})
const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
const selectedYear = ref(undefined)

const emits = defineEmits(['allQuestionsAnswered'])
const residencyApplicationValue = ref(new ResidencyApplication());

const showUploadButton = (): boolean => {
  //если загрузил
  // residencyApplicationValue.formValue.findFieldValue(field.id).file.fileSystemPath
  return true
}

onBeforeMount(() => {
  residencyApplicationValue.value = props.residencyApplication;
});

const selectAccreditation = () => {
  if (residencyApplicationValue.value.primaryAccreditation === false) {
    console.log(residencyApplicationValue.value.primaryAccreditation)
    PHelp.Notification().Error("Прохождение всех этапов первичной аккредитации – обязательное условия поступления в ординатуру с 2017 года")
    // ElMessage("Прохождение всех этапов первичной аккредитации – обязательное условия поступления в ординатуру с 2017 года")
    residencyApplicationValue.value.primaryAccreditation = undefined
  }
}

// const sele = () => {
//   if (residencyApplicationValue.value.primaryAccreditation === false) {
//     console.log(residencyApplicationValue.value.primaryAccreditation)
//     // Message.Error("Прохождение всех этапов первичной аккредитации – обязательное условия поступления в ординатуру с 2017 года")
//     ElMessage("Прохождение всех этапов первичной аккредитации – обязательное условия поступления в ординатуру с 2017 года")
//     residencyApplicationValue.value.primaryAccreditation = undefined
//   }
// }

const showFreeDialog: Ref<boolean> = ref(false);
const rules = {
  primaryAccreditation: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'change' }],
  main: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'change' }],
  paid: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'change' }],
  primaryAccreditationPoints: [{ required: true, message: 'Пожалуйста, укажите баллы первичной аккредитации', trigger: 'blur' }],
  primaryAccreditationPlace: [{ required: true, message: 'Пожалуйста, укажите место первичной аккредитации', trigger: 'blur' }],
  entranceExamSpecialisation: [
    {
      required: true,
      message: 'Пожалуйста, укажите программу специалитета, по которой сдаются вступительные экзамены',
      trigger: 'blur',
    },
  ],
  primaryAccreditationApplication: [{ required: true, message: 'Пожалуйста, приложите заявление', trigger: 'change' }],
};

const setFreeApplication = async () => {
  PHelp.Dialog().Show({
    text: "Для выбора бесплатного обучения нужно загрузить Договор с Департаментом здравоохранения города Москвы",
    confirmButtonText: 'Загрузить',
    cancelButtonText: 'Выбрать платное',
  })
    .then(() => {
      showFreeDialog.value = true;
    })
    .catch(() => {
      residencyApplicationValue.value.paid = true;
    });
};

const selectPaid = async (paid: boolean) => {
  if (paid) {
    residencyApplicationValue.value.paid = true;
    return;
  }
  await setFreeApplication();
};

const submitFreeFile = () => {
  residencyApplicationValue.value.paid = false;
  showFreeDialog.value = false;
};

const checkTypeExists = async (value: boolean) => {
  // TODO: добавить условия
  // await Provider.store.dispatch('residencyApplications/typeExists', value);
  // if (typeExists.value) {
  //   ElMessageBox.alert(`Вы уже подавали заявление на ${value ? 'приоритетную' : 'дополнительную'} специальность`, {
  //     confirmButtonText: 'OK',
  //     callback: () => {
  //       residencyApplicationValue.value.main = !value;
  //     },
  //   });
  //   return;
  // }
};

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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

.text-align-right {
  text-align: right;
}

.margin-top-1 {
  margin-top: 1rem;
}

.el-form-item {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
