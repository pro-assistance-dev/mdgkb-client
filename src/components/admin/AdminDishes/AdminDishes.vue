<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <template #header>
      <div class="calendar-block">
        <div class="calendar-title">
          Текущая неделя,
          {{
            $dateTimeFormatter.getPeriod(
              calendar.getActivePeriod()[0].date,
              calendar.getActivePeriod()[calendar.getActivePeriod().length - 1].date,
              {
                month: '2-digit',
                day: 'numeric',
                year: undefined,
              }
            )
          }}:
        </div>
        <div class="day-block">
          <button class="arrow-button" @click="calendar.move(false)">
            <svg class="icon-arrow-left">
              <use xlink:href="#arrow-left"></use>
            </svg>
          </button>
          <span v-for="day in calendar.getActivePeriod()" :key="day" @click="selectDay(day)">
            <span :class="{ blue: day.selected, normal: !day.selected }">
              <div class="day">
                <div class="date">
                  {{ $dateTimeFormatter.format(day.date, { month: '2-digit', day: '2-digit', year: undefined }) }}
                </div>
                <div class="day-week" :class="{ weekend: day.isWeekend() }">{{ $dateTimeFormatter.getShortDayName(day.date) }}</div>
              </div>
            </span>
          </span>
          <button class="arrow-button" @click="calendar.move(true)">
            <svg class="icon-arrow-right">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </template>
    <template #sort> </template>
    <div class="menu">
      <div class="menu-title-tools-tabs">
        <div class="menu-title-tabs">
          <div class="menu-title">
            Меню на {{ $dateTimeFormatter.format(calendar.getSelectedDay().date, { month: '2-digit', day: '2-digit', year: undefined }) }}
          </div>
          <div class="tabs">
            <ul>
              <li v-for="menu in dailyMenus" :key="menu.id" class="active-tabs-item" @click="selectMenu(menu)">{{ menu.name }}</li>
              <li class="tabs-button" @click="addMenu">
                <button class="tools-button">
                  <svg class="icon-add">
                    <use xlink:href="#add"></use>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="tools">
          <button class="tools-button">
            <svg class="icon-delete">
              <use xlink:href="#delete"></use>
            </svg>
          </button>
          <button class="tools-button">
            <svg class="icon-print">
              <use xlink:href="#print"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="diets-container">
        <div class="table-container">
          <table class="table-list">
            <colgroup>
              <col width="78%" />
              <col width="6%" />
              <col width="6%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; padding-left: 44px">Блюдо</td>
                <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Вес</td>
                <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Цена</td>
                <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Калорийность</td>
              </tr>
            </thead>
            <tbody>
              <td colspan="4" style="background: #f1f2f7">
                <div class="schedule-name">
                  <h4 style="font-size: 15px; color: #343d5b; padding-left: 15px; font-weight: bold; font-family: 'Open Sans'">
                    Первые блюда
                  </h4>
                </div>
              </td>
              <tr>
                <td style="font-size: 12px; padding-left: 44px">Суп овощной</td>
                <td style="text-align: center">
                  <h4 style="font-size: 13px; color: #343d5c">вес</h4>
                </td>
                <td style="text-align: center; font-weight: bold">
                  <h4 style="font-size: 15px; color: #343d5c; font-weight: bold">25.00р.</h4>
                </td>
                <td style="text-align: center">
                  <h4 style="font-size: 13px; color: #2754eb">50ккал</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="button-block">
        <button v-if="!selectedMenu" class="button-add" @click="createMenu">Добавить</button>
        <button v-if="selectedMenu" class="button-save" @click="submit">Сохранить</button>
        <button v-if="selectedMenu" class="button-print" @click="pdf">Печать</button>
      </div>
    </div>
    <template v-if="selectedMenu">
      <div v-for="dishesGroup in selectedMenu.dishesGroups" :key="dishesGroup.id">
        <div>
          <b>{{ dishesGroup.name }}</b>
        </div>
        <div v-for="dailyMenuItem in dishesGroup.dailyMenuItems" :key="dailyMenuItem.id">
          {{ dailyMenuItem.name }}
        </div>
      </div>
      <button class="button-add" @click="addDishes">Добавить блюда</button>
    </template>

    <el-dialog v-model="dishesConstructorVisible" :width="1280" :destroy-on-close="true" center>
      <DishesSamplesConstructor :menu="selectedMenu" />
    </el-dialog>

    <el-dialog v-model="addDishVisible" :width="1280" :destroy-on-close="true" center @closed="closeModal">
      <template #title>
        <div class="add-title">Выберите блюда из книги блюд</div>
      </template>
      <AddDish :menu="selectedMenu" />
    </el-dialog>
  </component>
  <ArrowLeft />
  <ArrowRight />
  <Add />
  <Delete />
  <Print />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Add from '@/assets/svg/Buffet/Add.svg';
