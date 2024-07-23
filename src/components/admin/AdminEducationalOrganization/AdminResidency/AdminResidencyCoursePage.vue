<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="residencyCourse" :model="residencyCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <SetEntity
                :search-key="Employee.GetClassName()"
                label="Выбрать руководителя"
                :entity-name="residencyCourse.mainTeacher.human.getFullName()"
                @select-search="selectMainTeacherSearch"
                @reset="residencyCourse.resetMainTeacher()"
              />
            </el-card>
            <el-card class="content-card">
              <template #header> Описание </template>
              <el-form-item prop="description">
                <WysiwygEditor v-model="residencyCourse.description" />
              </el-form-item>
            </el-card>
            <el-card>
              <el-form-item label="Основная профессиональная программа Высшего образования">
                <FileUploader :file-info="residencyCourse.program" />
              </el-form-item>
              <el-form-item label="Аннотации рабочих программ дисциплин">
                <FileUploader :file-info="residencyCourse.annotation" />
              </el-form-item>
              <el-form-item label="График учебного процесса">
                <FileUploader :file-info="residencyCourse.schedule" />
              </el-form-item>
              <el-form-item label="Учебный план">
                <FileUploader :file-info="residencyCourse.plan" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Основная профессиональная программа Высшего образования </template>
            </el-card>
            <el-card>
              <template #header> Специализации </template>
              <el-form-item prop="listeners">
                <el-table :data="residencyCourse.residencyCoursesSpecializations">
                  <el-table-column label="Название" sortable>
                    <template #default="scope">
                      {{ scope.row.specialization.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Выбрать главную" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="residencyCourse.setMainSpecialization(scope.$index)" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-card>
            <AdminResidencyCoursePracticePlaces />
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <el-card>
              <template #header> Количество бюджетных мест </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.freePlaces" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Количество бюджетных мест из федерального бюджета </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.freeGovernmentPlaces" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Количество платных мест </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.paidPlaces" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Стоимость </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.cost" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Шаблон формы </template>
              <el-select
                v-model="residencyCourse.formPattern"
                value-key="id"
                placeholder="Шаблон формы"
                @change="changeFormPatternHandler()"
              >
                <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item" />
              </el-select>
            </el-card>
            <el-card>
              <template #header> Выбрать специальности, для которых читается программа </template>
              <el-checkbox
                v-for="specialization in specializations"
                :key="specialization.id"
                :model-value="residencyCourse.findSpecialization(specialization.id)"
                @change="residencyCourse.addSpecialization(specialization)"
              >
                {{ specialization.name }}
              </el-checkbox>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import Employee from '@/classes/Employee';
import Form from '@/classes/Form';
import ResidencyCourse from '@/classes/ResidencyCourse';
import Specialization from '@/classes/Specialization';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';

const residencyCourse: ResidencyCourse = ResidencyCoursesStore.Item();
const specializations: Specialization[] = SpecializationsStore.Items();
const formPatterns: Form[] = FormPatternsStore.Items();

const load = async () => {
  await SpecializationsStore.GetAll();
  await FormPatternsStore.GetAll();
  await ResidencyCoursesStore.Get(Router.Id());
};

Hooks.onBeforeMount(load, {
  adminHeader: {
    title: computed(() => (Router.Id() ? residencyCourse.getMainSpecialization().name : 'Добавить программу')),
    showBackButton: true,
    buttons: [{ action: Hooks.submit() }],
  },
});
Hooks.onBeforeRouteLeave(Hooks.submit);

const changeFormPatternHandler = () => {
  residencyCourse.formPatternId = residencyCourse.formPattern.id;
};

const employee: Employee = EmployeesStore.Item();
const selectMainTeacherSearch = async (searchObject: ISearchObject) => {
  await EmployeesStore.Get(searchObject.value);
  residencyCourse.setMainTeacher(employee);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: scroll;
}

.files-block {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 10px 0;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
