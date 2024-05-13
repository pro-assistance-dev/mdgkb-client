<template>
  <div v-if="mounted">
    <template v-if="!preparation.preparationRulesGroups.length">
      <h2>Выберите тип исследования</h2>
      <el-button @click="createPreparation(false)">Инструментальное</el-button>
      <el-button @click="createPreparation(true)">Лабораторное</el-button>
    </template>
    <template v-else>
      <el-form ref="form" :model="preparation" label-position="top">
        <CollapseContainer>
          <template #default="scope">
            <CollapseItem
              v-for="preparationGroup in preparation.preparationRulesGroups"
              :key="preparationGroup.name"
              :title="preparationGroup.name"
              :tab-id="preparationGroup.order"
              :collapsed="false"
              :active-id="scope.activeId"
            >
              <template #inside-content>
                <el-button @click="preparationGroup.addRule()">Добавить пункт</el-button>
                <div v-for="(rule, i) in preparationGroup.preparationRules" :key="i">
                  <el-input v-model="rule.name" />
                  <el-button
                    @click="
                      $classHelper.RemoveFromClassByIndex(i, preparationGroup.preparationRules, preparationGroup.preparationRulesForDelete)
                    "
                    >Удалить правило</el-button
                  >
                </div>
              </template>
            </CollapseItem>
          </template>
        </CollapseContainer>
      </el-form>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Preparation from '@/classes/Preparation';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminPreparationPage',
  components: { CollapseContainer, CollapseItem },
  setup() {
    const form = ref();
    Provider.form = form;
    const preparation: Ref<Preparation> = computed(() => Provider.store.getters['preparations/item']);

    Hooks.onBeforeMount(Provider.loadItem, {
      adminHeader: {
        title: computed(() => (Provider.id() ? '' : 'Создании подготовки к исследованию')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave();

    const createPreparation = (laboratory: boolean) => {
      const newPreparation = Preparation.CreatePreparation(laboratory);
      newPreparation.id = preparation.value.id;
      newPreparation.name = preparation.value.name;
      newPreparation.laboratory = preparation.value.laboratory;
      Provider.store.commit('preparations/set', newPreparation);
    };

    return {
      createPreparation,
      preparation,
      form,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
