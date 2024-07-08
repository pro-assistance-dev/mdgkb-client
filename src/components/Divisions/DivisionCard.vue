<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="favourite-icon">
        <div class="favor">
          <FavouriteIcon :domain-id="division.id" :domain-name="'division'" />
        </div>
      </div>
      <div class="flex-column right-side">
        <div class="division-line">{{ division.treatDirection.name }}</div>
        <div class="card-name" @click="Router.To(`/divisions/${division.id}`)">
          {{ division.name }}
        </div>
        <div class="line">
          <div class="line-item">
            <Rating :comments="division.divisionComments" />
          </div>
          <PButton skin="profile" type="c_blue" text="На карте" width="100px" height="26px" @click="$router.push(`/map/${division.id}`)" />
        </div>
        <div class="spec-list"></div>
      </div>
    </div>
    <div class="info-block">
      <div class="contact-h3">
        <div class="item">
          <svg class="icon-time">
            <use xlink:href="#time"></use>
          </svg>
        </div>
        <div class="time-block">
          <div class="item">
            Время работы&nbsp;
            <div class="block-today">
              <p class="today">сегодня</p>
              :&nbsp;
              <div class="hidden-block">
                <div class="hidden-line">
                  <div class="hidden-item">
                    <span style="color: #0a216f"><b>сегодня</b></span
                    >: {{ division.timetable.getTodayWorkday().getTimetable() }}
                  </div>
                  <div v-if="division.timetable.getTodayWorkday().breaksExists" class="hidden-item-2">
                    Перерыв:
                    <ul v-if="division.timetable.getTodayWorkday().breaksExists" class="hidden-item-list">
                      <li v-for="item in division.timetable.getTodayWorkday().breakPeriods" :key="item.id">{{ item.getPeriod() }}</li>
                    </ul>
                  </div>
                </div>
                <div class="hidden-line-2">
                  <ul class="hidden-item-list-2">
                    <li v-for="item in division.timetable.getOnlyWorkdayObjects()" :key="item.id">
                      {{ item.getPeriodWithName() }}
                      <div v-if="item.breaksExists" class="hidden-item-2">
                        Перерыв:
                        <ul v-if="item.breaksExists" class="hidden-item-list">
                          <li v-for="period in item.breakPeriods" :key="period.id">{{ period.getPeriod() }}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {{ division.timetable.getTodayWorkday().getTimetable() }}
          </div>
          <div v-if="division.timetable.getTodayWorkday().breaksExists" class="item">
            Перерыв:
            <ul v-if="division.timetable.getTodayWorkday().breaksExists" class="item-list">
              <li v-for="item in division.timetable.getTodayWorkday().breakPeriods" :key="item.id">&nbsp;{{ item.getPeriod() }}&nbsp;</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="contact-h3">
        <div class="item">
          <svg v-if="division.getAddress()" class="icon-map-marker">
            <use xlink:href="#map-marker"></use>
          </svg>
        </div>
        <div class="item">
          <a @click="$router.push(`/map/${division.id}`)">
            {{ division.address }}
          </a>
        </div>
      </div>
      <div class="contact-h3">
        <div class="item">
          <!-- <svg v-if="division.contactInfo.telephoneNumbers[0].number" class="icon-phone"> -->
          <!--   <use xlink:href="#phone"></use> -->
          <!-- </svg> -->
        </div>
      </div>
      <!-- <div class="item">{{ division.contactInfo.[0].number }}</div> -->
      <div class="contact-h3">
        <div class="item">
          <!-- <svg v-if="division.contactInfo.emails[0].address" class="icon-email"> -->
          <!--   <use xlink:href="#email"></use> -->
          <!-- </svg> -->
        </div>
        <!-- <div class="item">{{ division.contactInfo.emails[0].address }}</div> -->
      </div>
      <div class="contact-h3">
        <div class="icon-block">
          <svg class="icon-ruble">
            <use xlink:href="#ruble"></use>
          </svg>
          <svg class="icon-credit-card">
            <use xlink:href="#credit-card"></use>
          </svg>
          <svg class="icon-attention">
            <use xlink:href="#attention"></use>
          </svg>
        </div>
      </div>
    </div>
    <!-- <div class="division-card-footer">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
    </div> -->
  </div>
  <Phone />
  <Email />
  <Time />
  <MapMarker />
  <Ruble />
  <CreditCard />
  <Attention />
</template>

