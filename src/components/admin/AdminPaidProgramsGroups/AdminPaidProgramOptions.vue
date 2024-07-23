<template>
  <el-card header="Опции">
    <el-button @click="paidProgram.recreateAllPackages()">Пересоздать пакеты из фильтров</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="editMode = !editMode"></el-button>
    <template v-if="editMode">
      <el-row v-for="(optionsGroup, i) in paidProgram.paidProgramOptionsGroups" :key="optionsGroup.id" :gutter="40">
        <el-col :xl="6">
          <el-input v-model="optionsGroup.name" />
          <el-button type="success" icon="el-icon-plus" @click.stop="optionsGroup.addOption()"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click.stop="paidProgram.removeOptionsGroup(i)"></el-button>
        </el-col>
        <el-col :xl="18">
          <div v-for="(option, j) in optionsGroup.paidProgramOptions" :key="option.id" style="display: flex; justify-content: space-around">
            <el-input v-model="option.name" />
            <el-button type="danger" icon="el-icon-delete" @click.stop="optionsGroup.removeOption(j)"></el-button>
          </div>
        </el-col>
      </el-row>
      <el-button icon="el-icon-plus" type="success" @click="paidProgram.addOptionsGroup()"></el-button>
    </template>
    <template v-else>
      <draggable
        class="options-groups"
        :list="paidProgram.paidProgramOptionsGroups"
        item-key="id"
        handle=".handle"
        @end="sort(paidProgram.paidProgramOptionsGroups)"
      >
        <template #item="{ element }">
          <el-card class="options-groups-card">
            <template #header>
              <div class="card-header">
                <span>{{ element.name }}</span>
                <el-icon class="handle"><Grid /></el-icon>
              </div>
            </template>

            <!-- <draggable -->
            <!--   class="groups" -->
            <!--   :list="element.paidProgramOptions" -->
            <!--   item-key="id" -->
            <!--   handle=".handle" -->
            <!--   @end="sort(element.paidProgramOptions)" -->
            <!-- > -->
            <!-- <template #item="{ element }"> -->
            <!--   <div> -->
            <!--     <el-icon class="handle"><Grid /></el-icon> -->
            <!--     <el-button :type="element.selected ? 'primary' : ''" @click="paidProgram.selectOption(element)"> -->
            <!--       {{ element.name }} -->
            <!--     </el-button> -->
            <!--   </div> -->
            <!-- </template> -->
            <!-- </draggable> -->
          </el-card>
        </template>
      </draggable>
    </template>
  </el-card>
</template>

<script lang="ts">
import { Grid } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';

import IPaidProgram from '@/interfaces/IPaidProgram';
import sort from '@/services/sort';
export default defineComponent({
  name: 'AdminPaidProgramOptions',
  components: { draggable, Grid },
  setup() {
    const mounted: Ref<boolean> = ref(false);
    const editMode: Ref<boolean> = ref(false);
    const paidProgram: IPaidProgram = PaidProgramsStore.Item();
    return {
      sort,
      editMode,
      mounted,
      paidProgram,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.el-card {
  margin-bottom: 20px;
}
:deep(.el-card__body) {
  font-size: 14px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}

.options-groups {
  display: flex;
  justify-content: space-around;
  &-card {
    width: 400px;
    margin: 10px 10px;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
