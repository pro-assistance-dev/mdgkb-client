<template>
  <div class="main-page-footer">
    <div class="main-page-footer-left">
      <img src="@/assets/img/main-page/templates/footer.png" />
    </div>
    <div class="main-page-footer-right">
      <div class="main-page-footer-right-container">
        <div class="main-page-footer-right-container-title">Вы можете записаться на прием к online или заказав обратный звонок</div>
        <div class="main-page-footer-right-container-buttons">
          <button>Обратный звонок</button>
          <button>Записаться online</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainPageFooter',
});
</script>

<style lang="scss" scoped>
$height: 300px;
.main-page-footer {
  height: $height;
  display: flex;
  overflow: hidden;
  align-items: center;
  &-left {
    text-align: right;
    img {
      width: 100%;
    }
    width: 50%;
  }
  &-right {
    width: 50%;
    height: 100%;
    background-color: #2754ec;
    &-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      width: 600px;
      height: 210px;
      padding: 45px 30px;
      &-title {
        font-size: 28px;
        letter-spacing: 1px;
        font-weight: bold;
        color: white;
      }
      &-buttons {
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        button {
          border: 1px solid white;
          background-color: #2754ec;
          color: white;
          border-radius: 20px;
          padding: 10px 40px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 20px;
          cursor: pointer;
          &:hover {
            background-color: darken(#2754ec, 10%);
          }
        }
      }
    }
  }
}
</style>
