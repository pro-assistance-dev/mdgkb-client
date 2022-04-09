<template>
  <div class="no-progmam"><h3 v-if="dpoCourses.length == 0">Для данной специальности нет программ</h3></div>
  <div v-if="dpoCourses.length !== 0" class="description">
    <h4>
      &nbsp;<font color="#4a4a4a">
        *Ниже представлена таблица с доступными на данный момент программами обучения дополнительного профессионального образования (ДПО) и
        непрерывного медицинского образования (НМО). Для получения более подробной информации кликните на выбранную Вами программу. Перейдя
        на страницу программы Вы также сможете подать заявку на обучение.
      </font>
    </h4>
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
        <th><h4>ТИП</h4></th>
        <th><h4>ЧАСОВ</h4></th>
        <th><h4>СТОИМОСТЬ</h4></th>
        <th><h4>РУКОВОДИТЕЛЬ</h4></th>
        <th><h4>ДАТЫ&nbsp;ПРОВЕДЕНИЯ</h4></th>
      </thead>
      <tbody v-if="mounted">
        <tr v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
          <td>
            <router-link :to="`/courses/${dpoCourse.slug}`">
              {{ dpoCourse.name }}
            </router-link>
            <button class="response-btn" @click="$router.push(`/courses/${dpoCourse.slug}?respondForm=open`)">Подать заявку</button>
          </td>
          <td>
            <el-tag :type="dpoCourse.isNmo ? 'primary' : 'warning'">{{ dpoCourse.isNmo ? 'НМО' : 'ДПО' }}</el-tag>
          </td>
          <td style="text-align: center">{{ dpoCourse.hours }}</td>
          <td style="text-align: center">{{ dpoCourse.cost }} р.</td>
          <td>
            <router-link :to="`/doctors/${dpoCourse.getMainTeacher()?.doctor.human.slug}`">
              {{ dpoCourse.getMainTeacher()?.doctor.human.getFullName() }}
            </router-link>
          </td>
          <td>
            {{ dpoCourse.getClosestPeriod() }}
          </td>
        </tr>
      </tbody>
    </table>
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
  // width: 100%;
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
</style>
