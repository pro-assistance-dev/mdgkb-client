<template>
  <div class="news-page-container">
    <div class="news-content-container">
      <el-form>
        <el-input v-model="newPassword" placeholder="Введите новый пароль"></el-input>
        <el-button @click="sendPassword">Сохранить пароль</el-button>
      </el-form>
      <ImageGallery :images="page.pageImages" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import NewsComment from '@/classes/news/NewsComment';
import User from '@/classes/User';
import ImageGallery from '@/components/ImageGallery.vue';
import IUser from '@/interfaces/IUser';
import IPage from '@/interfaces/page/IPage';
export default defineComponent({
  name: 'RefreshPasswordPage',
  components: { ImageGallery },
  async setup() {
    let comment = ref(new NewsComment());
    const commentInput = ref();
    const store = useStore();
    const route = useRoute();
    const slug = computed(() => route.params['slug']);
    const page: ComputedRef<IPage> = computed(() => store.getters['pages/page']);
    const user: Ref<IUser> = computed(() => new User());
    const newPassword: Ref<string> = ref('');

    onBeforeMount(async () => {
      await store.dispatch('auth/checkUuid', { userId: route.params['userId'], uniqueId: route.params['uniqueId'] });
      store.commit('divisions/setOnlyShowed', true);
    });

    watch(slug, () => {
      if (slug.value) {
        store.dispatch('news/get', slug.value);
        window.scrollTo(0, 0);
      }
    });
    const sendPassword = async () => {
      const userId = route.params['userId'];
      if (userId && typeof userId === 'string') {
        user.value.id = userId;
      }
      user.value.password = newPassword.value;
      await store.dispatch('auth/refreshPassword', user.value);
    };
    return { sendPassword, comment, page, newPassword, commentInput };
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;
$news-content-max-width: 1000px;
$card-margin-size: 30px;

.news-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.news-content-container {
  max-width: $news-content-max-width;
  width: 100%;
}

.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2,
h3 {
  margin: 0;
  color: black;
}
h3 {
  font-size: 20px;
}

.comments {
  margin: $card-margin-size 0 0 0;
  .comments-card {
    position: relative;
    margin: 20px 0 0 0;
  }
}

.comment-header {
  text-align: right;
  margin: 5px 0;
  .comment-email {
    float: left;
    font-weight: bold;
  }
  .comment-date {
    color: #4a4a4a;
    opacity: 0.75;
  }
}
.comment-buttons {
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 5px;
  display: flex;
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}

.send-comment {
  margin-right: 0;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  text-align: center;
}

//:deep(p) {
//  text-align: justify;
//}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article-footer-item {
  padding: 10px;
}

@media only screen and (max-width: 992px) {
  .article-footer {
    flex-direction: column-reverse;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  :deep(.el-tag) {
    margin: 5px;
  }
}

:deep(img) {
  max-width: 760px;
}

.news-image-container {
  margin-bottom: $card-margin-size;
  img {
    width: 100%;
    max-height: $news-content-max-width / 2;
  }
}
</style>
