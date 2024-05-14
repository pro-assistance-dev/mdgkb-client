<template>
  <div class="menu">
    <AdminDishesMenusTableHeader />
    <div class="tab-tools">
      Активация:
      <svg v-if="selectedMenu.isActive()" class="activated-icon active" @click="stopMenu()">
        <use xlink:href="#active" />
      </svg>
      <svg v-else class="activated-icon non-active" @click="startMenu()">
        <use xlink:href="#non-active" />
      </svg>
    </div>
    <div v-if="selectedMenu" class="diets-container">
      <div v-if="dailyMenus.length" class="table-container">
        <table class="table-list">
          <colgroup>
            <col v-for="w in ['60px', 'auto', '70px', '70px', '70px', '90px']" :key="w" :width="w" />
          </colgroup>
          <thead>
            <tr>
              <td v-for="(h, i) in ['Блюдо', 'Количество', 'Вес', 'Цена', 'Калории']" :key="h"
                :style="{ 'text-align': i > 1 ? 'center' : '' }">
                {{ h }}
              </td>
            </tr>
          </thead>
          <tbody>
            <template v-for="dishesGroup in selectedMenu.getNotEmptyGroups(false)" :key="dishesGroup.id">
              <td colspan="6" style="background: #f1f2f7">
                <div class="schedule-name">
                  <div class="table-tools">
                    <svg :style="{ fill: dishesGroup.containAvailableItems() ? '' : '#a1a7bd' }"
                      class="table-icon active-fill" @click="removeFromMenu(dishesGroup)">
                      <use xlink:href="#delete" />
                    </svg>
                    <svg v-if="dishesGroup.containAvailableItems()" class="table-icon active-fill eye"
                      @click="setGroupAvailable(dishesGroup, false)">
                      <use xlink:href="#eye" />
                    </svg>
                    <svg v-if="!dishesGroup.containAvailableItems()" class="table-icon hidden-fill eye"
                      @click="setGroupAvailable(dishesGroup, true)">
                      <use xlink:href="#eye-closed" />
                    </svg>
                  </div>
                  <h4
                    :class="{ visible: dishesGroup.containAvailableItems(), hidden: !dishesGroup.containAvailableItems() }"
                    style="font-size: 15px; padding-left: 15px; font-weight: bold; font-family: 'Open Sans'">
                    {{ dishesGroup.name }}
                  </h4>
                </div>
              </td>
              <tr v-for="dish in dishesGroup.dailyMenuItems" :key="dish.id"
                :style="{ backgroundColor: dish.highlight ? 'lightcyan' : '' }">
                <td style="font-size: 12px">
                  <div class="table-tools">
                    <svg class="table-icon hidden-fill" @click="removeFromMenu(dishesGroup, dish)">
                      <use xlink:href="#delete" />
                    </svg>
                    <svg v-if="dish.available" class="table-icon eye" @click="setDailyMenuItemAvailable(dish, false)">
                      <use xlink:href="#eye" />
                    </svg>
                    <svg v-if="!dish.available" class="table-icon eye" @click="setDailyMenuItemAvailable(dish, true)">
                      <use xlink:href="#eye-closed" />
                    </svg>
                    <svg :class="[dish.cook ? 'active-stroke' : 'hidden-stroke', 'table-icon', 'food']"
                      @click="setDailyMenuItemCook(dish)">
                      <use xlink:href="#food"></use>
                    </svg>
                  </div>
                </td>
                <td :class="[]" style="font-size: 12px">
                  {{ dish.name }} {{ dish.fromOtherMenu ? '(Перенесено)' : '' }}
                </td>
                <td style="text-align: center">
                  <el-input-number v-model="dish.quantity" :disabled="!dish.available" size="mini"
                    @change="updateSelectedMenu" />
                </td>
                <td style="text-align: center">
                  <h4 :class="[dish.available ? 'visible' : 'hidden']" style="font-size: 13px">
                    {{ dish.weight }}
                  </h4>
                </td>
                <td style="text-align: center; font-weight: bold">
                  <h4 :class="[dish.available ? 'visible' : 'hidden']" style="font-weight: bold">{{ dish.price }}.00р.
                  </h4>
                </td>
                <td style="text-align: center">
                  <h4 :class="[dish.available ? 'visible2' : 'hidden']" style="font-size: 13px">{{ dish.caloric }}ккал
                  </h4>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Food />
  <Add />
  <Delete />
  <Print />
  <Eye />
  <EyeClosed />
  <Active />
  <NonActive />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref } from 'vue';

