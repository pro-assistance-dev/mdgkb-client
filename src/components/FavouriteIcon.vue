<template>
  <Component :is="getIcon('heartfill')" v-if="isFavourite" id="heartfill-svg" class="heart" @click.stop="removeFromUser" />
  <Component :is="getIcon('heartstroke')" v-else id="heartstroke-svg" class="heart" @click.stop="add" />
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
});
const isFavourite = ref(FavouriteService.isFavourite(props.domainName, props.domainId));

const modules = import.meta.glob('@/assets/doctors/svg/*.svg');
const getIcon = (icon: string) => {
  const path = '/src/assets/doctors/svg/' + icon + '.svg';
  const comp = defineAsyncComponent(() => modules[path]());
  return comp;
};

const add = async () => {
  if (!checkAuth()) {
    return;
  }
  await UsersStore.AddtoUser({ domain: props.domainName, id: props.domainId });
  isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
};

const removeFromUser = async () => {
  if (!checkAuth()) {
    return;
  }
  await UsersStore.RemoveFromUser({ domain: props.domainName, id: props.domainId });
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

watch(
  () => PHelp.Auth.IsAuth(),
  () => {
    if (!PHelp.Auth.IsAuth()) {
      clearFav();
    } else {
      isFavourite.value = FavouriteService.isFavourite(props.domainName, props.domainId);
    }
  }
);
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
