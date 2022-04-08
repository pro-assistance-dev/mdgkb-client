<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="residencyCourse" :model="residencyCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <el-form-item prop="title" label="Название:">
                <el-input v-model="residencyCourse.name" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Контент</template>
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
              <template #header>Количество слушателей</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.listeners" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Стоимость</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.cost" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Количество часов</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="residencyCourse.hours" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Специальность, по которой читается программа</template>
              <el-form-item prop="listeners">
                <el-select v-model="residencyCourse.specializationId" placeholder="Выбрать специальность">
                  <el-option v-for="spec in specializations" :key="spec.id" :label="spec.name" :value="spec.id"> </el-option>
                </el-select>
              </el-form-item>
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
import RemoteSearch from '@/components/RemoteSearch.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
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
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('meta/getSchema');
      await store.dispatch('teachers/getAll');
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
          title: residencyCourse.value.name,
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
