<template>
  <div v-if="cartIsOpen" class="menu-shadow">
    <ModalBufetCart @close="toggleModalCart" @order-created="initForm" />
  </div>
  <div id="container" class="container-bufet">
    <AdaptiveContainerHorizontal :menu-width="'170px'" :mobile-width="'1330px'" :title-sticky="true">
      <template v-if="dailyMenu.id" #menu>
        <div class="menu">Меню</div>
        <div class="menu-period">
          <div class="period">
            <div class="title">{{ dailyMenu.name }}</div>
            <svg class="icon-double-arrow">
              <use xlink:href="#double-arrow"></use>
            </svg>
            <div class="time">{{ dailyMenu.name === 'Завтрак' ? '8:00-12:00' : '12:00-17.00' }}</div>
          </div>
          <div class="menu-list">
            <div
              v-for="dishesGroup in dailyMenu.getNotEmptyGroups()"
              :key="dishesGroup.id"
              class="item"
              @click="$scroll('#' + dishesGroup.getTransliteIdFromName())"
            >
              <div>
                {{ dishesGroup.name }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #title>
        <HeaderInfo :left-width="'188px'" :background="'#ffffff'" :is-single="true" :is-bufet="true">
          <template #foto>
            <div class="image-box">
              <img :src="ImageBox" alt="eat" />
            </div>
          </template>

          <template #small-title> Заказать еду </template>

          <template #big-title>
            <template v-if="dailyMenuOrder.formValue.valueExists('boxNumber')">
              Заказать еду в бокс № {{ dailyMenuOrder.formValue.getFieldValueByCode('boxNumber').valueNumber }}
            </template>
            <template v-else> Заказать еду в бокс </template>
          </template>

          <template #tags>asd </template>

          <template #contact>
            <ContactsBlock :contact="createBufetContacts()" />
          </template>

          <template #buttons>
            <div class="right-block">
              <svg class="icon-heart">
                <use xlink:href="#heart"></use>
              </svg>
              <svg id="svgcart" class="icon-cart" @click="toggleModalCart()">
                <use xlink:href="#cart" />
              </svg>
              <div class="price-field">
                <div class="price">{{ dailyMenuOrder.getPriceSum() }} р.</div>
                <div class="quantity">{{ dailyMenuOrder.getDailyMenuItemsQuantity() }}</div>
              </div>
            </div>
          </template>
        </HeaderInfo>
      </template>
      <template #body>
        <!--        <Announcement :text="'До конца сервировки завтрака осталось 2 часа 15 минут'" :margin-top="'30px'" />-->
        <Filters :margin-top="'8px'">
          <!--          <Filter :text="'Доступные'" @change="(e) => dailyMenu.onlyAvailables(e)"/>-->
          <BufetFilter :text="'Диетические'" @change="(e) => dailyMenu.setOnlyDietary(e)" />
          <bufetFilter :text="'Постные'" @change="(e) => dailyMenu.setOnlyLean(e)" />
        </Filters>
        <div class="main">
          <div v-if="dailyMenu.getNotEmptyGroups(true).length === 0" class="info-window">На данный момент нет блюд для выбора</div>
          <template v-for="dishesGroup in dailyMenu.getNotEmptyGroups(true)" :key="dishesGroup.id">
            <div :id="dishesGroup.getTransliteIdFromName()" class="title-group">{{ dishesGroup.name }}</div>
            <div class="group-items">
              <DishCard
                v-for="dish in dishesGroup.getAvailableDishes()"
                :key="dish.id"
                :daily-menu-item="dish"
                :dishes-group-name="dishesGroup.name"
                :daily-menu-name="dailyMenu.name"
              />
            </div>
          </template>
        </div>
      </template>
    </AdaptiveContainerHorizontal>
  </div>
  <Cart />
  <Heart />
  <DoubleArrow />
</template>

<script lang="ts" setup>
import ImageBox from '@/assets/img/bufet/image230.webp';
import Cart from '@/assets/svg/Buffet/Cart.svg';
import DoubleArrow from '@/assets/svg/Buffet/DoubleArrow.svg';
import Heart from '@/assets/svg/Buffet/Heart.svg';
import DailyMenu from '@/classes/DailyMenu';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DishesGroup from '@/classes/DishesGroup';
import Form from '@/classes/Form';
import User from '@/classes/User';
import DishesGroupsSortsLib from '@/libs/sorts/DishesGroupsSortsLib';
import Contact from '@/services/classes/Contact';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import PostAddress from '@/services/classes/PostAddress';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const createBufetContacts = () => {
  const contact = new Contact();
  const address = new PostAddress();
  address.address = '4-й Добрынинский пер., 4, 1А корпус, 7й этаж';
  contact.postAddresses[0] = address;
  return contact;
};
const dailyMenu: DailyMenu = DailyMenusStore.Item();
const todayMenu: DailyMenu = DailyMenusStore.TodayMenu();
const formPattern: Ref<Form> = computed(() => Provider.store.getters['formPatterns/item']);
const dishesGroups: DishesGroup[] = DishesGroupsStore.Items();
const cartIsOpen: Ref<boolean> = ref(false);
const dailyMenuOrder: DailyMenuOrder = DailyMenuOrdersStore.Item();
const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
let intervalID: number;

// watch(isAuth, () => {
//   Provider.router.push('/bufet');
//   if (isAuth.value === true) {
//     console.log(isAuth);
//     initForm();
//   }
// });

const initForm = () => {
  dailyMenuOrder.formValue.reproduceFromPattern(formPattern.value);
  dailyMenuOrder.formValue.setValue('boxNumber', Provider.getNumberQueryParam('place'));
  dailyMenuOrder.formValue.user = new User(user.value);
};

const load = async () => {
  await DailyMenusStore.GetTodayMenu();
  dailyMenu.actualize(todayMenu);
  dailyMenuOrder.reproduceFromStore();
  checkDailyMenuItemsAvailable();
  initForm();
  await getDishesGroups();
  dailyMenu.dishesGroups = dishesGroups;
  dailyMenu.initGroups();

  intervalID = window.setInterval(async () => {
    await DailyMenusStore.GetTodayMenu();
    dailyMenu.actualize(todayMenu);
    dailyMenu.dishesGroups = dishesGroups;
    dailyMenu.initGroups();
  }, 5000);
};

const checkDailyMenuItemsAvailable = () => {
  setInterval(() => {
    if (!dailyMenu.id) {
      return;
    }
    const nonAvailableItems = dailyMenuOrder.filterAndGetNonActualDailyMenuItems(dailyMenu.value);
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
    if (dailyMenuOrder.dailyMenuOrderItems.length === 0) {
      Router.To('/bufet');
    }
  }, 2000);
};
const getDishesGroups = async () => {
  const queryFilter = new FilterQuery();
  queryFilter.sortModels.push(DishesGroupsSortsLib.byOrder());
  await DishesGroupsStore.GetAll();
};

const toggleModalCart = () => {
  if (dailyMenuOrder.isEmpty() && !cartIsOpen.value) {
    return ElMessage.warning('Необходимо выбрать блюда');
  }
  cartIsOpen.value = !cartIsOpen.value;
};

Hooks.onBeforeMount(load);

onBeforeUnmount(() => {
  clearInterval(intervalID);
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.container-bufet {
  position: relative;
  width: 100%;
  color: #ffffff;
}

.icon-heart {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-heart:hover {
  stroke: #eb2762;
  fill: #eb2762;
}

.icon-cart {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 8px;
}

.icon-cart:hover {
  stroke: #205bb8;
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

.item {
  font-size: 14px;
  min-height: 24px;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  color: #343e5c;
  border-radius: $border-radius;

  &:hover {
    cursor: pointer;
    color: #ffffff;
    background: #2754eb;
  }
}

.image-box {
  display: block;
  width: 140px;
  height: 140px;
  overflow: hidden;
  margin-right: 16px;
  position: relative;
  border: $normal-border;
  border-radius: $border-radius;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    object-fit: cover;
  }
}

.main {
  width: 100%;
}

.group-items {
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-template-rows: repeat(0 5px);
  grid-auto-rows: 375px;
}

.group-items > div {
  object-fit: cover;
}

.price-field {
  height: 25px;
  border-left: 2px solid #a1a7bd;
  padding: 0 16px 0 10px;
  margin-left: 10px;
}

.price {
  font-size: 14px;
  color: #343e5c;
  line-height: 0.8;
  margin: 0;
  padding: 0;
}

.quantity {
  color: #a1a7bd;
  font-size: 12px;
  margin: 0;
  padding: 0;
}

.title-group {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: $site_dark_gray;
  margin-top: 5px;
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

.right-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: start;
}

.menu {
  font-size: 22px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1em;
  color: #343e5c;
  font-weight: bold;
  padding: 5px 10px;
}

.menu-period {
  display: block;
  overflow-y: auto;
  max-height: 100vh;
}

.period {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 15px 10px 5px 10px;
}

.title {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 18px;
  color: #343e5c;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}

.icon-double-arrow {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  width: 23px;
  height: 23px;
  fill: #2754eb;
}

.time {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 11px;
  color: #343e5c;
  white-space: nowrap;
  margin: 1px 0 0 10px;
  padding: 0px;
}

.foto {
  width: 155px;
  height: 155px;
  border: $normal-border;
  border-radius: $border-radius;
  background: #e3e3e3;
}

.menu-shadow {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1330px) {
  .item {
    border-radius: 0;
    height: 100%;
    white-space: nowrap;
    padding: 0px 10px;
  }

  .menu {
    display: none;
  }

  .menu-period {
    display: flex;
  }

  .menu-period:last-child {
    margin-right: 0px;
  }

  .menu-list {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .period {
    position: sticky;
    left: 0px;
    top: 0px;
    z-index: 3;
    display: flex;
    justify-content: center;
    padding: 0;
    color: #ffffff;
    height: 50px;
    width: 100%;
  }

  .title {
    position: relative;
    display: flex;
    justify-content: left;
    font-size: 14px;
    height: 100%;
    color: #ffffff;
    background: #343e5c;
    color: #2754eb;
    background: #ffffff;
    min-width: 85px;
    padding-left: 10px;
    margin-left: -1px;
  }

  .time {
    position: absolute;
    display: flex;
    justify-content: left;
    bottom: 0px;
    left: 0px;
    margin: 0px 0 0 0px;
    color: #ffffff;
    color: #2754eb;
    height: 20px;
    width: 100%;
    padding-left: 10px;
  }

  .icon-double-arrow {
    position: absolute;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
    width: 23px;
    height: 23px;
    fill: #2754eb;
  }
}

@media screen and (max-width: 768px) {
  .container-bufet {
    margin-top: -20px;
  }

  .title-group {
    font-size: 16px;
    margin-left: 10px;
  }

  .menu-shadow {
    // overflow: hidden;
    // overflow-y: auto;
    align-items: start;
  }
}
</style>
