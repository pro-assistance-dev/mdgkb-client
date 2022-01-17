<template>
  <div class="card">
    <h4>Врачи в статье</h4>
    <el-divider />
    <div class="card-row">
      <img :src="require(`@/assets/img/310x310.png`)" alt="" />
      <div>
        <div class="name">Поддубный Игорь</div>
        <div class="regalis">научный руководитель отеделения, доктор медицинских наук</div>
      </div>
    </div>
    <div class="card-footer">
      <el-divider />
      <button>Все врачи</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewsDoctorsCard',
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
    width: 80px;
    height: 80px;
  }
}
.name {
  font-weight: bold;
}
.regalis {
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
</style>
