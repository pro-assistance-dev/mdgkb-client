<template>
  <div class="card-item-container">
    <div class="card-item">
      <div class="card-header">
        <div class="tags-top">
          <el-tag :key="vacancy.id" effect="plain" class="vacancy-tag-link" size="small">
            <span>Врач</span>
          </el-tag>
          <el-tag v-if="vacancy.schedule" :key="vacancy.id" effect="plain" class="vacancy-tag-link" size="small">
            <span>{{ vacancy.schedule }}</span>
          </el-tag>
        </div>
        <svg class="icon-vacancies">
          <use xlink:href="#vacancies-icon"></use>
        </svg>
        <div class="card-item-title" @click="$router.push(`/vacancies/${vacancy.id}`)">
          {{ vacancy.title }}
        </div>
        <hr class="hr-line" />
      </div>
      <div class="card-item-body">
        <div v-if="vacancy.getSalary()">
          <div>Заработная плата:</div>
          <div class="color-font">
            <i> {{ vacancy.getSalary() }} </i>
          </div>
        </div>
        <div v-if="vacancy.experience">
          <div class="padding-block">Опыт работы:</div>
          <div class="color-font">
            <i> {{ vacancy.experience }} </i>
          </div>
        </div>
      </div>
      <div class="card-item-footer">
        <div class="contact-block">
          <ContactBlock :contact="vacancy.contactInfo" />
        </div>
        <div class="button-block">
          <button @click="$router.push(`/vacancies/${vacancy.slug}`)">Подробнее</button>
          <button class="respond-btn"
            @click="$router.push(`/vacancies/${vacancy.id}?respondForm=open`)">Откликнуться</button>
        </div>
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="vacancies-icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 493">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M232.803 0.636747C143.746 9.20675 66.1458 62.4948 26.8038 142.096C17.4538 161.015 12.8928 173.087 8.34383 190.953C-1.20217 228.45 -2.54917 264.988 4.26183 301.726C18.3598 377.77 64.5608 442.037 132.303 479.834C140.825 484.589 153.175 490.596 154.427 490.596C154.634 490.596 154.803 477.618 154.803 461.756C154.803 436.343 155.037 432.001 156.771 425.219C162.707 402.012 180.522 382.901 203.623 374.961C210.587 372.567 214.104 370.731 216.838 368.062L220.563 364.424L220.999 374.26C221.544 386.538 223.971 392.609 230.943 399.13C237.964 405.698 243.602 407.989 252.851 408.033C259.404 408.065 261.278 407.637 267.075 404.783C279.53 398.651 284.803 389.161 284.803 372.873V363.171L289.553 367.779C293.13 371.249 295.785 372.805 300.303 374.082C324.492 380.918 345.15 402.857 350.304 427.184C351.396 432.341 351.773 441.54 351.786 463.413L351.803 492.731L354.053 492.065C360.407 490.184 384.575 477.252 396.147 469.54C413.37 458.062 423.034 450.174 437.09 436.117C466.865 406.342 490.492 366.12 501.811 325.939C527.456 234.898 501.937 139.056 434.373 72.6618L422.738 61.2277L423.95 55.6618C424.617 52.6008 425.194 43.3457 425.233 35.0957L425.303 20.0957L389.303 19.5957L353.303 19.0957L343.446 15.2897C330.542 10.3067 309.524 4.94475 293.303 2.49875C278.178 0.218747 247.094 -0.738253 232.803 0.636747ZM290.547 73.5867C298.704 75.5417 309.951 80.4657 316.117 84.7797C322.63 89.3377 332.242 99.3138 336.808 106.257C362.365 145.108 347.669 197.561 305.669 217.399L298.035 221.005L297.602 232.55C297.274 241.292 296.678 245.189 295.146 248.596C290.985 257.854 279.559 264.52 270.078 263.22C260.204 261.867 251.511 254.413 248.919 245.077C247.186 238.834 247.457 199.118 249.274 193.028C252.348 182.725 260.237 176.999 273.392 175.524C290.621 173.592 300.695 162.345 299.608 146.255C298.854 135.087 292.472 126.503 281.977 122.541C274.811 119.835 267.262 120.316 260.121 123.935C251.301 128.404 246.474 136.089 245.26 147.596C243.604 163.285 234.337 172.552 220.303 172.552C212.572 172.552 207.355 170.166 202.147 164.25C196.811 158.187 195.337 152.803 196.138 142.293C198.201 115.247 214.164 91.4887 238.303 79.5397C254.426 71.5577 273.175 69.4217 290.547 73.5867ZM281.172 276.633C287.54 279.015 293.86 285.27 295.871 291.18C297.618 296.312 297.473 305.186 295.57 309.669C287.321 329.1 260.366 330.11 250.697 311.349C245.139 300.566 248.874 285.424 258.569 279.432C266.924 274.268 272.88 273.531 281.172 276.633Z"
        fill="#C4C4C4"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { ElTag } from 'element-plus';
import { defineComponent, PropType } from 'vue';

import Vacancy from '@/classes/Vacancy';
import ContactBlock from '@/components/ContactBlock.vue';

export default defineComponent({
  name: 'VacanncyCard',
  components: { ContactBlock, ElTag },
  props: {
    vacancy: {
      type: Object as PropType<Vacancy>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.hidden {
  display: block;
}

.card-item-container {
  width: 300px;
  height: auto;
  padding-bottom: 40px;
  position: relative;
}

.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  padding: 15px;
  height: 100%;

  &-title {
    font-size: 15px;
    margin-bottom: 5px;
  }

  &-footer {
    display: flex;
    justify-content: space-evenly;
  }

  button {
    cursor: pointer;
    padding: 7px 15px;
    letter-spacing: 1px;
    border-radius: 40px;
    border: none;
    background-color: #2754ec;
    color: white;

    &:hover {
      background-color: lighten(#2754ec, 10%);
    }
  }

  .respond-btn {
    background-color: #31af5e;

    &:hover {
      background-color: lighten(#31af5e, 10%);
    }
  }
}

.color-font {
  color: #2754eb;
}

.card-item-title {
  font-size: 16px;
  min-height: 60px;
  color: #343e5c;
  font-weight: bold;
  cursor: pointer;
}

.card-item-title:hover {
  color: #2754eb;
}

.padding-block {
  padding-top: 5px;
}

.card-item-body {
  padding-top: 5px;
}

.card-item-footer {
  display: block;
}

.contact-block {
  padding-bottom: 15px;
}

.button-block {
  display: flex;
  justify-content: space-evenly;
}

/* .hr-line {
  border: none;
  background-color: #e4e5e7; /* Цвет линии для браузера Firefox и Opera /
  height: 1px;
  background: #e4e5e7;
} */

.icon-vacancies {
  padding-bottom: 20px;
  width: 80px;
  height: 80px;
  fill: #c4c4c4;
}

:deep(.el-tag--plain) {
  background-color: #2754eb;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  padding: 1px 15px 0px 15px;
  margin-right: 10px;
  cursor: pointer;
}

:deep(.el-tag--plain):hover {
  background-color: #133dcc;
}

.card-header {
  position: relative;
}

.tags-top {
  display: flex;
  justify-content: right;
  position: absolute;
  right: 0;
}
</style>
