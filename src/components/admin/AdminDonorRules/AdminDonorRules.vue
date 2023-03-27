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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import IDonorRulesWithDeleted from '@/interfaces/IDonorRulesWithDeleted';
import Menu from '@/services/classes/Menu';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import sort from '@/services/sort';
export default defineComponent({
  name: 'AdminDonorRules',
  components: { draggable, Grid, UploaderSingleScan },
  setup() {
    const store = useStore();
    const donorRulesWithDeleted: ComputedRef<IDonorRulesWithDeleted> = computed(() => store.getters['donorRules/items']);
    const mounted: Ref<boolean> = ref(false);
    const selectedMenu: Ref<Menu | undefined> = ref(undefined);

    const save = async () => {
      await store.dispatch('donorRules/updateMany');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('donorRules/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Информация для доноров крови',
        buttons: [{ text: 'Сохранить', type: 'primary', action: save }],
      });
      mounted.value = true;
      store.commit('admin/closeLoading');
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
