<template>
  <div v-if="mounted" class="container">
    <div class="contacts-title"><h2>Контакты</h2></div>
    <div class="contacts-data">
      <contacts-data-h4
        ><b>Официальный адрес:</b> 119049 г. Москва, 4-й Добрынинский переулок, дом 1/9 (станции метро Добрынинская, Серпуховская,
        Октябрьская)<br /><br />

        Вход для самостоятельно обращающихся пациентов за экстренной медицинской помощью- с 3-го Люсиновского переулка.<br />
        Вход для пациентов, записанных на прием в КДЦ- с 4-го Добрынинского переулка.<br />
        Вход на территорию больницы для всех остальных- с 1-ого Добрынинского переулка.<br />
        Внимание! Вход всех посетителей в 1А корпус и оформление плановой госпитализации проводится через пункт термометрии.<br /><br />
        <div class="map-container">
          <yandex-map style="height: 400px" :coords="[55.725317, 37.619214]" zoom="16.24" :settings="settings" />
        </div>
        <b>Call-центр:</b> +7 (495) 959-88-00, +7 (495) 959-88-03 круглосуточно<br />
        Запись на медицинские услуги также проводится в разделе «Запись на приём»<br />
        Запись на онлайн консультации проводятся в разделе «Телемедицина»<br /><br />

        <b>Официальный сайт:</b> МОРОЗДГКБ.РФ<br />
        <b>Email:</b> mdgkb@zdrav.mos.ru<br />
        <!-- <b>Facebook:</b> morozdgkbdzm<br /> -->
        <!-- <b>Instagram:</b> morozdgkbdzm<br /> -->
        <b>Youtube:</b> youtube.com<br />
        <b>Вконтакте:</b> vk.com</contacts-data-h4
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { yandexMap } from 'vue-yandex-maps';

export default defineComponent({
  name: 'VacanciesFilters',
  components: { yandexMap },

  setup() {
    const mounted = ref(false);
    const settings = {
      center: [55.74954, 37.621587],
      zoom: 10,
    };
    onMounted(async () => {
      mounted.value = true;
    });

    return {
      mounted,
      settings,
    };
  },
});
</script>

<style scoped lang="scss">
.map-container {
  height: 400px;
  margin: 10px 0 20px 0;
}
.container {
  width: 100%;
}

.hidden {
  display: none;
}

.contacts-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  height: 60px;
  background: #e4e5e7;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
  font-weight: normal;
}

.contacts-data {
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  padding: 20px;
}

.contacts-data-h4 {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  font-size: 16px;
  font-weight: lighter;
  color: #4a4a4a;
}
</style>
