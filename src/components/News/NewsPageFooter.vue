<template>
  <div class="article-footer">
    <div class="top-footer">
      <div class="date-meta">
        {{
          $dateTimeFormatter.format(news.publishedOn, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        }}
      </div>
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
          class="news-tag-link"
          size="small"
          @click.stop="filterNews(newsToTag.tag)"
        >
          <span>{{ newsToTag.tag.label }}</span>
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
            <img class="colored" :src="require(`@/assets/img/social/${share.icon}-colored.webp`)" :alt="share.name" />
          </div>
        </ShareNetwork>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';

import News from '@/classes/News';
import Tag from '@/classes/Tag';
import NewsLikes from '@/components/News/NewsLike.vue';

export default defineComponent({
  name: 'NewsPageFooter',
  components: { EyeOutlined, NewsLikes },
  props: {
    news: {
      type: Object as PropType<News>,
      required: true,
    },
  },
  async setup(props) {
    const shares = [
      // { name: 'facebook', icon: 'fb' },
      // { name: 'twitter', icon: 'twitter' },
      { name: 'VK', icon: 'vk' },
      { name: 'Telegram', icon: 'telegram' },
    ];

    const filterNews = async (tag: Tag): Promise<void> => {
      // await Provider.router.push('/news');
    };

    const getUrl = (): string => {
      const host = process.env.VUE_APP_API_HOST;
      return `${host}/news/${props.news.id}`;
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
    /*  .colored {
      display: none;
    } */
    &:hover {
      .colored {
        display: unset;
        transform: scale(1.1);
      }
      /* .black {
        display: none;
      } */
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
.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
:deep(.anticon) {
  padding-right: 5px;
  font-size: 20px;
  height: 20px;
}
.views {
  margin-right: 15px;
  display: flex;
  align-items: flex-start;
}
</style>
