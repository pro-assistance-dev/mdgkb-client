<template>
  <div class="left-side-container">
    <RemoteSearch :key-value="schema.dpoCourse.key" @select="selectSearch" />

    <SortList :models="createSortModels()" @load="load" />
    <FilterReset @load="load" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import FilterReset from '@/components/Filters/FilterResetButton.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import IDoctor from '@/interfaces/IDoctor';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import ISearchObject from '@/interfaces/ISearchObject';
import ISchema from '@/interfaces/schema/ISchema';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DpoCoursesFilters',
  components: {
    FilterReset,
    RemoteSearch,
    SortList,
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const dpoCourses: Ref<IDpoCourse[]> = computed<IDpoCourse[]>(() => store.getters['dpoCourses/items']);

    const loadFilters = async () => {
      await store.dispatch('meta/getOptions', schema.value.teacher);
    };

    const createSortModels = (): ISortModel[] => {
      return [
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.name, Orders.Asc, 'По алфавиту', true),
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.hours, Orders.Asc, 'По длительности', false),
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.start, Orders.Asc, 'По дате начала', false),
      ];
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/courses/${event.id}`);
    };

    const load = () => {
      emit('load');
    };

    return {
      load,
      dpoCourses,
      selectSearch,
      createSortModels,
      TokenService,
      Operators,
      DataTypes,
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
