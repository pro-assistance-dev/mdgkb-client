<template>
  <el-card>
    <template #header>
      <div class="flex-between">
        <span>Правила посещения</span>
        <el-button
          size="mini"
          type="success"
          @click="division.addVisitingRuleGroup()"
        >
          Добавить группу правил
        </el-button>
      </div>
    </template>
    <el-switch
      v-model="division.showCommonVisitingRules"
      active-text="Показывать общие правила"
      inactive-text="Не показывать"
    />
    <div
      v-for="visitingRulesGroup in division.visitingRulesGroups"
      :key="visitingRulesGroup"
    >
      <el-form-item>
        <el-input
          v-model="visitingRulesGroup.name"
          label="Название группы"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="visitingRulesGroup.color"
          label="Цвет пунктов"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="visitingRulesGroup.addVisitingRule()">
          Добавить правило
        </el-button>
      </el-form-item>
      <el-table :data="visitingRulesGroup.visitingRules">
        <el-table-column
          width="50"
          align="center"
        >
          <template #default="scope">
            <TableMover
              :ordered-items="visitingRulesGroup.visitingRules"
              :index="scope.$index"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="Правила посещения"
          sortable
        >
          <template #default="scope">
            <el-form-item style="margin: 0">
              <el-input
                v-model="scope.row.text"
                placeholder="Правило"
                type="textarea"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="Тип"
          width="200"
          align="center"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.isListItem"
              active-text="Список"
              inactive-text="Текст"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="50"
          align="center"
        >
          <template #default="scope">
            <TableButtonGroup
              :show-remove-button="true"
              @remove="
                $classHelper.RemoveFromClassByIndex(
                  scope.$index,
                  visitingRulesGroup.visitingRules,
                  visitingRulesGroup.visitingRulesForDelete
                )
              "
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
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

    return {
      division,
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
