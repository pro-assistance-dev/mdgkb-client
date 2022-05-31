<template>
  <PageWrapper v-if="mount" :title="title">
    <template #filters>
      <DoctorsListFilters />
    </template>
    <div v-if="doctorsMode" style="display: flex; flex-wrap: wrap; jestify-content: center">
      <div v-for="doctor in doctors" :key="doctor.id" style="margin: 0 auto; height: 350px; padding: 10px">
        <DoctorInfoCard :doctor="doctor" />
      </div>
    </div>
    <div v-else>
      <MedicalOrganizationStructureVertical />
    </div>
    <LoadMoreButton @loadMore="loadMore" />
  </PageWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import DoctorsListFilters from '@/components/Doctors/DoctorsListFilters.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import MedicalOrganizationStructureVertical from '@/components/MedicalOrganization/MedicalOrganizationStructureVertical.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Operators } from '@/interfaces/filters/Operators';
import IDoctor from '@/interfaces/IDoctor';
import ISchema from '@/interfaces/schema/ISchema';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'MedicalWorkersList',
  components: {
    MedicalOrganizationStructureVertical,
    DoctorsListFilters,
    DoctorInfoCard,
    LoadMoreButton,
    PageWrapper,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const mount = ref(false);
    const doctorsMode: ComputedRef<boolean> = computed(() => route.path === '/doctors');

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const title: ComputedRef<string> = computed(() => {
      let title = '';
      switch (route.path) {
        case '/heads':
          title = 'Руководство';
          break;
        case '/doctors':
          title = 'Медицинские работники';
          break;
        default:
          break;
      }
      return title;
    });

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
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

    return {
      TokenService,
      Operators,
      DataTypes,
      loadMore,
      schema,
      doctors,
      mount,
      doctorsMode,
      title,
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

.loadmore-button {
  display: flex;
  justify-content: center;
}
.filters {
  position: sticky;
  top: 79px;
  height: 100%;
}
</style>
