<template>
  <el-card>
    <template #header>
      <div class="flex-between">
        <div>Базы практик</div>
        <el-button size="small" type="success" @click="residencyCourse.addPracticePlaceGroup()">Добавить группу</el-button>
      </div>
    </template>
    <draggable
      class="groups"
      :list="residencyCourse.residencyCoursePracticePlaceGroups"
      item-key="id"
      handle=".el-icon-s-grid"
      @end="sort(residencyCourse.residencyCoursePracticePlaceGroups)"
    >
      <template #item="{ element, index }">
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="flex-between">
              <div class="flex">
                <div>
                  <i class="el-icon-s-grid drug-icon" />
                </div>
                <div style="margin-left: 10px">{{ element.name }}</div>
              </div>
              <div class="flex">
                <!-- <el-button size="small" type="success" @click="element.addPracticePlace()">Добавить место</el-button> -->
                <TableButtonGroup
                  :show-remove-button="true"
                  @remove="
                    $classHelper.RemoveFromClassByIndex(
                      index,
                      residencyCourse.residencyCoursePracticePlaceGroups,
                      residencyCourse.residencyCoursePracticePlaceGroupsForDelete
                    )
                  "
                />
              </div>
            </div>
          </template>
          <el-form-item label="Название группы" size="small">
            <el-input v-model="element.name" placeholder="Название группы" />
          </el-form-item>
          <el-form-item label="Ссылка" size="small">
            <el-input v-model="element.link" placeholder="Ссылка" />
          </el-form-item>

          <el-table :data="element.residencyCoursePracticePlaces">
            <el-table-column prop="link" label="Отеделение">
              <template #default="scope">
                <el-form-item size="mini" style="margin: 0" prop="division">
                  <el-select v-model="scope.row.division" filterable value-key="id" placeholder="Выберите отделение">
                    <el-option v-for="item in divisions" :key="item.id" :label="item.name" :value="item"> </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="Название места">
              <template #default="scope">
                <el-form-item size="mini" style="margin: 0">
                  <el-input v-model="scope.row.name" placeholder="Название места" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="link" label="Ссылка">
              <template #default="scope">
                <el-form-item size="mini" style="margin: 0">
                  <el-input v-model="scope.row.link" placeholder="Ссылка" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="70" align="center">
              <template #header>
                <el-button type="success" icon="el-icon-plus" size="mini" @click="element.addPracticePlace()" />
              </template>
              <template #default="scope">
                <TableButtonGroup
                  :show-remove-button="true"
                  @remove="
                    $classHelper.RemoveFromClassByIndex(
                      scope.$index,
                      element.residencyCoursePracticePlaces,
                      element.residencyCoursePracticePlacesForDelete
                    )
                  "
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </template>
    </draggable>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import draggable from 'vuedraggable';

import Division from '@/classes/Division';
import ResidencyCourse from '@/classes/ResidencyCourse';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';

export default defineComponent({
  name: 'AdminResidencyCoursePracticePlaces',
  components: { draggable, TableButtonGroup },
  setup() {
    const residencyCourse: ComputedRef<ResidencyCourse> = computed<ResidencyCourse>(() => Provider.store.getters['residencyCourses/item']);
    const divisions: ComputedRef<Division[]> = computed<Division[]>(() => Provider.store.getters['divisions/items']);

    onBeforeMount(() => {
      Provider.store.dispatch('divisions/getAllWithCount');
    });

    return {
      residencyCourse,
      sort,
      divisions,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drug-icon {
  cursor: pointer;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
