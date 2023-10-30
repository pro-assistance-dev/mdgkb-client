<template>
  <div class="main-page-footer">
    <div class="main-page-footer-left">
      <img src="@/assets/img/main-page/templates/footer.webp" alt="footer-img" />
    </div>
    <div class="main-page-footer-right">
      <img src="@/assets/img/main-page/templates/footer.webp" alt="footer-img" />
      <div class="main-page-footer-right-container">
        <div class="main-page-footer-right-container-title">Вы можете записаться на прием к online или заказав обратный звонок</div>
        <div class="main-page-footer-right-container-buttons">
          <button @click="isCallBackModalOpen = true">Обратный звонок</button>
          <button>Записаться online</button>
        </div>
      </div>
    </div>
    <CallBack v-if="isCallBackModalOpen" @close="isCallBackModalOpen = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import CallBack from '@/components/Main/CallBack/CallBack.vue';
export default defineComponent({
  name: 'MainPageFooter',
  components: {
    CallBack,
  },
  setup() {
    const isCallBackModalOpen: Ref<boolean> = ref(false);
    return {
      isCallBackModalOpen,
    };
  },
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
    img {
      display: none;
    }
    &-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      max-width: 600px;
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

@media screen and (max-width: 1200px) {
  .main-page-footer {
    &-left {
      display: none;
    }
    &-right {
      position: relative;
      background-color: rgba(0, 0, 0);
      img {
        display: block;
        position: absolute;
        width: 100%;
        z-index: 1;
        opacity: 70%;
      }
      width: 100%;
      &-container {
        max-width: 100%;
        text-align: center;
        &-title,
        &-buttons {
          margin-left: auto;
          margin-right: auto;
          z-index: 2;
        }
      }
    }
  }
}

@media screen and (max-width: 980px) {
  .main-page-footer {
    &-left {
      display: none;
    }
    &-right {
      img {
        width: unset;
      }
      &-container {
        &-title {
          padding: 0 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 620px) {
  .main-page-footer {
    &-right {
      &-container {
        &-title {
          font-size: 20px;
        }
        &-buttons {
          button {
            font-size: 12px;
            width: auto;
            height: auto;
            margin: 0 20px 10px 0;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .main-page-footer {
    &-right {
      &-container {
        &-title {
          font-size: 16px;
        }
        &-buttons {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          button {
            font-size: 10px;
            margin: 0 20px 10px 0;
          }
        }
      }
    }
  }
}
</style>
