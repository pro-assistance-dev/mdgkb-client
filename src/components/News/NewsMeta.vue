<template>
  <div class="card-meta" style="margin-bottom: 0">
    <div class="date-meta">{{ $dateFormatRu(news.publishedOn, true) }}</div>
    <div class="icon">
      <EyeOutlined />
      <span>0 </span>
    </div>
    <div class="icon like">
      {{ isAuth }}
      <LikeFilled @click.stop="deleteLike(news)" class="liked" v-if="liked(news.newsLikes)" />
      <LikeOutlined @click.stop="createLike(news)" v-else />
      <span>{{ news.newsLikes.length }} </span>
    </div>
  </div>
  <div class="card-meta share" v-if="newsPage">
    <div>Поделиться:</div>
    <FacebookOutlined />
    <InstagramOutlined />
    <TwitterOutlined />
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { PropType, defineComponent, ref } from 'vue';
import { LikeOutlined, EyeOutlined, LikeFilled, FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons-vue';
import INews from '@/interfaces/news/INews';
import NewsLike from '@/classes/news/NewsLike';
import { ElMessage } from 'element-plus';
import INewsLike from '@/interfaces/news/INewsLike';

export default defineComponent({
  name: 'NewsMeta',
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
    newsPage: { type: Boolean },
  },
  components: { LikeOutlined, LikeFilled, EyeOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined },
  async setup() {
    const store = useStore();
    const userId = localStorage.getItem('userId');
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

    return {
      liked,
      createLike,
      deleteLike,
    };
  },
});
</script>

<style scoped lang="scss">
.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4a4a4a;
  font-size: 16px;
  margin-bottom: 10px;
  opacity: 0.75;
  div {
    padding: 0 5px;
  }
}

.icon {
  user-select: none;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  margin-right: 3px;

  &:hover {
    /*transform: scale(1.1);*/
  }

  .anticon {
    padding-right: 5px;
    font-size: 20px;
  }
}
.like {
  cursor: pointer;
}

.anticon-like:hover {
  transform: scale(1.2);
}

.liked {
  color: #e34b42;
}

.share {
  display: flex;
  justify-content: flex-start;
  .anticon {
    margin: 5px;
    font-size: 30px;
  }
}

.date-meta {
  width: 145px;
}
</style>
