<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="residencyCourse" :model="residencyCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <div class="files-block">
                <el-card>
                  <template #header>Основная профессиональная программа Высшего образования </template>
                  <FileUploader :file-info="residencyCourse.program" />
                </el-card>
                <el-card>
                  <template #header>Аннотации рабочих программ дисциплин </template>
                  <FileUploader :file-info="residencyCourse.annotation" />
                </el-card>
                <el-card>
                  <template #header>График учебного процесса</template>
                  <FileUploader :file-info="residencyCourse.schedule" />
                </el-card>
                <el-card>
                  <template #header>Учебный план</template>
                  <FileUploader :file-info="residencyCourse.plan" />
                </el-card>
              </div>
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
                <QuillEditor
                  v-model:content="residencyCourse.description"
                  style="min-height: 200px; max-height: 700px"
                  content-type="html"
                  theme="snow"
                ></QuillEditor>
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
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FileUploader from '@/components/FileUploader.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IEducationYear from '@/interfaces/IEducationYear';
import IForm from '@/interfaces/IForm';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseTeacher from '@/interfaces/IResidencyCourseTeacher';
import ISearchObject from '@/interfaces/ISearchObject';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import ISchema from '@/interfaces/schema/ISchema';
import removeFromClass from '@/mixins/removeFromClass';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminResidencyCoursePage',
  components: {
    FileUploader,
    RemoteSearch,
    QuillEditor,
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const residencyCourse: ComputedRef<IResidencyCourse> = computed<IResidencyCourse>(() => store.getters['residencyCourses/item']);
    const specializations: ComputedRef<ISpecialization[]> = computed<ISpecialization[]>(() => store.getters['specializations/items']);
    const selectedTeacher: ComputedRef<ITeacher> = computed<ITeacher>(() => store.getters['teachers/item']);
    const formPatterns: ComputedRef<IForm[]> = computed<IForm[]>(() => store.getters['formPatterns/items']);
    const educationYears: ComputedRef<IEducationYear[]> = computed<IEducationYear[]>(() => store.getters['educationYears/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('meta/getSchema');
      await store.dispatch('teachers/getAll');
      await store.dispatch('educationYears/getAll');
      await store.dispatch('specializations/getAll');
      await store.dispatch('search/searchGroups');
      await store.dispatch('formPatterns/getAll');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        store.commit(`filter/resetQueryFilter`);
        filterQuery.value.setParams(schema.value.residencyCourse.slug, route.params['id'] as string);
        await store.dispatch('residencyCourses/get', filterQuery.value);
        store.commit('admin/setHeaderParams', {
          title: residencyCourse.value.getMainSpecialization().name,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('residencyCourses/resetItem');
        if (route.meta.isNmo) store.commit('residencyCourses/setIsNmo', true);
        store.commit('admin/setHeaderParams', { title: 'Добавить программу', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(residencyCourse, formUpdated, { deep: true });
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
        await store.dispatch('residencyCourses/create', residencyCourse.value);
        await router.push(`/admin/residency/courses`);
        return;
      }
      await store.dispatch('residencyCourses/update', residencyCourse.value);
      next ? next() : await router.push(`/admin/residency/courses`);
    };

    const addTeacher = async (searchObject: ISearchObject) => {
      const teacherExists = !!residencyCourse.value.residencyCoursesTeachers.find(
        (courseTeacher: IResidencyCourseTeacher) => courseTeacher.teacherId === searchObject.id
      );

      if (teacherExists) {
        ElMessage({ message: 'Выбранный преподаватель уже добавлен', type: 'error' });
        return;
      }
      await store.dispatch('teachers/get', searchObject.id);
      residencyCourse.value.addTeacher(selectedTeacher.value);
      store.commit('teachers/resetItem');
    };

    const changeFormPatternHandler = () => {
      // residencyCourse.value.formPatternId = residencyCourse.value.formPattern.id
    };

    return {
      educationYears,
      specializations,
      removeFromClass,
      addTeacher,
      schema,
      mounted,
      submit,
      residencyCourse,
      form,
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
