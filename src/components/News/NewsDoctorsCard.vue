<template>
  <div class="card-item">
    <h4>Врачи в статье</h4>
    <el-divider style="margin-bottom: 0" />
    <el-table :data="newsDoctors" cell-class-name="cell-row" :show-header="false">
      <el-table-column>
        <template #default="scope">
          <div
            class="card-row"
            @click="$router.push({ name: `DoctorPage`, params: { id: scope.row.doctor.id, slug: scope.row.doctor.human.slug } })"
          >
            <img
              v-if="scope.row.doctor.human.photoMini.fileSystemPath"
              :src="scope.row.doctor.human.photoMini.getImageUrl()"
              alt="Фото врача"
              @error="errorImg"
            />
            <img v-else src="@/assets/img/doctor-default.webp" />
            <div>
              <div class="name">
                <div>{{ scope.row.doctor.human.surname }}</div>
                <div>{{ scope.row.doctor.human.name }}</div>
              </div>
              <div class="regalias">
                <span>{{ scope.row.position }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <template v-for="newsDoctor in newsDoctors" :key="newsDoctor.id">
      <div class="card-row">
        <img v-if="newsDoctor.doctor.fileInfo.fileSystemPath" :src="newsDoctor.doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
        <img v-else src="@/assets/img/doctor-default.webp" />
        <div>
          <div class="name">
            <div>{{ newsDoctor.doctor.human.surname }}</div>
            <div>{{ newsDoctor.doctor.human.name }}</div>
          </div>
          <div class="regalias">
            <span>{{ newsDoctor.position }}</span> -->
    <!-- <template v-for="(regalia, index) in newsDoctor.doctor.regalias" :key="regalia.id">
              <span v-if="index === 0">{{ regalia.name }}</span>
              <span v-else>, {{ regalia.name }}</span>
            </template> -->
    <!-- </div>
        </div>
      </div>
      <el-divider />
    </template> -->
    <div class="card-footer">
      <button>Все врачи</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import INewsDoctor from '@/interfaces/news/INewsDoctor';

export default defineComponent({
  name: 'NewsDoctorsCard',
  props: {
    newsDoctors: {
      type: Object as PropType<INewsDoctor[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.el-divider {
  margin: 10px 0;
}
h4 {
  color: black;
  margin: 0;
}
.card-row {
  display: flex;
  align-items: center;
  img {
    border-radius: 5px;
    margin-right: 10px;
    width: 100px;
    height: 100px;
  }
}
.name {
  font-weight: bold;
}
.regalias {
  font-size: 14px;
}
.card-footer {
  margin: 10px;
  margin-bottom: 0;
  text-align: center;
  button {
    background-color: white;
    border-radius: 10px;
    padding: 7px 20px;
    font-size: 14px;
    border: 1px solid #4a4a4a;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(white, 10%);
    }
  }
}
:deep(.cell-row) {
  cursor: pointer;
}
</style>
