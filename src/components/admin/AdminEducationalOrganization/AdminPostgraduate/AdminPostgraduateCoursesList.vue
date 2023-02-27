<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
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
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import SortList from '@/components/SortList/SortList.vue';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import buildNameNumbers from '@/services/buildNameNumbers';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import PostgraduateCoursesSortsLib from '@/services/Provider/libs/sorts/PostgraduateCoursesSortsLib';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPostgraduateCoursesList',
  components: { TableButtonGroup, AdminListWrapper, Pagination, SortList },
  setup() {
    const postgraduateCourses: Ref<PostgraduateCourse[]> = computed(() => Provider.store.getters['postgraduateCourses/items']);
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    const open = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);
    const remove = async (id: string) => await Provider.store.dispatch('postgraduateCourses/remove', id);
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
      await Provider.store.dispatch('postgraduateCourses/updateMany');
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };
    const cancel = () => {
      isEditMode.value = false;
      isNotEditMode.value = true;
    };

    const loadCourses = async () => {
      Provider.store.commit('postgraduateCourses/clearItems');
      await Provider.store.dispatch('postgraduateCourses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.store.commit('postgraduateCourses/clearItems');
      Provider.setSortModels(PostgraduateCoursesSortsLib.byName(Orders.Asc));
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Программы аспирантуры',
        buttons: [
          { text: 'Редактировать', type: 'success', action: edit, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: save, condition: isEditMode },
          { text: 'Добавить программу', type: 'primary', action: create },
        ],
      });
      await Provider.store.dispatch('postgraduateCourses/getAll', Provider.filterQuery.value);
      window.addEventListener('beforeunload', beforeWindowUnload);
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'postgraduateCourses', action: 'getAll' },
    });

    const createResidencySortModels = (): ISortModel[] => {
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
      mounted: Provider.mounted,
    };
  },
});
</script>

<style scoped></style>
