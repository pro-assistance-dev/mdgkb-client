<template>
  <div>
    <div class="card-flex-container card-item">
      <h2>Дополнительные профессиональные программы</h2>
      <div class="no-progmam"><h3 v-if="dpoCourses.length == 0">Для данной специальности нет программ</h3></div>
      <div v-if="dpoCourses.length !== 0" class="table-container">
        <table class="table-list">
          <colgroup>
            <col width="50%" />
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <th>Название программы</th>
            <th>Часов</th>
            <th>Руководитель</th>
            <th>Даты&nbsp;проведения</th>
          </thead>
          <tbody v-if="mounted">
            <tr v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
              <td>
                <router-link :to="`/courses/${dpoCourse.id}`">{{ dpoCourse.name }}</router-link>
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
  height: 100%;
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
  border: 1px solid #dcdfe6;
  padding: 5px 7px 5px 7px;
  height: auto;
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
</style>
