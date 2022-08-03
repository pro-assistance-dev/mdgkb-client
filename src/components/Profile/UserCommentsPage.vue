<template>
  <div class="size">
    <div class="title">
      <div class="hidden">
        <h2><b>Мои комментарии</b></h2>
      </div>
    </div>
    <div v-for="comment in user.comments" :key="comment.id" class="card-item">
      <CommentCard :is-question="false" :comment="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';

import CommentCard from '@/components/Comments/CommentCard.vue';
import IUser from '@/interfaces/IUser';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'UserCommentsPage',
  components: { CommentCard },
  setup() {
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => Provider.store.getters['users/item']);

    const loadUser = async () => {
      await Provider.store.dispatch('users/get', userId.value);
      mounted.value = true;
    };

    Hooks.onBeforeMount(loadUser);

    return {
      mounted,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.size {
  max-width: 900px;
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
