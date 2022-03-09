<template>
  <div class="card-flex-container card-item">
    <h2>Дополнительные профессиональные программы</h2>
    <table>
      <thead>
        <th>Название программы</th>
        <th>Преподаватели</th>
        <th>Часов</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
          <td>{{ dpoCourse.name }}</td>
          <td>
            <router-link :to="`/doctors/${dpoCourse.teacher.doctor.human.slug}`">
              {{ dpoCourse.teacher.doctor.human.getFullName() }}
            </router-link>
          </td>
          <td style="text-align: center">{{ dpoCourse.hours }}</td>
          <td>
            <div class="btns">
              <button @click="$router.push({ name: `DpoCoursePage`, params: { id: dpoCourse.id } })">Подробнее</button>
              <button class="respond-btn" @click="$router.push(`/dpo/courses/${dpoCourse.id}?respondForm=open`)">Записаться</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DpoCoursesList',
  setup() {
    const store = useStore();
    const dpoCourses: Ref<IDpoCourse[]> = computed<IDpoCourse[]>(() => store.getters['dpoCourses/items']);

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = dpoCourses.value[dpoCourses.value.length - 1].name;
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.dpoCourse.name, schema.value.dpoCourse.tableName);
      await store.dispatch('dpoBaseCourses/getAll', filterQuery.value);
    };

    return {
      dpoCourses,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

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
.btns {
  display: flex;
  flex-direction: column;
  button {
    cursor: pointer;
    padding: 7px 15px;
    letter-spacing: 1px;
    border-radius: 5px;
    border: none;
    background-color: #2754ec;
    color: white;
    &:hover {
      background-color: lighten(#2754ec, 10%);
    }
  }
  .respond-btn {
    background-color: #31af5e;
    margin-top: 5px;
    &:hover {
      background-color: lighten(#31af5e, 10%);
    }
  }
}
.card-item {
  width: 100%;
}
table {
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dcdfe6;
  padding: 5px 7px 5px 7px;
}

th {
  text-align: left;
  padding: 5px;
  background-color: #dcdfe6;
  border-right: 1px solid #f2f2f2;
}

th:last-child {
  border-right: 1px solid #dcdfe6;
}

tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>
