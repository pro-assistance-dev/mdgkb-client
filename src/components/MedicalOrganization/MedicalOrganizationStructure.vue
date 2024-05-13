<template>
  <div class="content-block">
    <div class="structure-title"><h2>Структура и органы управления</h2></div>
    <div class="box">
      <div class="left-content-block">
        <div class="main-doctor">
          <div class="main-doctor-info">
            <div class="main-doctor-avatar">
              <div class="doctor-avatar">
                <img src="../../assets/doctors/Gorev_V_3.webp" alt="doctor-Gorev" />
              </div>
            </div>
            <div class="main-doctor-title">
              <h3 class="main-doctor-title-h3">{{ mainDoctor.employee.human.getFullName() }}</h3>
              <h2 class="main-doctor-title-h2">{{ mainDoctor.position }}</h2>
              <div v-for="phone in mainDoctor.contactInfo.telephoneNumbers" :key="phone.id">
                <h3 class="contact-h3">{{ phone.description }}: {{ phone.number }}</h3>
              </div>
              <div v-for="email in mainDoctor.contactInfo.emails" :key="email.id">
                <h3 class="contact-h3">{{ email.description }}: {{ email.address }}</h3>
              </div>
              <h3 class="contact-h3">Приём граждан:</h3>
              <div v-for="workDay in mainDoctor.timetable.getOnlyWorkDays()" :key="workDay">{{ workDay }}</div>
            </div>
          </div>
          <div class="main-doctor-line">
            <svg class="icon-main-doctor-arrow">
              <use xlink:href="#right-arrow"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="right-content-block">
        <ul class="vice-doctor-list">
          <li v-for="head in heads" :key="head.id">
            <div class="vice-doctor">
              <div class="vice-doctor-line"></div>
              <div class="vice-doctor-info">
                <div class="vice-doctor-avatar">
                  <div class="doctor-avatar">
                    <img :src="head.photo.getImageUrl()" alt="doctor-photo" />
                  </div>
                </div>
                <div class="vice-doctor-title">
                  <h3 class="vice-doctor-title-h3">{{ head.employee.human.getFullName() }}</h3>
                  <h2 class="vice-doctor-title-h2">{{ head.position }}</h2>
                  <div v-for="phone in head.contactInfo.telephoneNumbers" :key="phone.id">
                    <h3 class="contact-h3">{{ phone.description }} <span v-if="phone.description">:</span> {{ phone.number }}</h3>
                  </div>
                  <div v-for="email in head.contactInfo.emails" :key="email.id">
                    <h3 class="contact-h3">{{ email.description }}<span v-if="email.description">:</span> {{ email.address }}</h3>
                  </div>
                  <h3 v-if="head.timetable.getOnlyWorkDays().length" class="contact-h3">Приём граждан:</h3>
                  <div v-for="workDay in head.timetable.getOnlyWorkDays()" :key="workDay">{{ workDay }}</div>
                </div>
              </div>
              <div class="vice-doctor-line">
                <svg class="icon-main-doctor-arrow">
                  <use xlink:href="#right-arrow"></use>
                </svg>
              </div>
            </div>
            <div class="divisions">
              <div class="divisions-first">
                <ul class="divisions-first-ul">
                  <li v-for="department in head.departments" :key="department.id">
                    <div v-if="!department.isDivision" class="divisions-first-item">{{ department.name }}</div>
                    <div
                      v-else
                      style="cursor: pointer"
                      class="divisions-first-item"
                      @click="$router.push(`/divisions/${department.division.id}`)"
                    >
                      {{ department.name }}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="divisions-second"></div>
            </div>
          </li>
          <div class="divisions-bottom">
            <div class="divisions-first">
              <ul class="divisions-first-ul">
                <li v-for="department in mainDoctor.departments" :key="department.id">
                  <div v-if="!department.isDivision" class="divisions-first-item">{{ department.name }}</div>
                  <div
                    v-else
                    style="cursor: pointer"
                    class="divisions-first-item"
                    @click="$router.push(`/divisions/${department.division.id}`)"
                  >
                    {{ department.name }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="divisions-second"></div>
          </div>
        </ul>
      </div>
    </div>
  </div>

  <svg width="0" height="0" class="display-none">
    <symbol id="right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <path
        d="M11.5334 45.5959C11.8704 45.7712 12.2488 45.8514 12.628 45.828C13.0071 45.8045 13.3727 45.6782 13.6855 45.4626L40.7688 26.7126C41.0456 26.5209 41.2717 26.2649 41.4279 25.9667C41.5841 25.6684 41.6657 25.3368 41.6657 25.0001C41.6657 24.6634 41.5841 24.3318 41.4279 24.0335C41.2717 23.7353 41.0456 23.4793 40.7688 23.2876L13.6855 4.53761C13.3729 4.32135 13.0072 4.1947 12.6278 4.1714C12.2485 4.1481 11.8699 4.22902 11.5333 4.4054C11.1966 4.58178 10.9146 4.84691 10.7178 5.17207C10.521 5.49723 10.4169 5.87003 10.4167 6.25011V43.7501C10.4167 44.1304 10.5207 44.5034 10.7176 44.8288C10.9144 45.1542 11.1965 45.4195 11.5334 45.5959Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Head from '@/classes/Head';
import countRating from '@/services/countRating';

export default {
  name: 'MedicalOrganizationStructure',
  setup() {
    const store = useStore();
    const heads: Ref<Head[]> = computed<Head[]>(() => store.getters['heads/items']);
    const mainDoctor: Ref<Head> = computed<Head>(() => store.getters['heads/mainDoctor']);
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

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

.container-box {
  display: flex;
}

.content-box {
  width: auto;
  height: 100vh;
  position: sticky;
}

.structure-title {
  display: flex;
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  background: #e4e5e7;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 0px;
  color: #4a4a4a;

  top: 56px;
  z-index: 98;
  height: 75px;
  position: sticky;
}

/* .hidden {
  display: none;
} */

.content-block {
  align-content: center;
  width: auto;
  height: auto;
  position: sticky;
}

.box {
  justify-content: space-between;
  display: flex;
}

.left-content-block {
  display: flex;
  width: 450px;
  min-height: 20px;
  justify-content: space-between;
  align-items: flex-start;

  top: 140px;
  z-index: 97;
  height: 543px;
  position: sticky;
}

.right-content-block {
  display: flex;
  width: 100%;
  min-height: 20px;
  justify-content: space-between;
  border-radius: 5px;
}

.main-doctor {
  width: 350px;
  height: auto;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-doctor-info {
  width: 200px;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px 20px;
}

.vice-doctor {
  display: flex;
  justify-content: left;
  width: 320px;
  height: auto;
  border-radius: 5px;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.vice-doctor-info {
  width: 200px;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
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
  width: 100%;
  display: flex;
  justify-content: left;
  margin-top: 50px;
  margin-bottom: 50px;
}

.divisions-first {
  width: 100%;
  height: auto;
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
  margin-right: 10px;
  margin-left: 10px;
}

.contact-h3 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
}

.divisions-bottom {
  max-width: 242px;
  margin-bottom: 50px;
}
</style>
