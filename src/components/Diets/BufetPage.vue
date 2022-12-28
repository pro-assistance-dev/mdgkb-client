<template>
  <div v-if="mounted" class="container-bufet">
    <div class="bufet-header">
      <div class="header-top">
        <div class="header-left">
          Номер бокса:
          <input id="room" v-model="dailyMenuOrder.boxNumber" type="text" name="name" placeholder="0" />
        </div>
        <div class="header-right">
          <svg class="icon-cart" @click="$router.push('/bufet/cart')">
            <use xlink:href="#cart"></use>
          </svg>
          <div class="sup">{{ dailyMenuOrder.dailyMenuOrderItems.length }}</div>
        </div>
      </div>
      <div class="menu-bufet">
        <div v-for="dishesGroup in dishesGroups" :key="dishesGroup.id" class="item" @click="scrollToGroup">{{ dishesGroup.name }}</div>
      </div>
    </div>
    <div class="main">
      <template v-for="dishesGroup in dailyMenu.getNonEmptyGroups()" :key="dishesGroup.id">
        <div class="title-group">{{ dishesGroup.name }}</div>
        <div class="group-items">
          <DishCard v-for="dish in dishesGroup.getAvailableDishes()" :key="dish.id" :daily-menu-item="dish" />
        </div>
      </template>
    </div>
    <div v-if="dailyMenuOrder.dailyMenuOrderItems.length > 0" class="footer">
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
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, h, onBeforeUnmount, Ref, ref } from 'vue';

import Cart from '@/assets/svg/Buffet/Cart.svg';
import FilterModel from '@/classes/filters/FilterModel';
import User from '@/classes/User';
import DishCard from '@/components/Diets/DishCard.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DailyMenusFiltersLib from '@/services/Provider/libs/filters/DailyMenusFiltersLib';
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
    const dayFilter: Ref<IFilterModel> = ref(new FilterModel());
    const dailyMenuOrder: Ref<IDailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);

    let sourceSSE: EventSource | undefined = undefined;

    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const userForm = ref();

    const load = async () => {
      Provider.filterQuery.value.setParams(Provider.schema.value.formPattern.code, 'bufet');
      await Provider.store.dispatch('formPatterns/get', Provider.filterQuery.value);
      dailyMenuOrder.value.reproduceFromStore();
      dailyMenuOrder.value.formValue.reproduceFromPattern(formPattern.value);
      dailyMenuOrder.value.formValue.user = new User(user.value);
      dayFilter.value = DailyMenusFiltersLib.byDate(new Date());
      await getDailyMenus();
      sourceSSE = await Provider.handlerSSE<IDailyMenu>('daily-menu-update', '', updateMenu);
      await Provider.store.dispatch('dishesGroups/getAll');
    };

    const updateMenu = async (e: MessageEvent) => {
      Provider.store.commit('dailyMenus/set', JSON.parse(e.data));
      console.log('updateMenu()');
      dailyMenu.value.groupDishes();
      checkDailyMenuItemsAvailable();
    };

    const checkDailyMenuItemsAvailable = () => {
      const nonAvailableItems = dailyMenuOrder.value.filterAndGetNonActualDailyMenuItems(dailyMenu.value);
      if (nonAvailableItems.length === 0) {
        return;
      }
      ElMessageBox({
        title: 'Некоторые блюда стали недоступны и удалены из корзины',
        message: h(
          'p',
          null,
          nonAvailableItems.map(({ id, dailyMenuItem: dailyMenuItem }) => {
            return h('div', { key: id }, `${dailyMenuItem.name}`);
          })
        ),
      });
    };

    const getDailyMenus = async () => {
      const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
      dayFilter.value.date1 = new Date(new Date().getTime() - userTimezoneOffset);
      Provider.setFilterModel(dayFilter.value);
      await Provider.store.dispatch('dailyMenus/getAll', Provider.filterQuery.value);
      if (dailyMenus.value.length === 0) {
        return;
      }
      Provider.store.commit('dailyMenus/set', dailyMenus.value[0]);
      dailyMenu.value.groupDishes();
    };

    Hooks.onBeforeMount(load);

    onBeforeUnmount(async () => {
      sourceSSE?.close();
      // await Provider.store.dispatch('comments/unsubscribeCreate');
    });

    return {
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

  position: sticky;
  bottom: 0px;
  z-index: 2;
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
  cursor: pointer;
  border: none;
  padding: 0px;
  background: inherit;
  color: #d2def1;
  font-size: 16px;
}

.add-to-card:hover {
  color: #ffffff;
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
