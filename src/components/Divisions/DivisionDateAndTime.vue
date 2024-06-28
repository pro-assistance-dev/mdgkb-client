<template>
  <CollapseItem v-if="true" tab-id="1" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Дата и время приема</div>
    </template>
    <template #inside-content>
      <div v-if="true" class="Date-and-time">
        <div id="block-footer" class="block">
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
              <div class="block-text">
                <a @click="$router.push(`/map/${division.id}`)">
                  {{ division.address }}
                </a>
              </div>
            </div>
            <div class="block-footer">
              <button v-if="isAuth" class="make" @click="$router.push('/appointments/oms')">Запись на прием</button>
              <button v-if="!isAuth" class="make-grey">Запись на прием</button>
              <div v-if="!isAuth" class="make-button">
                Для онлайн записи на прием необходимо войти в <a @click="openLoginModal">Личный кабинет</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { Calendar } from 'v-calendar';
import { computed, defineComponent, PropType, ref } from 'vue';

import Division from '@/classes/Division';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DivisionDateAndTime',
  components: {
    Calendar,
    CollapseItem,
  },
  props: {
    division: { type: Object as PropType<Division>, required: true },
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

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/calendar-style.scss';
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
  letter-spacing: 0, 05em;
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
  border-radius: $border-radius;
  color: $main_green;
}

.time:hover {
  background: $main_green;
  color: $base-background;
}

