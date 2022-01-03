<template>
  <div v-if="mounted" class="wrapper preparations-flex">
    <div v-for="(preparation, i) in preparations" :key="preparation.id">
      <div v-if="preparation.editMode" class="preparation-card">
        <el-input v-model="preparation.name"></el-input>
        <el-button type="danger" size="medium" icon="el-icon-delete" @click="removePreparation(i)" />
        <el-button type="success" size="medium" icon="el-icon-edit" @click="preparation.editMode = false" />
        <el-checkbox
          v-for="tag in preparationsTags"
          :key="tag.id"
          :label="tag.name"
          :model-value="preparation.findTag(tag.id)"
          @change="preparation.addTag($event, tag.id)"
        />
      </div>
      <div v-else class="preparation-show" :class="{ 'preparation-selected': preparation.selected }" @click="selectPreparation(i)">
        <div class="preparation-show-body">{{ preparation.name }}</div>
        <div class="preparation-show-footer">
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="removePreparation(i)" />
          <el-button type="info" size="medium" icon="el-icon-edit" @click="preparation.editMode = true" />
        </div>
      </div>
    </div>
    <div>
      <el-button @click="addPreparation">Добавить метод</el-button>
    </div>
  </div>
  <template v-if="selectedPreparation">
    <hr />
    <div v-for="(group, i) in selectedPreparation.preparationRulesGroups" :key="group">
      <div class="group-card">Имя группы правил: <el-input v-model="group.name" /></div>
      <el-button type="success" size="medium" icon="el-icon-plus" @click="group.addRule()" />
      <el-button type="danger" size="medium" icon="el-icon-delete" @click="selectedPreparation.removeRulesGroup(i)" />
      <div v-for="(rule, j) in group.preparationRules" :key="rule">
        <div class="group-card">Правило: <el-input v-model="rule.name" /></div>
        <div class="group-card">Время правила: <el-input v-model="rule.time" /></div>
        <el-button type="danger" size="medium" icon="el-icon-delete" @click="group.removeRule(j)" />
      </div>
    </div>
    <el-button type="success" size="medium" icon="el-icon-plus" @click="selectedPreparation.addRulesGroup()" />
  </template>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Preparation from '@/classes/Preparation';
import IPreparation from '@/interfaces/IPreparation';
import IPreparationTag from '@/interfaces/IPreparationTag';

export default defineComponent({
  name: 'AdminPreparations',

  setup() {
    const store = useStore();
    const preparations: ComputedRef<IPreparation[]> = computed(() => store.getters['preparations/items']);
    const preparationsTags: ComputedRef<IPreparationTag[]> = computed(() => store.getters['preparations/tags']);
    const mounted: Ref<boolean> = ref(false);
    const selectedPreparation: Ref<IPreparation | undefined> = ref(undefined);

    const save = async () => {
      await store.dispatch('preparations/updateMany');
    };
    const remove = (id: string) => {
      store.dispatch('preparations/remove', id);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('preparations/getAll');
      await store.dispatch('preparations/getAllTags');
      store.commit('admin/setHeaderParams', {
        title: 'Подготовка к исследованиям',
        buttons: [{ text: 'Сохранить', type: 'primary', action: save }],
      });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    const addPreparation = () => {
      preparations.value.push(new Preparation());
    };

    const removePreparation = (i: number) => {
      const idForDelete = preparations.value[i].id;
      if (idForDelete) {
        store.commit('preparations/addToDeleting', idForDelete);
      }
      preparations.value.splice(i, 1);
      if (selectedPreparation.value && selectedPreparation.value.id === idForDelete) {
        selectedPreparation.value = undefined;
      }
    };

    const selectPreparation = (i: number) => {
      const prevSelected = preparations.value.find((preparation: IPreparation) => preparation.selected);
      if (prevSelected) {
        prevSelected.selected = false;
      }
      preparations.value[i].selected = true;
      selectedPreparation.value = preparations.value[i];
    };

    return {
      preparationsTags,
      selectedPreparation,
      selectPreparation,
      removePreparation,
      addPreparation,
      mounted,
      preparations,
      remove,
    };
  },
});
</script>

<style lang="scss" scoped>
.preparation-show {
  height: 150px;
  width: 120px;
}
.preparations-flex {
  display: flex;
  flex-wrap: wrap;
}
.preparation-card {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;
}
.preparation-show {
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

.preparation-selected {
  background: #0075b2;
}
</style>
