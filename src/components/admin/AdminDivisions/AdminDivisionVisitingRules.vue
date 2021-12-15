<template>
  <el-card>
    <template #header>
      <div class="flex-between">
        <span>Правила посещения</span>
        <el-button size="mini" type="success" @click="addVisitingRule">Добавить правило</el-button>
      </div>
    </template>
    <el-switch v-model="division.showCommonVisitingRules" active-text="Показывать общие правила" inactive-text="Не показывать"> </el-switch>
    <el-table :data="division.visitingRules">
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableMover :store-module="'divisions'" :store-getter="'visitingRules'" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="Правила посещения" sortable>
        <template #default="scope">
          <el-form-item
            style="margin: 0"
            :rules="[{ required: true, message: 'Необходимо указать текст правила', trigger: 'blur' }]"
            :prop="'visitingRules.' + scope.$index + '.text'"
          >
            <el-input v-model="scope.row.text" placeholder="Правило" type="textarea" :autosize="{ minRows: 2 }"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Тип" width="200" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.isListItem" active-text="Список" inactive-text="Текст"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeVisitingRule(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';

export default defineComponent({
  name: 'AdminDivisionVisitingRules',
  components: {
    TableMover,
    TableButtonGroup,
  },

  setup() {
    const store = useStore();
    const division = computed(() => store.getters['divisions/division']);

    const addVisitingRule = () => {
      store.commit('divisions/addVisitingRule');
    };
    const removeVisitingRule = (index: number) => {
      store.commit('divisions/removeVisitingRule', index);
    };

    return {
      division,
      addVisitingRule,
      removeVisitingRule,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
