<template>
  <div class="tools-buttons"><button class="admin-add" @click.prevent="addEducation">+ Добавить</button></div>
  <div v-for="(education, i) in educations" :key="education.id" class="container">
    <button class="admin-del" @click.prevent="removeEducation(i)">Удалить</button>
    <div class="list-number">{{ i + 1 }}</div>
    <el-form-item label="Учебное заведение" :prop="'educations.' + i + '.institution'" :rules="rules.institution">
      <el-input v-model="education.institution" />
    </el-form-item>
    <div class="column-block">
      <div class="column-item">
        <el-form-item label="Тип образования" :prop="'educations.' + i + '.type'" :rules="rules.type">
          <el-select v-model="education.type" placeholder="Выберите тип">
            <el-option label="Основное образование" :value="'Основное образование'"></el-option>
            <el-option label="Дополнительно образование" :value="'Дополнительно образование'"></el-option>
            <el-option label="Специалитет" :value="'Специалитет'"></el-option>
            <el-option label="Интернатура" :value="'Интернатура'"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column-item2">
        <el-form-item label="Диплом" :prop="'educations.' + i + '.document'" :rules="rules.document">
          <el-input v-model="education.document" />
        </el-form-item>
      </div>
    </div>
    <div class="bottom-block">
      <div
        class="certification"
        :style="{
          background: !education.educationCertification ? '' : '#F9FAFB',
          padding: !education.educationCertification ? '0 10px' : '',
        }"
      >
        <div class="bottom-buttons">
          <div class="title" :style="{ color: !education.educationCertification ? '#c4c4c4' : '#303133' }">Сертификация</div>
          <button v-if="!education.educationCertification" class="admin-add2" @click="addCertification(i)">+ Добавить</button>
          <button v-if="education.educationCertification" class="admin-del2" @click="removeCertification(i)">Удалить</button>
        </div>
        <div v-if="education.educationCertification">
          <div class="column-block">
            <div class="column-item">
              <el-form-item
                label="Специальность"
                :prop="'educations.' + i + '.educationCertification.specialization'"
                :rules="rules.specialization"
              >
                <el-input v-model="education.educationCertification.specialization" />
              </el-form-item>
            </div>
            <div class="column-item2">
              <el-form-item label="Диплом" :prop="'educations.' + i + '.educationCertification.document'" :rules="rules.document">
                <el-input v-model="education.educationCertification.document" />
              </el-form-item>
            </div>
          </div>
          <el-form-item
            label="Образовательное учреждение"
            :prop="'educations.' + i + '.educationCertification.place'"
            :rules="rules.educationCertificationPlace"
          >
            <el-input v-model="education.educationCertification.place" />
          </el-form-item>
          <div class="column-block">
            <div class="column-item3">
              <el-form-item
                label="Дата проведения"
                :prop="'educations.' + i + '.educationCertification.certificationDate'"
                :rules="rules.certificationDate"
              >
                <DatePicker v-model="education.educationCertification.certificationDate" />
              </el-form-item>
            </div>
            <div class="column-item3">
              <el-form-item
                label="Дата окончания действия"
                :prop="'educations.' + i + '.educationCertification.endDate'"
                :rules="rules.endDate"
              >
                <DatePicker v-model="education.educationCertification.endDate" />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div
        class="accreditation"
        :style="{
          background: !education.educationAccreditation ? '' : '#F9FAFB',
          padding: !education.educationAccreditation ? '0 10px' : '',
        }"
      >
        <div class="bottom-buttons">
          <div class="title" :style="{ color: !education.educationAccreditation ? '#c4c4c4' : '#303133' }">Аккредитация</div>
          <button v-if="!education.educationAccreditation" class="admin-add2" @click="addAccreditation(i)">+ Добавить</button>
          <button v-if="education.educationAccreditation" class="admin-del2" @click="removeAccreditation(i)">Удалить</button>
        </div>
        <div v-if="education.educationAccreditation">
          <div class="column-block">
            <div class="column-item">
              <el-form-item
                label="Специальность"
                :prop="'educations.' + i + '.educationAccreditation.specialization'"
                :rules="rules.specialization"
              >
                <el-input v-model="education.educationAccreditation.specialization" />
              </el-form-item>
            </div>
            <div class="column-item2">
              <el-form-item label="Диплом" :prop="'educations.' + i + '.educationAccreditation.document'" :rules="rules.document">
                <el-input v-model="education.educationAccreditation.document" />
              </el-form-item>
            </div>
          </div>
          <div class="column-block">
            <div class="column-item3">
              <el-form-item
                label="Дата проведения"
                :prop="'educations.' + i + '.educationAccreditation.startDate'"
                :rules="rules.startDate"
              >
                <DatePicker v-model="education.educationAccreditation.startDate" />
              </el-form-item>
            </div>
            <div class="column-item3">
              <el-form-item
                label="Дата окончания действия"
                :prop="'educations.' + i + '.educationAccreditation.endDate'"
                :rules="rules.endDate"
              >
                <DatePicker v-model="education.educationAccreditation.endDate" />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import DatePicker from '@/components/DatePicker.vue';

