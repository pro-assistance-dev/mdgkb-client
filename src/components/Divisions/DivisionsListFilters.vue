<template>
  <div v-if="mount" class="horizontal">
    <div class="line">
      <div class="block-item">
        <ModeChoice path="divisions" :modes="modes" @selectMode="selectMode" />
      </div>
      <div class="block-item"><RemoteSearch :key-value="schema.division.key" @select="selectSearch" /></div>
      <div class="block-item"><SortList :models="createSortModels()" @load="loadDivisions" /></div>
      <div class="block-item">
        <!-- <ModeButtons
          :second-mode-active="!divisionsMode"
          :store-mode="false"
          first-mode="Список"
          second-mode="Карта"
          @changeMode="changeMode"
        /> -->
      </div>
    </div>
    <div class="line">
      <div class="block-item">
        <FilterCheckbox
          label="С возможностью госпитализации"
          :table="schema.division.tableName"
          :col="schema.division.hospitalizationContactInfoId"
          :data-type="DataTypes.String"
          :operator="Operators.NotNull"
          @load="loadDivisions()"
        />
      </div>
      <div class="block-item">
        <FilterCheckbox
          label="С отзывами"
          :table="schema.division.tableName"
          :col="schema.division.commentsCount"
          :data-type="DataTypes.Number"
          :operator="Operators.Gt"
          @load="loadDivisions()"
        />
      </div>
      <div class="block-item"></div>
      <div class="block-item"></div>

      <!-- <div class="block-item"><FilterReset @load="loadDivisions" /></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import ModeChoice from '@/components/ModeChoice.vue';
// import FilterReset from '@/components/Filters/FilterResetButton.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/schema/IOption';
import ISchema from '@/interfaces/schema/ISchema';
import TokenService from '@/services/Token';
// import ModeButtons from '@/components/ModeButtons.vue';

export default defineComponent({
  name: 'DivisionsListFilters',
  components: {
    // FilterReset,
    FilterCheckbox,
    RemoteSearch,
    SortList,
    ModeChoice,
    // ModeButtons,
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
  },
  emits: ['selectMode'],
  setup(props, { emit }) {
    const store = useStore();
    // const route = useRoute();
    const router = useRouter();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await loadDivisions();
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

    const loadDivisions = async () => {
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 6;
      store.commit('filter/setStoreModule', 'divisions');
      await store.dispatch('divisions/getAll', filterQuery.value);
    };

    // const loadFilters = async () => {
    //   await store.dispatch('meta/getOptions', schema.value.medicalProfile);
    //   await store.dispatch('meta/getOptions', schema.value.division);
    // };

    const createSortModels = (): ISortModel[] => {
      return [
        SortModel.CreateSortModel(schema.value.division.tableName, schema.value.division.name, Orders.Asc, 'По алфавиту', true),
        SortModel.CreateSortModel(schema.value.division.tableName, schema.value.division.commentsCount, Orders.Desc, 'По отзывам', false),
      ];
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/divisions/${event.value}`);
    };

    const selectMode = async (value: string) => {
      emit('selectMode', value);
    };

    // onMounted(() => {
    //   emit('load');
    // });

    // const load = () => {
    //   emit('load');
    // };

    return {
      selectSearch,
      selectMode,
      createSortModels,
      TokenService,
      Operators,
      DataTypes,
      loadMore,
      loadDivisions,
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

.horizontal {
  width: 100%;
}

.line {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.line:last-child {
  padding-top: 0px;
}

.block-item {
  display: flex;
  width: 272px;
  margin: 22px 10px 0px 0px;
}

.block-item-1 {
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

:deep(.el-form-item) {
  margin-bottom: 0px;
  margin-top: 0px;
}

:deep(.el-form-item__content) {
  margin-top: 0px;
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
