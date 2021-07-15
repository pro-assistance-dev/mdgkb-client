<template>
  <el-container direction="vertical" align="center">
    <h1>Сведения об организациях в сфере охраны здоровья</h1>
    <el-table
      :data="healthOrganizations"
      :expand-row-keys="expandRowKeys"
      :row-key="(row) => row.id"
      @expand-change="handleExpandChange"
      @row-click="handleExpandChange"
      cell-class-name="cell-row"
      class="table-shadow"
      :show-header="false"
    >
      <el-table-column>
        <template #default="scope">
          <span class="uppercase"
            ><h4>{{ scope.row.name }}</h4></span
          >
        </template>
      </el-table-column>
      <el-table-column header-align="center" type="expand">
        <template #default="scope">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-space direction="vertical" alignment="start">
                <div v-if="scope.row.phones.length">
                  <h4>Телефон:</h4>
                  <div v-for="item in scope.row.phones" :key="item.phone">
                    <b>{{ item.phone }}</b>
                    <span> - {{ item.description }}</span>
                  </div>
                </div>
                <div v-if="scope.row.timetable.length">
                  <h4>Часы работы:</h4>
                  <div v-for="(item, index) in scope.row.timetable" :key="index">
                    <b>{{ item.days }}</b>
                    <span> - {{ item.value }}</span>
                  </div>
                </div>
                <div v-if="scope.row.address">
                  <h4>Адрес:</h4>
                  <span>{{ scope.row.address }}</span>
                </div>
                <div v-if="scope.row.website">
                  <h4>Сайт:</h4>
                  <span>{{ scope.row.website }}</span>
                </div>
              </el-space>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <!-- <yandex-map
                :coords="Object.values(scope.row.geolocation)"
                :zoom="15"
                style="min-height: 200px; height: 100%;"
                v-if="allowMap"
              >
                <ymap-marker
                  :coords="Object.values(scope.row.geolocation)"
                  hint-content="some hint"
                  marker-id="123"
                />
              </yandex-map> -->
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
// import { yandexMap, ymapMarker } from 'vue-yandex-maps';

import HealthOrganization from '@/classes/healthOrganization/HealthOrganization';
import IHealthOrganization from '@/interfaces/healthOrganization/IHealthOrganization';

export default defineComponent({
  name: 'HealthOrganizationsPage',
  components: {
    // yandexMap,
    // ymapMarker,
  },
  setup() {
    const store = useStore();
    const healthOrganizations = ref([new HealthOrganization()]);

    const loadHealthOrganizations = async (): Promise<void> => {
      await store.dispatch('healthOrganizations/getAll');
      healthOrganizations.value = store.getters['healthOrganizations/healthOrganizations'];
    };

    const expandRowKeys = ref<(number | undefined)[]>([]);

    const handleExpandChange = (row: IHealthOrganization) => {
      const id = row.id;
      const lastId = expandRowKeys.value[0];
      expandRowKeys.value = id === lastId ? [] : [id];
    };

    const allowMap = ref(false);

    const openedOrganization = () => {
      allowMap.value = false;
      setTimeout(function () {
        allowMap.value = true;
      }, 500);
    };

    watch(healthOrganizations, openedOrganization);

    onMounted(loadHealthOrganizations);

    return {
      healthOrganizations,
      expandRowKeys,
      allowMap,
      handleExpandChange,
    };
  },
});
</script>

<style lang="scss" scoped>
$table-border: #f1f1f1;

.uppercase {
  text-transform: uppercase;
}

:deep(.cell-row) {
  cursor: pointer;
}

.table-shadow {
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%); /* Параметры тени */
  border: 1px solid $table-border;
  border-radius: 15px;
}

:deep(.no-border) {
  tr {
    border: none;
  }
}

h3,
h4 {
  margin: 0;
}
</style>
