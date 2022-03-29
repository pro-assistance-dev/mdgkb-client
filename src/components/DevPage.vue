<template>
  <div class="title"><h2>Раздел находится в состоянии разработки</h2></div>
  <el-form>
    <button class="yes-button" @click.prevent="$router.back()">Вернуться назад</button>
    <button class="no-button" @click="$router.push('/')">Вернуться на главную</button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevPage',
  async setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;
$news-content-max-width: 1000px;
$card-margin-size: 30px;

.title {
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
}

.password-title {
  display: flex;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  justify-content: left;
}

.password {
  margin-bottom: 20px;
}

.news-page-container {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
  height: 100vh;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.news-content-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 20px;
  max-width: $news-content-max-width;
  width: 300px;
  height: 50px;
  // background: #ffffff;
  border-radius: 5px;
  align-items: center;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2 {
  margin: 0;
  color: #4a4a4a;
}

h4 {
  font-weight: normal;
  margin: 0;
}

.yes-button {
  padding: 12px 50px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  border-radius: 40px;
  border: none;
  background: #2754eb;
  color: #ffffff;
  margin-right: 20px;
}

.yes-button:hover {
  background: #133dcc;
  cursor: pointer;
}

.no-button {
  padding: 12px 50px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  border-radius: 40px;
  border: none;
  background: #ff4d3b;
  color: #ffffff;
}

.no-button:hover {
  background: #d12413;
  cursor: pointer;
}
</style>
