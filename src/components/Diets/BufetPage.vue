<template>
  <div v-if="mounted" class="container-bufet">
    <div class="bufet-header">
      <div class="header-top">
        <div class="header-right">
          <svg class="icon-cart" @click="$router.push('/bufet/cart')">
            <use xlink:href="#cart"></use>
          </svg>
          <div class="sup">{{ dailyMenuOrder.dailyMenuOrderItems.length }}</div>
        </div>
      </div>
      <div class="menu-bufet">
        <div
          v-for="dishesGroup in dailyMenu.getNonEmptyGroups()"
          :key="dishesGroup.id"
          class="item"
          @click="$scroll('#' + dishesGroup.getTransliteIdFromName(), -150)"
        >
          {{ dishesGroup.name }}
        </div>
      </div>
    </div>
    <div class="main">
      <div v-if="!dailyMenu.getNonEmptyGroups().length" class="info-window">На данный момент нет блюд для выбора</div>
      <template v-for="dishesGroup in dailyMenu.getNonEmptyGroups()" :key="dishesGroup.id">
        <div :id="dishesGroup.getTransliteIdFromName()" class="title-group">{{ dishesGroup.name }}</div>
        <div class="group-items">
          <DishCard v-for="dish in dishesGroup.getAvailableDishes()" :key="dish.id" :daily-menu-item="dish" />
        </div>
      </template>
    </div>
    <div v-if="dailyMenuOrder.dailyMenuOrderItems.length > 0" class="footer" @click="$router.push('/bufet/cart')">
      <button class="add-to-card" @click="$router.push('/bufet/cart')">В корзину</button>
      <div class="footer-info">
        <div class="field1">{{ dailyMenuOrder.getCaloricSum() }} ккал</div>
        <div class="field2">{{ dailyMenuOrder.getPriceSum() }} р.</div>
      </div>
    </div>
  </div>
  <Cart />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Cart from '@/assets/svg/Buffet/Cart.svg';
import FilterQuery from '@/classes/filters/FilterQuery';
import User from '@/classes/User';
import DishCard from '@/components/Diets/DishCard.vue';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DishesGroupsSortsLib from '@/services/Provider/libs/sorts/IDishesGroupsSortsLib';
import removeFromClass from '@/services/removeFromClass';

export default defineComponent({
  name: 'BufetPage',
  components: { Cart, DishCard },
  setup() {
    const dailyMenus: Ref<IDailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const dailyMenu: Ref<IDailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const formPattern: Ref<IForm> = computed(() => Provider.store.getters['formPatterns/item']);
    const dishesGroupsSource: Ref<IDishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishesGroups: Ref<IDishesGroup[]> = ref(dishesGroupsSource.value.filter((d: IDishesGroup) => d.dishSamples.length > 0));

    const dailyMenuOrder: Ref<IDailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);

    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);

    const load = async () => {
      Provider.filterQuery.value.setParams(Provider.schema.value.formPattern.code, 'bufet');
      await Provider.store.dispatch('formPatterns/get', Provider.filterQuery.value);
      dailyMenuOrder.value.reproduceFromStore();
      dailyMenuOrder.value.formValue.reproduceFromPattern(formPattern.value);
      dailyMenuOrder.value.formValue.user = new User(user.value);

      await getDishesGroups();
    };

    const getDishesGroups = async () => {
      const queryFilter = new FilterQuery();
      queryFilter.sortModels.push(DishesGroupsSortsLib.byOrder());
      await Provider.store.dispatch('dishesGroups/getAll', queryFilter);
      dishesGroups.value = dishesGroupsSource.value.filter((d: IDishesGroup) => d.dishSamples.length > 0);
    };

    Hooks.onBeforeMount(load);

    return {
      dishesGroupsSource,
      dailyMenuOrder,
      dishesGroups,
      dailyMenu,
      dailyMenus,
      mounted: Provider.mounted,
      schema: Provider.schema,
      removeFromClass,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
.container-bufet {
  position: relative;
  width: 100%;
  color: #ffffff;
}

.bufet-header {
  display: block;
  position: sticky;
  top: 59px;
  width: 100%;
  z-index: 2;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  height: 60px;
  background: #205bb8;
  padding: 0 20px;
}

.icon-cart {
  width: 40px;
  height: 40px;
  fill: #d2def1;
  cursor: pointer;
  transition: 0.3s;
}

.icon-cart:hover {
  fill: #ffffff;
}

.header-left {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 14px;
  color: inherit;
}

input[type='text'] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0 0 0 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background: #ffffff;
  text-transform: uppercase;
  padding-left: 12px;
  width: 33px;
  color: #205bb8;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: right;
  position: relative;
}

.sup {
  position: absolute;
  top: -3px;
  right: -8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #449d7c;
  color: #ffffff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.menu-bufet {
  width: 100%;
  height: 34px;
  overflow: hidden;
  background: #379fff;
  display: flex;
  align-items: center;
  justify-content: left;
  overflow-x: hidden;
  margin-bottom: 8px;
}

.item {
  height: 34px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 10px;
  color: #343e5c;
  &:hover {
    cursor: pointer;
    color: lighten(#343e5c, 10%);
  }
}
.active-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 10px;
  color: #ffffff;
}

.main {
  width: 100%;
}

.group-items {
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: repeat(0 5px);
  grid-auto-rows: 240px;
}

.group-items > div {
  object-fit: cover;
}

.footer {
  width: calc(100% - 40px);
  padding: 0 20px;
  height: 40px;
  background: #449d7c;
  display: flex;
  align-content: center;
  justify-content: space-between;
  cursor: pointer;
  position: sticky;
  bottom: 0px;
  z-index: 2;
}

.footer:hover {
  background: lighten(#449d7c, 10%);
}

.footer-info {
  display: flex;
  align-items: center;
  justify-content: right;
}

.add-to-card {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 0;
  border: none;
  padding: 0px;
  background: inherit;
  color: #ffffff;
  font-size: 16px;
}

.field1 {
  font-size: 10px;
  color: #2754eb;
  margin-right: 20px;
}

.field2 {
  font-size: 16px;
  color: #ffffff;
}

.title-group {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 18px;
  color: $site_dark_gray;
  margin-left: 30px;
  height: 50px;
}
.info-window {
  text-align: center;
  width: auto;
  color: #343e5c;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  font-style: italic;
  font-size: 18px;
}

@media screen and (max-width: 768px) {
  .menu-bufet {
    width: 100%;
    height: 34px;
    overflow: hidden;
    background: #379fff;
    display: flex;
    align-items: center;
    justify-content: left;
    overflow-x: scroll;
  }

  .container-bufet {
    margin-top: -20px;
  }
}
</style>
