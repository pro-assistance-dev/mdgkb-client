<template>
  <div v-if="mounted" class="flex">
    <div class="contact-data">
      <div class="contact-data-list-item">
        <div class="contact-h3">
          <div class="item">
            <svg class="icon-time">
              <use xlink:href="#time"></use>
            </svg>
          </div>
          <div class="item">Пн-Пт, с 9:00 до 17:00</div>
        </div>
      </div>
      <div class="contact-data-list-item">
        <div class="contact-h3">
          <div class="vert">
            <div class="item">
              <svg class="icon-map-marker">
                <use xlink:href="#map-marker"></use>
              </svg>
            </div>
          </div>
          <div class="item">Москва, 4-й Добрынинский переулок 1/9 корпус 22а, 1 этаж Отдел постдипломного образования</div>
        </div>
      </div>
      <div class="contact-data-list-item">
        <div class="contact-h3">
          <div class="item">
            <svg class="icon-phone">
              <use xlink:href="#phone"></use>
            </svg>
          </div>
          <div class="item">
            +7 (495) 959-88-01<br />
            доб. 11-37 ДПО
          </div>
        </div>
      </div>
      <div class="contact-data-list-item">
        <div class="contact-h3">
          <div class="item">
            <svg class="icon-email">
              <use xlink:href="#profile-email"></use>
            </svg>
          </div>
          <div class="item">dpo@morozdgkb.ru</div>
        </div>
      </div>
    </div>
    <div class="map-data">
      <div class="map-container">
        <yandex-map style="height: 600px" :coords="[55.725317, 37.619214]" zoom="16.24" :settings="settings" />
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M10.167 10.741L11.287 9.621C11.4369 9.47105 11.6275 9.36838 11.8352 9.32572C12.043 9.28306 12.2586 9.30228 12.4555 9.381L13.8195 9.927C14.0205 10.0074 14.1929 10.1463 14.3142 10.3256C14.4356 10.5049 14.5005 10.7165 14.5005 10.933V13.4135C14.5009 13.5609 14.4711 13.7069 14.4131 13.8424C14.3551 13.978 14.27 14.1002 14.1631 14.2018C14.0562 14.3033 13.9297 14.3819 13.7914 14.4329C13.653 14.4838 13.5057 14.506 13.3585 14.498C3.7975 13.903 1.8665 5.805 1.508 2.704C1.49063 2.5524 1.50556 2.39884 1.5518 2.25342C1.59805 2.108 1.67455 1.97402 1.77628 1.86029C1.87802 1.74656 2.00268 1.65566 2.14206 1.59356C2.28145 1.53146 2.43241 1.49958 2.585 1.5H5.0215C5.23803 1.5 5.4496 1.56487 5.62892 1.68625C5.80823 1.80764 5.94706 1.97996 6.0275 2.181L6.573 3.545C6.65172 3.74189 6.67094 3.95755 6.62828 4.16526C6.58562 4.37296 6.48295 4.56359 6.333 4.7135L5.213 5.8335C5.213 5.8335 5.834 10.1995 10.167 10.741Z"
      ></path>
    </symbol>
    <symbol id="profile-email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V5.913C2.02243 5.39779 2.24301 4.91116 2.61568 4.5547C2.98835 4.19824 3.4843 3.99951 4 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"
      ></path>
    </symbol>

    <symbol id="time" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
      ></path>
    </symbol>

    <symbol id="map-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <g clip-path="url(#clip0_1751_5)">
        <path
          d="M12.166 8.94C11.642 10.002 10.932 11.06 10.206 12.01C9.5173 12.9056 8.7809 13.7635 8 14.58C7.21908 13.7635 6.48268 12.9056 5.794 12.01C5.068 11.06 4.358 10.002 3.834 8.94C3.304 7.867 3 6.862 3 6C3 4.67392 3.52678 3.40215 4.46447 2.46447C5.40215 1.52678 6.67392 1 8 1C9.32608 1 10.5979 1.52678 11.5355 2.46447C12.4732 3.40215 13 4.67392 13 6C13 6.862 12.695 7.867 12.166 8.94ZM8 16C8 16 14 10.314 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 10.314 8 16 8 16Z"
        ></path>
        <path
          d="M8 8C7.46957 8 6.96086 7.78929 6.58579 7.41421C6.21071 7.03914 6 6.53043 6 6C6 5.46957 6.21071 4.96086 6.58579 4.58579C6.96086 4.21071 7.46957 4 8 4C8.53043 4 9.03914 4.21071 9.41421 4.58579C9.78929 4.96086 10 5.46957 10 6C10 6.53043 9.78929 7.03914 9.41421 7.41421C9.03914 7.78929 8.53043 8 8 8ZM8 9C8.79565 9 9.55871 8.68393 10.1213 8.12132C10.6839 7.55871 11 6.79565 11 6C11 5.20435 10.6839 4.44129 10.1213 3.87868C9.55871 3.31607 8.79565 3 8 3C7.20435 3 6.44129 3.31607 5.87868 3.87868C5.31607 4.44129 5 5.20435 5 6C5 6.79565 5.31607 7.55871 5.87868 8.12132C6.44129 8.68393 7.20435 9 8 9V9Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1751_5">
          <rect width="16" height="16" fill="white"></rect>
        </clipPath>
      </defs>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { yandexMap } from 'vue-yandex-maps';

export default defineComponent({
  name: 'DpoCoursesContacts',
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

    return { settings, mounted };
  },
});
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}

.links {
  text-align: left;
  padding-left: 7px;
}

.icon-phone {
  width: 19px;
  height: 19px;
  fill: #ffffff;
  stroke: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-time {
  width: 22px;
  height: 22px;
  fill: #2754eb;
}

.icon-map-marker {
  width: 22px;
  height: 22px;
  fill: #2754eb;
}

.search_block {
  padding-top: 10px;
}

.contact-data {
  margin: 15px 30px 0 10px;
  padding-top: 10px;
  min-width: 272px;
  max-width: 272px;
  border: 1px solid #dee5ef;
  border-radius: 5px;
  background: #ffffff;
  max-height: 270px;
}

.contact-data-list {
  list-style-type: none;
}

.contact-data-list-item-h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  overflow-wrap: break-word;
  color: #4a4a4a;
  text-align: left;
  justify-content: left;
}

.contact-data-list-item {
  padding-bottom: 20px;
  margin-left: 15px;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin: 2px;
}

.item {
  font-size: 14px;
  display: flex;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

.map-data {
  width: 100%;
  margin: 15px 10px 0 0;
  border: 1px solid #dee5ef;
  border-radius: 5px;
}
.map-container {
  width: 100%;
  margin: 0;
  height: 600px;
}

@media screen and (max-width: 980px) {
  .contact-data {
    margin-right: 10px;
  }
}

@media screen and (max-width: 768px) {
  .contact-data {
    margin-right: 10px;
    min-width: 272px;
    max-width: 100%;
  }
  .flex {
    display: block;
    justify-content: space-between;
  }
  .map-data {
    margin: 15px 13px 0 10px;
    width: calc(100% - 20px);
  }
}
</style>
