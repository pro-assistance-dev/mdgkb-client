<template>
  <div class="info-main-container">
    <div class="container">
      <div class="info-container">
        <div class="info-container-left">
          <h2>Морозовская - крупнейшая в России и Европе детская больница с вековой историей</h2>
          <p>
            На сегодняшний день медицинская помощь, которую получают пациенты в Морозовской больнице, ничем не отличается от той, которую
            они могли бы получить в любой другой стране мира.
          </p>
          <p>
            С 2015 года Морозовская детская больница получила лицензию на осуществление образовательной детальности и стала Центром
            постдипломного педиатрического образования. Морозовская больница является клинической базой для 15 кафедр трех медицинских ВУЗов
            города Москвы (РНИМУ имени Н. И. Пирогова, РМАПО, Университета Дружбы Народов).
          </p>
          <div class="info-container-left-icons">
            <div class="info-container-left-icons-item">
              <h4>31</h4>
              <span>профиль медицинской помощи</span>
            </div>
            <div class="info-container-left-icons-item">
              <h4>48</h4>
              <span>отделений</span>
            </div>
            <div class="info-container-left-icons-item">
              <h4>700</h4>
              <span>врачей</span>
            </div>
            <div class="info-container-left-icons-item">
              <h4>45</h4>
              <span>медицинких специальностей</span>
            </div>
          </div>
        </div>
        <div class="info-container-right">
          <el-carousel trigger="click" height="620px" :interval="5000" indicator-position="outside">
            <el-carousel-item>
              <h3 class="small">1</h3>
            </el-carousel-item>
            <el-carousel-item>
              <h3 class="small">2</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainPage',
});
</script>

<style lang="scss" scoped>
.info-main-container {
  background-color: white;
}
.info-container {
  padding: 25px 0;
  display: flex;
  align-items: flex-start;
  letter-spacing: 1px;
  &-left {
    display: flex;
    flex-direction: column;
    flex: 50%;
    margin-right: 15px;
    h2 {
      font-size: 28px;
      margin: 0;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
      margin-bottom: 15px;
    }
    &-icons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 25px 80px;
      align-self: center;
      &-item {
        h4 {
          margin: 0;
          font-size: 43px;
          color: blue;
        }
        max-width: 150px;
        display: flex;
        justify-content: flex-start;
        text-align: center;
        font-size: 14px;
        flex-direction: column;
      }
    }
  }
  &-right {
    flex: 50%;
    margin-left: 15px;
  }
}
.el-carousel,
.el-carousel__container,
.el-carousel__item {
  background-color: gray;
  border-radius: 5px;
}
</style>
