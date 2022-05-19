<template>
  <div v-if="mounted && educationalOrganisationAcademics.length" class="flex">
    <div v-for="item in educationalOrganisationAcademics" :key="item.id" class="doctors-wrapper">
      <AcademicCard :doctor="item.doctor" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import AcademicCard from '@/components/Educational/AcademicCard.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Orders } from '@/interfaces/filters/Orders';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'PostgraduateAcademics',
  components: { AcademicCard },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const educationalOrganisationAcademics: Ref<IEducationalOrganizationAcademic[]> = computed(
      () => store.getters['educationalOrganizationAcademics/items']
    );

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(
          schema.value.educationalOrganizationAcademic.tableName,
          schema.value.educationalOrganizationAcademic.fullName,
          Orders.Asc,
          'По алфавиту',
          true
        )
      );
      filterQuery.value.pagination.cursorMode = false;
      await store.dispatch('educationalOrganizationAcademics/getAll', filterQuery.value);
      store.commit('pagination/setCurPage', 1);
      mounted.value = true;
    });

    return {
      mounted,
      educationalOrganisationAcademics,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  margin-top: 20px;
}

:deep(.card-content) {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;

  .card-header {
    text-align: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }
  h2 {
    margin: 0;
  }

  .article-body {
    text-align: justify;
  }
}

.doctors-wrapper {
  margin: 10px;
}

.el-descriptions__label {
  font-size: 15px;
}
.flex-row {
  display: flex;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
}

@media screen and (max-width: 687px) {
  .flex {
    justify-content: center;
  }
}
</style>
