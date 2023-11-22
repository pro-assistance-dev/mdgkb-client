<template>
  <div class="slides">
    <el-button @click="toPreviousGroup()">Предыдущий</el-button>
    <div v-for="(carouselGroupElement, i) in activeCarouselGroup" :key="i" class="slide">
      <div class="image">
        <img
          :src="carouselGroupElement.fileInfo.getImageUrl()"
          :alt="carouselGroupElement.fileInfo.originalName"
          @click="showImageInFullScreen(i)"
        />
      </div>
    </div>
    <el-button @click="toNextGroup()">Следующий</el-button>
  </div>
  <div v-for="(j, i) in carousel" :key="i" @click="toGroup(i)">{{ i }}</div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import IWithImage from '@/services/interfaces/IWithImage';
import makeCarousel from '@/services/MakeCarousel';
export default defineComponent({
  name: 'CarouselImages',
  props: {
    images: {
      type: Array as PropType<Array<IWithImage>>,
      required: true,
    },
    quantity: {
      type: Number,
      default: 2,
      required: false,
    },
  },
  setup(props) {
    const fullScreenMode: Ref<boolean> = ref(false);
    const activeGroupIndex = ref(0);
    const activeImageIndex = ref(0);

    let carousel: Ref<IWithImage[][]> = ref(makeCarousel<IWithImage>(props.images, props.quantity));

    const activeCarouselGroup: ComputedRef<IWithImage[]> = computed(() => {
      return carousel.value[activeGroupIndex.value];
    });
    const activeImage: ComputedRef<IWithImage> = computed(() => {
      return carousel.value[activeGroupIndex.value][activeImageIndex.value];
    });
    // const dialogFileInfo: Ref<IFileInfo> = ref(new FileInfo());
    // const carouselRef = ref();

    const showImageInFullScreen = (indexInActiveGroup: number) => {
      fullScreenMode.value = true;
    };

    const toNextGroup = () =>
      (activeGroupIndex.value = activeGroupIndex.value + 1 < carousel.value.length ? activeGroupIndex.value + 1 : 0);
    const toPreviousGroup = () =>
      (activeGroupIndex.value = activeGroupIndex.value - 1 < 0 ? carousel.value.length - 1 : activeGroupIndex.value - 1);
    const toGroup = (value: number) => (activeGroupIndex.value = value);

    return {
      carousel,
      activeGroupIndex,
      carouselGroups: Array(carousel.value.length).keys(),
      toGroup,
      toNextGroup,
      toPreviousGroup,
      activeCarouselGroup,
      showImageInFullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

* {
  box-sizing: border-box;
}

.slider {
  width: 300px;
  text-align: center;
  overflow: hidden;
}

.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /*
  scroll-snap-points-x: repeat(300px);
  scroll-snap-type: mandatory;
  */
}
.slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.slides::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
.slides::-webkit-scrollbar-track {
  background: transparent;
}
.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  margin-right: 50px;
  border-radius: 10px;
  background: #eee;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}
.slides > div:target {
  /*   transform: scale(0.8); */
}
.author-info {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.75rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
}
.author-info a {
  color: white;
}
img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slider > a {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
}
.slider > a:active {
  top: 1px;
}
.slider > a:focus {
  background: #000;
}

/* Don't need button navigation */
@supports (scroll-snap-type) {
  .slider > a {
    display: none;
  }
}
</style>