export default defineComponent({
  name: 'EducationForm',
  components: { DatePicker },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const form = ref();

    const educations = computed(() => store.getters[`${props.storeModule}/educations`]);

    const addEducation = () => {
      store.commit(`${props.storeModule}/addEducation`);
    };

    const removeEducation = (educationIndex: number) => {
      store.commit(`${props.storeModule}/removeEducation`, educationIndex);
    };

    const addCertification = (educationIndex: string) => {
      store.commit(`${props.storeModule}/addCertification`, educationIndex);
    };

    const removeCertification = (educationIndex: string) => {
      store.commit(`${props.storeModule}/removeCertification`, educationIndex);
    };

    const addAccreditation = (educationIndex: string) => {
      store.commit(`${props.storeModule}/addAccreditation`, educationIndex);
    };

    const removeAccreditation = (educationIndex: string) => {
      store.commit(`${props.storeModule}/removeAccreditation`, educationIndex);
    };

    const rules = ref({
      educationCertificationPlace: [
        { required: true, message: 'Поле "ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ" не может быть пустым', trigger: 'change' },
      ],
      institution: [{ required: true, message: 'Поле "УЧЕБНОЕ ЗАВЕДЕНИЕ" не может быть пустым', trigger: 'change' }],
      type: [{ required: true, message: 'Поле "ТИП ОБРАЗОВАНИЯ" не может быть пустым', trigger: 'change' }],
      document: [{ required: true, message: 'Поле "ДИПЛОМ" не может быть пустым', trigger: 'change' }],
      specialization: [{ required: true, message: 'Поле "СПЕЦИАЛЬНОСТЬ" не может быть пустым', trigger: 'change' }],
      certificationDate: [{ required: true, message: 'Поле "ДАТА ПРОВЕДЕНИЯ" не может быть пустым', trigger: 'change' }],
      startDate: [{ required: true, message: 'Поле "ДАТА ПРОВЕДЕНИЯ" не может быть пустым', trigger: 'change' }],
      endDate: [{ required: true, message: 'Поле "ДАТА ОКОНЧАНИЯ ДЕЙСТВИЯ" не может быть пустым', trigger: 'change' }],
    });

    return {
      addCertification,
      removeCertification,
      addAccreditation,
      removeAccreditation,
      addEducation,
      removeEducation,
      educations,
      form,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.admin-del {
  position: absolute;
  top: 23px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.admin-del2 {
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del2:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
}

.container {
  position: relative;
  width: calc(100% - 62px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #dff2f8;
}

.column-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-item {
  width: 40%;
  margin-left: 0px;
}

.column-item2 {
  width: 60%;
  margin-left: 20px;
}

.column-item3 {
  width: 50%;
  margin-left: 20px;
}

.column-item3:first-child {
  width: 50%;
  margin-left: 0px;
}

.list-number {
  position: absolute;
  top: 20px;
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

.title {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #c4c4c4;
  margin: 10px;
}

.title2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #303133;
}

.certification {
  padding: 0 10px 20px 10px;
  margin: 20px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
}

.accreditation {
  padding: 0 10px 20px 10px;
  margin: 20px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}

@media screen and (max-width: 910px) {
  .column-block {
    display: block;
  }
  .column-item {
    width: 100%;
    margin-left: 0px;
  }
  .column-item2 {
    width: 100%;
    margin-left: 0px;
  }
  .column-item3 {
    width: 100%;
    margin-left: 0px;
  }

  .column-item3:first-child {
    width: 100%;
    margin-left: 0px;
  }
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
  .admin-del {
    position: absolute;
    top: 23px;
    right: 36px;
    border: none;
    background: inherit;
    color: #a3a9be;
    transition: 0.3s;
    cursor: pointer;
    padding: 1px 0px;
  }
  .bottom-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }
}
</style>
