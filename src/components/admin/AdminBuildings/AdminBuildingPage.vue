<template>
  <el-form ref="form" :model="building" label-position="top" :rules="rules">
    <el-card v-if="building">
      <el-form-item label="Наименование здания" prop="name">
        <el-input v-model="building.name" placeholder="Наименование здания"></el-input>
      </el-form-item>
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="building.address" placeholder="Адрес"></el-input>
      </el-form-item>
      <el-form-item label="Этажи">
        <el-table class="floors-table" :data="building.floors" style="width: 200px;">
          <el-table-column label="Номер этажа">
            <template #default="scope">
              <el-input-number v-model="scope.row.number" controls-position="right" :min="0" style="width: 100px;"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="50" align="center">
            <template #header>
              <el-button icon="el-icon-plus" @click="addFloor"></el-button>
            </template>
            <template #default="scope">
              <TableButtonGroup :show-remove-button="true" @remove="removeFloor(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- <el-button type="success" style="margin: 10px;" @click="submit">Сохранить</el-button> -->
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import BuildingRules from '@/classes/buildings/BuildingRules';
import Floor from '@/classes/buildings/Floor';
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

    onBeforeMount(() => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
    });
    const loadBuilding = async (): Promise<void> => {
      await store.dispatch('buildings/get', route.params['id']);
      store.commit('admin/setPageTitle', { title: building.value.name, saveButton: true });
    };

    const addFloor = () => building.value.floors.push(new Floor({ buildingId: building.value.id, number: 0 }));
    const removeFloor = (index: string) => building.value.floors.splice(index, 1);
    onMounted(loadBuilding);

    const submit = async () => {
      if (!validate(form)) return;
      await store.dispatch('buildings/update', building.value);
      await router.push('/admin/buildings');
    };

    return { building, addFloor, removeFloor, submit, rules, form };
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
</style>
