<template>
  <div v-if="teachers.length" class="card-flex-container">
    <div v-for="teacher in teachers" :key="teacher.id" class="card-container">
      <TeacherCard :teacher="teacher" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="teachers.length" class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts" setup>
import Teacher from '@/classes/Teacher';
import TeacherCard from '@/components/Educational/TeachersManagers/TeacherCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
const teachers: Ref<Teacher[]> = Store.Items('teachers');

const loadMore = async () => {
  await Store.FTSP('teachers');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/doctor-info-card.scss';

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
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
</style>
