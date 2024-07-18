<template>
  <div class="flex-column">
    <el-card v-for="(paidProgramsGroup, i) in paidProgramsGroups" :key="i">
      <div>
        {{ paidProgramsGroup.name }}
      </div>

      <el-card v-for="(paidProgram, j) in paidProgramsGroup.paidPrograms" :key="j" header="Программы">
        <div>{{ paidProgram.name }}</div>
      </el-card>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';

import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default defineComponent({
  name: 'PaidPrograms',
  setup() {
    const paidProgramsGroups: IPaidProgramsGroup[] = PaidProgramsStore.Items();

    onBeforeMount(async () => {
      await PaidProgramsStore.GetAll();
    });

    return { paidProgramsGroups };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

.el-tag {
  margin: 3px;
}
</style>
