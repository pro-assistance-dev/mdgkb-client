<template>
  <MainContainer header-button-link="/news" header-title="Главные новости" header-button-title="Все новости">
    <div class="wrapper">
      <div class="main-news-block-left">
        <MainBigNewsCard :news="newsMain" />
      </div>
      <div class="height1"></div>
      <div class="main-news-block-middle1">
        <div class="size"><NewsCard :news="newsSubMain1" /></div>
        <div class="size"><NewsCard :news="newsSubMain2" /></div>
      </div>
      <div class="height2"></div>
      <div class="main-news-block-right">
        <NewsSmallList :news-list="recentNewsList" style="height: 100%" />
      </div>
    </div>
    <div class="main-news-block-middle2">
      <div class="size"><NewsCard :news="newsSubMain1" /></div>
      <div class="size"><NewsCard :news="newsSubMain2" /></div>
    </div>
    <div class="main-news-block-right2">
      <NewsSmallList :news-list="recentNewsList" style="height: 100%" />
    </div>
  </MainContainer>
</template>

<script lang="ts" setup>
import Hooks from '@/services/Hooks/Hooks';

const newsMain = Store.Getters('news/main');
const newsSubMain1 = Store.Getters('news/subMain1');
const newsSubMain2 = Store.Getters('news/subMain2');
const recentNewsList = Store.Getters('news/mainPageRecentNewsList');

const load = async () => {
  new Promise(() => {
    Store.Dispatch('news/getMain', true);
    Store.Dispatch('news/getSubMain', true);
  }).then(() => {
    Store.Commit('news/setFilteredNews');
  });
};

Hooks.onBeforeMount(load);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.height1 {
  height: 623px;
}

.height2 {
  height: 623px;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 631px 1fr 270px 1fr 270px;
  grid-column-gap: 10px;
  grid-row-gap: 1em;
  align-items: stretch;
  justify-items: center;
}
.main-news-block {
  display: flex;
  justify-content: space-between;
  height: auto;
}

.main-news-block-left {
  display: flex;
  width: 100%;
  height: auto;
}

.main-news-block-middle1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
}

.main-news-block-right {
  width: 100%;
  height: auto;
}

.main-news-block-right2 {
  display: none;
}

.main-news-block-middle2 {
  display: none;
}

.size {
  height: 47%;
}

@media screen and (max-width: 1280px) {
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 20fr 1fr 10fr 0.01fr 0.01fr;
    grid-column-gap: 10px;
    align-items: stretch;
    justify-items: center;
  }
  .main-news-block {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .main-news-block-left {
    display: flex;
    height: 100%;
  }

  .main-news-block-middle1 {
    justify-content: space-between;
    height: 100%;
  }

  .main-news-block-right {
    display: none;
  }

  .main-news-block-right2 {
    display: block;
    width: 100%;
    padding-top: 30px;
    padding-left: 0;
  }
}

@media screen and (max-width: 1024px) {
  .size {
    height: 49%;
  }
}

@media screen and (max-width: 980px) {
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 10px;
    align-items: stretch;
    justify-items: center;
  }

  .height1 {
    display: none;
  }

  .height2 {
    display: none;
  }
  .main-news-block {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .main-news-block-left {
    display: flex;
    height: 100%;
  }

  .main-news-block-middle1 {
    display: none;
  }

  .main-news-block-middle2 {
    display: flex;
    justify-content: space-between;
    height: 100%;
    margin-top: 30px;
  }

  .main-news-block-right {
    display: none;
  }

  .main-news-block-right2 {
    display: block;
    width: 100%;
    padding-top: 30px;
    padding-left: 0;
  }

  .size {
    width: 48%;
    height: auto;
  }
}
</style>
