<template>
  <div>
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
import Preparation from '@/classes/Preparation';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Hooks from '@/services/Hooks/Hooks';

export default defineComponent({
  name: 'AdminPreparationPage',
  components: { CollapseContainer, CollapseItem },
  setup() {
    const form = ref();
    const preparation: Preparation = PreparationsStore.Item();

    Hooks.onBeforeMount(async () => await PreparationsStore.Get(Router.Id()));
    Hooks.onBeforeRouteLeave();

    const createPreparation = (laboratory: boolean) => {
      const newPreparation = Preparation.CreatePreparation(laboratory);
      newPreparation.id = preparation.id;
      newPreparation.name = preparation.name;
      newPreparation.laboratory = preparation.laboratory;
      PreparationsStore.Set(newPreparation);
    };

    return {
      createPreparation,
      preparation,
      form,
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
