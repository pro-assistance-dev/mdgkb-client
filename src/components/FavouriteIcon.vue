<template>
  <Component :is="getIcon('heartfill')" v-if="isFavourite" id="heartfill-svg" class="heart"
    @click.stop="removeFromUser" />
  <Component v-else :is="getIcon('heartstroke')" id="heartstroke-svg" class="heart" @click.stop="add" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';

import FavouriteService from '@/services/Favourite';
import TokenService from '@/services/Token';

const props = defineProps({
  domainName: {
    type: String,
    required: true,
  },
  domainId: {
    type: String,
    required: true,
  },
})
const isFavourite = ref(FavouriteService.isFavourite(props.domainName, props.domainId));
const auth = Store.Getters('auth/auth')

const modules = import.meta.glob('@/assets/doctors/svg/*.svg');
const getIcon = (icon: string) => {
  const path = '/src/assets/doctors/svg/' + icon + '.svg';
  const comp = defineAsyncComponent(() => modules[path]());
  return comp
}

const add = async () => {
  if (!checkAuth()) {
    return;
  }
  await Store.Dispatch('users/addToUser', { domain: props.domainName, id: props.domainId });
  isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
};

const removeFromUser = async () => {
  if (!checkAuth()) {
    return;
  }
  await Store.Dispatch('users/removeFromUser', { domain: props.domainName, id: props.domainId });
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
watch(() => auth.value.isAuth, () => {
  if (!auth.value.isAuth) {
    clearFav();
  } else {
    isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
  }
});

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
* {
  padding: 0;
  margin: 0;
}

.heart {
  padding: 6px 3px 3px 3px;
}
</style>
