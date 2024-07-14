<template>
  <div
    v-if="news && news.content"
    :class="'card' && article ? 'card article-card' : 'card' && main ? 'card main-card' : 'card'"
    :body-style="{ padding: '0px', height: '75%' }"
    @click="Router.To(`/news/${news.id}`)"
  >
    <Close v-if="showClose" class="close-icon" @click.stop="$emit('close')" />
    <div class="flex-between-columm front">
      <div class="image">
        <img :src="news.getImageUrl()" alt="news-image" />
      </div>
      <div class="card-content">
        <div class="title">{{ news.title }}</div>
        <div v-if="!article && !main" class="text" v-html="news.content"></div>
      </div>
      <div class="tags">
        <NewsMeta :news="news" :article="article" />
      </div>
      <div class="tags-top">
        <el-tag
          v-for="newsToTag in news.newsToTags.slice(0, 3)"
          :key="newsToTag.id"
          effect="plain"
          class="news-tag-link"
          :size="article || main ? 'mini' : 'small'"
          @click.stop="filterNews(newsToTag.tag)"
        >
          <span>{{ newsToTag.tag.label }}</span>
        </el-tag>
      </div>
    </div>
  </div>

  <div
    v-else-if="news"
    :class="'card' && article ? 'card article-card' : 'card' && main ? 'card main-card' : 'card'"
    :body-style="{ padding: '0px', height: '75%' }"
  >
    <a class="link-block" target="_blank" :href="news.articleLink"></a>
    <div class="flex-between-columm front">
      <div class="image">
        <img :src="news.getImageUrl()" alt="news-image" />
      </div>
      <div class="card-content">
        <div class="title">{{ news.title }}</div>
        <div v-if="!article && !main" class="text" v-html="news.content"></div>
      </div>
      <div class="tags">
        <NewsMeta :news="news" :article="article" />
      </div>
      <div class="tags-top">
        <el-tag
          v-for="newsToTag in news.newsToTags.slice(0, 3)"
          :key="newsToTag.id"
          effect="plain"
          class="news-tag-link"
          :size="article || main ? 'mini' : 'small'"
          @click.stop="filterNews(newsToTag.tag)"
        >
          <span>{{ newsToTag.tag.label }}</span>
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Close from '@/assets/svg/Icons/Close.svg';
import News from '@/classes/News';
import Tag from '@/classes/Tag';
import NewsMeta from '@/components/News/NewsMeta.vue';

const props = defineProps({
  news: {
    type: Object as PropType<News>,
    required: true,
  },
  article: {
    type: Boolean,
    default: false,
  },
  main: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['close']);

const filterNews = async (tag: Tag): Promise<void> => {
  // tag.selected = !tag.selected;
  // filteredTagList.value.forEach((filterTag: Tag) => {
  //   if (filterTag.id === tag.id) {
  //     filterTag.selected = true;
  //   }
  // });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$card-border-radius: 15px;
$card-content-padding: 15px;
$card-content-outpadding: 0px;
$card-width: 270px;
$main-card-width: 100%;

.card {
  position: relative;
  background: #ffffff;
  background-clip: padding-box;
  border-radius: 5px;
  border: rgba(0, 0, 0, 0.05) solid 1px;
  height: 400px;
  width: $card-width;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 5px 5px,
      rgba(0, 0, 0, 0.1) 0px -1px 3px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px,
      rgba(0, 0, 0, 0.1) 0px 2px 3px,
      rgba(0, 0, 0, 0.1) 0px -3px 5px;
  }

  .image {
    position: relative;
    overflow: hidden;
    padding-top: 75% !important;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: $card-width;
      object-fit: cover;
    }
  }

  .transition-box {
    border-radius: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(255, 255, 255);
    color: #000000;
    text-align: justify;
    transition: all 0.5s;

    .content {
      text-align: left;
    }
    .container {
      padding: $card-content-padding;
    }
    .read-more {
      text-align: center;
    }
  }

  .card-content {
    width: auto;
    max-height: calc(100% - 100px);
    overflow: hidden;
    overflow-wrap: break-word;
    background: #ffffff;
    height: 100%;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #343e5c;
      padding: 10px 10px 0 10px;
    }

    .text {
      padding-left: $card-content-padding;
      padding-right: $card-content-padding;
      font-size: 14px;
      font-weight: normal;
      color: #4a4a4a;
      margin-top: 5px;
      line-height: 1.7;
      :deep(p) {
        margin: 0;
      }
    }
  }
}

.front {
  .tags {
    padding: 10px $card-content-padding;
    background: #ffffff;
  }

  .tags-top {
    margin: $card-content-padding 0 0 $card-content-padding;
    z-index: 1;
    position: absolute;
    .news-tag-link {
      margin-right: 10px;
    }
  }
}

.el-card {
  border: none;
  :deep(.el-card__body) {
    height: auto;
    align-items: center;
  }
}

.show-more {
  cursor: pointer;
  color: #0075b2;
}

.flex-between-columm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.flex-between-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.tags-button {
  padding-top: 20px;
  padding-bottom: 10px;
  min-height: 24px;
}

.article-card {
  position: relative;
  width: 220px;
  height: 320px;
  .image {
    padding-top: 180px;
  }
  :deep(.title) {
    font-size: 12px !important;
  }
  .card-meta {
    font-size: 11px;
    :deep(.anticon) {
      font-size: 12px;
      height: 12px;
    }
  }
  .tags-top {
    margin: 10px 0 0 10px;
  }
  .news-tag-link {
    font-size: 8px;
  }
}
.main-card {
  position: relative;
  width: $main-card-width;
  height: 100%;

  .image {
    position: relative;
    overflow: hidden;
    padding-top: 75% !important;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: $main-card-width;
      object-fit: cover;
    }
  }
  :deep(.title) {
    font-size: 14px !important;
    margin-top: 0px !important;
    width: auto;
    overflow: hidden;
    height: 40px;
  }
  .card-meta {
    font-size: 12px;
    :deep(.anticon) {
      font-size: 12px;
      height: 12px;
    }
  }
  .tags-top {
    margin: 5px 0 0 5px;
  }
  .news-tag-link {
    font-size: 8px;
  }
  .tags {
    padding: 5px 10px;
  }
}

.link-block {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
}

.close-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  backdrop-filter: blur(5px);
  border-radius: 20%;
  padding: 5px;
  filter: brightness(100%);
  z-index: 99;
}
.close-icon:hover {
  backdrop-filter: blur(20px);
  transform: scale(1.1);
}
</style>
