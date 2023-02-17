<template>
  <div class="content-block">
    <div class="main-doctor">
      <div class="main-doctor-info">
        <div class="main-doctor-avatar">
          <div class="doctor-avatar">
            <img src="../../assets/doctors/Gorev_V_3.webp" alt="alt" />
          </div>
        </div>
        <div class="main-doctor-title">
          <h3 class="main-doctor-title-h3">{{ mainDoctor.employee.human.getFullName() }}</h3>
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
          <div class="contact-h3">
            <div class="item">
              <svg v-if="mainDoctor.timetable.getOnlyWorkDays().length" class="icon-time">
                <use xlink:href="#time"></use>
              </svg>
            </div>
            <div class="time-block">
              <span v-for="workDay in mainDoctor.timetable.getOnlyWorkDays()" :key="workDay" class="item">{{ workDay }} </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="arrow">
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
      </div> -->
    </div>
    <!-- <svg class="icon-main-doctor-arrow-bottom">
      <use xlink:href="#right-arrow bottom"></use>
    </svg> -->
    <div class="vice-title">
      <div class="head-title"><h3>Заместители главного врача</h3></div>
    </div>
    <div class="vice-doctor">
      <div v-for="head in heads.filter((el) => !el.isMain)" :key="head.id" class="vice-doctor-info">
        <div class="vice-doctor-avatar">
          <div class="doctor-avatar">
            <img
              :src="head.employee.human.photoMini.getImageUrl()"
              alt="alt"
              @error="head.employee.human.photoMini.errorImg($event, 'doctor-default.webp')"
            />
          </div>
        </div>
        <div class="vice-doctor-title">
          <h3 class="vice-doctor-title-h3">{{ head.employee.human.getFullName() }}</h3>
          <h2 class="vice-doctor-title-h2">{{ head.position }}</h2>
          <div class="vice-doctor-regalis">
            <div v-if="head.employee.getAcademicDegreeAndRank()" class="contact-h3">{{ head.employee.getAcademicDegreeAndRank() }}</div>
          </div>
          <ContactBlock :contact-info="head.contactInfo" />
        </div>
        <div class="contact-h3">
          <div class="item">
            <svg v-if="head.timetable.getOnlyWorkDays().length" class="icon-time">
              <use xlink:href="#time"></use>
            </svg>
          </div>
          <div class="time-block">
            <div v-for="workDay in head.timetable.getOnlyWorkDays()" :key="workDay" class="item">{{ workDay }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="display-none">
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

    <symbol id="time" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M8 1C4.1402 1 1 4.1402 1 8C1 11.8598 4.1402 15 8 15C11.8598 15 15 11.8598 15 8C15 4.1402 11.8598 1 8 1ZM10.3051 11.2949L7.3 8.2898V3.8H8.7V7.7102L11.2949 10.3051L10.3051 11.2949Z"
      ></path>
    </symbol>

    <symbol id="map-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M7.99923 0.888916C6.61487 0.890072 5.28722 1.439 4.30625 2.4158C3.32529 3.39261 2.77072 4.71791 2.76367 6.10225C2.76367 8.1778 3.92812 9.91558 4.78145 11.1822L4.93701 11.4134C5.78602 12.6439 6.69682 13.8306 7.66589 14.9689L8.00367 15.3645L8.34145 14.9689C9.31041 13.8305 10.2212 12.6438 11.0703 11.4134L11.2259 11.1778C12.0748 9.91114 13.2392 8.1778 13.2392 6.10225C13.2322 4.71714 12.677 3.39117 11.6951 2.41424C10.7131 1.43731 9.38435 0.888898 7.99923 0.888916ZM7.99923 8.44447C7.42259 8.44447 6.85889 8.27348 6.37943 7.95311C5.89997 7.63275 5.52628 7.1774 5.30561 6.64465C5.08493 6.1119 5.0272 5.52568 5.13969 4.96012C5.25219 4.39456 5.52987 3.87505 5.93762 3.46731C6.34537 3.05956 6.86487 2.78188 7.43043 2.66938C7.99599 2.55688 8.58221 2.61462 9.11496 2.83529C9.64771 3.05597 10.1031 3.42966 10.4234 3.90912C10.7438 4.38858 10.9148 4.95227 10.9148 5.52892C10.9148 6.30217 10.6076 7.04375 10.0608 7.59053C9.51406 8.1373 8.77248 8.44447 7.99923 8.44447Z"
      ></path>
      <path
        d="M8.00055 7.18665C8.91612 7.18665 9.65833 6.44444 9.65833 5.52887C9.65833 4.61331 8.91612 3.87109 8.00055 3.87109C7.08499 3.87109 6.34277 4.61331 6.34277 5.52887C6.34277 6.44444 7.08499 7.18665 8.00055 7.18665Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, Ref } from 'vue';

import Head from '@/classes/Head';
import ContactBlock from '@/components/ContactBlock.vue';
import countRating from '@/services/countRating';
import Provider from '@/services/Provider';

export default {
  name: 'MedicalOrganizationStructureVertical',
  components: { ContactBlock },
  setup() {
    const heads: Ref<Head[]> = computed<Head[]>(() => Provider.store.getters['heads/items']);
    const mainDoctor: Ref<Head> = computed<Head>(() => Provider.store.getters['heads/mainDoctor']);

    return {
      countRating,
      heads,
      mainDoctor,
    };
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

/* .container-box {
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
} */

.block {
  width: 55%;
}

/* .title {
  display: flex;
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
} */

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
  margin-bottom: 30px;
}

.main-doctor-info {
  margin: 0 auto;
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
  width: 180px;
  height: 180px;
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
  padding-bottom: 5px;
  font-weight: lighter;
}

.vice-doctor-title-h2 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  padding-bottom: 5px;
}

.main-doctor-title-h3 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  min-height: 30px;
  padding-bottom: 5px;
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

.icon-time {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-map-marker {
  width: 23px;
  height: 23px;
  fill: #2754eb;
}

.item {
  display: flex;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

.time-block {
  display: block;
}
.vice-doctor-regalis {
  // display: flex;
  div {
    display: inline-block;
    word-wrap: break-word;
    text-align: left;
  }
}
</style>
