<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <template #header>
      <button :disabled="month.firstWeekActive" @click="month.moveActiveWeek(false)">-</button>
      <span v-for="day in month.getActiveWeek().days" :key="day" @click="selectDay(day)">
        {{ ' | ' }}
        <span :class="{ blue: day.selected }">{{
          $dateTimeFormatter.format(day.date, { month: '2-digit', day: '2-digit', year: undefined })
        }}</span>
        {{ ' | ' }}</span
      >
      <button :disabled="month.lastWeekActive" @click="month.moveActiveWeek(true)">+</button>
    </template>
    <template #sort> </template>
    <button v-if="!selectedMenu" @click="createMenu">Добавить</button>
    <button v-if="selectedMenu" @click="submit">Сохранить</button>
    <button v-if="selectedMenu" @click="pdf">Печать</button>
    <template v-if="selectedMenu">
      <div v-for="dishesGroup in selectedMenu.dishesGroups" :key="dishesGroup.id">
        <div>
          <b>{{ dishesGroup.name }}</b>
        </div>
        <div v-for="dailyMenuItem in dishesGroup.dailyMenuItems" :key="dailyMenuItem.id">
          {{ dailyMenuItem.name }}
        </div>
      </div>
      <button @click="addDishes">Добавить блюда</button>
    </template>

    <el-dialog v-model="addDishVisible" :width="1200" :destroy-on-close="true" center @closed="closeModal">
      <AddDish :menu="selectedMenu" />
    </el-dialog>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import DailyMenu from '@/classes/DailyMenu';
import Month from '@/classes/Month';
import AddDish from '@/components/admin/AdminDishes/AddDish.vue';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDay from '@/interfaces/IDay';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IMonth from '@/interfaces/IMonth';
import IWeek from '@/interfaces/IWeek';
import DoctorRules from '@/rules/DoctorRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';
export default defineComponent({
  name: 'AdminDishes',
  components: {
    AdminListWrapper,
    AddDish,
  },
  setup() {
    const form = ref();
    const rules = ref(DoctorRules);
    const addDishVisible: Ref<boolean> = ref(false);
    const month: Ref<IMonth> = ref(new Month());
    const dailyMenus: Ref<IDailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const dishesGroups: Ref<IDishesGroup[]> = ref([]);
    const selectedMenu: Ref<IDailyMenu | undefined> = ref();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await Provider.store.dispatch('search/searchGroups');
      await Provider.store.dispatch('dishesGroups/getAll');
      await Provider.store.dispatch('dailyMenus/getAll');
      selectDay(month.value.getSelectedDay());
    };

    Hooks.onBeforeMount(load);

    const selectDay = (day: IDay): void => {
      month.value.weeks.forEach((w: IWeek) => w.days.forEach((d: IDay) => (d.selected = false)));
      day.selected = true;
      selectedMenu.value = dailyMenus.value.find((dm: IDailyMenu) => {
        return dm.date.getDate() === day.date.getDate();
      });
      if (!selectedMenu.value) {
        return;
      }
      selectedMenu.value?.groupDishes();
    };

    const addDishes = () => {
      addDishVisible.value = true;
    };

    const createMenu = () => {
      const menu = new DailyMenu();
      menu.date = month.value.getSelectedDay().date;
      dailyMenus.value.push(menu);
      selectedMenu.value = menu;
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

    return {
      pdf,
      submit,
      createMenu,
      selectedMenu,
      addDishVisible,
      addDishes,
      selectDay,
      month,
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
  color: blue;
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
</style>
