<template>
  <component :is="'AdminListWrapper'" v-if="mounted" :key="$route.fullPath" show-header>
    <template #header>
      <SortList class="filters-block" :models="createDpoSortModels()" @load="loadDpoCourses" />
    </template>
    <el-table :data="dpoCourses">
      <el-table-column label="Название" width="400" class-name="sticky-left">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input v-model="scope.row.name" type="textarea" :autosize="{ minRows: 1 }" size="small" placeholder="Заголовок"></el-input>
          </div>
          <div v-else>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Руководитель" width="300">
        <template #default="scope">
          <div v-if="scope.row.getMainTeacher()">
            {{ scope.row.getMainTeacher().doctor.employee.human.getFullName() }}
          </div>
          <div v-else>Руководителя нет</div>
        </template>
      </el-table-column>
      <el-table-column label="Длительность" align="center" width="200">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.hours" size="small" />
          </div>
          <div v-else>
            {{ scope.row.hours }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Стоимость" align="center" min-width="200">
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
            @edit="open(scope.row.slug)"
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
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import DpoCourse from '@/classes/DpoCourse';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import SortList from '@/components/SortList/SortList.vue';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DpoCoursesFiltersLib from '@/services/Provider/libs/filters/DpoCoursesFiltersLib';
import DpoCoursesSortsLib from '@/services/Provider/libs/sorts/DpoCoursesSortsLib';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDpoCoursesList',
  components: { TableButtonGroup, AdminListWrapper, Pagination, SortList },
  setup() {
    const mounted = ref(false);
    const route = useRoute();
    const dpoCourses: ComputedRef<DpoCourse[]> = computed(() => Provider.store.getters['dpoCourses/items']);
    const title = ref('');
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const setProgramsType = () => {
      Provider.store.commit('filter/resetFilterModels');
      if (route.path === '/admin/nmo/courses') {
        Provider.setFilterModels(DpoCoursesFiltersLib.byCourseType(true));
        title.value = 'НМО';
      } else {
        Provider.setFilterModels(DpoCoursesFiltersLib.byCourseType(false));
        title.value = 'ДПО - дополнительные программы';
      }
    };

    const loadDpoCourses = async () => {
      Provider.store.commit('dpoCourses/clearItems');
      await Provider.store.dispatch('dpoCourses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.store.commit('dpoCourses/clearItems');
      // Provider.resetFilterQuery();
      // Provider.filterQuery.value.pagination.limit = 3;
      // Provider.filterQuery.value.pagination.cursorMode = false;
      Provider.setSortModels(DpoCoursesSortsLib.byName(Orders.Asc));
      setProgramsType();
      await Provider.store.dispatch('dpoCourses/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: title,
        buttons: [
          { text: 'Редактировать', type: 'success', action: edit, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: save, condition: isEditMode },
          { text: 'Добавить программу', type: 'primary', action: create },
        ],
      });
      window.addEventListener('beforeunload', beforeWindowUnload);
      mounted.value = true;
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'dpoCourses', action: 'getAll' },
    });

    const createDpoSortModels = (): ISortModel[] => {
      return createSortModels(DpoCoursesSortsLib);
    };

    const create = () => Provider.router.push(`${route.path}/new`);
    const open = (id: string) => Provider.router.push(`${route.path}/${id}`);
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
      await Provider.store.dispatch('dpoCourses/updateMany');
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };
    const remove = async (id: string) => await Provider.store.dispatch('dpoCourses/remove', id);
    const cancel = () => {
      isEditMode.value = false;
      isNotEditMode.value = true;
    };

    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();
    watch(isEditMode, () => {
      confirmLeave.value = isEditMode.value;
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    return { cancel, isEditMode, mounted, dpoCourses, remove, open, save, edit, create, createDpoSortModels, loadDpoCourses };
  },
});
</script>

<style scoped></style>
