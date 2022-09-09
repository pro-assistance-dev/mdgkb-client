<template>
  <div v-if="true" class="Date-and-time">
    <div class="title-in">Дата и время приема</div>
    <div class="block" id="block-footer">
        <div class="left-field">
            <div class="calendar-container">
                <calendar ref="calendar" :min-date="new Date()" :attributes="attr" class="custom-calendar" locale="ru" @dayclick="chooseDay">
                </calendar>
            </div>
        </div>

        <div class="right-field">
            <div class="block-title">Время приема:</div>
            <div class="button-block">
                <ul class="button-block">
                    <li>
                        <button class="time">19:00</button>
                    </li>
                    <li>
                        <button class="time">19:20</button>
                    </li>
                    <li>
                        <button class="time">19:40</button>
                    </li>
                    <li>
                        <button class="time">19:55</button>
                    </li>
                </ul>
            </div>
            <div class="adress">
                <div class="block-title">Адрес приема:</div>
                <div class="block-text"><a @click="$router.push(`/map/${division.id}`)">
                    {{ division.address }}
                </a></div>
            </div>
            <div class="block-footer">
                <button v-if="isAuth" class="make" @click="$router.push('/appointments/oms')">Запись на прием</button>
                <button v-if="!isAuth" class="make-grey">Запись на прием</button>
                <div v-if="!isAuth" class="make-button">Для онлайн записи на прием необходимо войти в <a @click="openLoginModal">Личный кабинет</a></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Calendar } from 'v-calendar';
import { defineComponent, ref, PropType, computed } from 'vue';

import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IDivision from '@/interfaces/buildings/IDivision';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DivisionDateAndTime',
  components: {
    Calendar,
  },
  props: {
    division: { type: Object as PropType<IDivision>, required: true },
  },
  emits: ['chooseDay'],
  setup(props, { emit }) {
    const mount = ref(false);
    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);

    const openLoginModal = () => {
      if (!isAuth.value) {
        Provider.store.commit('auth/openModal', true);
      }
    };

    const attr = [
      {
        key: 'today',
        dates: new Date(),
      },
    ];

    const chooseDay = (day: Record<string, string>) => {
      emit('chooseDay', day.date);
    };

    return {
      chooseDay,
      attr,
      Operators,
      DataTypes,
      mount,
      isAuth,
      openLoginModal,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.Date-and-time {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 25px 40px 25px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
  padding-bottom: 20px;
}

.block {
    display: flex;
    justify-content: left;
}

.left-field {
    min-width: 320px;
    max-width: auto;
    padding: 0 50px;
    border-right: $normal-border;
}

.right-field {
    min-width: 320px;
    width: auto;
    padding: 0 50px;
    position: relative;
}

.block-title {
    font-family: $title-font;
    font-size: 16px;
    font-weight: $title-font-bold-weight;
    display: flex;
    align-items: center;
    height: 49px;
    letter-spacing: 0,05em;
}

.block-text {
    font-family: $title-font;
    font-size: 16px;
    font-weight: $base-font-weight;
    letter-spacing: $doctor-text-letter-spacing;
}

.make-button {
    font-family: $title-font;
    font-size: 14px;
    font-weight: $base-font-weight;
    letter-spacing: $doctor-text-letter-spacing;
    color: $site_dark_gray;
}


ul.button-block {
    display: flex;
    justify-content: left;
    padding: 10px 0;
}

ul.button-block li {
  text-decoration: none;
  display: block;
  transition: color 0.25s ease 0s;
  font-family: $base-font;
  font-size: 13px;
  margin: 0 5px;
}


.time {
    width: 44px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $base-background;
    border: 1px #31af5e solid;
    border-radius: $normal-border-radius;
    color: $main_green;
}

.time:hover {
    background: $main_green;
    color: $base-background;
}

.make{
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    margin: 18px 0;
    width: 230px;
    font-weight: $base-font-bold-weight;
    font-size: 14px;
    border-radius: 10px;
    background-color: #31af5e;
    padding: 15px 0px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
    cursor: pointer;
    background-color: darken(#31af5e, 10%);
    }
}

.make-grey {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    margin: 18px 0;
    width: 230px;
    font-weight: $base-font-weight;
    font-size: 14px;
    border-radius: 10px;
    background-color: $base-background;
    padding: 15px 0px;
    height: auto;
    letter-spacing: 2px;
    color: $site_gray;
    border: 1px solid rgb(black, 0.05);
    &:hover {
    cursor: pointer;
    }    
}

.block-footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
}

.calendar-container {
  width: 100%;
}

:deep(.custom-calendar.vc-container .vc-header) {
    padding: 10px 0px;
    margin: 0px 6px;
}
:deep(.custom-calendar.vc-container) {
  --day-border: 2px solid #31af5e;
  --day-border-highlight: 1px solid #b8c2cc;
  --weekday-bg: #f8fafc;
  width: 100%;
  border: none;

  & .vc-header {
    padding: 10px 0;
    border-bottom: 1px solid #f0f2f7;
  }
  & .vc-title {
    font-weight: 400;
    text-transform: capitalize;
  }
  & .vc-weekday {
    //width: 45px + 8px;
    border-bottom: 1px solid #f0f2f7;
    padding: 6px 0 8px;
    //margin: 4px 4px;
  }
  & .is-today {
    .vc-day-content {
      background: #2753eb;
      margin: 4px 4px;
      font-size: 14px;
      border: var(--day-border);
      border-radius: 5px;
      height: 33px;
      width: 45px;
      color: white;
    }
  }
  & .vc-day {
    &-content {
      margin: 4px 4px;
      font-size: 14px;
      border: var(--day-border);
      border-radius: 5px;
      height: 33px;
      width: 45px;
      color: #31af5e;
      font-weight: 400;
    }

    .is-disabled {
      border: none;
      color: #a1a7bd;
      &:hover {
        cursor: auto;
        background: white;
        color: #a1a7bd;
      }
      &:focus {
        cursor: auto;
        background: white;
        color: #a1a7bd;
      }
    }

    &-content:hover:not(.is-disabled),
    &-content:focus {
      cursor: pointer;
      background: #31af5e;
      color: white;
    }
  }
}
</style>