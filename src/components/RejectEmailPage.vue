<template>
  <div class="title"><h2>Вы хотите отказаться от получения email?</h2></div>
  <div class="news-page-container">
    <div class="news-content-container">
      <el-form>
        <button class="yes-button" @click.prevent="submit">Да</button>
        <button class="no-button" @click="$router.push('/')">На главную</button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';

import User from '@/classes/User';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'RejectEmailPage',
  async setup() {
    const user: Ref<User> = computed(() => Provider.store.getters['users/item']);

    onBeforeMount(async () => {
      await Provider.store.dispatch('users/get', Provider.route().params['userId']);
    });

    const submit = async () => {
      user.value.rejectEmail = true;
      await Provider.store.dispatch('users/update', user.value);
      await Provider.router.push('/main');
    };

    return { submit };
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
  cursor: pointer;
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
  cursor: pointer;
}
</style>
