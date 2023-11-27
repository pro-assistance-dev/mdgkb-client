<template>
  <div class="img-container" @click="$router.push(imgLink)">
    <img v-if="image.fileSystemPath" :src="image.getImageUrl()" alt="avatar" @error="image.errorImg($event, errorImgName)" />
    <img v-else :src="require(`@/assets/img/${errorImgName}`)" alt="avatar" />
    <div class="favor">
      <FavouriteIcon :domain-id="domainId" :domain-name="domainName" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import FileInfo from '@/classes/FileInfo';
import FavouriteIcon from '@/components/FavouriteIcon.vue';

export default defineComponent({
  name: 'AvatarWithFavourite',
  components: { FavouriteIcon },
  props: {
    image: {
      type: Object as PropType<FileInfo>,
      default: new FileInfo(),
    },
    imgLink: {
      type: Object as PropType<RouteLocationRaw>,
      required: true,
    },
    errorImgName: {
      type: String,
      required: true,
    },
    domainName: {
      type: String,
      required: true,
    },
    domainId: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.img-container {
  cursor: pointer;
  position: relative;
  z-index: 1;
  .favor {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }
}
@import '@/assets/styles/elements/favorite.scss';
</style>
