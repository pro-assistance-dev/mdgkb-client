<template>
  <!-- <div v-if="timetable.timetableDays.length > 1" class="title">Меню питания на неделю</div> -->
  <div v-if="timetable.timetableDays.length > 1" class="week">
    <div v-for="(day, i) in setDays" :key="i" class="form_radio_btn">
      <button id="radio-0" type="radio" name="radio" :class="{ 'checked-day': selectedNumberDay === i }" @click="selectDay(i)">
        {{ day }}
      </button>
    </div>

    <div v-for="(day, i) in setDaysMobile" :key="i" class="form_radio_btn_mobile">
      <button id="radio-0" type="radio" name="radio" :class="{ 'checked-day': selectedNumberDay === i }" @click="selectDay(i)">
        {{ day }}
      </button>
    </div>
  </div>
  <div class="diets-container">
    <div class="table-container">
      <table class="table-list">
        <colgroup class="decktop">
          <col width="auto" />
          <col width="70px" />
          <col width="70px" />
          <col width="70px" />
        </colgroup>
        <colgroup class="mobile">
          <col width="auto" />
          <col width="50px" />
          <col width="50px" />
          <col width="50px" />
        </colgroup>
        <thead>
          <tr>
            <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; padding-left: 44px">Блюдо</td>
            <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Вес</td>
            <td style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Цена</td>
            <td class="decktop" style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Калории</td>
            <td class="mobile" style="text-transform: uppercase; font-size: 11px; color: #a1a7bd; text-align: center">Ккал</td>
          </tr>
        </thead>
        <tbody v-for="scheduleItem in timetable.timetableDays[selectedNumberDay].scheduleItems" :key="scheduleItem.id">
          <td colspan="4" style="background: #f1f2f7">
            <div class="schedule-name">
              <svg v-if="!scheduleItem.name.includes('*')" class="icon-time">
                <use xlink:href="#time"></use>
              </svg>
              <svg v-else class="icon-time"></svg>
              <p>{{ scheduleItem.name.length ? scheduleItem.name : scheduleItem.getPeriod() }}</p>
              <h4 v-if="scheduleItem.name.length" style="font-size: 12px; color: #a1a7bd; padding-left: 15px">
                {{ scheduleItem.getPeriod() }}
              </h4>
            </div>
          </td>
          <tr v-for="dish in scheduleItem.dishes" :key="dish.id">
            <td style="font-size: 12px; padding-left: 44px">
              {{ dish.name }}
            </td>
            <td style="text-align: center">
              <h4 style="font-size: 13px; color: #343d5c">{{ dish.weight }}</h4>
            </td>
            <td style="text-align: center; font-weight: bold">
              <h4 style="font-size: 15px; color: #343d5c; font-weight: bold">-</h4>
            </td>
            <td style="text-align: center">
              <h4 style="font-size: 13px; color: #2754eb">-</h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Time />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, ref } from 'vue';

import Time from '@/assets/doctors/svg/Time.svg';
import ITimetable from '@/interfaces/timetables/ITimetable';
import Provider from '@/services/Provider/Provider';
import setDays from '@/services/SetDays';
import setDaysMobile from '@/services/SetDaysMobile';

export default defineComponent({
  name: 'DietPage',
  components: { Time },
  props: {
    timetable: {
      type: Object as PropType<ITimetable>,
      required: true,
    },
  },
  setup(props) {
    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);

    const selectDay = (e: any) => {
      selectedNumberDay.value = e;
    };

    const selectedNumberDay = ref(0);

    onBeforeMount(() => {
      const today = new Date().getDay();
      selectedNumberDay.value = today === 0 ? 6 : today - 1;
      if (props.timetable.timetableDays.length === 1) {
        selectedNumberDay.value = 0;
      }
    });

    return {
      // selectedDiet,
      // diets,
      isAuth,
      setDays,
      setDaysMobile,
      selectedNumberDay,
      selectDay,
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
  width: 80%;
  transform: translateX(10%);
  height: 40px;
  display: flex;
  justify-content: space-between;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 130px;
  height: 26px;
  border: 1px solid #a5a5bf;
  border-radius: 20px;
  user-select: none;
  background: #ffffff;
  color: $site_dark_gray;
  font-size: 15px;
}

.checked-day {
  background: #123dce;
  color: #ffffff;
  border: 1px solid #123dce;
}

button:hover {
  background: #123dce;
  color: #ffffff;
  border: 1px solid #123dce;
}

.schedule-name {
  display: inline-block;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 15px;
  color: $site_dark_gray;
  font-weight: bold;
  height: 10px;
  margin: 0px 0 0 8px;
}

p::first-letter {
  text-transform: uppercase;
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

.title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.icon-time {
  margin-right: 12px;
  width: 14px;
  height: 14px;
  fill: $site_dark_gray;
}

.form_radio_btn_mobile {
  display: none;
}

.mobile {
  display: none;
}

@media screen and (max-width: 1226px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 130px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 15px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }
  .week {
    width: 90%;
    transform: translateX(5%);
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 1150px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 130px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 15px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }
  .week {
    width: 100%;
    transform: translateX(0%);
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 1024px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 120px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 15px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }
  .week {
    width: 100%;
    transform: translateX(0%);
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 960px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 95px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 12px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }
}

@media screen and (max-width: 768px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 70px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 10px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }
}

@media screen and (max-width: 580px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 12px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }

  .form_radio_btn_mobile {
    display: flex;
  }

  .form_radio_btn {
    display: none;
  }

  .mobile {
    display: block;
  }

  .decktop {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 34px;
    height: 26px;
    border: 1px solid #a5a5bf;
    border-radius: 20px;
    user-select: none;
    background: #ffffff;
    color: $site_dark_gray;
    font-size: 12px;
  }

  .checked-day {
    background: #123dce;
    color: #ffffff;
    border: 1px solid #123dce;
  }
}
</style>
