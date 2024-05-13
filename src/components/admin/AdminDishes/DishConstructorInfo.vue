<template>
  <div class="modal-field" tabindex="-1" @click.self="close" @keydown.esc="close">
    <div class="modal-box">
      <div class="info">
        <div class="title">Общая информация</div>
        <div class="text">
          <!--          <div class="line">-->
          <!--            <div class="item">Дата последней архивации:</div>-->
          <!--            <div class="item2">01.09.2022г</div>-->
          <!--          </div>-->
          <div class="line">
            <div class="item">Категорий в книге:</div>
            <div class="item2">{{ dishesGroups.length }}</div>
          </div>
          <div class="line">
            <div class="item">Блюд в книге:</div>
            <div class="item2">{{ dishesGroups.reduce((s, g) => s + g.dishSamples.length, 0) }}</div>
          </div>
          <!--          <div class="line">-->
          <!--            <div class="item">Дата создания первой записи:</div>-->
          <!--            <div class="item2">10.01.2022г</div>-->
          <!--          </div>-->
          <!--          <div class="line2">-->
          <!--            <div class="item">Последняя добавленная категория:</div>-->
          <!--            <div class="line3">-->
          <!--              <div class="item1">Вторые блюда</div>-->
          <!--              <div class="item3">&nbsp;11.01.2023г.</div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="line2">
            <!-- <div class="item">Последнее добавленное блюдо:</div>
            <div class="line3">
              <div class="item1">{{ dishedSamples[dishedSamples.length - 1] }}</div>
           </div> -->
            <div class="item">Последнее отредактированное блюдо:</div>
            <div class="line3">
              <div class="item1" @click="$emit('selectLastDish', getLastDish())">{{ getLastDish().name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tools">
        <!-- <div class="button-field">
          <button class="button">Гид по интselectLastDishерфейсу</button>
          <button class="button">Справка</button>
          <button class="button">Архивация и бэкап</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import DishesGroup from '@/classes/DishesGroup';
import DishSample from '@/classes/DishSample';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DishConstructorInfo',
  emits: ['selectLastDish'],

  setup() {
    const dishesGroups: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishedSamples: Ref<DishSample[]> = computed(() => Provider.store.getters['dishesSamples/items']);

    const getLastDish = () => {
      let lastDishSample: DishSample = new DishSample();
      lastDishSample.updatedAt = new Date(-8640000000000000);
      dishesGroups.value.forEach((g: DishesGroup) => {
        g.dishSamples.forEach((e: DishSample) => {
          if (e.updatedAt && lastDishSample.updatedAt && e.updatedAt.getTime() > lastDishSample.updatedAt.getTime()) {
            lastDishSample = e;
          }
        });
      });
      return lastDishSample;
    };

    return {
      dishesGroups,
      dishedSamples,
      getLastDish,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

.modal-box {
  background: #e6f8f6;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.info {
  background: #e6f8f6;
  width: calc(100% - 30px);
  padding: 20px 20px 0 10px;
  margin-left: auto;
  margin-right: auto;
  color: #343e5c;
  font-size: 16px;
}

.tools {
  background: #e6f8f6;
  width: calc(100% - 30px);
  padding: 20px 20px 0 10px;
  margin-left: auto;
  margin-right: auto;
  color: #343e5c;
  font-size: 16px;
}

.title {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  font-size: 22px;
  color: #343e5c;
  margin-bottom: 20px;
}

.text {
  padding-left: 20px;
  font-size: 16px;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line2 {
  margin-top: 20px;
}

.line3 {
  display: flex;
  justify-content: left;
  align-items: center;
}

.item1 {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 10px;
  color: #00b5a4;
  cursor: pointer;
}

.item1:hover {
  color: darken(#00b5a4, 10%);
}

.item2 {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 200px;
  color: #00b5a4;
}

.item3 {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 12px;
  color: #1979cf;
  margin-left: 30px;
}
</style>
