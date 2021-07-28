<template>
  <div class="flex-column">
    <div class="flex-row-end">
      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
    </div>
    <el-card>
      <el-table :data="divisions" v-if="divisions">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
        <el-table-column prop="phone" label="Номер телефона" sortable> </el-table-column>
        <el-table-column prop="email" label="Email" sortable> </el-table-column>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'AdminDivisionsList',
  setup() {
    const store = useStore();
    const divisions = computed(() => store.getters['divisions/divisions']);

    store.commit('admin/setPageTitle', 'Отделения');
    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      console.log(divisions.value);
    };

    onMounted(loadDivisions);

    return { divisions };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}
</style>
