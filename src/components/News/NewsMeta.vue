<template>
  <div class="card-meta" style="margin-bottom: 0">
    <div class="date-meta">{{ $dateFormatRu(news.publishedOn, true) }}</div>
    <div class="icon">
      <EyeOutlined />
      <span>{{ news.viewsCount }} </span>
    </div>
    <div class="icon like">
      <LikeFilled v-if="liked(news.newsLikes)" class="liked" @click.stop="deleteLike(news)" />
      <LikeOutlined v-else @click.stop="createLike(news)" />
      <span>{{ news.newsLikes.length }} </span>
    </div>
  </div>
  <div v-if="newsPage" class="card-meta share">
    <div>Поделиться:</div>
    <ShareNetwork
      v-for="share in shares"
      :key="share.name"
      :network="share.name"
      :url="getUrl()"
      :title="news.title"
      :description="news.title"
    >
      <component :is="share.icon" class="anticon" :icon="['fab', 'vk']"></component>
    </ShareNetwork>
  </div>
</template>

<script lang="ts">
import { EyeOutlined, FacebookOutlined, InstagramOutlined, LikeFilled, LikeOutlined, TwitterOutlined } from '@ant-design/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import NewsLike from '@/classes/news/NewsLike';
import INews from '@/interfaces/news/INews';
import INewsLike from '@/interfaces/news/INewsLike';
import TokenService from '@/services/Token';
export default defineComponent({
  name: 'NewsMeta',
  components: { LikeOutlined, LikeFilled, EyeOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined },
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
    newsPage: { type: Boolean },
  },
  async setup(props) {
    const store = useStore();
    const user = computed(() => store.getters['auth/user']);
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const shares = [
      { name: 'facebook', icon: 'FacebookOutlined' },
      { name: 'twitter', icon: 'TwitterOutlined' },
      { name: 'VK', icon: 'font-awesome-icon' },
    ];

    const createLike = async (news: INews): Promise<void> => {
      const token = TokenService.getAccessToken();
      if (!token) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return;
      }
      const newsLike = new NewsLike();
      if (news.id) newsLike.newsId = news.id;
      if (user.value.id) newsLike.userId = user.value.id;
      await store.dispatch('news/createLike', newsLike);
    };

    const deleteLike = async (news: INews): Promise<void> => {
      const token = TokenService.getAccessToken();
      if (!token) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return;
      }

      const like = news.newsLikes.find((i: INewsLike) => i.userId === user.value.id);
      if (like) await store.dispatch('news/deleteLike', like);
    };

    const liked = (likes: INewsLike[]) => {
      if (!isAuth.value) return false;
      const i = likes.findIndex((like: INewsLike) => like.userId === user.value.id);
      return i > -1;
    };

    const getUrl = (): string => {
      const host = process.env.VUE_APP_API_HOST;
      return `${host}/news/${props.news.slug}`;
    };

    return {
      shares,
      getUrl,
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

.anticon {
  color: #4a4a4a;
  &:hover {
    transform: scale(1.1);
  }
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
</style>
