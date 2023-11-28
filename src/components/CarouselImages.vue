<template>
  <div class="field" :style="{ height: height, maxHeight: maxHeight }">
    <div class="container">
      <svg class="icon-arrow" @click.stop="toPrev()">
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
            <div class="image-box">
              <img
                :id="carouselGroupElement.fileInfo.getImageUrl()"
                :style="{ height: `calc(${height} - 110px)`, maxHeight: `calc(${maxHeight} - 110px)` }"
                :src="carouselGroupElement.fileInfo.getImageUrl()"
                :alt="carouselGroupElement.fileInfo.originalName"
                @click="showImageInFullScreen()"
              />
            </div>
          </div>
          <div class="label">{{ carouselGroupElement.description }}{{ height }}{{ maxHeight }}</div>
        </div>
      </div>
      <svg class="icon-arrow" @click.stop="toNext()">
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
        @click.stop="toGroup(i)"
      >
        {{ i + 1 }}
      </div>
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
    animationTime: {
      type: Number,
      default: 500,
    },

    height: {
      type: String,
      default: '360px',
    },

    maxHeight: {
      type: String,
      default: '360px',
    },
  },
  emits: ['openModalWindow'],
  setup(props, { emit }) {
    const cssAnimationTime = `${props.animationTime}ms`;

    const fullScreenMode: Ref<boolean> = ref(false);
    const activeGroupIndex = ref(0);
    // const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);

    // const activeImageIndex = ref(0);

    const rev: Ref<Animations> = ref(Animations.None);

    let carousel: Ref<IWithImage[][]> = ref(makeCarousel<IWithImage>(props.images, props.quantity));

    const activeCarouselGroup: ComputedRef<IWithImage[]> = computed(() => {
      return carousel.value[activeGroupIndex.value];
    });
    // const activeImage: ComputedRef<IWithImage> = computed(() => {
    //   return carousel.value[activeGroupIndex.value][activeImageIndex.value];
    // });

    const showImageInFullScreen = () => {
      fullScreenMode.value = true;
      emit('openModalWindow', fullScreenMode);
    };

    const toNextGroup = () =>
      (activeGroupIndex.value = activeGroupIndex.value + 1 < carousel.value.length ? activeGroupIndex.value + 1 : 0);
    const toPreviousGroup = () =>
      (activeGroupIndex.value = activeGroupIndex.value - 1 < 0 ? carousel.value.length - 1 : activeGroupIndex.value - 1);

    const callAnimation = (animation: Animations) => {
      rev.value = animation;
      setTimeout(() => (rev.value = Animations.None), props.animationTime);
    };

    const toGroup = (value: number) => {
      if (value == activeGroupIndex.value) {
        return;
      }
      callAnimation(value < activeGroupIndex.value ? Animations.Prev : Animations.Next);
      setTimeout(() => (activeGroupIndex.value = value), props.animationTime / 2);
    };

    const toNext = () => {
      callAnimation(Animations.Next);
      setTimeout(toNextGroup, props.animationTime / 2);
    };

    const toPrev = () => {
      callAnimation(Animations.Prev);
      setTimeout(toPreviousGroup, props.animationTime / 2);
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
      cssAnimationTime,
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
  height: calc(100% - 50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.icon-arrow {
  width: 30px;
  height: 30px;
  fill: $site_dark_gray;
  border-radius: 25px;
  padding: 10px;
  background: #ffffff;
  cursor: pointer;
  transition: 0.1s;
}

.icon-arrow:hover {
  background: #e3e3e3;
}

.icon-arrow:active {
  background: #9d9d9d;
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
  box-sizing: border-box;
}

.animationnext {
  position: absolute;
  animation: movenext v-bind(cssAnimationTime) infinite;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  z-index: 1;
}

.animationprev {
  position: absolute;
  animation: moveprev v-bind(cssAnimationTime) infinite;
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
}

img {
  width: auto;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  border-radius: 10px;
  cursor: pointer;
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
  max-width: 100%;
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
  .label {
    font-size: 12px;
  }
  .icon-arrow {
    padding: 0px;
  }
}

@media screen and (max-width: 480px) {
  .label {
    height: 40px;
    font-size: 9px;
  }
}
</style>
