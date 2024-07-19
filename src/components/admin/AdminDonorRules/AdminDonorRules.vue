<template>
  <div v-if="mounted" class="wrapper donorRules-flex">
    <draggable
      class="groups"
      :list="donorRulesWithDeleted.donorRules"
      item-key="id"
      handle=".handle"
      @end="sort(donorRulesWithDeleted.donorRules)"
    >
      <template #item="{ element, index }">
        <div>
          <el-icon class="handle"><Grid /></el-icon>
          <div>
            <el-input v-model="element.name" />
            <el-button type="danger" size="medium" icon="el-icon-delete" @click.stop="donorRulesWithDeleted.removeDonorRule(index)" />
            <el-button type="info" size="medium" icon="el-icon-edit" @click="element.editMode = true" />
            <UploaderSingleScan :file-info="element.image" @ratio="(e) => (element.ratio = e)" />
          </div>
        </div>
      </template>
    </draggable>
  </div>

  <div>
    <el-button @click="donorRulesWithDeleted.addDonorRule()">Добавить правило</el-button>
  </div>
</template>

<script lang="ts">
import { Grid } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';

import Menu from '@/services/classes/Menu';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import sort from '@/services/sort';

export default defineComponent({
  name: 'AdminDonorRules',
  components: { draggable, Grid, UploaderSingleScan },
  setup() {
    const donorRulesWithDeleted: DonorRule[] = DonorRulesStore.Items();
    const mounted: Ref<boolean> = ref(false);
    const selectedMenu: Ref<Menu | undefined> = ref(undefined);

    const save = async () => {
      await DonorRulesStore.UpdateMany();
    };

    onBeforeMount(async () => {
      await DonorRulesStore.GetAll();
      PHelp.AdminUI.Head.Set('Информация для доноров крови', [Button.Success('Сохранить', save)]);
      mounted.value = true;
    });

    return {
      sort,
      selectedMenu,
      mounted,
      donorRulesWithDeleted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.groups {
  display: flex;
  flex-wrap: wrap;
}

.menu-show {
  height: 150px;
  width: 120px;
}
.donorRules-flex {
  display: flex;
  flex-wrap: wrap;
}
.menu-card {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;
}
.menu-show {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;

  &-body {
    height: 80%;
  }

  &-footer {
    display: flex;
    height: 20%;
    margin-bottom: 0;
  }

  &:hover {
    border: 2px;
    cursor: pointer;
    background: #7a7a7a;
  }
}

.menu-selected {
  background: #0075b2;
}
</style>
