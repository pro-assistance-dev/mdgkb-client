<template>
  <div class="buttons-container">
    <div class="button-container">
      <button class="blue-button">
        <el-icon><calendar /></el-icon>
        Запись на прием
      </button>
    </div>
    <div class="button-container">
      <button class="green-button">
        <el-icon><cellphone /></el-icon>
        Телемедицина
      </button>
    </div>
    <div class="button-container">
      <button class="orange-button">
        <el-icon><phone-filled /></el-icon>
        Обратный звонок
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Calendar, Cellphone, PhoneFilled } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainHeaderButtons',
  components: {
    Calendar,
    Cellphone,
    PhoneFilled,
  },
});
</script>

<style lang="scss" scoped>
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 115px;
  background-color: #d8e8ff;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  width: 230px;
  height: 60px;
  padding: 0 25px;
  font-size: 14px;
  color: white;
  font-weight: bold;
  margin: 0 20px;
  cursor: pointer;
}
.el-icon {
  margin-right: 20px;
  font-size: 22px;
}
.blue-button {
  background-color: #2754ec;
  &:hover {
    background-color: darken(#2754ec, 10%);
  }
}
.green-button {
  background-color: #31af5e;
  &:hover {
    background-color: darken(#31af5e, 10%);
  }
}
.orange-button {
  background-color: #f3911c;
  &:hover {
    background-color: darken(#f3911c, 10%);
  }
}
</style>
