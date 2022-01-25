<template>
  <div class="icon like">
    <LikeFilled v-if="liked(news.newsLikes)" class="liked" @click.stop="deleteLike(news)" />
    <LikeOutlined v-else @click.stop="createLike(news)" />
    <span>{{ news.newsLikes.length }} </span>
  </div>
</template>

<script lang="ts">
import { LikeFilled, LikeOutlined } from '@ant-design/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import NewsLike from '@/classes/news/NewsLike';
import INews from '@/interfaces/news/INews';
import INewsLike from '@/interfaces/news/INewsLike';
import TokenService from '@/services/Token';
export default defineComponent({
  name: 'NewsLike',
  components: { LikeOutlined, LikeFilled },
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
  async setup() {
    const store = useStore();
    const user = computed(() => store.getters['auth/user']);
    const isAuth = computed(() => store.getters['auth/isAuth']);

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

    return {
      liked,
      createLike,
      deleteLike,
    };
  },
});
</script>

<style scoped lang="scss">
.icon {
  user-select: none;
  display: flex;
  align-items: flex-start;
  transition: all 0.2s;
  margin-right: 3px;

  .anticon {
    padding-right: 5px;
  }
}
.like {
  cursor: pointer;
}

.anticon-like:hover {
  transform: scale(1.2);
}

.anticon {
  &:hover {
    transform: scale(1.1);
  }
}

.liked {
  color: #e34b42;
}
</style>
