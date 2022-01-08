<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="9" :md="8" :lg="5" :xl="5">
      <el-card class="">
        <el-table height="1000" :data="list" cell-class-name="cell-row" header-cell-class-name="cell-header">
          <el-table-column header-align="center">
            <template #header>
              <h2 class="menu-label">Отделения</h2>
              <el-input
                v-model="divisionFilter"
                prefix-icon="el-icon-search"
                placeholder="Найти отделение"
                class="table-search"
                size="mini"
              />
            </template>
            <template #default="scope">
              <el-space @click="loadDivision(scope.row.id)">
                <i class="el-icon-link icon"> </i>
                <span> {{ scope.row.name }}</span>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="15" :md="16" :lg="19" :xl="19">
      <AboutInfo :division="selectedDivision" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import AboutInfo from '@/components/About/AboutInfo.vue';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'AboutPage',
  components: {
    AboutInfo,
  },

  setup() {
    const store = useStore();
    const divisionFilter = ref('');
    const divisions: Ref<IDivision[]> = ref([]);
    const selectedDivision = computed(() => store.getters['divisions/division']);

    // Methods
    const loadDivisions = async (): Promise<void> => {
      store.commit('divisions/setOnlyShowed', true);
      await store.dispatch('divisions/getAll');
      divisions.value = store.getters['divisions/divisions'];
      await loadDivision(divisions.value[0].id);
    };

    const loadDivision = async (id: string | undefined): Promise<void> => {
      await store.dispatch('divisions/get', id);
    };

    const list = computed((): IDivision[] => {
      if (divisionFilter.value) {
        return divisions.value.filter((o) => o.name.toLowerCase().includes(divisionFilter.value.toLowerCase()));
      } else {
        return divisions.value;
      }
    });

    onBeforeMount(async () => {
      await loadDivisions();
      await store.dispatch('visitingRules/getAll');
    });

    return {
      divisionFilter,
      divisions,
      selectedDivision,
      list,
      loadDivision,
      loadDivisions,
    };
  },
});
</script>

<style scoped>
.el-card {
  border-radius: 15px;
  width: 100%;
  color: #4a4a4a;
}

.menu-label {
  color: #7a7a7a;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0;
}

.icon {
  padding-right: 5px;
}

.el-table::before {
  border: none;
  height: 0;
}

:deep(.el-input__inner) {
  border-radius: 20px;
}

:deep(.cell-row) {
  padding: 5px 0;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

:deep(.cell-header) {
  border: none !important;
  padding-top: 0 !important;
}
</style>
