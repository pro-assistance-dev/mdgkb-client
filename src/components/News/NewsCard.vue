<template>
  <el-card class="card" :body-style="{ padding: '0px', height: '100%' }" @click="$router.push(`/news/${news.slug}`)">
    <div class="flex-between-columm front">
      <div class="tags tags-top">
        <el-tag
          effect="plain"
          @click.stop="filterNews(tag.id)"
          class="tag-link"
          v-for="tag in news.tags.slice(0, 3)"
          :key="tag.id"
          size="small"
        >
          {{ tag.label }}
        </el-tag>
      </div>

      <div class="image">
        <div>
          <img
            @error="errorImg"
            v-if="news.previewThumbnailFile.filenameDisk"
            :src="getImageUrl(news.previewThumbnailFile.filenameDisk)"
            alt="alt"
          />
          <img v-else src="../../assets/img/310x310.png" />
        </div>
      </div>
      <div class="card-content">
        <div>{{ news.title }}</div>
      </div>
      <div class="tags">
        <div class="card-meta" style="margin-bottom: 0">
          <div>{{ $dateFormatRu(news.publishedOn, true) }}</div>
          <div class="like">
            <EyeOutlined />
            <span>0 </span>
          </div>
          <div class="like">
            <LikeFilled @click.stop="deleteLike(news)" class="liked" v-if="liked(news.newsLikes)" />
            <LikeOutlined @click.stop="createLike(news)" v-else />
            <span>{{ news.newsLikes.length }} </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { PropType, defineComponent } from 'vue';
import { LikeOutlined, EyeOutlined, LikeFilled } from '@ant-design/icons-vue';
import INews from '@/interfaces/news/INews';
import NewsLike from '@/classes/news/NewsLike';
import { ElMessage } from 'element-plus';
import INewsLike from '@/interfaces/news/INewsLike';

export default defineComponent({
  name: 'NewsCard',
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
  components: { LikeOutlined, LikeFilled, EyeOutlined },
  async setup() {
    const store = useStore();
    const userId = localStorage.getItem('userId');

    const getImageUrl = (imagePath: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${imagePath}`;
    };

    const createLike = async (news: INews): Promise<void> => {
      if (!localStorage.getItem('token')) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return;
      }
      const newsLike = new NewsLike();
      if (news.id) newsLike.newsId = news.id;
      if (userId) newsLike.userId = userId;
      await store.dispatch('news/createLike', newsLike);
    };

    const deleteLike = async (news: INews): Promise<void> => {
      if (!localStorage.getItem('token')) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return;
      }

      const like = news.newsLikes.find((i: INewsLike) => i.userId === userId);
      console.log(like);
      if (like) await store.dispatch('news/deleteLike', like);
    };

    const liked = (likes: INewsLike[]) => {
      if (!userId) return false;
      const i = likes.findIndex((like: INewsLike) => like.userId === userId);
      return i > -1;
    };

    const errorImg = (e: any) => {
      e.target.src = require('../../assets/img/310x310.png');
    };

    const filterNews = async (tagId: string): Promise<void> => {
      await store.commit('news/filterByTag', tagId);
    };

    return {
      liked,
      errorImg,
      filterNews,
      createLike,
      deleteLike,
      getImageUrl,
    };
  },
});
</script>

<style scoped lang="scss">
$card-border-radius: 15px;
$card-content-padding: 10px;
$card-content-outpadding: 0 - 24px;
$card-width: 300px;

.card {
  border-radius: $card-border-radius;
  height: 100%;
  width: $card-width;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    // transform: scale(1.01);
    // box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .transition-box {
    border-radius: $card-border-radius;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(255, 255, 255);
    color: #000000;
    text-align: justify;
    transition: all 0.5s;

    .content {
      text-align: left;
    }
    .container {
      padding: $card-content-padding;
    }
    .read-more {
      text-align: center;
    }
  }

  .card-content {
    padding: $card-content-padding;
    height: 100%;

    .title {
      font-size: 1.1rem;
      font-weight: bold;
      height: 50%;
      margin-bottom: 20px;
    }
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #4a4a4a;
    font-size: 18px;
    margin-bottom: 10px;
    opacity: 0.75;
    div {
      padding: 0 5px;
    }
  }

  .like {
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin-right: 3px;
    cursor: pointer;

    &:hover {
      /*transform: scale(1.1);*/
    }

    .anticon {
      padding-right: 5px;
      font-size: 20px;
    }

    .anticon-like:hover {
      transform: scale(1.2);
    }
  }

  .liked {
    color: #e34b42;
  }
}

.image {
  width: 100%;
  padding-top: 100%;
  position: relative;
  div {
    position: absolute;
    top: 0;
    height: 100%;
    left: -50%;
    width: 200%;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
      width: auto;
    }
  }
}

.front {
  .tags {
    padding-left: $card-content-padding;
    padding-right: $card-content-padding;
    margin-bottom: $card-content-padding;
  }

  .tags-top {
    margin-top: $card-content-padding;
    z-index: 1;
    position: absolute;
  }
}

.tags {
  .tag-link {
    margin: 2px;
    transition: all 0.2s;
    color: blue;
    border-color: blue;
    border-radius: 20px;
    &:hover {
      background-color: blue;
      color: white;
      cursor: pointer;
    }
  }
}

.el-card {
  border: none;
  :deep(.el-card__body) {
    height: auto;
    align-items: center;
  }
}

.show-more {
  cursor: pointer;
  color: #0075b2;
}

.image {
  width: 100%;
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

.flex-between-columm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.flex-between-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
</style>
