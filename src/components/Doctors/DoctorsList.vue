<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <div class="left-side-container">
          <!--          <NewsEventsButtons @load="loadNews" />-->
          <!--          <NewsCalendar />-->
          <!--          <NewsFilters />-->
        </div>
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <RemoteSearch />
        <el-row>
          <el-col
            v-for="doctor in doctors"
            :key="doctor.id"
            :xl="8"
            :lg="8"
            :md="12"
            :sm="12"
            :style="{ padding: '10px', display: 'flex' }"
          >
            <div style="margin: 0 auto; height: 350px">
              <DoctorInfoCard :doctor="doctor" />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RemoteSearch from '@/components/admin/RemoteSearch.vue';
import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorPage',
  components: {
    DoctorInfoCard,
    RemoteSearch,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const mount = ref(false);

    onBeforeMount(async () => {
      store.commit('filter/setStoreModule', 'doctors');
      await store.dispatch('doctors/getAll');
      mount.value = true;
    });

    return {
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
