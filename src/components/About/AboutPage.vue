<template>
  <el-row>
    <el-col :span="6" style="justify-content: center; padding: 10px">
      <el-col>
        <el-card style="width: 300px">
          <el-table
            :data="list"
            cell-class-name="cell-row"
            header-cell-class-name="cell-header"
          >
            <el-table-column header-align="center">
              <template #header>
                <h2 class="menu-label">Отделения</h2>
                <el-input
                  prefix-icon="el-icon-search"
                  v-model="divisionFilter"
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
    </el-col>
    <el-col :span="18" style="padding: 10px">
      <AboutInfo :division="selectedDivision" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import AboutInfo from '@/components/About/AboutInfo.vue';
import IDivision from '@/interfaces/divisions/IDivision';
import Division from '@/classes/divisions/Division';

export default {
  name: 'AboutPage',
  components: {
    AboutInfo,
  },

  setup() {
    const store = useStore();
    const divisionFilter = ref('');
    const divisions = ref([new Division()]);
    const selectedDivision = ref({ id: '123', name: '123' });

    // Methods
    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      divisions.value = store.getters['divisions/divisions'];
      await loadDivision(divisions.value[0].id);
    };

    const loadDivision = async (id: number | undefined): Promise<void> => {
      await store.dispatch('divisions/get', id);
      selectedDivision.value = store.getters['divisions/division'];
      console.log(selectedDivision);
    };

    const list = computed((): IDivision[] => {
      if (divisionFilter.value) {
        return divisions.value.filter((o) =>
          o.name.toLowerCase().includes(divisionFilter.value.toLowerCase())
        );
      } else {
        return divisions.value;
      }
    });

    onMounted(loadDivisions);

    return {
      divisionFilter,
      divisions,
      selectedDivision,
      list,
      loadDivision,
      loadDivisions,
    };
  },
};
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
