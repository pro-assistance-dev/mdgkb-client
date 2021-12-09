<template>
  <el-card class="doctor-card">
    <div class="flex-column">
      <div class="flex-row">
        <div class="doctor-img-container">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@//assets/img/310x310.png" />
        </div>
        <div class="flex-column">
          <span class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.human.slug } })">
            <b>{{ doctor.human.getFullName() }}</b>
          </span>
          <span>Врач {{ doctor.position }}</span>
          <span>{{ doctor.tags }}</span>
          <span>Прием: {{ division.address }}</span>
          <span>График работы: {{ doctor.schedule }}</span>
        </div>
      </div>
      <span>Отделение: {{ division.name }}</span>
      <span>Образование: {{ doctor.education }}</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfoCard',
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
    division: { type: Object as PropType<IDivision>, required: true },
  },
});
</script>

<style lang="scss" scoped>
.doctor-card {
  border-radius: 15px;
  width: 450px;
  margin: 10px;
  color: #4a4a4a;
  font-size: 14px;

  .doctor-img-container {
    margin: 0 10px 10px 0;
    img {
      width: 120px;
    }
  }
  .doctor-name {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .flex-row {
    display: flex;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
}
</style>
