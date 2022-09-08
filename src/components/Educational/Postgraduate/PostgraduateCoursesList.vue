<template>
  <div class="size">
    <div class="no-progmam">
      <h3 v-if="postgraduateCourses.length == 0">Сейчас нет программ аспирантуры ни для одной специальности</h3>
    </div>

    <div v-if="postgraduateCourses.length !== 0" class="moble-container">
      <ul class="application-card">
        <li v-for="postgraduateCourse in postgraduateCourses" :key="postgraduateCourse.id">
          <div class="card-title"></div>

          <div class="card-item">
            <div class="item-el">
              <div class="item-content">
                {{ postgraduateCourse.getMainSpecialization().code }}&nbsp;{{ postgraduateCourse.slug }}
                <router-link :to="`/postgraduate-courses/${postgraduateCourse.getMainSpecialization().slug}`">
                  {{ postgraduateCourse.getMainSpecialization().name }}
                </router-link>
                <button
                  class="response-btn"
                  @click="$router.push(`/postgraduate-courses/${postgraduateCourse.getMainSpecialization().slug}?respondForm=open`)"
                >
                  Подать заявку
                </button>
              </div>
            </div>
          </div>

          <div class="card-item">
            <div class="item-el-tag">
              <h4>Форма&nbsp;обучения:</h4>
            </div>
            <div class="item-el">
              {{ postgraduateCourse.educationForm }}
            </div>
          </div>

          <div class="card-item">
            <div class="item-el-tag">
              <h4>Квалификация:</h4>
            </div>
            <div class="item-el" v-html="postgraduateCourse.description"></div>
          </div>

          <div class="card-footer">
            <div class="item-el-tag-footer">
              <h4>Срок&nbsp;обучения:</h4>
            </div>
            <div class="item-el">
              <font color="#343E5C" size="4">{{
                buildNameNumbers([...Array(postgraduateCourse.years).keys()], ['год', 'года', 'лет'])
              }}</font>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="postgraduateCourses.length !== 0" class="table-container">
      <table class="table-list">
        <colgroup>
          <col width="7%" />
          <col width="43%" />
          <col width="10%" />
          <col width="10%" />
          <col width="20%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <th><h4>КОД</h4></th>
          <th><h4>НАЗВАНИЕ СПЕЦИАЛИЗАЦИИ</h4></th>
          <th><h4>ФОРМА ОБУЧЕНИЯ</h4></th>
          <th><h4>СРОКИ</h4></th>
          <th><h4>КВАЛИФИКАЦИЯ</h4></th>
          <th><h4>СТОИМОСТЬ</h4></th>
        </thead>
        <tbody v-if="mounted">
          <tr v-for="postgraduateCourse in postgraduateCourses" :key="postgraduateCourse.id">
            <td>
              {{ postgraduateCourse.getMainSpecialization().code }}
            </td>
            <td>
              {{ postgraduateCourse.slug }}
              <router-link :to="`/postgraduate-courses/${postgraduateCourse.getMainSpecialization().slug}`">
                {{ postgraduateCourse.getMainSpecialization().name }}
              </router-link>
              <button
                class="response-btn"
                @click="$router.push(`/postgraduate-courses/${postgraduateCourse.getMainSpecialization().slug}?respondForm=open`)"
              >
                Подать заявку
              </button>
            </td>
            <td>{{ postgraduateCourse.educationForm }}</td>
            <td>{{ buildNameNumbers([...Array(postgraduateCourse.years).keys()], ['год', 'года', 'лет']) }}</td>
            <td v-html="postgraduateCourse.description" />
            <td>
              {{ postgraduateCourse.cost }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ISchema from '@/interfaces/schema/ISchema';
import buildNameNumbers from '@/services/buildNameNumbers';
export default defineComponent({
  name: 'PostgraduateCoursesList',
  setup() {
    const store = useStore();
    const postgraduateCourses: Ref<IPostgraduateCourse[]> = computed<IPostgraduateCourse[]>(
      () => store.getters['postgraduateCourses/items']
    );
    const mounted = ref(false);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      mounted.value = true;
    });

    return {
      mounted,
      postgraduateCourses,
      buildNameNumbers,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/styles/elements/doctor-info-card.scss';

.size {
  max-width: 100%;
  padding: 0 10px;
}

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}

.card-item {
  border-radius: none;
  border-bottom: none;
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
}

table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
  position: sticky;
}

th {
  text-align: left;
  padding: 2px 0 0 3px;
  background-color: #eff2f6;
  height: 20px;
}

th:first-child {
  border-radius: 5px 0 0 0;
}

th:last-child {
  border-radius: 0 5px 0 0;
}

tr {
  &:hover {
    background-color: #ecf5ff;
  }
}

.no-progmam {
  display: block;
  color: #b5b5b5;
}

.card-flex-container {
  display: block;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

:deep(.response-btn) {
  display: none;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 1px 7px;
  height: auto;
  color: #a3a5b9;
  border: 1px solid #a3a5b9;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  &:hover {
    cursor: pointer;
    background-color: lighten(#31af5e, 10%);
    color: white;
    border: none;
  }
}

td:hover .response-btn {
  display: block;
}

.size {
  max-width: 100%;
  padding: 0 10px;
  width: 100%;
}

.moble-container {
  display: none;
}

.application-card {
  width: 100%;
  min-height: 20px;
  border-radius: 5px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
}

.item-title {
  display: flex;
  justify-content: right;
  align-items: center;
  min-height: 50px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 0 5px;
  width: calc(100% - 10px);
}

.item-el-title {
  padding-top: 5px;
  display: flex;
  margin-right: 20px;
  text-transform: uppercase;
}

.item-el {
  display: flex;
  text-align: left;
  align-items: left;
}

ul.application-card {
  list-style-type: none;
}

ul.application-card li {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-bottom: 30px;
  position: relative;
}

.card-title {
  padding: 0 5px;
  background: #ffffff;
  height: 10px;
  border-radius: 5px 5px 0 0;
}
.card-footer {
  padding: 0 5px;
  display: flex;
  justify-content: right;
  background: #eff2f6;
  height: 50px;
  border-radius: 0 0 5px 5px;
  align-items: center;
}

.item-el-tag {
  text-transform: uppercase;
  padding-top: 3px;
  margin-right: 20px;
  a {
    color: #ffffff;
    font-size: 12px;
    border-radius: 5px;
    background: #006bb4;
    padding: 5px 8px 5px 8px;
    text-transform: uppercase;
  }
}

.item-el-tag-footer {
  text-transform: uppercase;
  padding-top: 3px;
  margin-right: 20px;
}

.style {
  font-size: 16px;
  color: #0aa249;
  font-weight: bold;
}

.mobile-text {
  display: none;
}

:deep(p) {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.item-content {
  display: block;
}

@media screen and (max-width: 980px) {
  .size {
    padding: 0 10px;
  }
  .table-container {
    display: none;
  }

  .moble-container {
    display: block;
    width: 100%;
  }
  /*   .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  } */

  .application-card {
    width: 100%;
    min-height: 20px;
    padding: 0;
  }
  .status-buttons {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    button {
      img {
        height: 25px;
      }
      margin-bottom: 2px;
      margin-left: 15px;
      padding: 3px 7px;
      border-radius: 5px;
      font-size: 12px;
      &:hover {
        cursor: pointer;
        filter: brightness(110%);
      }
    }
  }

  .card-item {
    justify-content: left;
    border: none;
    border-radius: 0;
  }

  .item-el {
    align-items: center;
    margin-right: 10px;
    min-width: 75px;
  }

  .item-el:last-child {
    margin-right: 0px;
    min-width: 0px;
  }

  ul.application-card li:hover .response-btn {
    display: block;
  }
  .mobile-text {
    display: block;
  }

  /*   .table-text {
    display: none;
  } */

  :deep(.response-btn) {
    display: none;
    width: 84px;
    border-radius: 3px;
    background-color: #ffffff;
    padding: 1px 7px;
    height: auto;
    color: #a3a5b9;
    border: 1px solid #a3a5b9;
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
      color: white;
      border: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .size {
    margin-top: 20px;
  }
  /* .hidden {
    display: none;
  }
  .title {
    justify-content: right;
  } */
}

@media screen and (max-width: 480px) {
  /*  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  } */

  .card-item {
    display: block;
    padding: 0 5px;
    width: calc(100% - 10px);
  }
  .size {
    padding: 0 5px;
  }

  .item-el-title {
    margin-right: 10px;
    min-width: 75px;
  }

  .item-el-tag {
    margin-right: 5px;
    padding-top: 20px;
  }
  .item-el-tag-footer {
    margin-right: 5px;
  }
  :deep(p) {
    margin-block-end: 0.8em;
  }

  .item-content {
    display: block;
    padding-top: 12px;
  }
}
</style>
