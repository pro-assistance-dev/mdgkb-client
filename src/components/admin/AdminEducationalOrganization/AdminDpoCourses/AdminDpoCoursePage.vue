<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="dpoCourse" :model="dpoCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <el-form-item prop="title" label="Название:">
                <el-input v-model="dpoCourse.name" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Контент</template>
              <el-form-item prop="description">
                <QuillEditor
                  v-model:content="dpoCourse.description"
                  style="min-height: 200px; max-height: 700px"
                  content-type="html"
                  theme="snow"
                ></QuillEditor>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Расписание курсов</template>
              <el-button @click="dpoCourse.addDates()">Добавить даты</el-button>
              <el-form-item prop="publishedOn">
                <el-table :data="dpoCourse.dpoCoursesDates">
                  <el-table-column label="Начало" sortable>
                    <template #default="scope">
                      <el-date-picker v-model="scope.row.start" format="DD.MM.YYYY" placeholder="Дата"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="Начало" sortable>
                    <template #default="scope">
                      <el-date-picker v-model="scope.row.end" type="date" format="DD.MM.YYYY" placeholder="Дата"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="removeFromClass(scope.$index, dpoCourse.dpoCoursesDates, dpoCourse.dpoCoursesDatesForDelete)"
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
                <el-table :data="dpoCourse.dpoCoursesTeachers">
                  <el-table-column label="ФИО" sortable>
                    <template #default="scope">
                      {{ scope.row.teacher.doctor.human.getFullName() }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Руководитель программы" sortable>
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.main" @change="dpoCourse.setMainTeacher(scope.$index)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column width="50" fixed="right" align="center">
                    <template #default="scope">
                      <TableButtonGroup
                        :show-remove-button="true"
                        @remove="removeFromClass(scope.$index, dpoCourse.dpoCoursesTeachers, dpoCourse.dpoCoursesTeachersForDelete)"
                      />
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
              <el-container direction="vertical">
                <!-- <el-checkbox v-model="dpoCourse.isNmo">Программа НМО</el-checkbox> -->
                <el-form-item v-if="dpoCourse.isNmo" prop="listeners" label="Ссылка НМО">
                  <el-input v-model="dpoCourse.linkNmo" placeholder="Ссылка НМО" />
                </el-form-item>
                <el-select v-model="dpoCourse.formPattern" value-key="id" placeholder="Шаблон формы" @change="changeFormPatternHandler()">
                  <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
                </el-select>
              </el-container>
            </el-card>
            <el-card>
              <template #header>Количество слушателей</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="dpoCourse.listeners" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Стоимость</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="dpoCourse.cost" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Количество часов</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="dpoCourse.hours" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Специальность, по которой читается программа</template>
              <el-form-item prop="listeners">
                <el-select v-model="dpoCourse.specializationId" placeholder="Выбрать специальность">
                  <el-option v-for="spec in specializations" :key="spec.id" :label="spec.name" :value="spec.id"> </el-option>
                </el-select>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Выбрать специальности, для которых читается программа </template>
              <el-checkbox
                v-for="specialization in specializations"
                :key="specialization.id"
                :model-value="dpoCourse.findSpecialization(specialization.id)"
                @change="dpoCourse.addSpecialization(specialization)"
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
import IDpoCourse from '@/interfaces/IDpoCourse';
import IDpoCourseTeacher from '@/interfaces/IDpoCourseTeacher';
import IForm from '@/interfaces/IForm';
import ISearchObject from '@/interfaces/ISearchObject';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import ISchema from '@/interfaces/schema/ISchema';
import removeFromClass from '@/mixins/removeFromClass';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminDpoCoursePage',
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
    const dpoCourse: ComputedRef<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);
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
        filterQuery.value.setParams(schema.value.dpoCourse.slug, route.params['id'] as string);
        await store.dispatch('dpoCourses/get', filterQuery.value);
        store.commit('admin/setHeaderParams', {
          title: dpoCourse.value.name,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('dpoCourses/resetItem');
        if (route.meta.isNmo) store.commit('dpoCourses/setIsNmo', true);
        store.commit('admin/setHeaderParams', { title: 'Добавить программу', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(dpoCourse, formUpdated, { deep: true });
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
      const typeCourse = dpoCourse.value.isNmo ? 'nmo' : 'dpo';
      if (!route.params['id']) {
        await store.dispatch('dpoCourses/create', dpoCourse.value);
        await router.push(`/admin/${typeCourse}/courses`);
        return;
      }
      await store.dispatch('dpoCourses/update', dpoCourse.value);
      next ? next() : await router.push(`/admin/${typeCourse}/courses`);
    };

    const addTeacher = async (searchObject: ISearchObject) => {
      const teacherExists = !!dpoCourse.value.dpoCoursesTeachers.find(
        (courseTeacher: IDpoCourseTeacher) => courseTeacher.teacherId === searchObject.id
      );

      if (teacherExists) {
        ElMessage({ message: 'Выбранный преподаватель уже добавлен', type: 'error' });
        return;
      }
      await store.dispatch('teachers/get', searchObject.id);
      dpoCourse.value.addTeacher(selectedTeacher.value);
      store.commit('teachers/resetItem');
    };

    const changeFormPatternHandler = () => {
      // dpoCourse.value.formPatternId = dpoCourse.value.formPattern.id
    };

    return {
      specializations,
      removeFromClass,
      addTeacher,
      schema,
      mounted,
      submit,
      dpoCourse,
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
