<template>
  <div class="content-block">
    <div class="title"><h2>Руководство</h2></div>
    <div class="main-doctor">
      <div class="main-doctor-info">
        <div class="main-doctor-avatar">
          <div class="doctor-avatar">
            <img src="../../assets/doctors/Gorev_V_3.jpg" alt="alt" />
          </div>
        </div>
        <div class="main-doctor-title">
          <h3 class="main-doctor-title-h3">{{ mainDoctor.human.getFullName() }}</h3>
          <h2 class="main-doctor-title-h2">{{ mainDoctor.position }}</h2>
          <div v-for="phone in mainDoctor.contactInfo.telephoneNumbers" :key="phone.id">
            <div class="contact-h3">
              <div v-if="phone.description" class="item">
                <svg class="icon-phone">
                  <use xlink:href="#phone"></use>
                </svg>
              </div>
              <div class="item">{{ phone.number }}</div>
            </div>
          </div>
          <div v-for="email in mainDoctor.contactInfo.emails" :key="email.id">
            <div class="contact-h3">
              <div v-if="email.description" class="item">
                <svg class="icon-email">
                  <use xlink:href="#email"></use>
                </svg>
              </div>
              <div class="item">{{ email.address }}</div>
            </div>
          </div>
          <h3 class="contact-h3">Приём граждан:</h3>
          <div v-for="workDay in mainDoctor.timetable.getOnlyWorkDays()" :key="workDay">{{ workDay }}</div>
        </div>
      </div>
      <div class="arrow">
        <svg class="icon-main-doctor-arrow">
          <use xlink:href="#right-arrow"></use>
        </svg>
      </div>
      <div class="block">
        <div class="head-title"><h3>Отделы в подчинении</h3></div>
        <div class="divisions-first">
          <ul class="divisions-first-ul">
            <li v-for="department in mainDoctor.departments" :key="department.id">
              <div v-if="!department.isDivision" class="divisions-first-item">{{ department.name }}</div>
              <div
                v-else
                style="cursor: pointer"
                class="divisions-first-item"
                @click="$router.push(`/divisions/${department.division.slug}`)"
              >
                {{ department.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <svg class="icon-main-doctor-arrow-bottom">
      <use xlink:href="#right-arrow bottom"></use>
    </svg>
    <div class="vice-title">
      <div class="head-title"><h3>Заместители главного врача</h3></div>
    </div>
    <div class="vice-doctor">
      <div v-for="head in heads" :key="head.id" class="vice-doctor-info">
        <div class="vice-doctor-avatar">
          <div class="doctor-avatar">
            <img :src="head.photo.getImageUrl()" alt="alt" />
          </div>
        </div>
        <div class="vice-doctor-title">
          <h3 class="vice-doctor-title-h3">{{ head.human.getFullName() }}</h3>
          <h2 class="vice-doctor-title-h2">{{ head.position }}</h2>
          <div v-for="phone in head.contactInfo.telephoneNumbers" :key="phone.id">
            <div class="contact-h3">
              <div v-if="phone.description" class="item">
                <svg class="icon-phone">
                  <use xlink:href="#phone"></use>
                </svg>
              </div>
              <div class="item">{{ phone.number }}</div>
            </div>
          </div>
          <div v-for="email in head.contactInfo.emails" :key="email.id">
            <div class="contact-h3">
              <div v-if="email.description" class="item">
                <svg class="icon-email">
                  <use xlink:href="#email"></use>
                </svg>
              </div>
              <div class="item">{{ email.address }}</div>
            </div>
          </div>
          <h3 v-if="head.timetable.getOnlyWorkDays().length" class="contact-h3">Приём граждан:</h3>
          <div v-for="workDay in head.timetable.getOnlyWorkDays()" :key="workDay">{{ workDay }}</div>
        </div>
      </div>
    </div>
  </div>

  <svg width="0" height="0" class="hidden">
    <symbol id="right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <path
        d="M11.5334 45.5959C11.8704 45.7712 12.2488 45.8514 12.628 45.828C13.0071 45.8045 13.3727 45.6782 13.6855 45.4626L40.7688 26.7126C41.0456 26.5209 41.2717 26.2649 41.4279 25.9667C41.5841 25.6684 41.6657 25.3368 41.6657 25.0001C41.6657 24.6634 41.5841 24.3318 41.4279 24.0335C41.2717 23.7353 41.0456 23.4793 40.7688 23.2876L13.6855 4.53761C13.3729 4.32135 13.0072 4.1947 12.6278 4.1714C12.2485 4.1481 11.8699 4.22902 11.5333 4.4054C11.1966 4.58178 10.9146 4.84691 10.7178 5.17207C10.521 5.49723 10.4169 5.87003 10.4167 6.25011V43.7501C10.4167 44.1304 10.5207 44.5034 10.7176 44.8288C10.9144 45.1542 11.1965 45.4195 11.5334 45.5959Z"
      ></path>
    </symbol>

    <symbol id="right-arrow bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <path
        d="M4.4041 11.5334C4.2288 11.8704 4.1486 12.2488 4.172 12.628C4.1955 13.0071 4.3218 13.3727 4.5374 13.6855L23.2874 40.7688C23.4791 41.0456 23.7351 41.2717 24.0333 41.4279C24.3316 41.5841 24.6632 41.6657 24.9999 41.6657C25.3366 41.6657 25.6682 41.5841 25.9665 41.4279C26.2647 41.2717 26.5207 41.0456 26.7124 40.7688L45.4624 13.6855C45.6787 13.3729 45.8053 13.0072 45.8286 12.6278C45.8519 12.2485 45.771 11.8699 45.5946 11.5333C45.4182 11.1966 45.1531 10.9146 44.8279 10.7178C44.5028 10.521 44.13 10.4169 43.7499 10.4167L6.2499 10.4167C5.8696 10.4167 5.4966 10.5207 5.1712 10.7176C4.8458 10.9144 4.5805 11.1965 4.4041 11.5334Z"
      ></path>
    </symbol>

    <symbol id="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M12 6.5H11C10.9996 6.1023 10.8414 5.721 10.5602 5.43978C10.279 5.15856 9.8977 5.0004 9.5 5V4C10.1628 4.00079 10.7982 4.26444 11.2669 4.73311C11.7356 5.20178 11.9992 5.8372 12 6.5Z"
      ></path>
      <path
        d="M14 6.5H13C12.9989 5.57207 12.6299 4.68244 11.9737 4.0263C11.3176 3.37015 10.4279 3.00106 9.5 3V2C10.6931 2.00132 11.8369 2.47585 12.6805 3.31948C13.5241 4.16311 13.9987 5.30693 14 6.5Z"
      ></path>
      <path
        d="M10.167 10.741L11.287 9.621C11.4369 9.47105 11.6275 9.36838 11.8352 9.32572C12.043 9.28306 12.2586 9.30228 12.4555 9.381L13.8195 9.927C14.0205 10.0074 14.1929 10.1463 14.3142 10.3256C14.4356 10.5049 14.5005 10.7165 14.5005 10.933V13.4135C14.5009 13.5609 14.4711 13.7069 14.4131 13.8424C14.3551 13.978 14.27 14.1002 14.1631 14.2018C14.0562 14.3033 13.9297 14.3819 13.7914 14.4329C13.653 14.4838 13.5057 14.506 13.3585 14.498C3.7975 13.903 1.8665 5.805 1.508 2.704C1.49063 2.5524 1.50556 2.39884 1.5518 2.25342C1.59805 2.108 1.67455 1.97402 1.77628 1.86029C1.87802 1.74656 2.00268 1.65566 2.14206 1.59356C2.28145 1.53146 2.43241 1.49958 2.585 1.5H5.0215C5.23803 1.5 5.4496 1.56487 5.62892 1.68625C5.80823 1.80764 5.94706 1.97996 6.0275 2.181L6.573 3.545C6.65172 3.74189 6.67094 3.95755 6.62828 4.16526C6.58562 4.37296 6.48295 4.56359 6.333 4.7135L5.213 5.8335C5.213 5.8335 5.834 10.1995 10.167 10.741Z"
      ></path>
    </symbol>
    <symbol id="email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22H17V20H12C7.66 20 4 16.34 4 12C4 7.66 7.66 4 12 4C16.34 4 20 7.66 20 12V13.43C20 14.22 19.29 15 18.5 15C17.71 15 17 14.22 17 13.43V12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C13.38 17 14.64 16.44 15.54 15.53C16.19 16.42 17.31 17 18.5 17C20.47 17 22 15.4 22 13.43V12C22 6.48 17.52 2 12 2ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IHead from '@/interfaces/IHead';
import countRating from '@/mixins/countRating';

export default {
  name: 'MedicalOrganizationStructureVertical',
  setup() {
    const store = useStore();
    const route = useRoute();
    const heads: Ref<IHead[]> = computed<IHead[]>(() => store.getters['heads/heads']);
    const mainDoctor: Ref<IHead> = computed<IHead>(() => store.getters['heads/mainDoctor']);
    const mount = ref(false);

    onBeforeMount(async () => {
      await store.dispatch('heads/getAll');
      mount.value = true;
    });

    return {
      countRating,
      heads,
      mainDoctor,
      mount,
    };
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

.container-box {
  display: flex;
}

.content-box {
  width: auto;
}

.hidden {
  display: none;
}

.box {
  justify-content: space-between;
  display: flex;
}

.block {
  width: 55%;
}

.title {
  display: flex;
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
}

.head-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  width: 100%;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 5px;
  color: #4a4a4a;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}

.main-doctor {
  width: auto;
  height: auto;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-doctor-info {
  width: 270px;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px 20px;
}

.vice-doctor {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: auto;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 50px;
}

.vice-doctor-info {
  width: 270px;
  height: 380px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
  margin-bottom: 50px;
}

.vice-doctor-avatar {
  display: block;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
}

.main-doctor-avatar {
  display: block;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
}

.vice-doctor-title {
  display: block;
  width: auto;
  height: auto;
}

.vice-doctor-title-h3 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  padding-bottom: 10px;
  font-weight: lighter;
}

.vice-doctor-title-h2 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  padding-bottom: 10px;
}

.main-doctor-title-h3 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  min-height: 30px;
  padding-bottom: 10px;
}

.main-doctor-title-h2 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 16px;
  color: #4a4a4a;
  padding-bottom: 10px;
}
.divisions {
  display: flex;
  justify-content: left;
  margin-top: 50px;
  margin-bottom: 50px;
}

.divisions-first {
  height: 100%;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  background: #ffffff;
  padding: 10px 10px 0px 10px;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  align-content: center;
}

.divisions-first-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 20px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 5px 10px;
}

ul.divisions-first-ul {
  width: 100%;
}

.divisions-first-ul li {
  display: flex;
  text-decoration: none;
  list-style-type: none;
  padding-bottom: 5px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  padding-bottom: 10px;
  min-width: 100%;
}

.vice-doctor-list li {
  display: flex;
  list-style-type: none;
  justify-content: space-between;
}

.vice-doctor-list {
  list-style-type: none;
}

.icon-main-doctor-arrow {
  width: 50px;
  height: auto;
  fill: #ffffff;
  padding-right: 32px;
  padding-left: 32px;
}

.icon-main-doctor-arrow-bottom {
  width: 50px;
  height: 120px;
  fill: #ffffff;
  margin-left: 120px;
  padding-right: 30px;
  padding-top: 5px;
  padding-left: 10px;
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

.divisions-bottom {
  max-width: 242px;
  margin-bottom: 50px;
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.item {
  display: flex;
  padding-right: 10px;
  width: auto;
}
</style>
