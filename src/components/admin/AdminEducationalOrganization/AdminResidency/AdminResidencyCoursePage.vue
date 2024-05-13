<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="residencyCourse" :model="residencyCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <SetEntity :search-key="Employee.GetClassName()" label="Выбрать руководителя"
                :entity-name="residencyCourse.mainTeacher.human.getFullName()" @select-search="selectMainTeacherSearch"
                @reset="residencyCourse.resetMainTeacher()" />
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
              <div class="files-block">
                <el-form-item label="Год начала">
                  <el-select v-model="residencyCourse.startYearId">
                    <el-option v-for="year in educationYears" :key="year.id" :label="year.year.getFullYear()"
                      :value="year.id" />
                  </el-select>
                </el-form-item>
                <el-form-item label="Год конца">
                  <el-select v-model="residencyCourse.endYearId">
                    <el-option v-for="year in educationYears" :key="year.id" :label="year.year.getFullYear()"
                      :value="year.id" />
                  </el-select>
                </el-form-item>
              </div>
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
                      <el-checkbox v-model="scope.row.main"
                        @change="residencyCourse.setMainSpecialization(scope.$index)" />
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
              <el-select v-model="residencyCourse.formPattern" value-key="id" placeholder="Шаблон формы"
                @change="changeFormPatternHandler()">
                <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item" />
              </el-select>
            </el-card>
            <el-card>
              <template #header> Выбрать специальности, для которых читается программа </template>
              <el-checkbox v-for="specialization in specializations" :key="specialization.id"
                :model-value="residencyCourse.findSpecialization(specialization.id)"
                @change="residencyCourse.addSpecialization(specialization)">
                {{ specialization.name }}
              </el-checkbox>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref } from 'vue';

import EducationYear from '@/classes/EducationYear';
import Employee from '@/classes/Employee';
import Form from '@/classes/Form';
import ResidencyCourse from '@/classes/ResidencyCourse';
import Specialization from '@/classes/Specialization';
import AdminResidencyCoursePracticePlaces from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyCoursePracticePlaces.vue';
import SetEntity from '@/components/admin/SetEntity.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import FileUploader from '@/components/FileUploader.vue';
import ClassHelper from '@/services/ClassHelper';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminResidencyCoursePage',
  components: {
    SetEntity,
    FileUploader,
    WysiwygEditor,
    AdminResidencyCoursePracticePlaces,
  },
  setup() {
    const residencyCourse: ComputedRef<ResidencyCourse> = computed<ResidencyCourse>(() => Provider.store.getters['residencyCourses/item']);
    const specializations: ComputedRef<Specialization[]> = computed<Specialization[]>(
      () => Provider.store.getters['specializations/items']
    );
    const formPatterns: ComputedRef<Form[]> = computed<Form[]>(() => Provider.store.getters['formPatterns/items']);
    const educationYears: ComputedRef<EducationYear[]> = computed<EducationYear[]>(() => Provider.store.getters['educationYears/items']);

    const load = async () => {
      await Provider.store.dispatch('educationYears/getAll');
      await Provider.store.dispatch('specializations/getAll');
      await Provider.store.dispatch('formPatterns/getAll');
      await Provider.loadItem(ClassHelper.GetPropertyName(ResidencyCourse).id);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? residencyCourse.value.getMainSpecialization().name : 'Добавить программу')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave(Hooks.submit);

    const changeFormPatternHandler = () => {
      residencyCourse.value.formPatternId = residencyCourse.value.formPattern.id;
    };

    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);
    const selectMainTeacherSearch = async (searchObject: ISearchObject) => {
      await Provider.store.dispatch('employees/get', searchObject.value);
      residencyCourse.value.setMainTeacher(employee.value);
    };

    return {
      educationYears,
      specializations,
      selectMainTeacherSearch,
      Employee,
      mounted: Provider.mounted,
      residencyCourse,
      form: Provider.form,
      formPatterns,
      changeFormPatternHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
