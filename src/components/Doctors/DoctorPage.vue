<template>
  <div v-if="mount" class="doctor-page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>{{ doctor.human.getFullName() }}</h2>
          <el-tag v-if="doctor.workNow()" type="success">Рабочее время</el-tag>
          <el-tag v-else type="danger">Не рабочее время</el-tag>
        </div>
      </template>
      <div class="flex-row">
        <div class="doctor-img-container">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@//assets/img/310x310.png" />
        </div>
        <div class="flex-column">
          <span><b>Должность:</b> {{ doctor.position }}</span>
          <span>{{ doctor.tags }}</span>
          <span><b>Прием:</b> {{ doctor.division.address }}</span>
          <span><b>Отделение:</b> {{ doctor.division.name }}</span>
          <span><b>Образование:</b> {{ doctor.education }}</span>
        </div>
      </div>
    </el-card>
    <div class="flex-row">
      <ul>
        <li v-for="item in doctor.timetable.timetableDays" :key="item" :class="{ nowPeriod: item.weekday.isToday() }">
          {{ item.getPeriodWithName() }}
        </li>
      </ul>
    </div>
    <Comments store-name="doctors" :parent-id="doctor.id" :is-reviews="true" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Comments from '@/components/Comments.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorPage',
  components: { Comments },

  setup() {
    const store = useStore();
    const route = useRoute();
    const doctor: Ref<IDoctor> = computed<IDoctor>(() => store.getters['doctors/item']);
    const mount = ref(false);

    onBeforeMount(async () => {
      await store.dispatch('doctors/get', route.params['id']);
      mount.value = true;
    });

    return {
      doctor,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
$content-max-width: 800px;

.doctor-page-container {
  max-width: $content-max-width;
  margin: 0 auto;
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
