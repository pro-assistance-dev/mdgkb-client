<template>
  <div class="icon like">
    <LikeFilled v-if="like" class="liked" @click.stop="toggleLike" />
    <LikeOutlined v-else @click.stop="toggleLike" />
    <span>{{ news.newsLikes.length }} </span>
  </div>
</template>

<script lang="ts">
import { LikeFilled, LikeOutlined } from '@ant-design/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, PropType } from 'vue';

import News from '@/classes/News';
import NewsLike from '@/classes/NewsLike';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';
import TokenService from '@/services/Token';
export default defineComponent({
  name: 'NewsLike',
  components: { LikeOutlined, LikeFilled },
  props: {
    news: {
      type: Object as PropType<News>,
      required: true,
    },
  },
  async setup(props) {
    const user = computed(() => Provider.store.getters['auth/user']);

    const like: ComputedRef<NewsLike | undefined> = computed(() =>
      props.news.newsLikes.find((like: NewsLike) => like.userId === user.value.id)
    );

    const toggleLike = async () => {
      if (!TokenService.getAccessToken()) {
        ElMessage.warning('Пожалуйста, авторизируйтесь');
        return;
      }
      if (like.value) {
        await Provider.store.dispatch('news/deleteLike', like.value);
        ClassHelper.RemoveFromClassById(like.value.id, props.news.newsLikes, []);
        return;
      }
      const l = props.news.createLike(user.value.id);
      console.log(l);

      await Provider.store.dispatch('news/createLike', l);
    };

    return {
      toggleLike,
      like,
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
