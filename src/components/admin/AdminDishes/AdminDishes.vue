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
          <button class="arrow-button" @click="move(false)">
            <svg class="icon-arrow-left">
              <use xlink:href="#arrow-left"></use>
            </svg>
          </button>
          <div v-for="day in calendar.getActivePeriod()" :key="day">
            <el-badge type="danger" value="!" :hidden="day.eventsExists()" class="event-badge">
              <div :class="{ blue: day.selected, normal: !day.selected }" @click="selectDay(day)">
                <div class="day">
                  <div class="date">
                    {{ $dateTimeFormatter.format(day.date, { month: '2-digit', day: '2-digit', year: undefined }) }}
                  </div>
                  <div class="day-week" :class="{ weekend: day.isWeekend() }">{{ $dateTimeFormatter.getShortDayName(day.date) }}</div>
                </div>
              </div>
            </el-badge>
          </div>
          <button class="arrow-button" @click="move(true)">
            <svg class="icon-arrow-right">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </template>
    <template #sort> </template>
    <VerticalCollapsContainer v-if="selectedMenu" :tab-id="1" :collapsed="true">
      <template #inside-title>Книга блюд</template>
      <template #inside-content-left>
        <DishBook :menu="selectedMenu" />
      </template>
      <template #inside-content-right>
        <div class="menu">
          <div class="menu-title-tools-tabs">
            <div class="menu-title-tabs">
              <div class="menu-title">
                Меню на
                {{ $dateTimeFormatter.format(calendar.getSelectedDay().date, { month: '2-digit', day: '2-digit', year: undefined }) }}
              </div>
              <draggable class="tabs" :list="dailyMenus" item-key="id" @end="saveMenusOrder">
                <template #item="{ element }">
                  <div
                    :class="{ 'active-tabs-item': selectedMenu.id === element.id, 'tabs-item': selectedMenu.id !== element.id }"
                    @click="selectMenu(element)"
                  >
                    <div class="title">
                      <input
                        v-if="element.editMode"
                        id="tab-name"
                        v-model="element.name"
                        type="text"
                        name="name"
                        placeholder="Имя вкладки"
                        @focusout="saveMenu(element)"
                        @keyup.enter="saveMenu(element)"
                        @keyup.esc="element.cancelEditMode()"
                      />
                      <span v-else class="span-class" @dblclick="element.setEditMode()"> {{ element.name }} </span>
                    </div>
                    <div :class="{ 'active-line': selectedMenu.id === element.id, line: selectedMenu.id !== element.id }"></div>

                    <svg class="icon-close" @click="removeMenu(element.id)">
                      <use xlink:href="#close"></use>
                    </svg>
                    <div class="button-close">
                      <svg class="icon-close" @click="removeMenu(element.id)">
                        <use xlink:href="#close"></use>
                      </svg>
                    </div>
                  </div>
                </template>
              </draggable>
              <div class="tabs-button" @click="addMenu">
                <button class="tools-button">
                  <svg class="icon-add">
                    <use xlink:href="#add"></use>
                  </svg>
                </button>
              </div>
            </div>
            <div class="tools-block">
              <button class="tools-button" @click="pdf">
                <svg class="icon-print">
                  <use xlink:href="#print"></use>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="selectedMenu" class="diets-container">
            <div class="tab-tools">
              Активация:
              <svg v-if="selectedMenu.isActive()" class="icon-active" @click="activate(false)">
                <use xlink:href="#active"></use>
              </svg>
              <svg v-else class="icon-non-active" @click="activate(true)">
                <use xlink:href="#non-active"></use>
              </svg>
            </div>
            <div v-if="dailyMenus.length" class="table-container">
              <table class="table-list">
                <colgroup>
                  <col width="60px" />
                  <col width="auto" />
                  <col width="70px" />
                  <col width="70px" />
                  <col width="90px" />
                </colgroup>
                <thead>
                  <tr>
                    <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd"></td>
                    <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd">Блюдо</td>
                    <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Вес</td>
                    <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Цена</td>
                    <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Калорииы</td>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="dishesGroup in selectedMenu.dishesGroups" :key="dishesGroup.id">
                    <td colspan="5" style="background: #f1f2f7">
                      <div class="schedule-name">
                        <div class="table-tools">
                          <svg
                            :style="{ fill: dishesGroup.containAvailableItems() ? '' : '#a1a7bd' }"
                            class="icon-delete-table"
                            @click="removeFromMenu(dishesGroup, dish)"
                          >
                            <use xlink:href="#delete"></use>
                          </svg>
                          <svg v-if="dishesGroup.containAvailableItems()" class="icon-eye" @click="setGroupAvailable(dishesGroup, false)">
                            <use xlink:href="#eye"></use>
                          </svg>
                          <svg
                            v-if="!dishesGroup.containAvailableItems()"
                            class="icon-closed"
                            @click="setGroupAvailable(dishesGroup, true)"
                          >
                            <use xlink:href="#eye-closed"></use>
                          </svg>
                        </div>
                        <h4
                          :class="{ visible: dishesGroup.containAvailableItems(), hidden: !dishesGroup.containAvailableItems() }"
                          style="font-size: 15px; padding-left: 15px; font-weight: bold; font-family: 'Open Sans'"
                        >
                          {{ dishesGroup.name }}
                        </h4>
                      </div>
                    </td>
                    <tr
                      v-for="dish in dishesGroup.dailyMenuItems"
                      :key="dish.id"
                      :style="{ backgroundColor: dish.highlight ? 'lightcyan' : '' }"
                    >
                      <td style="font-size: 12px">
                        <div class="table-tools">
                          <svg
                            :style="{ fill: selected ? '' : '#a1a7bd' }"
                            class="icon-delete-table"
                            @click="removeFromMenu(dishesGroup, dish)"
                          >
                            <use xlink:href="#delete"></use>
                          </svg>
                          <svg v-if="dish.available" class="icon-eye" @click="setDailyMenuItemAvailable(dish, false)">
                            <use xlink:href="#eye"></use>
                          </svg>
                          <svg v-if="!dish.available" class="icon-closed" @click="setDailyMenuItemAvailable(dish, true)">
                            <use xlink:href="#eye-closed"></use>
                          </svg>
                        </div>
                      </td>
                      <td :class="{ visible: dish.available, hidden: !dish.available }" style="font-size: 12px">{{ dish.name }}</td>
                      <td style="text-align: center">
                        <h4 :class="{ visible: dish.available, hidden: !dish.available }" style="font-size: 13px">{{ dish.weight }}</h4>
                      </td>
                      <td style="text-align: center; font-weight: bold">
                        <h4 :class="{ visible: dish.available, hidden: !dish.available }" style="font-weight: bold">
                          {{ dish.price }}.00р.
                        </h4>
                      </td>
                      <td style="text-align: center">
                        <h4 :class="{ visible2: dish.available, hidden: !dish.available }" style="font-size: 13px">
                          {{ dish.caloric }}ккал
                        </h4>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="!dailyMenus.length" class="menu-shadow">
            <el-button round type="primary" plain style="scale: 1.2" @click="createNewDailyMenus">Создать меню</el-button>
          </div>
        </div>
      </template>
    </VerticalCollapsContainer>

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
  <Eye />
  <EyeClosed />
  <Active />
  <NonActive />
  <Close />
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import Active from '@/assets/svg/Buffet/Active.svg';
import Add from '@/assets/svg/Buffet/Add.svg';
import ArrowLeft from '@/assets/svg/Buffet/ArrowLeft.svg';
import ArrowRight from '@/assets/svg/Buffet/ArrowRight.svg';
import Close from '@/assets/svg/Buffet/Close.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Eye from '@/assets/svg/Buffet/Eye.svg';
import EyeClosed from '@/assets/svg/Buffet/EyeClosed.svg';
import NonActive from '@/assets/svg/Buffet/NonActive.svg';
import Print from '@/assets/svg/Buffet/Print.svg';
import Calendar from '@/classes/Calendar';
import CalendarEvent from '@/classes/CalendarEvent';
import DailyMenu from '@/classes/DailyMenu';
import FilterModel from '@/classes/filters/FilterModel';
import FilterQuery from '@/classes/filters/FilterQuery';
import AddDish from '@/components/admin/AdminDishes/AddDish.vue';
import DishBook from '@/components/admin/AdminDishes/DishBook.vue';
import DishesSamplesConstructor from '@/components/admin/AdminDishes/DishesSamplesConstructor.vue';
import VerticalCollapsContainer from '@/components/Main/CollapsContainer/VerticalCollapsContainer.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ICalendar from '@/interfaces/ICalendar';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDay from '@/interfaces/IDay';
import IDishesGroup from '@/interfaces/IDishesGroup';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DailyMenusFiltersLib from '@/services/Provider/libs/filters/DailyMenusFiltersLib';
import DailyMenusSortsLib from '@/services/Provider/libs/sorts/DailyMenus';
import removeFromClass from '@/services/removeFromClass';
import sort from '@/services/sort';
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
    VerticalCollapsContainer,
    DishBook,
    Eye,
    EyeClosed,
    Active,
    NonActive,
    Close,
    draggable,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);
    const addDishVisible: Ref<boolean> = ref(false);
    const dishesConstructorVisible: Ref<boolean> = ref(false);
    const dailyMenus: Ref<IDailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const periodMenus: Ref<IDailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/periodItems']);
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
      await fillCalendar();
    };

    const openDishesConstructor = () => {
      dishesConstructorVisible.value = true;
    };

    Hooks.onBeforeMount(load);

    const getTodayMenus = async () => {
      const userTimezoneOffset = calendar.value.getSelectedDay().date.getTimezoneOffset() * 60000;
      dayFilter.value.date1 = new Date(calendar.value.getSelectedDay().date.getTime() - userTimezoneOffset);
      Provider.setFilterModel(dayFilter.value);
      Provider.setSortList(DailyMenusSortsLib.byOrder());
      await Provider.store.dispatch('dailyMenus/getAll', Provider.filterQuery.value);
    };

    const fillCalendar = async () => {
      const period = calendar.value.getActivePeriod();
      if (period.length === 0) {
        return;
      }
      const fq = new FilterQuery();
      fq.filterModels.push(DailyMenusFiltersLib.byPeriod(period[0].date, period[period.length - 1].date));
      await Provider.store.dispatch('dailyMenus/getPeriodItems', fq);
      period.forEach((day: IDay) => {
        const menu = periodMenus.value.find((m: IDailyMenu) => m.date.getDate() === day.date.getDate());
        if (!menu) {
          return;
        }
        day.events.push(new CalendarEvent());
      });
    };

    const findMenu = () => {
      if (dailyMenus.value.length < 1) {
        return;
      }
      selectedMenu.value = dailyMenus.value[0];
      selectedMenu.value?.groupDishes();
    };

    const selectDay = async (day: IDay): Promise<void> => {
      calendar.value.selectDay(day);
      await getTodayMenus();
      if (dailyMenus.value.length === 0) {
        // await createNewDailyMenus();
        return;
      }
      findMenu();
      await fillCalendar();
    };

    const createNewDailyMenus = async () => {
      const day = calendar.value.getSelectedDay();

      selectedMenu.value = DailyMenu.Create(day.date);
      const userTimezoneOffset = day.date.getTimezoneOffset() * 60000;
      selectedMenu.value.date = new Date(calendar.value.getSelectedDay().date.getTime() - userTimezoneOffset);
      selectedMenu.value.name = 'Завтрак';
      dailyMenus.value.push(selectedMenu.value);
      await Provider.store.dispatch('dailyMenus/create', selectedMenu.value);

      const lunch = DailyMenu.Create(day.date);
      lunch.date = new Date(calendar.value.getSelectedDay().date.getTime() - userTimezoneOffset);
      lunch.name = 'Обед';
      dailyMenus.value.push(lunch);
      await Provider.store.dispatch('dailyMenus/create', lunch);
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

    const addMenu = async () => {
      const date = new Date();
      selectedMenu.value = DailyMenu.Create(date);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      selectedMenu.value.date = new Date(calendar.value.getSelectedDay().date.getTime() - userTimezoneOffset);
      dailyMenus.value.push(selectedMenu.value);
      await Provider.store.dispatch('dailyMenus/create', selectedMenu.value);
    };

    const selectMenu = (menu: IDailyMenu): void => {
      selectedMenu.value = menu;
      selectedMenu.value?.groupDishes();
    };

    const removeFromMenu = async (dishesGroup: IDishesGroup, dishItem?: IDailyMenuItem): Promise<void> => {
      if (!selectedMenu.value) {
        return;
      }
      if (!dishItem) {
        for (const id of dishesGroup.getDailyMenuItemsIds()) {
          await Provider.store.dispatch('dailyMenuItems/remove', id);
        }
        selectedMenu.value?.removeMenuItems(dishesGroup.getDailyMenuItemsIds());
        return;
      }
      const i = dishesGroup.dailyMenuItems.findIndex((di: IDailyMenuItem) => di.id === dishItem.id);
      if (i < 0) {
        return;
      }
      removeFromClass(i, dishesGroup.dailyMenuItems, []);
      if (dishItem.id) {
        selectedMenu.value.removeMenuItem(dishItem.id);
      }
      selectedMenu.value.groupDishes();
      await Provider.store.dispatch('dailyMenuItems/remove', dishItem.id);
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
    };

    const activate = async (active: boolean) => {
      if (!selectedMenu.value) {
        return;
      }
      selectedMenu.value.active = active;
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
    };

    const removeMenu = async (menuId: string) => {
      if (dailyMenus.value.length === 1) {
        ElMessage({
          message: 'Нельзя удалить едиственное меню',
          type: 'error',
        });
        return;
      }
      ElMessageBox.confirm('Вы действительно хотите удалить меню?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
      }).then(async () => {
        dailyMenus.value = dailyMenus.value.filter((dm: IDailyMenu) => dm.id === menuId);
        await Provider.store.dispatch('dailyMenus/remove', menuId);
        selectedMenu.value = dailyMenus.value[dailyMenus.value.length - 1];
        selectedMenu.value?.groupDishes();
      });
    };

    const setGroupAvailable = async (dishesGroup: IDishesGroup, available: boolean) => {
      dishesGroup.setAvailable(available);
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
    };

    const setDailyMenuItemAvailable = async (dailyMenuItem: IDailyMenuItem, available: boolean) => {
      dailyMenuItem.available = available;
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
    };

    const saveMenu = async (menu: IDailyMenu) => {
      await Provider.store.dispatch('dailyMenus/update', menu);
      menu.editMode = false;
    };

    const saveMenusOrder = async () => {
      sort(dailyMenus.value);
      await Provider.store.dispatch('dailyMenus/updateAll');
    };

    const move = async (direction: boolean) => {
      calendar.value.move(direction);
      await fillCalendar();
    };

    const startMenu = async (activeMenu: IDailyMenu): Promise<void> => {
      const previousActiveMenuIndex = dailyMenus.value.findIndex((menu: IDailyMenu) => menu.active);
      if (previousActiveMenuIndex < 0) {
        return;
      }

      let textConfirm = 'Вы хотите запустить следующее меню?';
      if (dailyMenus.value[previousActiveMenuIndex].availableDishesExists()) {
        textConfirm += ` В предыдущем меню есть доступные блюда - они перенесутся в запущенное меню`;
      }
      ElMessageBox.confirm(`Вы хотите запустить следующее меню? ${dailyMenus.value[previousActiveMenuIndex].availableDishesExists()}`, {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
      })
        .then(async () => {
          dailyMenus.value[previousActiveMenuIndex].active = false;
          activeMenu.active = true;
          activeMenu.addActiveDishesFromOthersMenus([dailyMenus.value[previousActiveMenuIndex]]);
          dailyMenus.value[previousActiveMenuIndex].removeDailyMenuItemsFromOthersMenus();
        })
        .catch(() => {
          return;
        });
    };

    return {
      move,
      saveMenusOrder,
      saveMenu,
      setDailyMenuItemAvailable,
      setGroupAvailable,
      removeMenu,
      removeFromMenu,
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
      activate,
      createNewDailyMenus,
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
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background: #f9fafb;
  position: relative;
}

