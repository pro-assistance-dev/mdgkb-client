<template>
  <div v-if="full" class="card-item">
    <h2>Контакты</h2>
  </div>
  <div :class="{ flex: full }">
    <div style="width: 100%; margin-right: 30px; flex: 1">
      <div :class="{ 'card-item': full, 'margin-top': full, 'contact-data': full }">
        <div v-if="contactInfo.time.length" class="contact-data-list-item">
          <div class="contact-h3">
            <div class="item">
              <svg class="icon-time">
                <use xlink:href="#time"></use>
              </svg>
            </div>
            <div class="item">{{ contactInfo.time }}</div>
          </div>
        </div>
        <div v-if="contactInfo.postAddresses[0].address" class="contact-data-list-item">
          <div class="contact-h3">
            <div class="item">
              <svg class="icon-map-marker">
                <use xlink:href="#map-marker"></use>
              </svg>
            </div>
            <div class="item-elements">
              <div v-for="postAddress in contactInfo.postAddresses" :key="postAddress.id" class="item">{{ postAddress.address }}</div>
            </div>
          </div>
        </div>
        <div v-if="contactInfo.telephoneNumbers[0].number" class="contact-data-list-item">
          <div class="contact-h3">
            <div class="item">
              <svg class="icon-phone">
                <use xlink:href="#phone"></use>
              </svg>
            </div>
            <div class="item-elements">
              <div v-for="phone in contactInfo.telephoneNumbers" :key="phone.id" class="item" style="white-space: nowrap">
                <div>
                  <a :href="'tel:' + phone.number">{{ phone.number }}</a>
                </div>
                <div v-if="phone.description">: {{ phone.description }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="contactInfo.emails[0].address" class="contact-data-list-item">
          <div class="contact-h3">
            <div class="item">
              <svg class="icon-email">
                <use xlink:href="#email"></use>
              </svg>
            </div>
            <div class="item-elements">
              <div v-for="email in contactInfo.emails" :key="email.id" class="item">
                {{ email.address }} <span v-if="email.description">: {{ email.description }} </span>
              </div>
              <div v-for="webSite in contactInfo.websites" :key="webSite.id" class="item">
                {{ webSite.address }} <span v-if="webSite.description">: {{ webSite.description }} </span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="contactInfo.telephoneNumbers[0].number" class="block-line">
      <div class="item">
        <svg class="icon-phone">
          <use xlink:href="#phone"></use>
        </svg>
      </div>
      <div class="item-p">
        <div v-for="phone in contactInfo.telephoneNumbers" :key="phone.id" class="item">{{ phone.number }}</div>
      </div>
    </div>
    <div v-if="contactInfo.emails[0].address" class="contact-h3">
      <div class="item">
        <svg class="icon-email">
          <use xlink:href="#email"></use>
        </svg>
      </div>
      <div class="item-p">
        <div v-for="email in contactInfo.emails" :key="email.id" class="item">
          {{ email.address }} <span v-if="email.description">: {{ email.description }} </span>
        </div>
      </div>
    </div> -->
      </div>
      <div v-if="full && contactInfo.description" class="contact-comments" style="margin-top: 20px">
        {{ contactInfo.description }}
      </div>
    </div>
    <div v-if="full && contactInfo.latitude && contactInfo.longitude" class="map-data">
      <div class="map-container">
        <YandexMapComponent :coords="contactInfo.getCoords()" />
      </div>
    </div>
  </div>
  <Phone />
  <Email />
  <Time />
  <MapMarker />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Email from '@/assets/svg/DivisionCard/Email.svg';
import MapMarker from '@/assets/svg/DivisionCard/MapMarker.svg';
import Phone from '@/assets/svg/DivisionCard/Phone.svg';
import Time from '@/assets/svg/StructurePage/Time.svg';
import YandexMapComponent from '@/components/YandexMapComponent.vue';
import ContactInfo from '@/services/classes/ContactInfo';

export default defineComponent({
  name: 'ContactsBlock',
  components: {
    Phone,
    Email,
    Time,
    MapMarker,
    YandexMapComponent,
  },
  props: {
    contactInfo: { type: Object as PropType<ContactInfo>, required: true },
    full: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/styles/elements/base-style.scss';

// .icon-phone {
//   margin-left: 1px;
//   width: $width;
//   height: $height;
//   fill: $site_dark_gray;
// }

// .icon-email {
//   width: $width;
//   height: $height;
//   fill: $site_dark_gray;
// }

// .contact-h3 {
//   display: flex;
//   justify-content: left;
//   font-family: Roboto, Verdana, sans-serif;
//   font-size: 12px;
//   font-weight: lighter;
//   color: #4a4a4a;
//   align-content: center;
//   text-align: center;
//   margin-top: 5px;
// }

// .block-line {
//   display: flex;
//   align-items: center;
//   justify-content: left;
// }
.flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

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
  margin: 15px 30px 0 0px;
  padding-top: 10px;
  min-width: 272px;
  border: 1px solid #dee5ef;
  border-radius: 5px;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
}

.contact-comments {
  margin: 15px 0 0 0;
  padding: 15px;
  min-width: 242px;
  border: 1px solid #dee5ef;
  border-radius: 5px;
  background: #ffffff;
  color: #e62c21;
  font-size: 14px;
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
  margin-top: 20px;
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

.item-elements {
  flex-direction: column;
}
.margin-top {
  margin-top: 20px;
}
</style>
