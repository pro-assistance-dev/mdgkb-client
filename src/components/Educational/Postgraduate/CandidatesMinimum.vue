<template>
  <div>
    <div class="card-flex-container card-item">
      <h2>Кандидатский минимум</h2>
      <h3>Вопросы для подготовки к кандидаским экзаменам</h3>

      <div class="questions-file-block">
        <div
          v-for="postgraduateCourse in postgraduateCourses.filter((course) => course.questionsFile.url)"
          :key="postgraduateCourse.id"
          class="questions-file-element"
        >
          <a
            v-if="postgraduateCourse.questionsFile.fileSystemPath"
            :href="postgraduateCourse.questionsFile.getFileUrl()"
            :download="postgraduateCourse.questionsFile.originalName"
            target="_blank"
            style="margin-right: 10px"
          >
            {{ postgraduateCourse.postgraduateCoursesSpecializations[0].specialization.name }}
          </a>
        </div>
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
  name: 'CandidatesMinimum',
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

.questions-file-block {
  display: flex;
  justify-content: space-around;
}
.questions-file-element {
  border: solid #2754eb;
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