.menu-shadow {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-title-tools-tabs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 30px;
  border-bottom: 1px solid #7c8295;
  height: 30px;
  background: #ffffff;
}

.menu-title-tabs {
  width: 100%;
  display: flex;
  justify-content: left;
  height: 30px;
}

.menu-title {
  min-width: 100px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #343e5c;
  margin: 0 10px;
  font-size: 14px;
  font-weight: 600;
}

.tabs {
  width: 100%;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  grid-template-rows: repeat(1, 5px);
  height: 30px;
}

.tabs > div {
  height: 26px;
  object-fit: cover;
}

.title {
  overflow: hidden;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0;
  height: 30px;
}

.diets-container {
  width: calc(100% - 18px);
  margin: 0 8px 8px 8px;
  min-height: 550px;
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

.line {
  position: absolute;
  top: 4px;
  right: 0px;
  height: 16px;
  width: 1px;
  border-right: 1px solid #7c8295;
  margin-left: 0px;
}

.active-tabs-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 10px;
  margin-top: 3px;
  margin-left: -1px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #7c8295;
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  z-index: 101;
  width: auto;
  white-space: nowrap;
  text-transform: uppercase;
  background: #f9fafb;
  font-size: 12px;
}

.tabs-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 10px;
  margin-top: 4px;
  cursor: pointer;
  width: auto;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 12px;
  transition: 0.3s;
}