.make {
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
  & .vc-title {
    position: relative;
    display: flex;
    font-weight: 400;
    text-transform: capitalize;
    align-items: center;
    justify-content: center;
  }
  & .vc-weekday {
    display: flex;
    border-bottom: 1px solid #f0f2f7;
    padding: 6px 0 8px;
    align-items: center;
    justify-content: center;
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
    display: flex;
    position: relative;
    min-width: 32px;
    z-index: 1;

    &-content {
      display: flex;
      margin: 4px 4px;
      font-size: 14px;
      border: var(--day-border);
      border-radius: 5px;
      height: 33px;
      width: 45px;
      color: #31af5e;
      font-weight: 400;
      align-items: center;
      justify-content: center;
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

:deep(.calendar-container) {
  width: 100%;
}

:deep(.custom-calendar.vc-container) {
  --day-border: 2px solid #31af5e;
  --day-border-highlight: 1px solid #b8c2cc;
  --weekday-bg: #f8fafc;
  width: 100%;
  border: none;
  position: relative;
}
:deep(.vc-container.vc-blue) {
  --accent-100: var(--blue-100);
  --accent-200: var(--blue-200);
  --accent-300: var(--blue-300);
  --accent-400: var(--blue-400);
  --accent-500: var(--blue-500);
  --accent-600: var(--blue-600);
  --accent-700: var(--blue-700);
  --accent-800: var(--blue-800);
  --accent-900: var(--blue-900);
}

:deep(.vc-container) {
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --leading-snug: 1.375;
  --rounded: 0.25rem;
  --rounded-lg: 0.5rem;
  --rounded-full: 9999px;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --slide-translate: 22px;
  --slide-duration: 0.15s;
  --slide-timing: ease;
  --day-content-transition-time: 0.13s ease-in;
  --weeknumber-offset: -34px;
  position: relative;
  display: inline-flex;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  font-family:
    BlinkMacSystemFont,
    -apple-system,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid;
  border-color: var(--gray-400);
  border-radius: var(--rounded-lg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --leading-snug: 1.375;
  --rounded: 0.25rem;
  --rounded-lg: 0.5rem;
  --rounded-full: 9999px;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --slide-translate: 22px;
  --slide-duration: 0.15s;
  --slide-timing: ease;
  --day-content-transition-time: 0.13s ease-in;
  --weeknumber-offset: -34px;
  position: relative;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  width: -webkit-max-content;
  width: max-content;
  height: -webkit-max-content;
  height: max-content;
  font-family:
    BlinkMacSystemFont,
    -apple-system,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid;
  border-color: var(--gray-400);
  border-radius: var(--rounded-lg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;

  --white: #ffffff;
  --black: #000000;
  --gray-100: #f7fafc;
  --gray-200: #edf2f7;
  --gray-300: #e2e8f0;
  --gray-400: #cbd5e0;
  --gray-500: #a0aec0;
  --gray-600: #718096;
  --gray-700: #4a5568;
  --gray-800: #2d3748;
  --gray-900: #1a202c;
  --red-100: #fff5f5;
  --red-200: #fed7d7;
  --red-300: #feb2b2;
  --red-400: #fc8181;
  --red-500: #f56565;
  --red-600: #e53e3e;
  --red-700: #c53030;
  --red-800: #9b2c2c;
  --red-900: #742a2a;
  --orange-100: #fffaf0;
  --orange-200: #feebc8;
  --orange-300: #fbd38d;
  --orange-400: #f6ad55;
  --orange-500: #ed8936;
  --orange-600: #dd6b20;
  --orange-700: #c05621;
  --orange-800: #9c4221;
  --orange-900: #7b341e;
  --yellow-100: #fffff0;
  --yellow-200: #fefcbf;
  --yellow-300: #faf089;
  --yellow-400: #f6e05e;
  --yellow-500: #ecc94b;
  --yellow-600: #d69e2e;
  --yellow-700: #b7791f;
  --yellow-800: #975a16;
  --yellow-900: #744210;
  --green-100: #f0fff4;
  --green-200: #c6f6d5;
  --green-300: #9ae6b4;
  --green-400: #68d391;
  --green-500: #48bb78;
  --green-600: #38a169;
  --green-700: #2f855a;
  --green-800: #276749;
  --green-900: #22543d;
  --teal-100: #e6fffa;
  --teal-200: #b2f5ea;
  --teal-300: #81e6d9;
  --teal-400: #4fd1c5;
  --teal-500: #38b2ac;
  --teal-600: #319795;
  --teal-700: #2c7a7b;
  --teal-800: #285e61;
  --teal-900: #234e52;
  --blue-100: #ebf8ff;
  --blue-200: #bee3f8;
  --blue-300: #90cdf4;
  --blue-400: #63b3ed;
  --blue-500: #4299e1;
  --blue-600: #3182ce;
  --blue-700: #2b6cb0;
  --blue-800: #2c5282;
  --blue-900: #2a4365;
  --indigo-100: #ebf4ff;
  --indigo-200: #c3dafe;
  --indigo-300: #a3bffa;
  --indigo-400: #7f9cf5;
  --indigo-500: #667eea;
  --indigo-600: #5a67d8;
  --indigo-700: #4c51bf;
  --indigo-800: #434190;
  --indigo-900: #3c366b;
  --purple-100: #faf5ff;
  --purple-200: #e9d8fd;
  --purple-300: #d6bcfa;
  --purple-400: #b794f4;
  --purple-500: #9f7aea;
  --purple-600: #805ad5;
  --purple-700: #6b46c1;
  --purple-800: #553c9a;
  --purple-900: #44337a;
  --pink-100: #fff5f7;
  --pink-200: #fed7e2;
  --pink-300: #fbb6ce;
  --pink-400: #f687b3;
  --pink-500: #ed64a6;
  --pink-600: #d53f8c;
  --pink-700: #b83280;
  --pink-800: #97266d;
  --pink-900: #702459;
}

:deep(.vc-popover-content-wrapper) {
  --popover-horizontal-content-offset: 8px;
  --popover-vertical-content-offset: 10px;
  --popover-caret-horizontal-offset: 18px;
  --popover-caret-vertical-offset: 8px;
  position: absolute;
  display: block;
  outline: none;
  z-index: 10;
}
:deep(.custom-calendar.vc-container) {
  --day-border: 2px solid #31af5e;
  --day-border-highlight: 1px solid #b8c2cc;
  --weekday-bg: #f8fafc;
  width: 100%;
  border: none;
  position: relative;
}

:deep(element.style) {
  grid-template-columns: repeat(1, 1fr);
}

:deep(.vc-pane-layout) {
  display: grid;
}
:deep(.vc-container, .vc-container *) {
  box-sizing: border-box;
}

:deep(.vc-header) {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  // padding: 10px 16px 0px 16px;
  border-bottom: 1px solid #f0f2f7;
  padding: 10px 0;
}

:deep(.vc-title) {
  font-size: var(--text-lg);
  color: var(--gray-800);
  font-weight: var(--font-semibold);
  line-height: 28px;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
}

:deep(.vc-weeks) {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: relative;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 6px;
  min-width: 250px;
}
:deep(.vc-weekday) {
  text-align: center;
  color: var(--gray-500);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  line-height: 14px;
  padding-top: 4px;
  padding-bottom: 8px;
  cursor: default;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

:deep(.vc-day-box-center-center) {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
:deep(.vc-day) {
  position: relative;
  min-height: 32px;
  z-index: 1;
}
:deep(.vc-arrows-container) {
  width: 100%;
  position: absolute;
  top: 0;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 8px 10px;
  pointer-events: none;
}

:deep(.vc-arrow.is-disabled) {
  opacity: 0.25;
  pointer-events: none;
  cursor: not-allowed;
}

:deep(.vc-arrow) {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: auto;
  color: var(--gray-600);
  border-width: 2px;
  border-style: solid;
  border-radius: var(--rounded);
  border-color: transparent;
}

:deep(.vc-svg-icon) {
  display: inline-block;
  stroke: currentColor;
  stroke-width: 0;
}

:deep(svg:not(:root)) {
  overflow: hidden;
}

:deep(.vc-arrow.is-disabled) {
  opacity: 0.25;
  pointer-events: none;
  cursor: not-allowed;
}

:deep(.vc-svg-icon path) {
  fill: currentColor;
}

:deep(:not(svg)) {
  transform-origin: 0px 0px;
}

:deep(.vc-popover-content-wrapper:not(.is-interactive)) {
  --popover-horizontal-content-offset: 8px;
  --popover-vertical-content-offset: 10px;
  --popover-caret-horizontal-offset: 18px;
  --popover-caret-vertical-offset: 8px;
  position: absolute;
  display: block;
  outline: none;
  z-index: 10;
}

:deep(.vc-popover-content-wrapper) {
  --popover-horizontal-content-offset: 8px;
  --popover-vertical-content-offset: 10px;
  --popover-caret-horizontal-offset: 18px;
  --popover-caret-vertical-offset: 8px;
  position: absolute;
  display: block;
  outline: none;
  z-index: 10;
}

:deep(.vc-popover-content.direction-bottom) {
  margin-top: var(--popover-vertical-content-offset);
}

:deep(:not(svg)) {
  transform-origin: 0px 0px;
}

:deep(.vc-nav-popover-container) {
  color: var(--white);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  background-color: var(--gray-800);
  border: 1px solid;
  border-color: var(--gray-700);
  border-radius: var(--rounded-lg);
  padding: 4px;
  box-shadow: var(--shadow);
}

:deep(.vc-nav-header) {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

:deep(.vc-nav-popover-container) {
  color: var(--white);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  background-color: var(--gray-800);
  border: 1px solid;
  border-color: var(--gray-700);
  border-radius: var(--rounded-lg);
  padding: 4px;
  box-shadow: var(--shadow);
}

:deep(.vc-popover-content-wrapper) {
  --popover-horizontal-content-offset: 8px;
  --popover-vertical-content-offset: 10px;
  --popover-caret-horizontal-offset: 18px;
  --popover-caret-vertical-offset: 8px;
  position: absolute;
  display: block;
  outline: none;
  z-index: 10;
}

:deep(.vc-nav-arrow.is-left) {
  margin-right: auto;
}

:deep(.vc-nav-title) {
  color: var(--accent-100);
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
  padding: 4px 8px;
  border-radius: var(--rounded);
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

:deep(.vc-nav-arrow.is-right) {
  margin-left: auto;
}

:deep(.vc-nav-arrow) {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: var(--leading-snug);
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: var(--rounded);
}

:deep(.vc-nav-items) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 2px;
  grid-column-gap: 5px;
}

:deep(.vc-nav-item.is-disabled) {
  opacity: 0.25;
  pointer-events: none;
}

:deep(.vc-nav-item) {
  width: 48px;
  text-align: center;
  line-height: var(--leading-snug);
  font-weight: var(--font-semibold);
  padding: 4px 0;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: var(--rounded);
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

:deep(.vc-nav-item.is-active) {
  color: var(--accent-900);
  background: var(--accent-100);
  font-weight: var(--font-bold);
  box-shadow: var(--shadow);
}
:deep(.vc-popover-caret.direction-bottom.align-center) {
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
}

:deep(.vc-pane-container) {
  width: 100%;
  position: relative;
}
:deep(.vc-pane-layout) {
  display: grid;
}

:deep(.custom-calendar.vc-container .vc-day) {
  display: flex;
  position: relative;
  min-width: 32px;
  z-index: 1;
}

:deep(.vc-day.is-not-in-month *) {
  opacity: 0;
  pointer-events: none;
}

:deep(.custom-calendar.vc-container .vc-day-content) {
  display: flex;
  margin: 4px 4px;
  font-size: 14px;
  border: var(--day-border);
  border-radius: 5px;
  height: 33px;
  width: 45px;
  color: #31af5e;
  font-weight: 400;
  align-items: center;
  justify-content: center;
}
</style>
