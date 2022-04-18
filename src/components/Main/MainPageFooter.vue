<template>
  <div class="main-page-footer">
    <div class="main-page-footer-left">
      <img src="@/assets/img/main-page/templates/footer.webp" />
    </div>
    <div class="main-page-footer-right">
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

@media screen and (max-width: 980px) {
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
    &-left {
      display: none;
    }
    &-right {
      width: 100%;
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
}

@media screen and (max-width: 620px) {
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
    &-left {
      display: none;
    }
    &-right {
      width: 100%;
      height: 100%;
      background-color: #2754ec;
      &-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 210px;
        padding: 45px 0;
        &-title {
          margin-left: auto;
          margin-right: auto;
          padding: 0 10px;
          font-size: 20px;
          letter-spacing: 1px;
          font-weight: bold;
          color: white;
        }
        &-buttons {
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          button {
            border: 1px solid white;
            background-color: #2754ec;
            color: white;
            border-radius: 20px;
            padding: 10px 20px;
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
}

@media screen and (max-width: 480px) {
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
    &-left {
      display: none;
    }
    &-right {
      width: 100%;
      height: 100%;
      background-color: #2754ec;
      &-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        width: 100%;
        height: 210px;
        padding: 45px 0;
        &-title {
          margin-left: auto;
          margin-right: auto;
          padding: 0 10px;
          font-size: 16px;
          letter-spacing: 1px;
          font-weight: bold;
          color: white;
        }
        &-buttons {
          margin-left: auto;
          margin-right: auto;
          display: block;
          justify-content: center;
          align-items: center;
          width: auto;
          button {
            display: flex;
            border: 1px solid white;
            background-color: #2754ec;
            color: white;
            border-radius: 20px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 20px 10px 0;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 40px;
            cursor: pointer;
            &:hover {
              background-color: darken(#2754ec, 10%);
            }
          }
        }
      }
    }
  }
}
</style>
