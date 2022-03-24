<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="postgraduateCourse" :model="postgraduateCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card class="content-card">
              <template #header>Контент</template>
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
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <FileUploader :file-info="postgraduateCourse.questionsFile" />
          <el-container direction="vertical">
            <el-card>
              <el-container direction="vertical">
                <el-select
                  v-model="postgraduateCourse.formPattern"
                  value-key="id"
                  label="Шаблон формы"
                  @change="changeFormPatternHandler()"
                >
                  <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
                </el-select>
              </el-container>
            </el-card>
            <template #header> Специальности </template>
            <el-checkbox
              v-for="specialization in specializations"
              :key="specialization.id"
              :model-value="postgraduateCourse.findSpecialization(specialization.id)"
              @change="postgraduateCourse.addSpecialization(specialization)"
            >
              {{ specialization.name }}
            </el-checkbox>
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

    const postgraduateCourse: ComputedRef<IPostgraduateCourse> = computed<IPostgraduateCourse>(
      () => store.getters['postgraduateCourses/item']
    );
    const specializations: ComputedRef<ISpecialization[]> = computed<ISpecialization[]>(() => store.getters['specializations/items']);
    const selectedTeacher: ComputedRef<ITeacher> = computed<ITeacher>(() => store.getters['teachers/item']);
    const formPatterns: ComputedRef<IForm[]> = computed<IForm[]>(() => store.getters['formPatterns/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('teachers/getAll');
      await store.dispatch('specializations/getAll');
      await store.dispatch('search/searchGroups');
      await store.dispatch('formPatterns/getAll');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        await store.dispatch('postgraduateCourses/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: 'Программа аспирантуры',
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
      // postgraduateCourse.value.formPatternId = postgraduateCourse.value.formPattern.id
    };

    return {
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
    };
  },
});
</script>

<style lang="scss" scoped>
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
