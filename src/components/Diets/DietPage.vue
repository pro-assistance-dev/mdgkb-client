<template>
  <div v-if="timetable.timetableDays.length > 0" class="week">
    <div v-for="(day, i) in setDay" :key="i" class="form_radio_btn">
      <button id="radio-0" type="radio" name="radio" :class="{ 'checked-day': selectedNumberDay === i }" @click="selectDay(i)">
        {{ day }}
      </button>
    </div>
  </div>
  <div class="diets-container">
    <div v-for="scheduleItem in timetable.timetableDays[selectedNumberDay].scheduleItems" :key="scheduleItem.id">
      <div class="schedule-name">{{ scheduleItem.name }}</div>
      <div class="table-container">
        <table class="table-list">
          <colgroup>
            <col width="80%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead></thead>
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
import { computed, defineComponent, onBeforeMount, PropType, ref } from 'vue';

import ITimetable from '@/interfaces/timetables/ITimetable';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DietPage',
  props: {
    timetable: {
      type: Object as PropType<ITimetable>,
      required: true,
    },
    motherTimetable: {
      type: Object as PropType<ITimetable>,
      required: true,
    },
  },
  setup(props) {
    // const diets: Ref<IDiet[]> = computed<IDiet[]>(() => Provider.store.getters['diets/items']);
    // const selectedDiet: Ref<IDiet> = computed(() => Provider.store.getters['diets/item']);
    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);
    const setDay = ref(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']);

    const selectDay = (e: any) => {
      console.log(e);
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
      setDay,
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
  width: 1040px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}

button {
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
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 18px;
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
