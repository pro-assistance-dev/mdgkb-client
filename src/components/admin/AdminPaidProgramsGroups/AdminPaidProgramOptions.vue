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
      <div v-for="optionsGroup in paidProgram.paidProgramOptionsGroups" :key="optionsGroup.id">
        <h4>{{ optionsGroup.name }}</h4>
        <el-button
          v-for="option in optionsGroup.paidProgramOptions"
          :key="option.id"
          :type="option.selected ? 'primary' : ''"
          @click="paidProgram.selectOption(option)"
        >
          {{ option.name }}
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IPaidProgram from '@/interfaces/IPaidProgram';

export default defineComponent({
  name: 'AdminPaidProgramOptions',
  components: {},
  setup() {
    const store = useStore();
    const mounted: Ref<boolean> = ref(false);
    const editMode: Ref<boolean> = ref(false);
    const paidProgram: Ref<IPaidProgram> = computed<IPaidProgram>(() => store.getters['paidPrograms/item']);
    return {
      editMode,
      mounted,
      paidProgram,
    };
  },
});
</script>

<style lang="scss" scoped>
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
</style>
