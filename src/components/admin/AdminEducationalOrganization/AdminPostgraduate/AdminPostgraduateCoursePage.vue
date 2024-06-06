<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="postgraduateCourse" :model="postgraduateCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <el-form-item label="Вопросы для подготовки к кандидатскому экзамену">
                <FileUploader :file-info="postgraduateCourse.questionsFile" />
              </el-form-item>
              <el-form-item label="Аннотации рабочих программ дисциплин">
                <FileUploader :file-info="postgraduateCourse.annotation" />
              </el-form-item>
              <el-form-item label="Образовательная программа">
                <FileUploader :file-info="postgraduateCourse.programFile" />
              </el-form-item>
              <el-form-item label="Календарный учебный график">
                <FileUploader :file-info="postgraduateCourse.calendar" />
              </el-form-item>
              <el-button @click="postgraduateCourse.addPostgraduateCoursePlan()"> Добавить учебный план </el-button>
              <el-table :data="postgraduateCourse.postgraduateCoursePlans">
                <el-table-column label="Год" sortable>
                  <template #default="scope">
                    <DatePicker v-model="scope.row.year" />
                  </template>
                </el-table-column>
                <el-table-column label="Учебный план" sortable width="300px">
                  <template #default="scope">
                    <FileUploader :file-info="scope.row.plan" />
                  </template>
                </el-table-column>
                <el-table-column width="50" fixed="right" align="center">
                  <template #default="scope">
                    <TableButtonGroup
                      :show-remove-button="true"
                      @remove="
                        $classHelper.RemoveFromClassByIndex(
                          scope.$index,
                          postgraduateCourse.postgraduateCoursePlans,
                          postgraduateCourse.postgraduateCoursePlansForDelete
                        )
                      "
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-card>

            <el-card class="content-card">
              <template #header> Квалификация </template>
              <el-form-item prop="description">
                <WysiwygEditor v-model="postgraduateCourse.description" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Расписание курсов </template>
              <el-button @click="postgraduateCourse.addDates()"> Добавить даты </el-button>
              <el-form-item prop="publishedOn">
                <el-table :data="postgraduateCourse.postgraduateCoursesDates">
                  <el-table-column label="Начало" sortable>
                    <template #default="scope">
                      <DatePicker v-model="scope.row.start" />
                    </template>
                  </el-table-column>
                  <el-table-column label="Конец" sortable>
                    <template #default="scope">
                      <DatePicker v-model="scope.row.end" />
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="
                          $classHelper.RemoveFromClassByIndex(
                            scope.$index,
                            postgraduateCourse.postgraduateCoursesDates,
                            postgraduateCourse.postgraduateCoursesDatesForDelete
                          )
                        "
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Преподаватели </template>
              <el-form-item prop="listeners">
                <el-table :data="postgraduateCourse.postgraduateCoursesTeachers">
                  <el-table-column label="ФИО" sortable>
                    <template #default="scope">
                      {{ scope.row.teacher.doctor.employee.human.getFullName() }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Руководитель программы" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="postgraduateCourse.setMainTeacher(scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="
                          $classHelper.RemoveFromClassByIndex(
                            scope.$index,
                            postgraduateCourse.postgraduateCoursesTeachers,
                            postgraduateCourse.postgraduateCoursesTeachersForDelete
                          )
                        "
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Специализации </template>
              <el-form-item prop="listeners">
                <el-table :data="postgraduateCourse.postgraduateCoursesSpecializations">
                  <el-table-column label="Название" sortable>
                    <template #default="scope">
                      {{ scope.row.specialization.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Выбрать главную" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="postgraduateCourse.setMainSpecialization(scope.$index)" />
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
              <template #header> Форма обучения </template>
              <el-input v-model="postgraduateCourse.educationForm" />
            </el-card>
            <el-card>
              <template #header> Нормативный срок обучения </template>
              <el-input-number v-model="postgraduateCourse.years" /> года
            </el-card>
            <el-card>
              <template #header> Стоимость </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="postgraduateCourse.cost" />
              </el-form-item>
            </el-card>
            <el-card>
              <el-container direction="vertical">
                <el-select
                  v-model="postgraduateCourse.formPattern"
                  value-key="id"
                  placeholder="Выбрать форму для записи"
                  label="Шаблон формы"
                  @change="changeFormPatternHandler()"
                >
                  <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item" />
                </el-select>
              </el-container>
            </el-card>
            <el-card>
              <template #header> Специальности </template>
              <el-checkbox
                v-for="specialization in specializations"
                :key="specialization.id"
                :model-value="postgraduateCourse.findSpecialization(specialization.id)"
                @change="postgraduateCourse.addSpecialization(specialization)"
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
import { computed, ComputedRef, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Form from '@/classes/Form';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import FileUploader from '@/components/FileUploader.vue';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import PageSection from '@/services/classes/page/PageSection';
import ISearchObject from '@/services/interfaces/ISearchObject';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPostgraduateCoursePage',
  components: {
    WysiwygEditor,
    TableButtonGroup,
    FileUploader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const filterQuery: ComputedRef<FilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const postgraduateCourse: ComputedRef<PostgraduateCourse> = computed<PostgraduateCourse>(
      () => store.getters['postgraduateCourses/item']
    );
    const specializations: ComputedRef<Specialization[]> = computed<Specialization[]>(() => store.getters['specializations/items']);
    const selectedTeacher: ComputedRef<Teacher> = computed<Teacher>(() => store.getters['teachers/item']);
    const formPatterns: ComputedRef<Form[]> = computed<Form[]>(() => store.getters['formPatterns/items']);
    const documentTypes: ComputedRef<PageSection[]> = computed<PageSection[]>(() => store.getters['documentTypes/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('teachers/getAll');
      await store.dispatch('specializations/getAll');
      await store.dispatch('formPatterns/getAll');
      await store.dispatch('documentTypes/getAll');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        await store.dispatch('postgraduateCourses/get', filterQuery.value);
        store.commit('admin/setHeaderParams', {
          title: `Программа аспирантуры по специальности "${postgraduateCourse.value.getMainSpecialization().name}"`,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('postgraduateCourses/resetItem');
        store.commit('admin/setHeaderParams', { title: 'Добавить программу', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(postgraduateCourse, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!route.params['id']) {
        await store.dispatch('postgraduateCourses/create', postgraduateCourse.value);
        await router.push(`/admin/postgraduate-courses`);
        return;
      }
      await store.dispatch('postgraduateCourses/update', postgraduateCourse.value);
      next ? next() : await router.push(`/admin/postgraduate-courses`);
    };

    const addTeacher = async (searchObject: ISearchObject) => {
      await store.dispatch('teachers/get', searchObject.id);
      postgraduateCourse.value.addTeacher(selectedTeacher.value);
      store.commit('teachers/resetItem');
    };

    const changeFormPatternHandler = () => {
      postgraduateCourse.value.formPatternId = postgraduateCourse.value.formPattern.id;
    };
    const changeDocumentTypeHandler = () => {
      // postgraduateCourse.value.documentTypeId = postgraduateCourse.value.documentType.id;
    };
    return {
      documentTypes,
      specializations,

      addTeacher,
      mounted,
      submit,
      postgraduateCourse,
      form,
      formPatterns,
      changeFormPatternHandler,
      changeDocumentTypeHandler,
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
