<template>
  <el-card style="width: 450px; margin: 10px">
    <div class="flex-column">
      <div class="flex-row">
        <div class="doctor-img-container">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@//assets/img/310x310.png" />
        </div>
        <div class="flex-column">
          <div class="doctor-name">
            <b>{{ doctor.human.getFullName() }}</b>
          </div>
          <div>Врач {{ doctor.position }}</div>
          <div>{{ doctor.tags }}</div>
          <div>Прием: {{ division.address }}</div>
          <div>График работы: {{ doctor.schedule }}</div>
          <!-- <span>{{doctor.human}}</span> -->
        </div>
      </div>
      <div>Отделение: {{ division.name }}</div>
      <div>Образование: {{ doctor.education }}</div>
    </div>
  </el-card>
</template>

<script lang="ts">
import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/doctors/IDoctor';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DoctorInfoCard',
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
    division: { type: Object as PropType<IDivision>, required: true },
  },
});
</script>

<style lang="scss" scoped>
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 120px;
  }
}
.doctor-name {
  font-size: 16px;
  font-weight: 600;
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
