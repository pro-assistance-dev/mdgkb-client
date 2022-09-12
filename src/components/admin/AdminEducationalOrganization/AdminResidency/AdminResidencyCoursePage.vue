<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="residencyCourse" :model="residencyCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
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
              <template #header>Основная профессиональная программа Высшего образования </template>
              <div class="files-block">
                <el-form-item label="Год начала">
                  <el-select v-model="residencyCourse.startYearId">
                    <el-option v-for="year in educationYears" :key="year.id" :label="year.year.getFullYear()" :value="year.id"> </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Год конца">
                  <el-select v-model="residencyCourse.endYearId">
                    <el-option v-for="year in educationYears" :key="year.id" :label="year.year.getFullYear()" :value="year.id"> </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-card>
            <el-card class="content-card">
              <template #header>Описание</template>
              <el-form-item prop="description">
                <WysiwygEditor v-model:content="residencyCourse.description" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Преподаватели</template>
              <el-form-item prop="listeners">
                <RemoteSearch :key-value="schema.teacher.key" @select="addTeacher" />
                <el-table :data="residencyCourse.residencyCoursesTeachers">
                  <el-table-column label="ФИО" sortable>
                    <template #default="scope">
                      {{ scope.row.teacher.doctor.human.getFullName() }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Руководитель программы" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="residencyCourse.setMainTeacher(scope.$index)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="
                          removeFromClass(
                            scope.$index,
                            residencyCourse.residencyCoursesTeachers,
                            residencyCourse.residencyCoursesTeachersForDelete
                          )
                        "
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Специализации</template>
              <el-form-item prop="listeners">
                <!--                <RemoteSearch :key-value="schema.teacher.key" @select="addTeacher" />-->
                <el-table :data="residencyCourse.residencyCoursesSpecializations">
                  <el-table-column label="Название" sortable>
                    <template #default="scope">
                      {{ scope.row.specialization.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Выбрать главную" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="residencyCourse.setMainSpecialization(scope.$index)"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <el-card>
              <template #header>Количество бюджетных мест</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.freePlaces" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Количество бюджетных мест из федерального бюджета</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.freeGovernmentPlaces" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Количество платных мест</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.paidPlaces" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Стоимость</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.cost" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Шаблон формы</template>
              <el-select
                v-model="residencyCourse.formPattern"
                value-key="id"
                placeholder="Шаблон формы"
                @change="changeFormPatternHandler()"
              >
                <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
              </el-select>
            </el-card>
            <el-card>
              <template #header>Выбрать специальности, для которых читается программа </template>
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

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import FileUploader from '@/components/FileUploader.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IEducationYear from '@/interfaces/IEducationYear';
import IForm from '@/interfaces/IForm';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseTeacher from '@/interfaces/IResidencyCourseTeacher';
import ISearchObject from '@/interfaces/ISearchObject';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import removeFromClass from '@/services/removeFromClass';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminResidencyCoursePage',
  components: {
    FileUploader,
    RemoteSearch,
    WysiwygEditor,
    TableButtonGroup,
  },
  setup() {
    const residencyCourse: ComputedRef<IResidencyCourse> = computed<IResidencyCourse>(
      () => Provider.store.getters['residencyCourses/item']
    );
    const specializations: ComputedRef<ISpecialization[]> = computed<ISpecialization[]>(
      () => Provider.store.getters['specializations/items']
    );
    const selectedTeacher: ComputedRef<ITeacher> = computed<ITeacher>(() => Provider.store.getters['teachers/item']);
    const formPatterns: ComputedRef<IForm[]> = computed<IForm[]>(() => Provider.store.getters['formPatterns/items']);
    const educationYears: ComputedRef<IEducationYear[]> = computed<IEducationYear[]>(() => Provider.store.getters['educationYears/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await Provider.store.dispatch('teachers/getAll');
      await Provider.store.dispatch('educationYears/getAll');
      await Provider.store.dispatch('specializations/getAll');
      await Provider.store.dispatch('search/searchGroups');
      await Provider.store.dispatch('formPatterns/getAll');
      await loadItem();
    };

    const loadItem = async () => {
      if (Provider.route().params['id']) {
        Provider.store.commit(`filter/resetQueryFilter`);
        Provider.filterQuery.value.setParams(Provider.schema.value.residencyCourse.id, Provider.route().params['id'] as string);
        await Provider.store.dispatch('residencyCourses/get', Provider.filterQuery.value);
        Provider.store.commit('admin/setHeaderParams', {
          title: residencyCourse.value.getMainSpecialization().name,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        Provider.store.commit('residencyCourses/resetItem');
        if (Provider.route().meta.isNmo) Provider.store.commit('residencyCourses/setIsNmo', true);
        Provider.store.commit('admin/setHeaderParams', {
          title: 'Добавить программу',
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(residencyCourse, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(load);

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(Provider.form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!Provider.route().params['id']) {
        await Provider.store.dispatch('residencyCourses/create', residencyCourse.value);
        await Provider.router.push(`/admin/residency/courses`);
        return;
      }
      await Provider.store.dispatch('residencyCourses/update', residencyCourse.value);
      next ? next() : await Provider.router.push(`/admin/residency/courses`);
    };

    const addTeacher = async (searchObject: ISearchObject) => {
      const teacherExists = !!residencyCourse.value.residencyCoursesTeachers.find(
        (courseTeacher: IResidencyCourseTeacher) => courseTeacher.teacherId === searchObject.id
      );

      if (teacherExists) {
        ElMessage({ message: 'Выбранный преподаватель уже добавлен', type: 'error' });
        return;
      }
      await Provider.store.dispatch('teachers/get', searchObject.id);
      residencyCourse.value.addTeacher(selectedTeacher.value);
      Provider.store.commit('teachers/resetItem');
    };

    const changeFormPatternHandler = () => {
      // residencyCourse.value.formPatternId = residencyCourse.value.formPattern.id
    };

    return {
      educationYears,
      specializations,
      removeFromClass,
      addTeacher,
      schema: Provider.schema,
      mounted: Provider.mounted,
      submit,
      residencyCourse,
      form: Provider.form,
      formPatterns,
      changeFormPatternHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
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
