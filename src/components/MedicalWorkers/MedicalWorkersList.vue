<template>
  <PageWrapper v-if="mounted" :title="title">
    <template #filters>
      <DoctorsListFilters @change-mode="changeMode" @load="loadDoctors" />
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
import { computed, ComputedRef, defineComponent, Ref } from 'vue';
import { useRoute } from 'vue-router';

import Head from '@/classes/Head';
import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import DoctorsListFilters from '@/components/Doctors/DoctorsListFilters.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import MedicalOrganizationStructureVertical from '@/components/MedicalOrganization/MedicalOrganizationStructureVertical.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import IDoctor from '@/interfaces/IDoctor';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DoctorsSortsLib from '@/services/Provider/libs/sorts/DoctorsSortsLib';
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
    const route = useRoute();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => Provider.store.getters['doctors/items']);
    const heads: Ref<Head[]> = computed<Head[]>(() => Provider.store.getters['heads/items']);
    const doctorsMode: ComputedRef<boolean> = computed(() => route.path === '/doctors');

    const title: ComputedRef<string> = computed(() => {
      return route.path === 'heads' ? 'Руководство' : 'Медицинские работники';
    });

    const loadDoctors = async () => {
      Provider.filterQuery.value.pagination.append = false;
      await Provider.getAll('doctors');
    };

    const loadHeads = async () => {
      await Provider.getAll('heads');
    };

    const load = async () => {
      Provider.filterQuery.value.pagination.limit = 8;
      if (doctorsMode.value) {
        Provider.setSortModels(DoctorsSortsLib.byFullName(Orders.Asc));
        await loadDoctors();
        return;
      }
      await loadHeads();
    };

    Hooks.onBeforeMount(load);

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.append = true;
      Provider.filterQuery.value.pagination.offset = doctorsMode.value ? doctors.value.length : heads.value.length;
      await Provider.getAll(doctorsMode.value ? 'doctors' : 'heads');
    };

    const changeMode = async (doctorsModeActive: boolean) => {
      Provider.resetFilterQuery();
      Provider.filterQuery.value.pagination.limit = 8;
      Provider.store.commit('admin/showLoading');
      if (doctorsModeActive) {
        await Provider.router.replace('/doctors');
        await loadDoctors();
      } else {
        await Provider.router.replace('/heads');
        await loadHeads();
      }
      Provider.store.commit('admin/closeLoading');
    };

    return {
      changeMode,
      TokenService,
      Operators,
      DataTypes,
      loadMore,
      doctors,
      mounted: Provider.mounted,
      doctorsMode,
      title,
      loadHeads,
      loadDoctors,
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