import Active from '@/assets/svg/Buffet/Active.svg';
import Eye from '@/assets/svg/Buffet/Eye.svg';
import EyeClosed from '@/assets/svg/Buffet/EyeClosed.svg';
import Food from '@/assets/svg/Buffet/Food.svg';
import NonActive from '@/assets/svg/Buffet/NonActive.svg';
import DailyMenu from '@/classes/DailyMenu';
import DailyMenuItem from '@/classes/DailyMenuItem';
import DishesGroup from '@/classes/DishesGroup';
import AdminDishesMenusTableHeader from '@/components/admin/AdminDishes/AdminDishesMenusTableHeader.vue';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminDishesMenusTable',
  components: {
    AdminDishesMenusTableHeader,
    Eye,
    EyeClosed,
    Active,
    NonActive,
    Food,
  },
  setup() {
    const selectedMenu: Ref<DailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const dishesGroups: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dailyMenus: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const saveMenu = async (menu: DailyMenu) => {
      await Provider.store.dispatch('dailyMenus/update', menu);
      menu.editMode = false;
      syncMenus();
    };

    const startMenu = async (): Promise<void> => {
      const selectedMenuIndex = dailyMenus.value.findIndex((d: DailyMenu) => d.id === selectedMenu.value.id);
      if (selectedMenuIndex === 0) {
        dailyMenus.value.forEach((dmi: DailyMenu, i: number) => {
          if (selectedMenuIndex === i) {
            dmi.active = !dmi.active;
          } else {
            dmi.active = false;
          }
          dmi.removeDailyMenuItemsFromOthersMenus();
        });
        selectedMenu.value.active = true;

        for (const dmi of dailyMenus.value) {
          await Provider.store.dispatch('dailyMenus/update', dmi);
        }
        return;
      }
      const previousActiveMenuIndex = dailyMenus.value.findIndex((menu: DailyMenu) => menu.active);
      if (previousActiveMenuIndex > -1) {
        let textConfirm = 'Вы хотите запустить следующее меню?';
        if (dailyMenus.value[previousActiveMenuIndex].availableDishesExists()) {
          textConfirm += `\n В предыдущем меню есть доступные блюда - они перенесутся в запущенное меню`;
        }
        ElMessageBox.confirm(textConfirm, {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
        })
          .then(async () => {
            dailyMenus.value.forEach((m: DailyMenu) => {
              m.active = false;
              m.removeDailyMenuItemsFromOthersMenus();
            });
            selectedMenu.value.addActiveDishesFromOthersMenus([dailyMenus.value[previousActiveMenuIndex]], dishesGroups.value);
            selectedMenu.value.active = true;

            for (const dmi of dailyMenus.value) {
              await Provider.store.dispatch('dailyMenus/update', dmi);
            }
          })
          .catch(() => {
            return;
          });
      } else {
        dailyMenus.value.forEach((m: DailyMenu) => {
          m.active = false;
          m.removeDailyMenuItemsFromOthersMenus();
        });
        selectedMenu.value.addActiveDishesFromOthersMenus([dailyMenus.value[previousActiveMenuIndex]], dishesGroups.value);
        selectedMenu.value.active = true;

        for (const dmi of dailyMenus.value) {
          await Provider.store.dispatch('dailyMenus/update', dmi);
        }
      }
    };

    const stopMenu = async (): Promise<void> => {
      selectedMenu.value.active = false;
      for (const dmi of dailyMenus.value) {
        dmi.active = false;
        await Provider.store.dispatch('dailyMenus/update', dmi);
      }
      syncMenus();
    };

    const setDailyMenuItemAvailable = async (dailyMenuItem: DailyMenuItem, available: boolean) => {
      dailyMenuItem.available = available;
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
      syncMenus();
    };

    const setDailyMenuItemCook = async (dailyMenuItem: DailyMenuItem) => {
      dailyMenuItem.cook = !dailyMenuItem.cook;
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
    };

    const updateSelectedMenu = async (): Promise<void> => {
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
      syncMenus();
    };
    const setGroupAvailable = async (dishesGroup: DishesGroup, available: boolean) => {
      dishesGroup.setAvailable(available);
      await Provider.store.dispatch('dailyMenus/update', selectedMenu.value);
      syncMenus();
    };

    const syncMenus = (): void => {
      dailyMenus.value.forEach((d, i) => {
        if (d.id === selectedMenu.value.id) {
          dailyMenus.value[i] = selectedMenu.value;
        }
      });
    };

    const removeFromMenu = async (dishesGroup: DishesGroup, dishItem?: DailyMenuItem): Promise<void> => {
      ElMessageBox.confirm('Вы действительно хотите удалить?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
      })
        .then(async () => {
          if (!selectedMenu.value) {
            return;
          }
          if (!dishItem) {
            for (const id of dishesGroup.getDailyMenuItemsIds()) {
              await Provider.store.dispatch('dailyMenuItems/remove', id);
            }
            selectedMenu.value?.removeMenuItems(dishesGroup.getDailyMenuItemsIds(), dishesGroups.value);
            return;
          }
          const i = dishesGroup.dailyMenuItems.findIndex((di: DailyMenuItem) => di.id === dishItem.id);
          if (i < 0) {
            return;
          }
          ClassHelper.RemoveFromClassById(dishItem.id, dishesGroup.dailyMenuItems, []);
          if (dishItem.id) {
            selectedMenu.value.removeMenuItem(dishItem.id, dishesGroups.value);
          }
          selectedMenu.value.groupDishes(dishesGroups.value);
          await Provider.store.dispatch('dailyMenuItems/remove', dishItem.id);
          await Provider.store.dispatch('dailyMenus/update');
          syncMenus();
        })
        .catch(() => {
          return;
        });
    };

    return {
      setDailyMenuItemCook,
      setGroupAvailable,
      removeFromMenu,
      saveMenu,
      dailyMenus,
      selectedMenu,
      stopMenu,
      startMenu,
      updateSelectedMenu,
      setDailyMenuItemAvailable,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.menu {
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background: #f9fafb;
  height: 100%;
  position: relative;
}

.diets-container {
  width: calc(100% - 18px);
  margin: 0 8px 8px 8px;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100% - 90px);
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
  padding-bottom: 1px;
}

.table-list {
  height: auto;
  border-collapse: collapse;
  width: 100%;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */

  thead {
    text-transform: uppercase;
    font-size: 11px;
    color: #a1a7bd;
  }

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

.table-icon {
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
  fill: #343e5c;
  width: 16px;
  height: 16px;

  &:hover {
    fill: #379fff;
  }
}

.hdden-stroke {
  stroke: #a1a7bd;
}

.active-stroke {
  stroke: #343e5c;
}

.active-fill {
  fill: #343e5c;
}

.hidden-fill {
  fill: #a1a7bd;
}

.food {
  margin-left: 8px;
  width: 18px;
  height: 18px;

  &:hover {
    stroke: #379fff;
  }
}

.eye {
  margin-left: 10px;
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
  margin-left: 10px;
}

.activated-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 12px;
}

.active {
  fill: #1979cf;
}

.non-active {
  fill: #c4c4c4;
}
</style>
