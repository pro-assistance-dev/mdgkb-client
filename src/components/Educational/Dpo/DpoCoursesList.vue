<template>
  <div class="card-flex-container card-item">
    <div class="no-progmam"><h3 v-if="dpoCourses.length == 0">Для данной специальности нет программ</h3></div>
    <div v-if="dpoCourses.length !== 0" class="table-container">
      <table class="table-list">
        <colgroup>
          <col width="50%" />
          <col width="10%" />
          <col width="20%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <th><h4>НАЗВАНИЕ ПРОГРАММЫ</h4></th>
          <th><h4>ДЛИТЕЛЬНОСТЬ</h4></th>
          <th><h4>РУКОВОДИТЕЛЬ</h4></th>
          <th><h4>ДАТЫ&nbsp;ПРОВЕДЕНИЯ</h4></th>
        </thead>
        <tbody v-if="mounted">
          <tr v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
            <td>
              <router-link :to="`/courses/${dpoCourse.slug}`">{{ dpoCourse.name }}</router-link>
            </td>
            <td style="text-align: center">{{ dpoCourse.hours }}</td>
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

.card-item {
  width: 100%;
  border-radius: none;
  border-bottom: none;
}

.table-container {
  width: 100%;
  // overflow: scroll;
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
}

th {
  text-align: left;
  padding: 2px 0 0 3px;
  background-color: #eff2f6;
  // border-right: 1px solid #f2f2f2;
  height: 20px;
}

// th:last-child {
//   border-right: 1px solid #dcdfe6;
// }

// tr:nth-child(odd) {
//   background-color: #f2f2f2;
// }

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
</style>
