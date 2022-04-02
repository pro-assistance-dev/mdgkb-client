<template>
  <div>
    <div class="card-flex-container card-item">
      <div class="no-progmam">
        <h3 v-if="postgraduateCourses.length == 0">Сейчас нет программ аспирантуры ни для одной специальности</h3>
      </div>
      <div v-if="postgraduateCourses.length !== 0" class="table-container">
        <table class="table-list">
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
          <thead>
            <th>Код</th>
            <th>Название специализации</th>
            <th>Уровень&nbsp;образования</th>
            <th>Квалификация</th>
          </thead>
          <tbody v-if="mounted">
            <tr v-for="postgraduateCourse in postgraduateCourses" :key="postgraduateCourse.id">
              <td>
                <div
                  v-for="postgraduateCoursesSpecialization in postgraduateCourse.postgraduateCoursesSpecializations"
                  :key="postgraduateCoursesSpecialization.id"
                >
                  {{ postgraduateCoursesSpecialization.specialization.code }}
                </div>
              </td>
              <td style="text-align: center">
                <div
                  v-for="postgraduateCoursesSpecialization in postgraduateCourse.postgraduateCoursesSpecializations"
                  :key="postgraduateCoursesSpecialization.id"
                >
                  <router-link :to="`/postgraduate-courses/${postgraduateCourse.id}`">
                    {{ postgraduateCoursesSpecialization.specialization.name }}
                  </router-link>
                </div>
              </td>
              <td>
                высшее образование - подготовка кадров высшей квалификации
                <!-- <router-link :to="`/doctors/${postgraduateCourse.getMainTeacher()?.doctor.human.slug}`">
                  {{ postgraduateCourse.getMainTeacher()?.doctor.human.getFullName() }}
                </router-link> -->
              </td>
              <td>{{ postgraduateCourse.description }}</td>
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

import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ISchema from '@/interfaces/schema/ISchema';

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

    // const loadMore = async () => {
    //   const lastCursor = postgraduateCourses.value[postgraduateCourses.value.length - 1].description;
    // filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.postgraduateCourse.name, schema.value.postgraduateCourse.tableName);
    // await store.dispatch('postgraduateCourses/getAll', filterQuery.value);
    // };

    return {
      mounted,
      postgraduateCourses,
      // loadMore,
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
