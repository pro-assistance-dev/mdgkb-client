<template>
  <div class="size">
    <div class="no-progmam"><h3 v-if="dpoCourses.length == 0">Для данной специальности нет программ</h3></div>
    <div v-if="dpoCourses.length !== 0" class="description">
      <h4 class="table-text">
        &nbsp;<font color="#4a4a4a">
          *Ниже представлена таблица с доступными на данный момент программами обучения дополнительного профессионального образования (ДПО)
          и непрерывного медицинского образования (НМО). Для получения более подробной информации кликните на выбранную Вами программу.
          Перейдя на страницу программы Вы также сможете подать заявку на обучение.
        </font>
      </h4>
      <h4 class="mobile-text">
        &nbsp;<font color="#4a4a4a">
          *Ниже представлен перечень карточек с доступными на данный момент программами обучения дополнительного профессионального
          образования (ДПО) и непрерывного медицинского образования (НМО).
        </font>
      </h4>
    </div>

    <div v-if="dpoCourses.length !== 0" class="moble-container">
      <ul class="application-card">
        <li v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
          <div class="card-title">
            <div class="item">
              <div class="item-el">
                <el-tag :type="dpoCourse.isNmo ? 'primary' : 'warning'">{{ dpoCourse.isNmo ? 'НМО' : 'ДПО' }}</el-tag>
              </div>
              <div class="item-el">
                <el-tag :type="dpoCourse.isNmo ? 'primary' : 'warning'">{{ dpoCourse.hours }}&nbsp;ч.</el-tag>
              </div>
            </div>
          </div>

          <div class="card-item">
            <div class="item-el">
              <div class="item-content">
                <router-link :to="`/courses/${dpoCourse.slug}`">
                  {{ dpoCourse.name }}
                </router-link>
                <button class="response-btn" @click="$router.push(`/courses/${dpoCourse.slug}?respondForm=open`)">Подать заявку</button>
              </div>
            </div>
          </div>

          <div class="card-item">
            <div class="item-el-tag">
              <h4>Руководитель:</h4>
            </div>
            <div class="item-el">
              <router-link :to="`/doctors/${dpoCourse.getMainTeacher()?.doctor.human.slug}`">
                {{ dpoCourse.getMainTeacher()?.doctor.human.getFullName() }}
              </router-link>
            </div>
          </div>

          <div class="card-item">
            <div class="item-el-tag">
              <h4>Даты&nbsp;проведения:</h4>
            </div>
            <div class="item-el">
              <font color="#343E5C" size="4">{{ dpoCourse.getClosestPeriod() }}</font>
            </div>
          </div>

          <div class="card-footer">
            <div class="item-el">
              <font color="#343E5C" size="4">{{ dpoCourse.cost }}&nbsp;рублей</font>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="dpoCourses.length !== 0" class="table-container">
      <table class="table-list">
        <colgroup>
          <col width="60%" />
          <col width="5%" />
          <col width="5%" />
          <col width="10%" />
          <col width="20%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <th><h4>НАЗВАНИЕ ПРОГРАММЫ</h4></th>
          <th><h4 style="text-align: center">ТИП</h4></th>
          <th><h4 style="text-align: center">ЧАСОВ</h4></th>
          <th><h4 style="text-align: center">СТОИМОСТЬ</h4></th>
          <th><h4>РУКОВОДИТЕЛЬ</h4></th>
          <th><h4 style="text-align: center">ДАТЫ&nbsp;ПРОВЕДЕНИЯ</h4></th>
        </thead>
        <tbody v-if="mounted">
          <tr v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
            <td>
              <router-link :to="`/courses/${dpoCourse.slug}`">
                {{ dpoCourse.name }}
              </router-link>
              <button class="response-btn" @click="$router.push(`/courses/${dpoCourse.slug}?respondForm=open`)">Подать заявку</button>
            </td>
            <td style="text-align: center">
              <el-tag :type="dpoCourse.isNmo ? 'primary' : 'warning'">{{ dpoCourse.isNmo ? 'НМО' : 'ДПО' }}</el-tag>
            </td>
            <td style="text-align: center">{{ dpoCourse.hours }}</td>
            <td style="text-align: center">{{ dpoCourse.cost }} р.</td>
            <td>
              <router-link :to="`/doctors/${dpoCourse.getMainTeacher()?.doctor.human.slug}`">
                {{ dpoCourse.getMainTeacher()?.doctor.human.getFullName() }}
              </router-link>
            </td>
            <td style="text-align: center">
              {{ dpoCourse.getClosestPeriod() }}
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

import IDpoCourse from '@/interfaces/IDpoCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DpoCoursesList',
  setup() {
    const store = useStore();
    const dpoCourses: Ref<IDpoCourse[]> = computed<IDpoCourse[]>(() => store.getters['dpoCourses/items']);
    const mounted = ref(false);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      mounted.value = true;
    });

    const loadMore = async () => {
      const lastCursor = dpoCourses.value[dpoCourses.value.length - 1].name;
      // filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.dpoCourse.name, schema.value.dpoCourse.tableName);
      // await store.dispatch('dpoCourses/getAll', filterQuery.value);
    };

    return {
      mounted,
      dpoCourses,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
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
  padding: 0px;
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
  min-height: 46px;
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
  height: 46px;
  border-radius: 5px 5px 0 0;
}
.card-footer {
  padding: 0 5px;
  display: flex;
  justify-content: right;
  background: #eff2f6;
  height: 50px;
  border-radius: 0 0 5px 5px;
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

.style {
  font-size: 16px;
  color: #0aa249;
  font-weight: bold;
}

.mobile-text {
  display: none;
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
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  }

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

  .table-text {
    display: none;
  }

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
  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  }

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
}
</style>
