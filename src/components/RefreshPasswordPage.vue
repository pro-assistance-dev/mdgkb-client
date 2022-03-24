<template>
  <div class="title"><h2>Вы действительно хотите изменить пароль?</h2></div>
  <div class="news-page-container">
    <div class="news-content-container">
      <!-- <div class="password-title"><h4>Задайте новый пароль</h4></div> -->
      <el-form>
        <!-- <el-input class="password" v-model="newPassword" placeholder="Новый пароль"></el-input> -->
        <!-- <button class="add-button" @click="sendPassword">Сохранить пароль</button> -->
        <button class="yes-button" @click="passwordChange">Да</button>
        <button class="no-button" @click="$router.push('/')">Нет</button>
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
    const passwordChange = () => store.commit('auth/openModal', 'passwordChange');

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
    return { sendPassword, comment, page, newPassword, commentInput, passwordChange };
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;
$news-content-max-width: 1000px;
$card-margin-size: 30px;

.title {
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
}

.password-title {
  display: flex;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  justify-content: left;
}

.password {
  margin-bottom: 20px;
}

.news-page-container {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
  height: 100vh;
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
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 20px;
  max-width: $news-content-max-width;
  width: 300px;
  height: 50px;
  // background: #ffffff;
  border-radius: 5px;
  align-items: center;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2 {
  margin: 0;
  color: #4a4a4a;
}

h4 {
  font-weight: normal;
  margin: 0;
}

.yes-button {
  padding: 12px 50px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  border-radius: 40px;
  border: none;
  background: #2754eb;
  color: #ffffff;
  margin-right: 20px;
}

.yes-button:hover {
  background: #133dcc;
}

.no-button {
  padding: 12px 50px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  border-radius: 40px;
  border: none;
  background: #ff4d3b;
  color: #ffffff;
}

.no-button:hover {
  background: #d12413;
}
</style>
