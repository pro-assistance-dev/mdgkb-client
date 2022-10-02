<template>
  <div v-if="selectedDiet.timetable.timetableDays[0]" class="title-in">Питание</div>
  <div v-else class="title-in-else">*для получения списка блюд выберите Меню в форме выше</div>
  <!-- <DietWeek /> -->
  <div v-if="selectedDiet.timetable.timetableDays[0]" class="week">
    <div class="form_radio_btn">
      <input id="radio-0" v-model="setDay" type="radio" name="radio" value="0" checked />
      <label for="radio-0">Понедельник</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-1" v-model="setDay" type="radio" name="radio" value="1" checked />
      <label for="radio-1">Вторник</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-2" v-model="setDay" type="radio" name="radio" value="2" checked />
      <label for="radio-2">Среда</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-3" v-model="setDay" type="radio" name="radio" value="3" checked />
      <label for="radio-3">Четверг</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-4" v-model="setDay" type="radio" name="radio" value="4" checked />
      <label for="radio-4">Пятница</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-5" v-model="setDay" type="radio" name="radio" value="5" checked />
      <label for="radio-5">Суббота</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-6" v-model="setDay" type="radio" name="radio" value="6" checked />
      <label for="radio-6">Воскресенье</label>
    </div>
  </div>
  <div v-if="selectedDiet.timetable.timetableDays[0]" class="diets-container">
    <!-- {{ selectedDiet.name }} -->
    <div v-for="scheduleItem in selectedDiet.timetable.timetableDays[setDay].scheduleItems" :key="scheduleItem.id">
      <div class="schedule-name">{{ scheduleItem.name }}</div>
      <div class="table-container">
        <table class="table-list">
          <colgroup>
            <col width="80%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <!-- <th style="text-transform: uppercase; text-align: center"><h4></h4></th>
            <th style="text-align: center"><h4></h4></th>
            <th v-if="cost" style="text-align: center"><h4></h4></th> -->
          </thead>
          <tbody>
            <tr v-for="dish in scheduleItem.dishes" :key="dish.id">
              <td>
                {{ dish.name }}
              </td>
              <td style="text-align: center">
                <h4>250мл</h4>
              </td>
              <td style="text-align: center">
                <h4>200р.</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import IDiet from '@/interfaces/IDiet';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
// import DietWeek from '@/components/Diets/DietWeek.vue';

export default defineComponent({
  name: 'DietsMenuList',
  // components: { DietWeek },

  setup() {
    const diets: Ref<IDiet[]> = computed<IDiet[]>(() => Provider.store.getters['diets/items']);
    const selectedDiet: Ref<IDiet> = computed(() => Provider.store.getters['diets/item']);
    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);
    const setDay = ref();

    const loadDiets = async () => {
      switch (new Date().getDay()) {
        case 0:
          setDay.value = 6;
          break;
        case 1:
          setDay.value = 0;
          break;
        case 2:
          setDay.value = 1;
          break;
        case 3:
          setDay.value = 2;
          break;
        case 4:
          setDay.value = 3;
          break;
        case 5:
          setDay.value = 4;
          break;
        case 6:
          setDay.value = 5;
          break;
      }
      await Provider.getAll('diets');
    };

    const load = async () => {
      Provider.resetFilterQuery();
      // Provider.filterQuery.value.pagination.limit = 6;
      // Provider.setSortModels(CommentsSortsLib.byPublishedOn());
      await loadDiets();
    };

    Hooks.onBeforeMount(load);

    return {
      selectedDiet,
      diets,
      isAuth,
      mounted: Provider.mounted,
      setDay,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.title-in-else {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
}

.week {
  width: 1040px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.form_radio_btn {
  display: flex;
  align-items: center;
}

.form_radio_btn input[type='radio'] {
  display: none;
}
.form_radio_btn label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 130px;
  height: 20px;
  border: 1px solid #a5a5bf;
  border-radius: 10px;
  user-select: none;
  background: #ffffff;
  color: #a5a5bf;
}

/* Checked */
.form_radio_btn input[type='radio']:checked + label {
  background: #123dce;
  color: #ffffff;
  border: 1px solid #123dce;
}

/* Hover */
.form_radio_btn label:hover {
  background: #f6f6f6;
}

/* Disabled */
.form_radio_btn input[type='radio']:disabled + label {
  // background: #efefef;
  background: #ffffff;
  color: #a5a5bf;
}
.schedule-name {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 18px;
  // color: #22ABE2;
  color: #a5a5bf;
  text-transform: uppercase;
  height: 40px;
  margin: 0px 0 0 20px;
}

.diets-container {
  width: 100%;
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

  td,
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
</style>
