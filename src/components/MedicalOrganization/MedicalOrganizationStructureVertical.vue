<template>
  <div class="content-block">
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
          <ContactBlock :contact-info="head.contactInfo" />
        </div>
        <h3 v-if="head.timetable.getOnlyWorkDays().length" class="contact-h3">Приём граждан:</h3>
        <div v-for="workDay in head.timetable.getOnlyWorkDays()" :key="workDay">{{ workDay }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import ContactBlock from '@/components/ContactBlock.vue';
import IHead from '@/interfaces/IHead';
import countRating from '@/mixins/countRating';

export default {
  name: 'MedicalOrganizationStructureVertical',
  components: { ContactBlock },
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
