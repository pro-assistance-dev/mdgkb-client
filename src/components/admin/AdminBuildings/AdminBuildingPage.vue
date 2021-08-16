<template>
  <el-form v-if="mounted" ref="form" :model="building" label-position="top" :rules="rules">
    <el-card>
      <el-form-item label="Наименование здания" prop="name">
        <el-input v-model="building.name" placeholder="Наименование здания"></el-input>
      </el-form-item>
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="building.address" placeholder="Адрес"></el-input>
      </el-form-item>
    </el-card>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card>
          <el-form-item label="Этажи">
            <el-table class="floors-table" :data="building.floors">
              <el-table-column label="Номер этажа">
                <template #default="scope">
                  <el-input-number v-model="scope.row.number" controls-position="right" :min="0" style="width: 100px"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column width="50" align="center">
                <template #header>
                  <el-button icon="el-icon-plus" @click="addFloor"></el-button>
                </template>
                <template #default="scope">
                  <TableButtonGroup
                    :show-remove-button="true"
                    @remove="building.floors[scope.$index].divisions.length ? showRemoveWarning() : removeFloor(scope.row.id)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card>
          <el-form-item label="Входы">
            <el-table class="floors-table" :data="building.entrances">
              <el-table-column label="Номер этажа">
                <template #default="scope">
                  <el-input-number v-model="scope.row.number" controls-position="right" :min="0" style="width: 100px"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column width="50" align="center">
                <template #header>
                  <el-button icon="el-icon-plus" @click="addEntrance"></el-button>
                </template>
                <template #default="scope">
                  <TableButtonGroup
                    :show-remove-button="true"
                    @remove="building.entrances[scope.$index].divisions.length ? showRemoveWarning() : removeEntrance(scope.row.id)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- <el-button type="success" style="margin: 10px;" @click="submit">Сохранить</el-button> -->
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import BuildingRules from '@/classes/buildings/BuildingRules';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import validate from '@/mixinsAsModules/validate';

export default defineComponent({
  name: 'AdminBuildingPage',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const building = computed(() => store.getters['buildings/building']);
    const rules = ref(BuildingRules);
    const form = ref();
    const mounted = ref(false);

    onBeforeMount(() => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
    });
    const loadBuilding = async (): Promise<void> => {
      await store.dispatch('buildings/get', route.params['id']);
      store.commit('admin/setPageTitle', { title: building.value.name, saveButton: true });
      mounted.value = true;
    };

    const addFloor = () => store.commit('buildings/addFloor');
    const addEntrance = () => store.commit('buildings/addEntrance');
    const removeEntrance = (id: string) => store.commit('buildings/removeEntrance', id);
    const showRemoveWarning = () => {
      ElMessage({
        type: 'warning',
        message: 'Удаление отменено. Есть привызяанные отделения',
      });
    };
    const removeFloor = (id: string) => {
      store.commit('buildings/removeFloor', id);
    };
    onMounted(loadBuilding);

    const submit = async () => {
      if (!validate(form)) return;
      await store.dispatch('buildings/update', building.value);
      await router.push('/admin/buildings');
    };

    return {
      building,
      addFloor,
      removeFloor,
      addEntrance,
      removeEntrance,
      submit,
      rules,
      form,
      mounted,
      showRemoveWarning,
    };
  },
});
</script>

<style lang="scss" scoped>
.floors-table {
  .el-button {
    padding: 0 10px;
    border: none;
  }
}

.el-card {
  margin-bottom: 20px;
}
</style>
