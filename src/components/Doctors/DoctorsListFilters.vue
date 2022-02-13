<template>
  <div class="left-side-container">
    <el-form>
      <RemoteSearchV2 :key-value="schema.doctor.key" store-module="doctors" />
      <FilterSelect
        placeholder="Медицинское направление"
        :options="schema.medicalProfile.options"
        :table="schema.doctor.tableName"
        :col="schema.doctor.medicalProfileId"
        @load="loadDoctors"
      />
      <FilterSelect
        placeholder="Отделение"
        :options="schema.division.options"
        :table="schema.doctor.tableName"
        :col="schema.doctor.divisionId"
        @load="loadDoctors"
      />
      <FilterCheckbox
        label='Обладатели статуса "Московский врач"'
        :table="schema.doctor.tableName"
        :col="schema.doctor.mosDoctorLink"
        :data-type="DataTypes.Boolean"
        :operator="Operators.NotNull"
        @load="loadDoctors"
      />
      <FilterCheckbox
        label="С отзывами"
        :table="schema.doctor.tableName"
        :col="schema.doctor.commentsCount"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        @load="loadDoctors"
      />
      <FilterCheckbox
        label="Избранное"
        :table="schema.doctor.tableName"
        :col="schema.doctor.id"
        :data-type="DataTypes.Join"
        :operator="Operators.Eq"
        :join-table="schema.doctorUser.tableName"
        :join-table-fk="schema.doctorUser.doctorId"
        :join-table-pk="schema.doctor.id"
        :join-table-id="TokenService.getUserId()"
        :join-table-id-col="schema.doctorUser.userId"
        @load="loadDoctors"
      />

      <FilterReset @load="loadDoctors" />
      <SortList :models="createSortModels()" @load="loadDoctors" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import RemoteSearchV2 from '@/components/admin/RemoteSearchV2.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterReset from '@/components/Filters/FilterResetButton.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import ISchema from '@/interfaces/schema/ISchema';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DoctorsListFilters',
  components: {
    FilterSelect,
    FilterReset,
    FilterCheckbox,
    SortList,
    RemoteSearchV2,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit('filter/setStoreModule', 'doctors');
      await loadDoctors();
      await loadFilters();
      mount.value = true;
    });

    const loadMore = async () => {
      const lastCursor = doctors.value[doctors.value.length - 1].human.getFullName();
      filterQuery.value.pagination.cursor.value = lastCursor;
      filterQuery.value.pagination.cursor.initial = false;
      filterQuery.value.pagination.cursor.operation = Operators.Gt;
      filterQuery.value.pagination.cursor.column = schema.value.doctor.fullName;
      filterQuery.value.pagination.cursorMode = true;
      await store.dispatch('doctors/getAll', filterQuery.value);
    };

    const loadDoctors = async () => {
      filterQuery.value.pagination.cursorMode = false;
      await store.dispatch('doctors/getAll', filterQuery.value);
    };

    const loadFilters = async () => {
      await store.dispatch('meta/getOptions', schema.value.medicalProfile);
      await store.dispatch('meta/getOptions', schema.value.division);
    };

    const createSortModels = (): ISortModel[] => {
      return [
        SortModel.CreateSortModel(schema.value.doctor.tableName, schema.value.doctor.fullName, Orders.Asc, 'По алфавиту', true),
        SortModel.CreateSortModel(schema.value.doctor.tableName, schema.value.doctor.commentsCount, Orders.Desc, 'По отзывам', false),
      ];
    };

    return {
      createSortModels,
      TokenService,
      Operators,
      DataTypes,
      loadMore,
      loadDoctors,
      medicalProfiles,
      schema,
      doctors,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  .right-side {
    // max-width: $right-side-max-width;
  }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}
</style>
