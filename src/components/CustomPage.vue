<template>
  <div class="news-page-container">
    <div class="news-content-container">
      <el-card class="card-content news">
        <template #header>
          <div class="card-header">
            <h2 class="title article-title">{{ page.title }}</h2>
          </div>
        </template>

        <div v-html="pageContent"></div>

        <el-divider />
        <div class="article-footer">
          <div class="article-footer-item">
            <el-button style="height: 20px" @click="$router.go(-1)">Вернуться назад</el-button>
          </div>
        </div>
      </el-card>
      <ImageGallery :images="page.pageImages" />
    </div>
  </div>
  <div v-if="page.pageDocuments.length" class="news-page-container">
    <el-card class="card-content news">
      <template #header>
        <div class="card-header">
          <h2 class="title article-title">Документы</h2>
        </div>
      </template>

      <el-table ref="table" :data="page.pageDocuments" class="table-shadow" header-row-class-name="header-style" row-class-name="no-hover">
        <el-table-column fixed="right" width="300" align="right">
          <template #default="scope">
            <a
              v-if="scope.row.document.fileInfo.fileSystemPath"
              :href="scope.row.document.fileInfo.getFileUrl()"
              :download="scope.row.document.fileInfo.originalName"
              target="_blank"
              style="margin-right: 10px"
            >
              <el-button icon="el-icon-download">Скачать</el-button>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Page from '@/services/classes/page/Page';
const page: ComputedRef<Page> = Store.Pages().Item();

const pageContent = computed(() => (page.value.content ? page.value.content : '<p style="text-align: center">Описание отсутствует</p>'));
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$side-cotainer-max-width: 300px;
$news-content-max-width: 1000px;
$card-margin-size: 30px;

.news-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
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
  max-width: $news-content-max-width;
  width: 100%;
}

.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2,
h3 {
  margin: 0;
  color: black;
}
h3 {
  font-size: 20px;
}

.comments {
  margin: $card-margin-size 0 0 0;
  .comments-card {
    position: relative;
    margin: 20px 0 0 0;
  }
}

.comment-header {
  text-align: right;
  margin: 5px 0;
  .comment-email {
    float: left;
    font-weight: bold;
  }
  .comment-date {
    color: #4a4a4a;
    opacity: 0.75;
  }
}
.comment-buttons {
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 5px;
  display: flex;
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}

.send-comment {
  margin-right: 0;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  text-align: center;
}

//:deep(p) {
//  text-align: justify;
//}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article-footer-item {
  padding: 10px;
}

@media only screen and (max-width: 992px) {
  .article-footer {
    flex-direction: column-reverse;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  :deep(.el-tag) {
    margin: 5px;
  }
}

:deep(img) {
  max-width: 760px;
}

.news-image-container {
  margin-bottom: $card-margin-size;
  img {
    width: 100%;
    max-height: calc(#{$news-content-max-width} / 2);
  }
}
</style>