<script lang="ts" setup>
import Attention from '@/assets/svg/DivisionCard/Attention.svg';
import CreditCard from '@/assets/svg/DivisionCard/CreditCard.svg';
import Email from '@/assets/svg/DivisionCard/Email.svg';
import MapMarker from '@/assets/svg/DivisionCard/MapMarker.svg';
import Phone from '@/assets/svg/DivisionCard/Phone.svg';
import Ruble from '@/assets/svg/DivisionCard/Ruble.svg';
import Time from '@/assets/svg/DivisionCard/Time.svg';
import Division from '@/classes/Division';
defineProps({
  division: { type: Object as PropType<Division>, required: true },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.info-block {
  max-height: 165px;
  margin-bottom: 70px;
}

.card-item {
  width: 350px;
  min-height: 87%;
  position: relative;
}

.tag-link {
  margin: 2px;
  font-size: 10px;
  transition: all 0.2s;
  border-color: blue;
  border-radius: 20px;

  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}

.icon-phone {
  width: $icon-width;
  height: $icon-height;
  fill: #2754eb;
}

.icon-email {
  width: $icon-width;
  height: $icon-height;
  fill: #2754eb;
}

.icon-time {
  width: $icon-width;
  height: $icon-height;
  fill: #2754eb;
}

.icon-map-marker {
  width: $icon-width;
  height: $icon-height;
  fill: #2754eb;
}

.icon-block {
  display: flex;
  justify-content: left;
  margin-left: 15px;
  height: 40px;
  align-items: center;
}

.icon-ruble {
  width: 24px;
  height: 24px;
  fill: #31ae5e;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    fill: lighten(#31af5e, 10%);
  }
}

.icon-credit-card {
  width: 30px;
  height: 30px;
  fill: #ffffff;
  stroke: #31ae5e;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    stroke: lighten(#31af5e, 10%);
  }
}

.icon-attention {
  width: 24px;
  height: 24px;
  fill: #ffffff;
  stroke: #31ae5e;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    stroke: lighten(#31af5e, 10%);
  }
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
  margin-top: 5px;
}

.item {
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

.card-name {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.2ex;
  min-height: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 30px;
}

.division-line {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.2ex;
  font-size: 11px;
  margin-bottom: 2px;
  color: #a3a5b9;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line-item {
  display: block;
}

.map-button {
  width: 100px;
  height: 26px;
  background: #2754eb;
  border-radius: 40px;
  border: none;
  font-family: roboto;
  font-size: 1rem;
  color: #ffffff;
  margin-left: 5px;
  padding: 0 15px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: #133dcc;
  }
}

.division-card-footer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  button {
    width: 200px;
    margin-top: 10px;
    border-radius: 20px;
    background-color: #31af5e;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);

    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
  }

  text-align: center;
  padding: 4px 0 0px 0;
  margin-top: 10px;
}

.favourite-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}

.favor {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  border: 1px solid rgb(black, 0.1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  width: 30px;
  height: 30px;

  &:hover {
    transform: scale(1.1);
  }

  .anticon {
    font-size: 20px;
    color: #bdc2d1;
  }
}

.item-list {
  list-style: none;
}

ul.item-list {
  padding: 0;
  margin: 0;
}

ul.item-list li {
  display: inline;
}

ul.hidden-item-list {
  padding: 0 0 0 20px;
  margin: 0;
}

ul.hidden-item-list-2 {
  padding: 0;
  margin: 0;
}

ul.hidden-item-list-2 li {
  display: block;
  padding: 0px;
  margin: 0px;
  padding: 5px 0 5px 0px;
}

ul.hidden-item-list li {
  display: block;
  padding: 0px;
  margin: 0px;
}

.time-block {
  display: block;
  justify-content: left;
}

.hidden-block {
  cursor: auto;
  display: none;
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 5px;
  border: 1px solid rgb(black, 0.1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  padding: 5px;
  background: #ffffff;
  width: 200px;
}

.hidden-line {
  font-size: 12px;
  padding: 5px 0px;
}

.hidden-line-2 {
  display: flex;
  font-size: 14px;
  padding: 2px 0 0 0;
  justify-content: left;
}

.hidden-item {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  width: auto;
}

.hidden-item-2 {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  width: auto;
}

.today {
  color: #2754eb;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.today:hover {
  color: #0a216f;
}

.block-today {
  display: flex;
  position: relative;
}

.block-today:hover .hidden-block {
  display: block;
}

:deep(.el-rate__icon) {
  margin: 0;
  font-size: 18px;
}

:deep(.el-rate__text) {
  margin-left: 5px;
}

:deep(.icon-comment) {
  width: 25px;
  height: 24px;
  fill: #2653ea;
  margin-right: 5px;
}

:deep(.numbers-comment) {
  justify-content: left;
}
</style>