.tabs-item:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #7c8295;
  border-bottom: 1px solid #7c8295;
  background: #f9fafb;
  margin-top: 3px;
  margin-left: -1px;
}

.tabs-item:hover > .line {
  display: none;
}

.tabs-button {
  display: inline-block;
  padding: 0;
  cursor: pointer;
  height: 26px;
  margin-top: 4px;
  text-transform: uppercase;
  transition: 0.3s;
}

.tabs-button:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #f9fafb;
  margin-top: 4px;
  z-index: 101;
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

.slider-container {
  display: flex;
}

.dishes {
  display: flex;
  max-width: 50%;
  height: 400px;
}

.main-box {
  width: calc(100% - 26px);
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background: #f9fafb;
}
.arrow-box {
  width: 20px;
  background: #00b5a4;
  margin-right: 6px;
  padding-top: 70px;
}
.arrow-box-title {
  font-size: 14px;
  color: #ffffff;
  transform: rotate(-90deg);
}
.arrow-box-button {
  width: 20px;
  background: #00b5a4;
  border-radius: none;
  border: none;
  padding: 0;
  margin-top: 90px;
}

.icon-arrow-box-right {
  width: 20px;
  height: 20px;
  fill: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}

.icon-arrow-box-right:hover {
  fill: #7c8295;
}

