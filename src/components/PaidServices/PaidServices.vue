<template>
  <!-- <div v-if="services().length" class="services"> -->
  <div class="services">
    <div class="title-in">Оказываемые услуги</div>
    <div class="point">
      <ul class="services-list">
        <li v-for="paidService in services()" :key="paidService.id" class="services-list-item">
          <h4 class="point-text">{{ paidService.paidService.name }}</h4>
        </li>
        <li v-if="defaultLimit !== itemsWithPaidService.length">
          <h4 v-if="limit === defaultLimit" class="show-more-link" @click="setLimit">Показать все сервисы...</h4>
          <h4 v-else class="show-more-link" @click="setLimit">Скрыть сервисы...</h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import IWithPaidService from '@/interfaces/IWithPaidService';

export default defineComponent({
  name: 'PaidServices',
  props: {
    itemsWithPaidService: { type: Array as PropType<IWithPaidService[]>, required: true },
  },
  setup(props) {
    const defaultLimit = 5;
    const limit = ref(defaultLimit);
    const showMoreText = ref('Показать все сервисы');

    const setLimit = () => {
      limit.value === props.itemsWithPaidService.length ? (limit.value = defaultLimit) : (limit.value = props.itemsWithPaidService.length);
    };

    const services = () => {
      const ss: IWithPaidService[] = [];
      props.itemsWithPaidService.forEach((p: IWithPaidService, index: number) => {
        if (index <= limit.value) {
          ss.push(p);
        }
      });
      return ss;
    };

    return {
      defaultLimit,
      showMoreText,
      setLimit,
      limit,
      services,
    };
  },
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
.show-more-link {
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: $doctor-text-font-size;
  color: $site_blue;
  font-weight: $doctor-text-font-weight;
  line-height: $doctor-text-line-height;
  &:hover {
    cursor: pointer;
    color: darken($site_blue, 30%);
  }

}
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

.point {
  display: flex;
  margin: 0px 0px 20px 20px;
}

.point-info {
  display: block;
  height: auto;
  margin: 10px 0px 0px 5px;
}

.point-year {
  display: flex;
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: 14px;
  color: $site_gray;
  font-weight: $title-font-bold-weight;
}

.point-text {
  display: flex;
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: $doctor-text-font-size;
  color: $site_dark_gray;
  font-weight: $doctor-text-font-weight;
  line-height: $doctor-text-line-height;
}

.services {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.services-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.services-list-item {
  margin-bottom: 0.5rem;
  padding-left: 25px;
  position: relative;
  margin-left: 10px;
}

.services-list-item:before {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 7px;
  height: 7px;
  background-color: #2655eb;
  border-radius: 50%;
}
</style>
