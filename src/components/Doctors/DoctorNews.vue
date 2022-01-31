<template>
  <div class="education">
    <div class="title-in">Новости</div>
    <el-carousel v-if="mounted" :interval="5000" indicator-position="outside" height="350px">
      <el-carousel-item v-for="(newsDoctor, i) in carousel" :key="i">
        <!--        <template >-->
        <!--        <div class="news-container">-->
        <NewsCard v-for="item in newsDoctor" :key="item.id" :news="item.news" :article="true" />
        <!--        </div>-->
        <!--        </template>-->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import NewsCard from '@/components/News/NewsCard.vue';
import INewsDoctor from '@/interfaces/news/INewsDoctor';

export default defineComponent({
  name: 'DoctorNews',
  props: {
    newsDoctors: {
      type: Object as PropType<INewsDoctor[]>,
      required: true,
    },
  },
  components: { NewsCard },
  async setup(props) {
    const carousel: Ref<INewsDoctor[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);

    const makeCarousel = (array: INewsDoctor[], size: number): INewsDoctor[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    onBeforeMount(async () => {
      carousel.value = makeCarousel(props.newsDoctors, 3);
      mounted.value = true;
    });

    return {
      carousel,
      mounted,
    };
  },
});
</script>
<style scoped lang="scss">
:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.education {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: #343e5c;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.point {
  display: flex;
  margin: 0px 0px 20px 20px;
}

.point-info {
  display: block;
  height: auto;
  margin: 10px 0px 0px 5px;
}

.point-year {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 14px;
  color: #a1a7bd;
  font-weight: bold;
}

.point-text {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 11px;
  color: #5d6477;
}

/* Decoration of lists */

.point-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.point-list-item {
  margin-bottom: 1rem;
  padding-left: 25px;
  position: relative;
}

.point-list-item:before {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 10px;
  height: 10px;
  border: 2px solid #a1a7bd;
  background-color: #ffffff;
  border-radius: 50%;
  z-index: 2;
}

.point-list-item:after {
  content: '';
  position: absolute;
  top: -8px;
  left: 6px;
  width: 2px;
  height: calc(100% + 3rem);
  background-color: #a1a7bd;
}

.point-list-item:last-of-type:after {
  height: calc(100% + 1.3rem);
}
</style>