.tools-button-table {
  position: absolute;
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.icon-delete-table {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
}

.icon-delete-table:hover {
  fill: #379fff;
}

.icon-eye {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
  margin-left: 10px;
}

.icon-eye:hover {
  fill: #379fff;
}

.icon-closed {
  width: 16px;
  height: 16px;
  fill: #a1a7bd;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
  margin-left: 10px;
}

.icon-closed:hover {
  fill: #379fff;
}

input[type='text'] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  outline: none;
  background: #ffffff;
  text-transform: uppercase;
  width: 100px;
}

.table-tools {
  display: flex;
  align-items: center;
  justify-content: left;
}

.visible {
  color: #343e5c;
  font-size: 13px;
}

.visible2 {
  color: #2754eb;
  font-size: 13px;
}

.hidden {
  color: #a1a7bd;
  font-size: 13px;
}

.schedule-name {
  display: flex;
  justify-content: left;
  align-items: center;
}

.tab-tools {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: left;
  height: 25px;
}

.icon-active {
  width: 22px;
  height: 22px;
  fill: #1979cf;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 12px;
}

.icon-non-active {
  width: 22px;
  height: 22px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 12px;
}

.button-close {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 24px;
  margin-bottom: 2px;
}

.icon-close {
  width: 18px;
  height: 18px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
  padding-left: 5px;
}

.icon-close:hover {
  fill: #ff142c;
  transition: 0.3s;
}

.icon-close:active {
  fill: #bd0123;
}
</style>
