<template>
  <div v-if="mount" class="left-side-container">
    <RemoteSearch :key-value="schema.dpoCourse.key" @select="selectSearch" />
    <FilterSelect
      placeholder="Для кого читается курс"
      :options="schema.specialization.options"
      :table="schema.dpoCourse.tableName"
      :col="schema.specialization.id"
      :data-type="DataTypes.Join"
      :operator="Operators.Eq"
      :join-table="schema.dpoCourseSpecialization.tableName"
      :join-table-fk="schema.dpoCourseSpecialization.dpoCourseId"
      :join-table-pk="schema.dpoCourse.id"
      :join-table-id="schema.dpoCourseSpecialization.specializationId"
      :join-table-id-col="schema.dpoCourseSpecialization.specializationId"
      @load="load"
    />
    <FilterSelect
      placeholder="Специализация программы"
      :options="schema.specialization.options"
      :table="schema.dpoCourse.tableName"
      :col="schema.dpoCourse.specializationId"
      :data-type="DataTypes.String"
      :operator="Operators.Eq"
      @load="load"
    />
    <SortList :models="sortModels" :store-mode="true" @load="load" />
    <FilterReset @load="resetFilter" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterReset from '@/components/Filters/FilterResetButton.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import IDoctor from '@/interfaces/IDoctor';
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
    FilterSelect,
  },
  emits: ['load'],
  props: {
    sortModels: {
      type: Object as PropType<ISortModel[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/courses/${event.id}`);
    };

    onBeforeMount(async () => {
      await store.dispatch('meta/getOptions', schema.value.specialization);
      mount.value = true;
    });

    onMounted(() => {
      emit('load');
    });

    const load = () => {
      emit('load');
    };

    const resetFilter = () => {
      store.commit(`filter/resetQueryFilter`);
      store.commit('filter/setDefaultSortModel');
    };

    return {
      resetFilter,
      load,
      selectSearch,
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
