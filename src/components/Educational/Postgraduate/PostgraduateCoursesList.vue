<template>
  <div>
    <div class="no-progmam">
      <h3 v-if="postgraduateCourses.length == 0">Сейчас нет программ аспирантуры ни для одной специальности</h3>
    </div>
    <div v-if="postgraduateCourses.length !== 0" class="table-container">
      <table class="table-list">
        <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="10%" />
          <col width="10%" />
          <col width="30%" />
        </colgroup>
        <thead>
          <th><h4>КОД</h4></th>
          <th><h4>НАЗВАНИЕ СПЕЦИАЛИЗАЦИИ</h4></th>
          <th><h4>ФОРМА ОБУЧЕНИЯ</h4></th>
          <th><h4>ДЛИТЕЛЬНОСТЬ ОБУЧЕНИЯ</h4></th>
          <th><h4>КВАЛИФИКАЦИЯ</h4></th>
        </thead>
        <tbody v-if="mounted">
          <tr v-for="postgraduateCourse in postgraduateCourses" :key="postgraduateCourse.id">
            <td>
              {{ postgraduateCourse.getMainSpecialization().code }}
            </td>
            <td style="text-align: center">
              {{ postgraduateCourse.slug }}
              <router-link :to="`/postgraduate-courses/${postgraduateCourse.getMainSpecialization().slug}`">
                {{ postgraduateCourse.getMainSpecialization().name }}
              </router-link>
            </td>
            <td>{{ postgraduateCourse.educationForm }}</td>
            <td>{{ buildNameNumbers([...Array(postgraduateCourse.years).keys()], ['год', 'года', 'лет']) }}</td>
            <td>{{ postgraduateCourse.description }}</td>
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
import buildNameNumbers from '@/mixins/buildNameNumbers';
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
</style>
