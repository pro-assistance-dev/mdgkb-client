<template>
  <div v-if="mount" class="horizontal">
    <div class="block-item"><ModeChoice path="dpo" :modes="modes" @selectMode="selectMode" /></div>
    <template v-if="mode === '' || mode === 'programs'">
      <div class="block-item"><RemoteSearch :key-value="schema.dpoCourse.key" @select="selectSearch" /></div>
      <div class="block-item">
        <FilterSelect
          placeholder="Все программы"
          :options="nmoOptions"
          :table="schema.dpoCourse.tableName"
          :col="schema.dpoCourse.isNmo"
          :data-type="DataTypes.String"
          :operator="Operators.Eq"
          :filterable="false"
          @load="load"
        />
      </div>

      <div class="block-item">
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
      </div>
    </template>
    <template v-if="mode === '' || mode === 'programs'"> </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterSelect from '@/components/Filters/FilterSelect.vue';
import ModeChoice from '@/components/ModeChoice.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/schema/IOption';
import ISchema from '@/interfaces/schema/ISchema';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DpoFilters',
  components: {
    RemoteSearch,
    FilterSelect,
    ModeChoice,
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
  emits: ['load', 'selectMode'],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);
    const nmoOptions: IOption[] = [
      { value: 'true', label: 'Программы НМО' },
      { value: 'false', label: 'Программы ДПО' },
    ];
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
    const selectMode = async (value: string) => {
      emit('selectMode', value);
    };
    return {
      nmoOptions,
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
  margin-top: 22px;
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
</style>
