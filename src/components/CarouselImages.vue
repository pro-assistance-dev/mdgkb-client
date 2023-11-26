<template>
  <div class="container">
    <svg class="icon-arrow" @click="toPrev()">
      <use xlink:href="#arrow-prev"></use>
    </svg>
    <div class="slide-box">
      <div
        v-for="(carouselGroupElement, i) in activeCarouselGroup"
        :key="i"
        :class="{
          animationnext: rev === Animations.Next,
          animationprev: rev === Animations.Prev,
        }"
      >
        <div class="image">
          <img
            :id="carouselGroupElement.fileInfo.getImageUrl()"
            :src="carouselGroupElement.fileInfo.getImageUrl()"
            :alt="carouselGroupElement.fileInfo.originalName"
            @click="showImageInFullScreen(i)"
          />
        </div>
        <div class="label">{{ carouselGroupElement.description }}</div>
      </div>
    </div>
    <svg class="icon-arrow" @click="toNext()">
      <use xlink:href="#arrow-next"></use>
    </svg>
  </div>
  <div class="link-number">
    <div
      v-for="(j, i) in carousel"
      :id="i.toString()"
      :key="i"
      class="number"
      :style="{ background: i.toString() === activeGroupIndex.toString() ? '#9D9D9D' : '' }"
      @click="toGroup(i)"
    >
      {{ i + 1 }}
    </div>
  </div>
  <ArrowPrev />
  <ArrowNext />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import ArrowNext from '@/assets/svg/CarouselImages/ArrowNext.svg';
import ArrowPrev from '@/assets/svg/CarouselImages/ArrowPrev.svg';
import { Animations } from '@/interfaces/Animations';
import IWithImage from '@/services/interfaces/IWithImage';
import makeCarousel from '@/services/MakeCarousel';
export default defineComponent({
  name: 'CarouselImages',
  components: {
    ArrowPrev,
    ArrowNext,
  },
  props: {
    images: {
      type: Array as PropType<Array<IWithImage>>,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  setup(props) {
    const fullScreenMode: Ref<boolean> = ref(false);
    const activeGroupIndex = ref(0);
    const activeImageIndex = ref(0);
    // const rev: Ref<boolean> = ref(true);
    const rev: Ref<Animations> = ref(Animations.None);

    let carousel: Ref<IWithImage[][]> = ref(makeCarousel<IWithImage>(props.images, props.quantity));

    const activeCarouselGroup: ComputedRef<IWithImage[]> = computed(() => {
      return carousel.value[activeGroupIndex.value];
    });
    const activeImage: ComputedRef<IWithImage> = computed(() => {
      return carousel.value[activeGroupIndex.value][activeImageIndex.value];
    });

    const showImageInFullScreen = (indexInActiveGroup: number) => {
      fullScreenMode.value = true;
    };

    const toNextGroup = () =>
      (activeGroupIndex.value = activeGroupIndex.value + 1 < carousel.value.length ? activeGroupIndex.value + 1 : 0);
    const toPreviousGroup = () =>
      (activeGroupIndex.value = activeGroupIndex.value - 1 < 0 ? carousel.value.length - 1 : activeGroupIndex.value - 1);

    const callAnimation = (animation: Animations) => {
      rev.value = animation;
      setTimeout(() => (rev.value = Animations.None), 500);
    };

    const toGroup = (value: number) => {
      if (value == activeGroupIndex.value) {
        return;
      }
      callAnimation(value < activeGroupIndex.value ? Animations.Prev : Animations.Next);
      setTimeout(() => (activeGroupIndex.value = value), 250);
    };

    const toNext = () => {
      callAnimation(Animations.Next);
      setTimeout(toNextGroup, 250);
    };

    const toPrev = () => {
      callAnimation(Animations.Prev);
      setTimeout(toPreviousGroup, 250);
    };

    return {
      Animations,
      carousel,
      activeGroupIndex,
      carouselGroups: Array(carousel.value.length).keys(),
      toGroup,
      toNextGroup,
      toPreviousGroup,
      activeCarouselGroup,
      showImageInFullScreen,
      rev,
      toNext,
      toPrev,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

@keyframes movenext {
  0% {
    margin-left: 0;
    margin-top: 0;
  }
  48% {
    margin-left: -200%;
    margin-top: 0;
  }
  49% {
    margin-left: -200%;
    margin-top: -200%;
  }
  50% {
    margin-left: 200%;
    margin-top: -200%;
  }
  51% {
    margin-left: 200%;
    margin-top: 0;
  }
  100% {
    margin-left: 0;
    margin-top: 0;
  }
}

@keyframes moveprev {
  0% {
    margin-right: 0;
    margin-top: 0;
  }
  48% {
    margin-right: -200%;
    margin-top: 0;
  }
  49% {
    margin-right: -200%;
    margin-top: -200%;
  }
  50% {
    margin-right: 200%;
    margin-top: -200%;
  }
  51% {
    margin-right: 200%;
    margin-top: 0;
  }
  100% {
    margin-right: 0;
    margin-top: 0;
  }
}

.container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-arrow {
  width: 30px;
  height: 30px;
  fill: $site_dark_gray;
  border-radius: 25px;
  padding: 10px;
  background: #ffffff;
  cursor: pointer;
}

.icon-arrow:hover {
  background: #e3e3e3;
}

.slide-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 60px);
  height: 100%;
  z-index: 2;
  overflow: hidden;
}

.animationnext {
  position: absolute;
  animation: movenext 500ms infinite;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  z-index: 1;
}

.animationprev {
  position: absolute;
  animation: moveprev 500ms infinite;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  z-index: 1;
}

.image {
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.1s;
}

img {
  width: auto;
  height: 20vh;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  border-radius: 10px;
}

.link-number {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
}

.number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin: 5px;
  border-radius: 20px;
  color: #ffffff;
  transform: 0.5s;
  background: #e3e3e3;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  cursor: pointer;
}

.number:hover {
  background: #c3c3c3;
}

.hidden {
  display: none;
}

.label {
  max-width: 600px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  color: #9d9d9d;
}

@media screen and (max-width: 768px) {
  .container {
    height: 240px;
  }
  img {
    height: 178px;
  }
  .label {
    max-width: 400px;
    font-size: 12px;
  }
}

@media screen and (max-width: 480px) {
  .container {
    height: 160px;
  }
  img {
    height: 108px;
  }

  .label {
    max-width: 200px;
    height: 40px;
    font-size: 9px;
  }
}
</style>
