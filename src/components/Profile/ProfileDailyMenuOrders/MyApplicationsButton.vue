<template>
  <div class="give-drop">
    <button class="give-button">Подать заявку</button>
    <div class="drop-give-button">
      <ul class="drop-give-button-item">
        <li>
          <router-link :to="`/dpo`">Выбрать из программ ДПО, НМО</router-link>
        </li>
        <li>
          <router-link :to="`/postgraduate?mode=programs`">Выбрать из программ аспирантуры</router-link>
        </li>
        <li>
          <router-link :to="`/postgraduate?mode=candidate`">Заявка на кандидатский минимум</router-link>
        </li>
        <li>
          <router-link :to="`/application-car/8ccf8e9b-b487-493e-b451-60b193181f07`">Заявка на посещение</router-link>
        </li>
        <li>
          <router-link :to="`/vacancies`">Откликнуться на вакансию</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyApplicationsButton',
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
ul {
  margin: 0;
  padding: 0;
}

.give-drop {
  align-content: center;
  display: flex;
}

.give-button {
  border: none;
  cursor: pointer;
  padding: 0 18px;
  height: 36px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  background: #2754eb;
}

.give-button:hover {
  background: #133dcc;
}

.drop-give-button {
  display: none;
  position: absolute;
  top: 40px;
  right: -1px;
  border-radius: 5px;
  border: 1px solid #dfe4ee;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
}

.give-button:focus ~ .drop-give-button,
.give-button:active ~ .drop-give-button,
.drop-give-button:hover {
  display: block;
}

.give-button:focus-within {
  stroke: #379fff;
}

ul.drop-give-button-item li {
  background: #ffffff;
  border-bottom: 1px solid #dfe4ee;
  list-style: none;
  width: auto;
  padding-right: 10px;
}

ul.drop-give-button-item li a {
  text-decoration: none;
  display: block;
  padding: 5px 5px 5px 15px;
  color: #343e5c;
  transition: color 0.3s ease 0s;
  align-items: center;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
}

ul.drop-give-button-item li ul {
  display: none;
}

ul.drop-give-button-item li:hover {
  position: relative;
  background: #ecf5ff;
}

ul.drop-give-button-item li:first-child {
  border-radius: 5px 5px 0 0;
}

ul.drop-give-button-item li:last-child {
  border-radius: 0 0 5px 5px;
  border-bottom: none;
}
</style>
