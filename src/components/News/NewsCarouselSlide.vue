<template>
  <div class="slide-container" :style="{ 'background-image': `url(${url})` }">
    <div class="container">
      <div class="slide-body">
        <div class="text">
          <div v-html="item.title"></div>
          <div v-html="item.content"></div>
        </div>
        <div class="slide-buttons">
          <button
            v-for="(button, i) in item.newsSlideButtons"
            :key="i"
            :style="{
              'background-color': button.backgroundColor ? button.backgroundColor : 'white',
              color: button.color ? button.color : 'black',
              border: `1px solid ${button.color ? button.color : 'black'}`,
            }"
            @click="$router.push(button.link)"
          >
            {{ button.name }}
          </button>
        </div>
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
      // const containerWidth: number = window.innerWidth;
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
      url.value = img.getImageUrl();
    };
    onBeforeMount(() => {
      resizeHandler();
      window.addEventListener('resize', resizeHandler);
    });
    return {
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
  margin: 0;
  padding: 0;
}
.slide-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  margin: 0 70px;

  .text {
    max-width: 50%;
    max-height: 100%;
    overflow: hidden;
  }

  .slide-buttons {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    button {
      margin: 5px;
      font-size: 10px;
      text-transform: uppercase;
      padding: 12px 20px;
      border-radius: 25px;
      white-space: nowrap;
      &:hover {
        cursor: pointer;
        filter: brightness(150%);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
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
