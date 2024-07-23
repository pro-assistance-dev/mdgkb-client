<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <DoctorsListFilters />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <el-row>
          <el-col
            v-for="doctor in doctors"
            :key="doctor.id"
            :xl="8"
            :lg="8"
            :md="12"
            :sm="12"
            :style="{ padding: '10px', display: 'flex' }"
          >
            <div style="margin: 0 auto; height: 350px">
              <DoctorInfoCard :doctor="doctor" />
            </div>
          </el-col>
        </el-row>
        <div class="loadmore-button">
          <LoadMoreButton @load-more="loadMore" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Doctor from '@/classes/Doctor';

const doctors: Doctor[] = DoctorsStore.Items();
const mount = ref(false);

onBeforeMount(async () => {
  mount.value = true;
});

const loadMore = async () => {
  // const lastCursor = doctors[doctors.length - 1].employee.human.getFullName();
  // filterQuery.value.pagination.cursor.value = lastCursor;
  // filterQuery.value.pagination.cursor.initial = false;
  // filterQuery.value.pagination.cursor.operation = Operators.Gt;
  // filterQuery.value.pagination.cursor.column = 'fullName';
  // filterQuery.value.pagination.cursorMode = true;
  // await Doctors.GetAll();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  // .right-side {
  // max-width: $right-side-max-width;
  // }
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
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
