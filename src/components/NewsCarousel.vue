<template>
  <el-carousel :interval="4000" indicator-position="outside">
    <el-carousel-item v-for="item in news" :key="item">
      <div class="carousel-container">
        <!-- <img :src="require(`@/assets/img/services-menu/banner/${item.id}.png`)" /> -->
        <div class="carousel-body">
          <h3>{{ item.title }}</h3>
          <div class="carousel-content" v-html="item.content"></div>
        </div>
        <el-button @click="$router.push(item.to)" round>Подробнее</el-button>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NewsCarousel',
  components: {},
  async setup() {
    const news = ref([
      {
        title: 'Врачи Морозовской детской больницы признаны лучшими специалистами года',
        content:
          'В соответствии с приказом Департамента здравоохранения города Москвы от 26 декабря 2019 года № 1118 пять специалистов Морозовской детской больницы в числе лауреатов ежегодного Московского фестиваля «Формула жизни».',
        to: `/news/vrachi-morozovskoj-detskoj-bolnicy-priznany-luchshimi-specialistami-goda`,
      },
      {
        title: 'Врачи Морозовской детской больницы признаны лучшими специалистами года',
        content:
          'В соответствии с приказом Департамента здравоохранения города Москвы от 26 декабря 2019 года № 1118 пять специалистов Морозовской детской больницы в числе лауреатов ежегодного Московского фестиваля «Формула жизни».',
        to: `/news/vrachi-morozovskoj-detskoj-bolnicy-priznany-luchshimi-specialistami-goda`,
      },
      {
        title: 'Врачи Морозовской детской больницы признаны лучшими специалистами года',
        content:
          'В соответствии с приказом Департамента здравоохранения города Москвы от 26 декабря 2019 года № 1118 пять специалистов Морозовской детской больницы в числе лауреатов ежегодного Московского фестиваля «Формула жизни».',
        to: `/news/vrachi-morozovskoj-detskoj-bolnicy-priznany-luchshimi-specialistami-goda`,
      },
      {
        title: 'Врачи Морозовской детской больницы признаны лучшими специалистами года',
        content:
          'В соответствии с приказом Департамента здравоохранения города Москвы от 26 декабря 2019 года № 1118 пять специалистов Морозовской детской больницы в числе лауреатов ежегодного Московского фестиваля «Формула жизни».',
        to: `/news/vrachi-morozovskoj-detskoj-bolnicy-priznany-luchshimi-specialistami-goda`,
      },
    ]);
    return { news };
  },
});
</script>

<style scoped lang="scss">
// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 18px;
//   opacity: 0.75;
//   margin: 0;
// }

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carousel-container {
  color: black;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 80px;
  width: 50%;
  max-height: 100%;

  .carousel-body {
    overflow: hidden;
  }

  h3 {
    margin-top: 0;
  }
  .carousel-content {
    font-size: 80%;
    font-style: italic;
    text-align: justify;
  }
  img {
    width: 100%;
    height: 320px;
    z-index: -1;
    max-height: 320px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .el-button {
    // position: absolute;
    // left: 20px;
    // bottom: 40px;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 150px;
    background-color: transparent;
    color: black;
    font-weight: 600;
    border: 2px solid black;
  }
  .el-button:hover {
    background-color: black;
    color: white;
  }
}
</style>
