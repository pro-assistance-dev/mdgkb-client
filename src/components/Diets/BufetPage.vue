<template>
  <!-- <el-dialog v-model="dishesConstructorVisible" :width="1280" :destroy-on-close="true" center>
      <DishesSamplesConstructor :menu="selectedMenu" />
    </el-dialog> -->
  <div v-if="cartIsOpen" class="menu-shadow">
    <ModalBufetCart @close="toggleModalCart" />
  </div>
  <div v-if="mounted" class="container-bufet">
    <AdaptiveContainerHorizontal :menu-width="'170px'" :mobile-width="'1330px'">
      <template #menu>
        <div class="menu">Меню</div>
        <div class="menu-period">
          <div class="period">
            <div class="title">Завтрак</div>
            <svg class="icon-double-arrow">
              <use xlink:href="#double-arrow"></use>
            </svg>
            <div class="time">8:00-12:00</div>
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
              <!-- <img src="../../assets/img/buffet/image230.webp" alt="alt" /> -->
              <!-- <img src="../../assets/svg/Buffet/food.webp" alt="alt" /> -->
            </div>
          </template>

          <template #small-title> Заказать еду </template>

          <template #big-title>
            <template v-if="dailyMenuOrder.formValue.getFieldValueByCode('boxNumber').valueNumber">
              Бокс № {{ dailyMenuOrder.formValue.getFieldValueByCode('boxNumber').valueNumber }}
            </template>
          </template>

          <template #tags>asd </template>

          <template #contact><ContactsBlock :contact-info="ContactInfo.CreateBufetContacts()" /> </template>

          <template #buttons>
            <div class="right-block">
              <svg class="icon-heart">
                <use xlink:href="#heart"></use>
              </svg>
              <svg class="icon-cart" @click="toggleModalCart()">
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
          <Filter :text="'Диетические'" @change="(e) => dailyMenu.setOnlyDietary(e)" />
          <Filter :text="'Постные'" @change="(e) => dailyMenu.setOnlyLean(e)" />
        </Filters>
        <div class="main">
          <div v-if="!dailyMenu.getNotEmptyGroups().length > 0" class="info-window">На данный момент нет блюд для выбора</div>
          <template v-for="dishesGroup in dailyMenu.getNotEmptyGroups()" :key="dishesGroup.id">
            <div :id="dishesGroup.getTransliteIdFromName()" class="title-group">{{ dishesGroup.name }}</div>
            <div class="group-items">
              <DishCard v-for="dish in dishesGroup.getAvailableDishes()" :key="dish.id" :daily-menu-item="dish" />
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

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import Cart from '@/assets/svg/Buffet/Cart.svg';
import DoubleArrow from '@/assets/svg/Buffet/DoubleArrow.svg';
import Heart from '@/assets/svg/Buffet/Heart.svg';
import DailyMenu from '@/classes/DailyMenu';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DishesGroup from '@/classes/DishesGroup';
import Form from '@/classes/Form';
import User from '@/classes/User';
import AdaptiveContainerHorizontal from '@/components/Base/AdaptiveContainerHorizontal.vue';
import HeaderInfo from '@/components/Base/HeaderInfo.vue';
import ContactsBlock from '@/components/ContactsBlock.vue';
import Announcement from '@/components/Diets/Announcement.vue';
import DishCard from '@/components/Diets/DishCard.vue';
import Filter from '@/components/Diets/Filter.vue';
import Filters from '@/components/Diets/Filters.vue';
import ModalBufetCart from '@/components/Diets/ModalBufetCart.vue';
import IUser from '@/interfaces/IUser';
import ContactInfo from '@/services/classes/ContactInfo';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Hooks from '@/services/Hooks/Hooks';
import DishesGroupsSortsLib from '@/services/Provider/libs/sorts/IDishesGroupsSortsLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'BufetPage',
  components: {
    Filter,
    Cart,
    Heart,
    DoubleArrow,
    DishCard,
    AdaptiveContainerHorizontal,
    HeaderInfo,
    Filters,
    ModalBufetCart,
    ContactsBlock,
  },
  setup() {
    const dailyMenu: Ref<DailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const formPattern: Ref<Form> = computed(() => Provider.store.getters['formPatterns/item']);
    const dishesGroups: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const cartIsOpen: Ref<boolean> = ref(false);
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);

    const load = async () => {
      Provider.filterQuery.value.setParams(Provider.schema.value.formPattern.code, 'bufet');
      await Provider.store.dispatch('formPatterns/get', Provider.filterQuery.value);
      dailyMenuOrder.value.formValue.reproduceFromPattern(formPattern.value);
      dailyMenuOrder.value.formValue.setValue('boxNumber', Provider.getNumberQueryParam('place'));
      dailyMenuOrder.value.formValue.user = new User(user.value);
      await getDishesGroups();
      dailyMenu.value.dishesGroups = dishesGroups.value;
      dailyMenu.value.initGroups();
    };

    const getDishesGroups = async () => {
      const queryFilter = new FilterQuery();
      queryFilter.sortModels.push(DishesGroupsSortsLib.byOrder());
      await Provider.store.dispatch('dishesGroups/getAll', queryFilter);
    };

    const toggleModalCart = () => {
      if (dailyMenuOrder.value.isEmpty() && !cartIsOpen.value) {
        return ElMessage.warning('Необходимо выбрать блюда');
      }
      cartIsOpen.value = !cartIsOpen.value;
    };

    Hooks.onBeforeMount(load);

    return {
      dailyMenuOrder,
      dishesGroups,
      dailyMenu,
      mounted: Provider.mounted,
      schema: Provider.schema,
      cartIsOpen,
      toggleModalCart,
      ContactInfo,
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
  height: 34px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 10px;
  color: #343e5c;
  border-radius: $normal-border-radius;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background: #2754eb;
  }
}

.image-box {
  display: block;
  width: 96px;
  height: 96px;
  overflow: hidden;
  margin-bottom: 5px;
  margin-right: 16px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 96px;
    height: 96px;
    object-fit: cover;
  }
}
// .active-item {
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   margin: 0 10px;
//   color: #ffffff;
//   background: #2754EB;
// }

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
  border-radius: $normal-border-radius;
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
}
</style>
