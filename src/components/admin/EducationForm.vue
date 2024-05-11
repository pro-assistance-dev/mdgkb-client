<template>
  <div class="tools-buttons"><button class="admin-add" @click.prevent="employee.addEducation()">+ Добавить</button></div>
  <div v-for="(education, i) in employee.educations" :key="education.id" class="container">
    <button class="admin-del" @click.prevent="$classHelper.RemoveFromClassByIndex(i, employee.educations, employee.educationsForDelete)">
      Удалить
    </button>
    <div class="list-number">{{ i + 1 }}</div>
    <el-form-item label="Учебное заведение">
      <el-input v-model="education.institution" />
    </el-form-item>
    <div class="column-block">
      <div class="column-item">
        <el-form-item label="Тип образования" prop="human.isMale">
          <el-select v-model="education.type" placeholder="Выберите тип">
            <el-option label="Основное образование" :value="'Основное образование'"></el-option>
            <el-option label="Дополнительно образование" :value="'Дополнительно образование'"></el-option>
            <el-option label="Специалитет" :value="'Специалитет'"></el-option>
            <el-option label="Интернатура" :value="'Интернатура'"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column-item2">
        <el-form-item label="Диплом">
          <el-input v-model="education.document" />
        </el-form-item>
      </div>
    </div>
  </div>
  <div class="education-item" :style="{ background: employee.certifications.length ? '' : '#F9FAFB' }">
    <div class="bottom-buttons">
      <div class="title" :style="{ color: !employee.certifications.length ? '#c4c4c4' : '#303133' }">Сертификации</div>
      <button class="admin-add2" @click.prevent="employee.addCertification()">+ Добавить</button>
    </div>

    <div v-for="(certification, i) in employee.certifications" :key="certification" class="education-item-item">
      <button
        v-if="employee.certifications"
        class="admin-del"
        @click.prevent="$classHelper.RemoveFromClassByIndex(i, employee.certifications, employee.certificationsForDelete)"
      >
        Удалить
      </button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <div class="column-block">
        <div class="column-item">
          <el-form-item label="Специальность">
            <el-input v-model="certification.specialization" />
          </el-form-item>
        </div>
        <div class="column-item2">
          <el-form-item label="Диплом">
            <el-input v-model="certification.document" />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="Образовательное учреждение">
        <el-input v-model="certification.place" />
      </el-form-item>
      <div class="column-block">
        <div class="column-item3">
          <el-form-item label="Дата проведения">
            <DatePicker v-model="certification.certificationDate" />
          </el-form-item>
        </div>
        <div class="column-item3">
          <el-form-item label="Дата окончания действия">
            <DatePicker v-model="certification.endDate" />
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
  <div class="education-item" :style="{ background: employee.accreditations.length ? '' : '#F9FAFB' }">
    <div class="bottom-buttons">
      <div class="title" :style="{ color: !employee.accreditations.length ? '#c4c4c4' : '#303133' }">Аккредитации</div>
      <button class="admin-add2" @click.prevent="employee.addAccreditation()">+ Добавить</button>
    </div>

    <div v-for="(accreditation, i) in employee.accreditations" :key="accreditation" class="education-item-item">
      <button
        class="admin-del"
        @click.prevent="$classHelper.RemoveFromClassByIndex(i, employee.accreditations, employee.accreditaionsForDelete)"
      >
        Удалить
      </button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <div class="column-block">
        <div class="column-item">
          <el-form-item label="Специальность">
            <el-input v-model="accreditation.specialization" />
          </el-form-item>
        </div>
        <div class="column-item2">
          <el-form-item label="Диплом">
            <el-input v-model="accreditation.document" />
          </el-form-item>
        </div>
      </div>
      <div class="column-block">
        <div class="column-item3">
          <el-form-item label="Дата проведения">
            <DatePicker v-model="accreditation.startDate" />
          </el-form-item>
        </div>
        <div class="column-item3">
          <el-form-item label="Дата окончания действия">
            <DatePicker v-model="accreditation.endDate" />
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import Employee from '@/classes/Employee';
import DatePicker from '@/components/DatePicker.vue';

export default defineComponent({
  name: 'EducationForm',
  components: { DatePicker },
  props: {
    employee: {
      type: Object as PropType<Employee>,
      required: true,
    },
  },
  setup(props) {
    const form = ref();

    return {
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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

.education-item {
  width: calc(100% - 62px);
  position: relative;
  padding: 0 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  margin: 0px 20px 20px 20px;
  background: #dff2f8;
}

.contact-container {
  width: calc(100% - 62px);
  position: relative;
  padding: 0 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  margin: 0px 20px 20px 20px;
  background: #dff2f8;
}

.education-item-item {
  position: relative;
  width: calc(100% - 42px);
  margin: 0px 10px 20px 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
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

  .education-item {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }

  .education-item-item {
    width: calc(100% - 22px);
    margin: 0px 0px 20px 0px;
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
