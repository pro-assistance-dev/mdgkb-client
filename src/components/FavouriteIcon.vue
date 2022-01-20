<template>
  <HeartFilled v-if="isFavourite" @click.stop="removeFromUser" />
  <HeartOutlined v-else @click.stop="add" />
</template>

<script lang="ts">
import { HeartFilled, HeartOutlined } from '@ant-design/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FavouriteService from '@/services/Favourite';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DoctorPage',
  components: { HeartOutlined, HeartFilled },
  props: {
    domainName: {
      type: String,
      required: true,
    },
    domainId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const isFavourite = ref(FavouriteService.isFavourite(props.domainName, props.domainId));
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const add = async () => {
      if (!checkAuth()) {
        return;
      }
      await store.dispatch('users/addToUser', { domain: props.domainName, id: props.domainId });
      isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
    };

    const removeFromUser = async () => {
      if (!checkAuth()) {
        return;
      }
      await store.dispatch('users/removeFromUser', { domain: props.domainName, id: props.domainId });
      isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
    };

    const clearFav = () => (isFavourite.value = false);

    const checkAuth = (): boolean => {
      const token = TokenService.getAccessToken();
      if (!token) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return false;
      }
      return true;
    };
    watch(isAuth, () => {
      if (!isAuth.value) {
        clearFav();
      } else {
        isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
      }
    });

    return {
      isFavourite,
      removeFromUser,
      add,
    };
  },
});
</script>

<style lang="scss" scoped>
.is-favourite {
  color: orange;
}
</style>
