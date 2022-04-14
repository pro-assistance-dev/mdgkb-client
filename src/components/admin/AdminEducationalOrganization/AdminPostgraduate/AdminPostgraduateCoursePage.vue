<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="postgraduateCourse" :model="postgraduateCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <div class="files-block">
                <el-card>
                  <template #header>Вопросы для подготовки к кандидатскому экзамену </template>
                  <FileUploader :file-info="postgraduateCourse.questionsFile" />
                </el-card>
                <el-card>
                  <template #header>Образовательная программа</template>
                  <FileUploader :file-info="postgraduateCourse.programFile" />
                </el-card>
                <el-card>
                  <template #header>Календарный учебный график </template>
                  <FileUploader :file-info="postgraduateCourse.calendar" />
                </el-card>
              </div>
              <el-button @click="postgraduateCourse.addPostgraduateCoursePlan()">Добавить учебный план</el-button>
              <el-table :data="postgraduateCourse.postgraduateCoursePlans">
                <el-table-column label="Год" sortable>
                  <template #default="scope">
                    <el-date-picker v-model="scope.row.year" type="year" placeholder="Выберете год" />
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
                        removeFromClass(
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
              <template #header>Описание</template>
              <el-form-item prop="description">
                <QuillEditor
                  v-model:content="postgraduateCourse.description"
                  style="min-height: 200px; max-height: 700px"
                  content-type="html"
                  theme="snow"
                ></QuillEditor>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Расписание курсов</template>
              <el-button @click="postgraduateCourse.addDates()">Добавить даты</el-button>
              <el-form-item prop="publishedOn">
                <el-table :data="postgraduateCourse.postgraduateCoursesDates">
                  <el-table-column label="Начало" sortable>
                    <template #default="scope">
                      <el-date-picker v-model="scope.row.start"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="Начало" sortable>
                    <template #default="scope">
                      <el-date-picker v-model="scope.row.end"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="
                          removeFromClass(
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
              <template #header>Преподаватели</template>
              <el-form-item prop="listeners">
                <RemoteSearch :key-value="schema.teacher.key" @select="addTeacher" />
                <el-table :data="postgraduateCourse.postgraduateCoursesTeachers">
                  <el-table-column label="ФИО" sortable>
                    <template #default="scope">
                      {{ scope.row.teacher.doctor.human.getFullName() }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Руководитель программы" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="postgraduateCourse.setMainTeacher(scope.$index)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="
                          removeFromClass(
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
              <template #header>Специализации</template>
              <el-form-item prop="listeners">
                <!--                <RemoteSearch :key-value="schema.teacher.key" @select="addTeacher" />-->
                <el-table :data="postgraduateCourse.postgraduateCoursesSpecializations">
                  <el-table-column label="Название" sortable>
                    <template #default="scope">
                      {{ scope.row.specialization.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Выбрать главную" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="postgraduateCourse.setMainSpecialization(scope.$index)"></el-checkbox>
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
              <el-input v-model="postgraduateCourse.educationForm"> </el-input>
            </el-card>
            <el-card>
              <template #header> Нормативный срок обучения </template>
              <el-input-number v-model="postgraduateCourse.years"> </el-input-number> года
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
                  <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
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
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { computed, ComputedRef, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FileUploader from '@/components/FileUploader.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IForm from '@/interfaces/IForm';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ISearchObject from '@/interfaces/ISearchObject';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import ISchema from '@/interfaces/schema/ISchema';
import removeFromClass from '@/mixins/removeFromClass';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminPostgraduateCoursePage',
  components: {
    RemoteSearch,
    QuillEditor,
    TableButtonGroup,
    FileUploader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const postgraduateCourse: ComputedRef<IPostgraduateCourse> = computed<IPostgraduateCourse>(
      () => store.getters['postgraduateCourses/item']
    );
    const specializations: ComputedRef<ISpecialization[]> = computed<ISpecialization[]>(() => store.getters['specializations/items']);
    const selectedTeacher: ComputedRef<ITeacher> = computed<ITeacher>(() => store.getters['teachers/item']);
    const formPatterns: ComputedRef<IForm[]> = computed<IForm[]>(() => store.getters['formPatterns/items']);
    const documentTypes: ComputedRef<IDocumentType[]> = computed<IDocumentType[]>(() => store.getters['documentTypes/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('teachers/getAll');
      await store.dispatch('specializations/getAll');
      await store.dispatch('search/searchGroups');
      await store.dispatch('formPatterns/getAll');
      await store.dispatch('documentTypes/getAll');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        filterQuery.value.setParams(schema.value.dpoCourse.slug, route.params['id'] as string);
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
      postgraduateCourse.value.documentTypeId = postgraduateCourse.value.documentType.id;
    };
    return {
      documentTypes,
      specializations,
      removeFromClass,
      addTeacher,
      schema,
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
