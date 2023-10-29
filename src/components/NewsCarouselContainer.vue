<template>
  <div class="carousel-container">
    <img class="el-upload-list__item-thumbnail" :src="src" alt="carousel" />
    <div class="carousel-body">
      <div class="carousel-title" v-html="slide.title" />
      <div class="carousel-content" v-html="slide.content" />
      <el-button round @click="$router.push(slide.link)">Подробнее</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';
export default defineComponent({
  name: 'NewsCarouselContainer',
  props: {
    slide: {
      type: Object as PropType<ICarouselSlide>,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$news-content-max-width: 1300px;
$news-content-max-height: 300px;

:deep(.row-slides) {
  height: 100%;
  margin-top: 50px;
}

/* .hideUpload {
  :deep(.el-upload) {
    display: none;
  }
} */

.avatar-uploader-cover {
  height: 400px;
  text-align: center;
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

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-checkbox {
    margin: 5px !important;
  }
}

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.content-card {
  height: 450px;
}

.carousel-container {
  margin: 20px 80px;

  .carousel-body {
    overflow: hidden;
  }

  .carousel-title {
    margin-top: 0;
    z-index: 1;
    position: absolute;
  }

  .carousel-content {
    margin-top: 0px;
    font-size: 80%;
    z-index: 1;
    position: absolute;
  }

  img {
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  .el-button {
    // position: absolute;
    // left: 20px;
    // bottom: 40px;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 150px;
    background-color: transparent;
    color: black;
    font-weight: 600;
    border: 2px solid black;
  }
  .el-button:hover {
    background-color: black;
    color: white;
  }
}
</style>
