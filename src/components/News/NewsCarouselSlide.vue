<template>
  <div class="slide-container" :style="{ 'background-image': `url(${getUrl()})` }">
    <div class="slide-body">
      <div class="text" :style="{ color: `${item.color}` }">
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
      <div class="slide-buttons">
        <button
          v-for="(button, i) in item.newsSlideButtons"
          :key="i"
          :style="{
            boxShadow: `${button.shadow ? '0px 5px 2.5px rgba(147,147,147,0.3) ' : ''}`,
            'background-color': button.backgroundColor ? button.backgroundColor : 'white',
            color: button.color ? button.color : 'black',
            border: `${button.borderColor ? button.borderColor + ' 1px solid' : 'none'}`,
          }"
          @click="$router.push(button.link)"
        >
          {{ button.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import IFileInfo from '@/interfaces/files/IFileInfo';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';
export default defineComponent({
  name: 'NewsCarouselSlide',
  props: {
    item: {
      type: Object as PropType<INewsSlide>,
      required: true,
    },
    width: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const url: Ref<string> = ref<string>('');

    const resizeHandler = (): void => {
      let containerWidth: number;
      if (props.width) {
        containerWidth = props.width;
      } else {
        containerWidth = window.innerWidth;
      }
      let img: IFileInfo = props.item.desktopImg;
      switch (true) {
        case containerWidth <= 480:
          img = props.item.mobileImg;
          break;
        case containerWidth <= 768:
          img = props.item.tabletImg;
          break;
        case containerWidth <= 1200:
          img = props.item.laptopImg;
          break;
      }
      url.value = img.getFileUrl();
    };

    const getUrl = () => url.value;

    onBeforeMount(() => {
      resizeHandler();
      window.addEventListener('resize', resizeHandler);
    });

    return {
      getUrl,
      url,
    };
  },
});
</script>

<style lang="scss" scoped>
.slide-container {
  background-position: center left;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0 70px;
  max-width: 1344px;
  word-break: break-word;

  .text {
    max-width: 50%;
    max-height: 100%;
    overflow: hidden;
    .title {
      font-size: 42px;
      font-family: 'Open Sans', sans-serif;
      font-weight: bold;
      margin: 10px 0;
    }
    .content {
      margin: 10px 0;
      font-size: 16px;
      font-family: 'Open Sans', serif;
    }
  }

  .slide-buttons {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    button {
      margin: 5px;
      font-size: 11px;
      text-transform: uppercase;
      padding: 12px 20px;
      border-radius: 25px;
      white-space: nowrap;

      &:hover {
        cursor: pointer;
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35) !important;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .text {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 480px) {
    .slide-buttons {
      button {
        padding: 6px 10px;
      }
    }
  }
}
</style>
