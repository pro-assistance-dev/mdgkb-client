<template>
  <el-container direction="vertical" align="center">
    <h1>Диспансеризация населения</h1>
    <el-card>
      <el-space id="alarm" alignment="center" :size="20">
        <i class="el-icon-warning-outline"></i>
        <div>
          Согласно Приказу Минздрава России от 03.12.2012 N 1006н «Об утверждении порядка проведения диспансеризации определенных групп
          взрослого населения» учреждение проводит профилактические осмотры сотрудников.
        </div>
      </el-space>
    </el-card>
    <el-card>
      <el-space direction="vertical" alignment="center" :size="20">
        <div style="font-size: 24px">Возможно вам будет интересно:</div>
        <el-carousel indicator-position="outside" :interval="4000">
          <el-carousel-item v-for="item in items" :key="item.id">
            <div class="carousel-container">
              <el-space direction="vertical" alignment="start" :size="0">
                <img :src="require(`@/assets/img/services-menu/banner/${item.id}.png`)" />
                <div class="icon">
                  <Component :is="require(`@/assets/img/services-menu/icon/${item.id}.svg`).default"></Component>
                </div>
                <h3>{{ item.label }}</h3>
                <p>{{ item.description }}</p>
                <el-button round @click="$router.push(item.to)">Подробнее</el-button>
              </el-space>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-space>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  name: 'DispanserizationPage',
  setup() {
    const items = ref([
      {
        id: '01',
        label: 'Диагностика',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/divisions/konsultativno-diagnosticheskij-centr',
      },
      {
        id: '02',
        label: 'ЧекАп',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '#',
      },
      {
        id: '03',
        label: 'Госпитализация',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/hospitalization',
      },
      {
        id: '04',
        label: 'Амбулаторно-поликлиническая помощь',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '#',
      },
    ]);

    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
#alarm div {
  text-align: start;
}

#alarm i {
  font-size: 6rem;
  color: #2754eb;
}

.el-card {
  margin-bottom: 20px;
}

.el-carousel {
  width: 600px;
}

.carousel-container {
  text-align: start;
  color: white;
  height: 100%;
  position: relative;

  .el-space {
    width: 50%;
    margin: 10px;
    max-height: 260px;
  }
  h3 {
    margin-bottom: 0;
  }
  p {
    font-size: 80%;
    font-style: italic;
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
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 20px;
    background-color: transparent;
    color: white;
    font-weight: 600;
    border: 2px solid white;
  }
  .el-button:hover {
    background-color: white;
    color: black;
  }
  .icon svg {
    width: 32px;
  }
  .icon {
    fill: #ffffff;
  }
}
</style>