import ArrowLeft from '@/assets/svg/Buffet/ArrowLeft.svg';
import ArrowRight from '@/assets/svg/Buffet/ArrowRight.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Print from '@/assets/svg/Buffet/Print.svg';
import Calendar from '@/classes/Calendar';
import DailyMenu from '@/classes/DailyMenu';
import FilterModel from '@/classes/filters/FilterModel';
import AddDish from '@/components/admin/AdminDishes/AddDish.vue';
import DishesSamplesConstructor from '@/components/admin/AdminDishes/DishesSamplesConstructor.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ICalendar from '@/interfaces/ICalendar';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDay from '@/interfaces/IDay';
import IDishesGroup from '@/interfaces/IDishesGroup';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DailyMenusFiltersLib from '@/services/Provider/libs/filters/DailyMenusFiltersLib';
import removeFromClass from '@/services/removeFromClass';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDishes',
  components: {
    DishesSamplesConstructor,
    AdminListWrapper,
    AddDish,
    ArrowLeft,
    ArrowRight,
    Add,
    Delete,
    Print,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);
    const addDishVisible: Ref<boolean> = ref(false);
    const dishesConstructorVisible: Ref<boolean> = ref(false);
    const dailyMenus: Ref<IDailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const dishesGroups: Ref<IDishesGroup[]> = ref([]);
    const calendar: Ref<ICalendar> = ref(Calendar.InitFull());
    const dayFilter: Ref<IFilterModel> = ref(new FilterModel());
    const selectedMenu: Ref<IDailyMenu | undefined> = ref();
    const load = async () => {
      dayFilter.value = DailyMenusFiltersLib.byDate(new Date());
      await Provider.store.dispatch('search/searchGroups');
      await Provider.store.dispatch('dishesGroups/getAll');
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Меню буфета',
        buttons: [{ action: openDishesConstructor, text: 'Создать блюда', type: 'info' }],
      });
      await selectDay(calendar.value.getToday());
    };

    const openDishesConstructor = () => {
      dishesConstructorVisible.value = true;
    };

    Hooks.onBeforeMount(load);

    const getTodayMenus = async () => {
      dayFilter.value.date1 = calendar.value.getSelectedDay().date;
      Provider.setFilterModel(dayFilter.value);
      await Provider.store.dispatch('dailyMenus/getAll', Provider.filterQuery.value);
    };

    const findMenu = () => {
      selectedMenu.value = dailyMenus.value.find((dm: IDailyMenu) => {
        return dm.date.getDate() === calendar.value.getSelectedDay().date.getDate();
      });
      if (!selectedMenu.value) {
        return;
      }
      selectedMenu.value?.groupDishes();
    };

    const selectDay = async (day: IDay): Promise<void> => {
      calendar.value.selectDay(day);
      await getTodayMenus();
      if (dailyMenus.value.length === 0) {
        selectedMenu.value = DailyMenu.Create(day.date);
        dailyMenus.value.push(selectedMenu.value);
        await Provider.store.dispatch('dailyMenus/create', selectedMenu.value);
        return;
      }
      findMenu();
    };

    const addDishes = () => {
      addDishVisible.value = true;
    };

    const submit = async () => {
      if (selectedMenu.value?.id) {
        await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
      } else {
        await Provider.store.dispatch('dailyMenus/create', selectedMenu.value);
      }
    };

    const pdf = async () => {
      await Provider.store.dispatch('dailyMenus/pdf', selectedMenu.value);
    };

    const addMenu = () => {
      selectedMenu.value = DailyMenu.Create(new Date());
      dailyMenus.value.push(selectedMenu.value);
    };

    const selectMenu = (menu: IDailyMenu): void => {
      selectedMenu.value = menu;
      selectedMenu.value?.groupDishes();
    };

    return {
      addMenu,
      selectMenu,
      dailyMenus,
      calendar,
      dishesConstructorVisible,
      pdf,
      submit,
      selectedMenu,
      addDishVisible,
      addDishes,
      selectDay,
      dishesGroups,
      rules,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.blue {
  display: flex;
  padding: 2px 3px;
  background: #c4e3ff;
  border: 2px solid #379fff;
  border-radius: 5px;
  transition: 0.5s;
}

.normal {
  display: flex;
  padding: 2px 3px;
  background: #ffffff;
  border: 2px solid #ffffff;
  transition: 0.3s;
}

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

.arrow-button {
  background: #ffffff;
  border-radius: none;
  border: none;
}

.tools-button {
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.icon-arrow-left {
  width: 24px;
  height: 24px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
}

.icon-arrow-left:hover {
  fill: #7c8295;
}

.icon-arrow-right {
  width: 24px;
  height: 24px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
}

.icon-arrow-right:hover {
  fill: #7c8295;
}

.icon-add {
  width: 22px;
  height: 22px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-add:hover {
  fill: #379fff;
}

.icon-delete {
  width: 20px;
  height: 20px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;
  margin-top: 1px;
}

.icon-delete:hover {
  fill: #379fff;
}

.icon-print {
  width: 24px;
  height: 24px;
  fill: #ffffff;
  stroke: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;
}

.icon-print:hover {
  fill: #ffffff;
  stroke: #379fff;
}

.calendar-title {
  margin-left: 40px;
  margin-bottom: 3px;
  display: block;
  font-size: 14px;
  color: #343e5c;
}

.day-block {
  display: flex;
  width: 820px;
}

.day {
  display: flex;
  justify-content: space-between;
  width: 100px;
  height: 30px;
  border: 1px solid #7c8295;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
}

.date {
  font-size: 18px;
  color: #7c8295;
  margin-left: 5px;
}

.day-week {
  font-size: 18px;
  color: #1979cf;
  margin-right: 5px;
}

.weekend {
  color: red;
}

.menu {
  width: 100%;
  // height: 600px;
  background: #ffffff;
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background: #f9fafb;
}

.menu-title-tools-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #d8d9db;
  background: #ffffff;
}

.menu-title-tabs {
  display: flex;
  justify-content: left;
  position: relative;
}

.menu-title {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #343e5c;
  margin: 0 50px 0 10px;
}

.tabs {
  position: absolute;
  top: 3px;
  left: 150px;
  display: flex;
  width: 100%;
  display: flex;
  justify-content: left;
  z-index: 100;
}

.tools {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0 10px;
}

.diets-container {
  width: calc(100% - 18px);
  margin: 0 8px;
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
}

.table-list {
  height: auto;
  border-collapse: collapse;
  width: 100%;

  td {
    border-bottom: 1px solid #dcdfe6;
    padding: 9px 7px 9px 7px;
    height: auto;
    position: sticky;
  }

  th {
    border-bottom: 1px solid #dcdfe6;
    padding: 9px 7px 9px 7px;
    height: auto;
    position: sticky;
  }

  th {
    text-align: left;
    padding: 2px 0 0 3px;
    background-color: #eff2f6;
    height: 20px;
  }

  th:first-child {
    border-radius: 5px 0 0 0;
  }

  th:last-child {
    border-radius: 0 5px 0 0;
  }

  tr {
    &:hover {
      background-color: #ecf5ff;
    }
  }
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

ul {
  display: flex;
  align-items: center;
  height: auto;
  padding: 0;
  margin: 0;
}

ul li.active-tabs-item {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 0 0 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #d8d9db;
  border-bottom: 1px solid #f9fafb;
  padding-right: 2px;
  cursor: pointer;
  z-index: 101;

  display: flex;
  justify-content: center;
  height: 26px;
  width: 120px;
  margin-left: 0px;
  text-transform: uppercase;
  background: #f9fafb;
}

ul li.active-tabs-item:hover {
  border: 1px solid #d8d9db;
  border-bottom: 1px solid #f9fafb;
}

ul li.tabs-item {
  display: flex;
  align-items: center;
  padding: 0;
  border: 1px solid #ffffff;
  border-bottom: 1px solid #d8d9db;
  cursor: pointer;

  display: flex;
  justify-content: center;
  height: 26px;
  width: 120px;
  text-transform: uppercase;
  transition: 0.3s;
}

ul li.tabs-item:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #d8d9db;
  border-bottom: 1px solid #d8d9db;
  background: #f9fafb;
}

ul li.tabs-button {
  padding: 0;
  border: 1px solid #ffffff;
  border-bottom: 1px solid #d8d9db;
  cursor: pointer;

  display: flex;
  justify-content: center;
  height: 26px;
  width: 40px;
  text-transform: uppercase;
  transition: 0.3s;
}

ul li.tabs-button:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #d8d9db;
  border-bottom: 1px solid #d8d9db;
  background: #f9fafb;
}

.button-block {
  display: flex;
  justify-content: right;
  align-items: center;
}

.button-add {
  height: 20px;
  border: 1px solid #1979cf;
  border-radius: 15px;
  background: #ffffff;
  color: #1979cf;
  margin: 10px 10px 10px 0;
  padding: 0 20px;
  transition: 0.3s;
}

.button-add:hover {
  background: #1979cf;
  color: #ffffff;
}

.button-save {
  height: 20px;
  border: 1px solid #449d7c;
  border-radius: 15px;
  background: #ffffff;
  color: #449d7c;
  margin: 10px 10px 10px 0;
  padding: 0 20px;
}

.button-save:hover {
  background: #449d7c;
  color: #ffffff;
}

.button-print {
  height: 20px;
  border: 1px solid #0741ca;
  border-radius: 15px;
  background: #ffffff;
  color: #0741ca;
  margin: 10px 10px 10px 0;
  padding: 0 20px;
}

.button-print:hover {
  background: #0741ca;
  color: #ffffff;
}

.add-title {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
  color: #1979cf;
}
</style>
