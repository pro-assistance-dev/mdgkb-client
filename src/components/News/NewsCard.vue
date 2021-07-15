<template>
  <el-card class="card" :body-style="{ padding: '0px' }">
    <div @mouseleave="showMore = false" v-show="showMore" class="transition-box" :class="{ visible: showMore }">
      <div class="preview_text">
        <div class="content">{{ news.preview_text }}</div>
        <div class="read-more">
          <el-button @click="$router.push(`/news/${news.slug}`)" type="primary" outlined>Читать дальше</el-button>
        </div>
      </div>
    </div>
    <div class="image">
      <div>
        <img v-if="news.preview_thumbnail_file.filename_disk" :src="getImageUrl(news.preview_thumbnail_file.filename_disk)" alt="alt" />
        <img v-else src="../../assets/img/310x310.png" />
      </div>
    </div>
    <div class="card-content">
      <el-row class="card-meta" :gutter="20">
        <el-col :xl="8" :lg="12" :md="24">
          {{ $dateFormatRu(news.published_on) }}
        </el-col>
        <el-col :xl="{ span: 6, offset: 10 }" :lg="12" :md="24">
          <span class="like" @click="createLike(news.id)"> {{ news.__meta__.likes_count }}</span>
        </el-col>
      </el-row>
      <div class="title">{{ news.title }}</div>

      <div class="show-more-button">
        <el-button @mouseover="showMore = true">Показать больше</el-button>
      </div>

      <div class="tags">
        <el-tag @click="filterNews(tag.id)" class="tag-link" v-for="tag in news.tags" :key="tag.id" size="small" :color="tag.color">{{
          tag.label
        }}</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { PropType, ref, defineComponent } from 'vue';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'NewsCard',
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
  async setup() {
    const showMore = ref(false);
    const store = useStore();

    const getImageUrl = (imagePath: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${imagePath}`;
    };

    const createLike = async (newsId: string): Promise<void> => {
      await store.dispatch('likes/create', newsId);
    };

    const filterNews = async (tagId: string): Promise<void> => {
      await store.commit('news/filterByTag', tagId);
    };

    return {
      showMore,
      filterNews,
      createLike,
      getImageUrl,
    };
  },
});
</script>

<style scoped lang="scss">
$card-border-radius: 15px;
$card-content-padding: 24px;
$card-content-outpadding: 0 - 24px;

.visible {
  visibility: visible;
  transition: all 0.5s;
}

.show-more-button {
  text-align: center;
}

.card {
  border-radius: $card-border-radius;
  height: 700px;
  margin-bottom: 50px;
  transition: all 0.1s;
  position: relative;
  padding-bottom: 50px;

  .transition-box {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(255, 255, 255, 0.66);
    color: #000000;
    text-align: justify;

    transition: all 0.5s;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);

    .content {
      text-align: left;
      padding: 48px 12px 12px;
    }

    .read-more {
      text-align: center;
    }
  }

  .card-content {
    padding: 1.5rem;

    .tags {
      position: absolute;
      bottom: 5%;
      margin-top: 20px;
    }

    .title {
      margin-bottom: 20px;
    }
  }

  .card-meta {
    font-size: 1rem;
    opacity: 0.75;
    padding-bottom: 12px;
  }
}

.like {
  margin-right: 3px;
  transition: all 0.1s;
  cursor: pointer;
}

.like:before {
  content: '\2661';
  padding-right: 5px;
}

.like:hover {
  margin-top: -5px;
  font-weight: bold;
}

.image {
  width: calc(100% + 4px);
  padding-top: 100%;
  position: relative;
}

.image > div {
  position: absolute;
  top: 0;
  height: 100%;
  left: -50%;
  width: 200%;
  display: flex;
  justify-content: center;
}

.image > div > img {
  height: 100%;
  width: auto;
}

.tag-link {
  margin-right: 10px;
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}
</style>
