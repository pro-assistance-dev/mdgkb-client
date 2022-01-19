<template>
  <div class="article-footer">
    <div class="top-footer">
      <div class="date-meta">{{ $dateFormatRu(news.publishedOn, true, true) }}</div>
      <div class="card-meta">
        <div class="views">
          <EyeOutlined />
          <span>{{ news.viewsCount }} </span>
        </div>
        <NewsLikes :news="news" />
      </div>
    </div>
    <div class="bottom-footer">
      <div class="tags-container">
        <el-tag
          v-for="newsToTag in news.newsToTags"
          :key="newsToTag.id"
          effect="dark"
          class="tag-link"
          size="small"
          @click.stop="filterNews(newsToTag.tag)"
        >
          {{ newsToTag.tag.label }}
        </el-tag>
      </div>
      <div class="card-meta share">
        <div style="margin-right: 5px">Поделиться:</div>
        <ShareNetwork
          v-for="share in shares"
          :key="share.name"
          :network="share.name"
          :url="getUrl()"
          :title="news.title"
          :description="news.title"
        >
          <div class="share-item">
            <img class="black" :src="require(`@/assets/img/social/${share.icon}.png`)" :alt="share.name" />
            <img class="colored" :src="require(`@/assets/img/social/${share.icon}-colored.png`)" :alt="share.name" />
          </div>
        </ShareNetwork>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import NewsLikes from '@/components/News/NewsLike.vue';
import INews from '@/interfaces/news/INews';
import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'NewsPageFooter',
  components: { EyeOutlined, NewsLikes },
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
  async setup(props) {
    const store = useStore();
    const router = useRouter();

    const shares = [
      { name: 'facebook', icon: 'fb' },
      { name: 'twitter', icon: 'twitter' },
      { name: 'VK', icon: 'vk' },
    ];
    const filterNews = async (tag: ITag): Promise<void> => {
      await store.dispatch('news/addFilterTag', tag);
      await router.push('/news');
    };

    const getUrl = (): string => {
      const host = process.env.VUE_APP_API_HOST;
      return `${host}/news/${props.news.slug}`;
    };

    return {
      shares,
      getUrl,
      filterNews,
    };
  },
});
</script>

<style scoped lang="scss">
.share {
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
    height: 25px;
  }
  .anticon {
    margin: 5px;
    font-size: 30px;
  }
  .share-item {
    .colored {
      display: none;
    }
    &:hover {
      .colored {
        display: unset;
        transform: scale(1.1);
      }
      .black {
        display: none;
      }
    }
  }
}
.card-meta {
  display: flex;
}
.article-footer {
  color: #a1a7bd;
}
.top-footer,
.bottom-footer {
  display: flex;
  justify-content: space-between;
}
.top-footer {
  margin-bottom: 15px;
}
.tag-link {
  border-radius: 10px;
  background-color: #2754eb;
  border-color: #2754eb;
  margin: 0 10px 0 0;
  &:hover {
    background-color: darken(#2754eb, 10%);
    color: white;
    transform: scale(1.05);
    cursor: pointer;
  }
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.anticon {
  padding-right: 5px;
}
.views {
  margin-right: 15px;
}
</style>
