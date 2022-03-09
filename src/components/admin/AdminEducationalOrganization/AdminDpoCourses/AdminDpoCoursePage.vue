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
              <el-form-item prop="content">
                <QuillEditor
                  v-model="dpoCourse.description"
                  style="min-height: 200px; max-height: 700px"
                  content-type="html"
                  theme="snow"
                ></QuillEditor>
              </el-form-item>
            </el-card>
          </el-container>
          <el-card>
            <template #header>Расписание курсов</template>
            <el-button @click="dpoCourse.addDates()">Добавить даты</el-button>
            <el-form-item prop="publishedOn">
              <el-table :data="dpoCourse.dpoCoursesDates">
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
              <RemoteSearch :key-value="schema.teacher.key" @select="selectSearchTeacher" />
              <el-button v-if="selectedTeacher.id" @click="dpoCourse.addTeacher(selectedTeacher)">Добавить</el-button>
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
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <el-card>
              <template #header>
                <el-checkbox v-model="dpoCourse.isNmo">Программа НМО</el-checkbox>
              </template>
              <el-form-item v-if="dpoCourse.isNmo" prop="listeners" label="Ссылка">
                <el-input v-model="dpoCourse.linkNmo" />
              </el-form-item>
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
              <template #header> Специальности </template>
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
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Teacher from '@/classes/Teacher';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IDpoCourse from '@/interfaces/IDpoCourse';
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

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const dpoCourse: Ref<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);
    const specializations: Ref<ISpecialization[]> = computed<ISpecialization[]>(() => store.getters['specializations/items']);
    const selectedTeacher: Ref<ITeacher> = computed<ITeacher>(() => store.getters['teachers/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('teachers/getAll');
      await store.dispatch('specializations/getAll');
      await store.dispatch('search/searchGroups');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        await store.dispatch('dpoCourses/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: dpoCourse.value.name,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('dpoCourses/resetState');
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
      if (!route.params['id']) {
        await store.dispatch('dpoCourses/create', dpoCourse.value);
        await router.push('/admin/educational-organization/dpo/courses');
        return;
      }
      await store.dispatch('dpoCourses/update', dpoCourse.value);
      next ? next() : router.push('/admin/educational-organization/dpo/courses');
    };

    const selectSearchTeacher = async (searchObject: ISearchObject) => {
      await store.dispatch('teachers/get', searchObject.id);
      // dpoCourse.value.teacherId = searchObject.id;
    };

    const addTeacher = () => {
      dpoCourse.value.dpoCoursesTeachers.push();
      selectedTeacher.value = new Teacher();
    };

    return {
      specializations,
      removeFromClass,
      addTeacher,
      selectedTeacher,
      schema,
      mounted,
      submit,
      dpoCourse,
      form,
      selectSearchTeacher,
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
