<template>
  <div class="flex-column">
    <div>
      <el-button @click="addGroup">Добавить группу</el-button>
      <el-button v-if="editMode" @click="save">Сохранить</el-button>
      <el-button v-else @click="editMode = !editMode">Редактировать</el-button>
    </div>
    <div v-if="editMode">
      <el-card v-for="(paidProgramsGroup, i) in paidProgramsGroups" :key="i">
        <el-input v-model="paidProgramsGroup.name"></el-input>
        <el-button @click="removeGroup">Удалить группу</el-button>
        <el-button @click="paidProgramsGroup.addPaidProgram()">Добавить программу</el-button>

        <el-card v-for="(paidProgram, j) in paidProgramsGroup.paidPrograms" :key="j">
          <el-input v-model="paidProgram.name"></el-input>
          <el-button @click="paidProgramsGroup.removePaidProgram(j)">Удалить</el-button>
        </el-card>
      </el-card>
    </div>
    <div v-else>
      <el-card v-for="(paidProgramsGroup, i) in paidProgramsGroups" :key="i">
        <div>
          {{ paidProgramsGroup.name }}
        </div>

        <el-card v-for="(paidProgram, j) in paidProgramsGroup.paidPrograms" :key="j">
          <el-button @click="editProgram(paidProgram.id)">Редактировать</el-button>
          <div>{{ paidProgram.name }}</div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

import PaidProgramsGroup from '@/classes/PaidProgramsGroup';
import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default defineComponent({
  name: 'AdminPaidProgramsGroupsList',
  setup() {
    const router = useRouter();
    const editMode = ref(false);
    const paidProgramsGroups: IPaidProgramsGroup[] = PaidProgramsGroupsStore.Items();

    onBeforeMount(async () => {
      await PaidProgramsGroupsStore.GetAll();
      PHelp.AdminUI.Head.Set('Платные программы', []);
    });

    const addGroup = () => {
      paidProgramsGroups.push(new PaidProgramsGroup());
    };

    const editProgram = async (id: string) => {
      await router.push(`/admin/paid-programs/${id}`);
    };

    const save = async () => {
      // await store.dispatch('paidProgramsGroups/updateMany', {
      //   paidProgramsGroups: paidProgramsGroups.value,
      // });
      editMode.value = false;
    };

    return { editProgram, addGroup, paidProgramsGroups, save, editMode };
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
