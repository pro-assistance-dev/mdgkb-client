<template>
  <button @click="savePaths">Сохранить на сервере</button>
  <div v-for="path in paths" :key="path">
    {{ path.path }}
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminGallery',
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
    storeAction: {
      type: String as PropType<string>,
      default: 'pushToImages',
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const paths = router.getRoutes();

    const savePaths = async () => {
      const pathsForSend: string[] = [];
      paths.forEach((path) => {
        pathsForSend.push(path.path);
      });
      await store.dispatch('auth/saveClientPermissions', pathsForSend);
    };

    return {
      savePaths,
      paths,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  text-align: center;
}

$news-content-max-width: 400px;
$news-content-max-height: 165px;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  // height: 400px;
  text-align: center;
  align-content: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item) {
  transition: unset;
}

.card-header {
  text-align: start;
}
</style>
