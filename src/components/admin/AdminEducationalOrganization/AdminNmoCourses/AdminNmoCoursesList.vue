<template>
  <AdminListWrapper show-header>
    <template #header>
      <SortList class="filters-block" :models="sortModels" @load="loadCourses" />
    </template>
    <el-table :data="nmoCourses">
      <el-table-column label="Название" width="400" class-name="sticky-left">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input v-model="scope.row.name" type="textarea" :autosize="{ minRows: 1 }" size="small"
              placeholder="Заголовок"></el-input>
          </div>
          <div v-else>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="Руководитель" width="300">-->
      <!--        <template #default="scope">-->
      <!--          <div v-if="scope.row.getMainTeacher()">-->
      <!--            {{ scope.row.getMainTeacher().doctor.employee.human.getFullName() }}-->
      <!--          </div>-->
      <!--          <div v-else>Руководителя нет</div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)"
            @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import NmoCourse from '@/classes/NmoCourse';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import NmoCoursesSortsLib from '@/libs/sorts/NmoCoursesSortsLib';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminNmoCoursesList',
  components: { TableButtonGroup, AdminListWrapper, },
  setup() {
    const nmoCourses: Ref<NmoCourse[]> = computed(() => Provider.store.getters['nmoCourses/items']);
    const isEditMode: Ref<boolean> = ref(false);

    const save = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      await Provider.store.dispatch('nmoCourses/updateMany');
      isEditMode.value = false;
      if (next) next();
    };

    const loadCourses = async () => {
      await Provider.store.dispatch('nmoCourses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      await loadCourses();
      window.addEventListener('beforeunload', beforeWindowUnload);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Сотрудники',
        buttons: [
          {
            text: computed(() => (isEditMode.value ? 'Сохранить' : 'Редактировать')),
            action: computed(() => (isEditMode.value ? save : () => (isEditMode.value = !isEditMode.value))),
          },
          { text: 'Добавить программу', type: 'primary', action: Provider.createAdmin },
        ],
      },
      sortsLib: NmoCoursesSortsLib,
      getAction: 'getAll',
    });

    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();
    watch(isEditMode, () => {
      confirmLeave.value = isEditMode.value;
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    return {
      isEditMode,
      nmoCourses,
      loadCourses,
      sortModels: createSortModels(NmoCoursesSortsLib),
      save,
    };
  },
});
</script>

<style scoped></style>
