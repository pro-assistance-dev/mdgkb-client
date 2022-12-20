<template>
  <div class="card">
    <div class="image-box">
      <img src="../../assets/svg/Buffet/food.webp" alt="alt" />
    </div>
    <div class="name">Каша овсяная с маслом</div>
    <div class="info">
      <div class="left">
        <div class="line1">Вес: 120гр.</div>
        <div class="line2">110 ккал</div>
      </div>
      <div class="right">85 р.</div>
    </div>
    <div class="counter">
      <el-form-item label="">
        <el-input-number placeholder="1"></el-input-number>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Bufet',
});
</script>

<style scoped lang="scss">
.card {
  width: 140px;
  height: 220px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin: 8px;
  padding: 0 0 4px 0;
}

.image-box {
  display: block;
  width: 140px;
  height: 120px;
  overflow: hidden;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 120px;
    object-fit: cover;
  }
}
.name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 10px);
  height: 30px;
  font-size: 12px;
  text-align: center;
  padding: 0 5px;
  color: #343e5c;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  width: calc(100% - 10px);
  height: 30px;
}

.line1 {
  font-size: 9px;
  color: #343e5c;
}
.line2 {
  font-size: 9px;
  color: #2754eb;
}

.right {
  font-size: 14px;
  color: #343e5c;
}

.counter {
  padding: 0 5px;
  width: calc(100% - 10px);
  height: 30px;
}

:deep(.el-input-number) {
  width: 100%;
  margin: 0;
}

:deep(.el-form-item__content) {
  line-height: 26px;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 26px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #4a4a4a;
}

:deep(.el-input-number__increase) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

:deep(.el-input-number__decrease) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
</style>
