<template>
  <el-form :model="building" label-position="top" :rules="rules" ref="form">
    <el-card v-if="building">
      <el-form-item label="Наименование здания" prop="name">
        <el-input v-model="building.name" placeholder="Наименование здания"></el-input>
      </el-form-item>
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="building.address" placeholder="Адрес"></el-input>
      </el-form-item>
      <el-form-item label="Этажи">
        <el-table class="floors-table" :data="building.floors" style="width: 200px">
          <el-table-column label="Номер этажа">
            <template #default="scope">
              <el-input-number controls-position="right" :min="0" v-model="scope.row.number" style="width: 100px"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="50" align="center">
            <template #header>
              <el-button @click="addFloor" icon="el-icon-plus"></el-button>
            </template>
            <template #default="scope">
              <TableButtonGroup @remove="removeFloor(scope.$index)" :showRemoveButton="true" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button @click="submit" type="success" style="margin: 10px">Сохранить</el-button>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Floor from '@/classes/buildings/Floor';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import BuildingRules from '@/classes/buildings/BuildingRules';

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

    const loadBuilding = async (): Promise<void> => {
      await store.dispatch('buildings/get', route.params['id']);
      store.commit('admin/setPageTitle', building.value.name);
    };

    const addFloor = () => building.value.floors.push(new Floor({ buildingId: building.value.id, number: 0 }));
    const removeFloor = (index: string) => building.value.floors.splice(index, 1);
    onMounted(loadBuilding);

    const submit = async () => {
      let validationResult;
      form.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
      });
      if (!validationResult) return;
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
