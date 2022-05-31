<template>
  <FiltersWrapper v-if="mount">
    <template v-if="condition" #header-left-top>
      <RemoteSearch
        :max-width="360"
        :key-value="schema.postgraduateCourse.key"
        :table="schema.postgraduateCourse.tableName"
        :col="schema.postgraduateCourse.name"
        placeholder="Начните вводить название специальности"
        @select="selectSearch"
        @load="load"
      />
      <!--        <FilterSelect-->
      <!--          placeholder="Выбрать специализацию"-->
      <!--          :options="schema.specialization.options"-->
      <!--          :table="schema.dpoCourse.tableName"-->
      <!--          :col="schema.specialization.id"-->
      <!--          :data-type="DataTypes.Join"-->
      <!--          :operator="Operators.Eq"-->
      <!--          :join-table="schema.dpoCourseSpecialization.tableName"-->
      <!--          :join-table-fk="schema.dpoCourseSpecialization.dpoCourseId"-->
      <!--          :join-table-pk="schema.dpoCourse.id"-->
      <!--          :join-table-id="schema.dpoCourseSpecialization.specializationId"-->
      <!--          :join-table-id-col="schema.dpoCourseSpecialization.specializationId"-->
      <!--          @load="load"-->
      <!--        />-->
    </template>
    <template #header-right>
      <ModeChoice :max-width="350" path="postgraduate" :modes="modes" @selectMode="selectMode" />
    </template>
    <template v-if="condition" #footer>
      <SortList :models="sortList" :store-mode="true" @load="load" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeChoice from '@/components/ModeChoice.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/schema/IOption';
import ISchema from '@/interfaces/schema/ISchema';
import Provider from '@/services/Provider';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'PostgraduateFilters',
  components: {
    ModeChoice,
    RemoteSearch,
    FiltersWrapper,
    SortList,
    // FilterSelect,
  },
  props: {
    mode: {
      type: String as PropType<string>,
      required: true,
      default: '',
    },
    modes: {
      type: Array as PropType<IOption[]>,
      required: false,
      default: () => [],
    },
    condition: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['load', 'selectMode'],

  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/postgraduate-courses/${event.id}`);
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

    const selectMode = async (value: string) => {
      emit('selectMode', value);
    };

    return {
      selectMode,
      resetFilter,
      load,
      selectSearch,
      TokenService,
      Operators,
      DataTypes,
      medicalProfiles,
      schema,
      doctors,
      sortList: Provider.sortList,
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
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}

.horizontal {
  display: flex;
  justify-content: space-between;
  // align-items: center;
}

.block-item {
  display: flex;
  width: 272px;
  margin: 0 10px;
}

.hidden {
  display: none;
}

:deep(.el-checkbox__label) {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #343e5c;
}

:deep(.el-autocomplete) {
  height: 38px;
}

.el-select {
  height: 38px;
}

.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 22px;
}

@media screen and (max-width: 1216px) {
  .block-item {
    min-width: 272px;
    width: 31%;
  }
}

@media screen and (max-width: 897px) {
  .block-item {
    min-width: 272px;
    width: 46%;
  }
}

@media screen and (max-width: 605px) {
  .block-item {
    min-width: 272px;
    width: 100%;
  }
}
</style>
