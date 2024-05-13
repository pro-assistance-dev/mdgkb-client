<template>
  <div v-if="mounted" class="size" data-test="user-comments-component">
    <div class="title">
      <div class="hidden">
        <h2><b>Мои комментарии</b></h2>
      </div>
    </div>
    <div v-for="comment in user.comments" :key="comment.id" data-test="comments-list-item" class="card-item">
      <ProfileCommentCard :is-review="false" :comment="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import User from '@/classes/User';
import ProfileCommentCard from '@/components/Profile/ProfileCommentCard.vue';

export default defineComponent({
  name: 'UserCommentsPage',
  components: { ProfileCommentCard },
  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<User> = computed(() => store.getters['users/item']);

    onBeforeMount(async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    });

    return {
      mounted,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.size {
  // max-width: 900px;
  padding: 0 10px;
}

.title {
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 100%;
}
.contact-form {
  margin: 20px 100px 20px 10px;
}

.text-center {
  text-align: center;
}
.header-center {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-left: 10px;
  }
}
h1 {
  font-size: 24px;
}
.el-card {
  margin-top: 10px;
}
.card-item {
  margin-bottom: 20px;
}
h2 {
  margin: 0;
  margin-top: 0;
  font-size: 24px;
  text-align: left;
}
@media screen and (max-width: 980px) {
  .size {
    padding: 0 10px;
  }

  .table-container {
    display: none;
  }

  .mobile-container {
    display: block;
    width: 100%;
  }
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  }

  .application-card {
    width: 100%;
    min-height: 20px;
  }

  .card-item {
    justify-content: left;
  }
}

@media screen and (max-width: 560px) {
  .size {
    margin-top: 20px;
  }
  .hidden {
    display: none;
  }
  .title {
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  }

  .card-item {
    padding: 0 5px;
    width: calc(100% - 10px);
  }
  .size {
    padding: 0 5px;
  }
}
</style>
