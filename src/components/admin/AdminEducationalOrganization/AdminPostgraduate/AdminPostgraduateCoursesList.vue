<template>
  <component :is="'AdminListWrapper'" show-header>
    <template #header>
      <SortList class="filters-block" :models="createResidencySortModels()" @load="loadCourses" />
    </template>
    <el-table :data="postgraduateCourses">
      <el-table-column label="Код специализации" min-width="200" class-name="sticky-left">
        <template #default="scope">
          <div
            v-for="postgraduateCoursesSpecialization in scope.row.postgraduateCoursesSpecializations"
            :key="postgraduateCoursesSpecialization.id"
          >
            {{ postgraduateCoursesSpecialization.specialization.code }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Специализация" min-width="300">
        <template #default="scope">
          <router-link :to="`/admin/postgraduate-courses/${scope.row.getMainSpecialization().slug}`">
            {{ scope.row.getMainSpecialization().name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Руководитель" min-width="300">
        <template #default="scope">
          <div v-if="scope.row.getMainTeacher()">
            {{ scope.row.getMainTeacher().doctor.employee.human.getFullName() }}
          </div>
          <div v-else>Руководителя нет</div>
        </template>
      </el-table-column>
      <el-table-column label="Квалификация" align="center" width="200">
        <template #default="scope">
          <div v-html="scope.row.description"></div>
        </template>
      </el-table-column>
      <el-table-column label="Срок обучения" align="center" width="200">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.years" size="small" />
          </div>
          <div v-else>
            {{ buildNameNumbers([...Array(scope.row.years).keys()], ['год', 'года', 'лет']) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Стоимость" align="center" width="200">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.cost" size="small" />
          </div>
          <div v-else>
            {{ scope.row.cost }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            @remove="remove(scope.row.id)"
            @edit="open(scope.row.getMainSpecialization().slug)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination :show-confirm="isEditMode" @save="save" @cancel="cancel" />
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import PostgraduateCoursesSortsLib from '@/libs/sorts/PostgraduateCoursesSortsLib';
import buildNameNumbers from '@/services/buildNameNumbers';
import SortModel from '@/services/classes/SortModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPostgraduateCoursesList',
  components: { TableButtonGroup, AdminListWrapper },
  setup() {
    const postgraduateCourses: PostgraduateCourse[] = PostgraduateCoursesStore.Items();
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = () => Router.To(`${Router.Route().path}/new`);
    const open = (id: string) => Router.To(`${Router.Route().path}/${id}`);
    const remove = async (id: string) => await PostgraduateCoursesStore.Remove(id);
    const edit = () => {
      if (isEditMode.value) {
        return;
      }
      isEditMode.value = true;
      isNotEditMode.value = false;
    };
    const save = async (next?: NavigationGuardNext) => {
      if (!isEditMode.value) {
        return;
      }
      saveButtonClick.value = true;
      await PostgraduateCoursesStore.UpdateMany();
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };
    const cancel = () => {
      isEditMode.value = false;
      isNotEditMode.value = true;
    };

    const loadCourses = async () => {
      await PostgraduateCoursesStore.GetAll();
    };

    const load = async () => {
      await loadCourses();
      window.addEventListener('beforeunload', beforeWindowUnload);
    };

    Hooks.onBeforeMount(load);

    const createResidencySortModels = (): SortModel[] => {
      return createSortModels(PostgraduateCoursesSortsLib);
    };

    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();
    watch(isEditMode, () => {
      confirmLeave.value = isEditMode.value;
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    return {
      postgraduateCourses,
      isEditMode,
      remove,
      open,
      create,
      loadCourses,
      createResidencySortModels,
      cancel,
      edit,
      save,
      buildNameNumbers,
    };
  },
});
</script>

<style scoped></style>
