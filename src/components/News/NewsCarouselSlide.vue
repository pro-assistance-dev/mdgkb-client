<template>
  <div v-if="mounted" class="slide-container" :style="{ backgroundImage: `url('${getUrl()}')` }">
    <div class="slide-body">
      <div class="text" :style="{ color: `${item.color}` }">
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
      <div class="slide-buttons">
        <a v-for="(button, i) in item.newsSlideButtons" :key="i" :href="'//' + button.link">
          <button
            :style="{
              boxShadow: 'none',
              'background-color': button.backgroundColor ? button.backgroundColor : 'white',
              color: button.color ? button.color : 'black',
              border: 'none',
            }"
          >
            {{ button.name }}
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import NewsSlide from '@/classes/newsSlides/NewsSlide';
import IFileInfo from '@/interfaces/files/IFileInfo';
export default defineComponent({
  name: 'NewsCarouselSlide',
  props: {
    item: {
      type: Object as PropType<NewsSlide>,
      required: true,
    },
    width: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const url: Ref<string> = ref<string>('');
    const mounted: Ref<boolean> = ref(false);
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
      mounted.value = true;
    });

    return {
      mounted,
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
      width: 160px;
      height: 40px;
      margin: 5px;
      font-size: 11px;
      text-transform: uppercase;
      border-radius: 25px;
      white-space: nowrap;

      &:hover {
        cursor: pointer;
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35) !important;
      }
    }
  }
}

@media screen and (max-width: 980px) {
  .slide-body {
    .text {
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      .title {
        font-size: 36px;
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
  }
}

@media screen and (max-width: 500px) {
  .slide-body {
    margin: 0 30px;

    .slide-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 40px;
      }
    }

    .text {
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      .title {
        font-size: 24px;
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
  }
}
</style>
