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
    <LoadMoreButton @load-more="loadMore" />
  </PageWrapper>
</template>

<script lang="ts" setup>
import Doctor from '@/classes/Doctor';
import Head from '@/classes/Head';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const doctors: Ref<Doctor[]> = Store.Items('doctors');
const heads: Ref<Head[]> = Store.Items('heads');
const doctorsMode: ComputedRef<boolean> = computed(() => Router.Route().path === '/doctors');

const title: ComputedRef<string> = computed(() => {
  return Router.Route().path === 'heads' ? 'Руководство' : 'Медицинские работники';
});

const loadDoctors = async () => {
  await Store.FTSP('doctors');
};

const loadHeads = async () => {
  // Provider.setSortModel(HeadsSortsLib.byOrder());
  await Store.FTSP('heads');
};

const load = async () => {
  Provider.filterQuery.value.pagination.limit = 8;
  if (doctorsMode.value) {
    // Provider.setSortModels(DoctorsSortsLib.byFullName(Orders.Asc));
    await loadDoctors();
    return;
  }
  await loadHeads();
};

Hooks.onBeforeMount(load);

const loadMore = async () => {
  Provider.filterQuery.value.pagination.append = true;
  Provider.filterQuery.value.pagination.offset = doctorsMode.value ? doctors.value.length : heads.value.length;
  await Store.GetAll(doctorsMode.value ? 'doctors' : 'heads');
};

const changeMode = async (doctorsModeActive: boolean) => {
  Provider.resetFilterQuery();
  Provider.filterQuery.value.pagination.limit = 8;
  PHelp.Loading.Show();
  if (doctorsModeActive) {
    await Router.Replace('/doctors');
    await loadDoctors();
  } else {
    await Router.Replace('/heads');
    await loadHeads();
  }
  PHelp.Loading.Hide();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
