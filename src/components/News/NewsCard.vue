<template>
  <el-card class="card" :body-style="{ padding: '0px', height: '100%' }" @click="$router.push(`/news/${news.slug}`)">
    <div class="flex-between-columm front">
      <div class="tags tags-top">
        <el-tag
          v-for="tag in news.tags.slice(0, 3)"
          :key="tag.id"
          effect="plain"
          class="tag-link"
          size="small"
          @click.stop="filterNews(tag)"
        >
          {{ tag.label }}
        </el-tag>
      </div>

      <div class="image">
        <div>
          <img v-if="news.fileInfo.fileSystemPath" :src="news.fileInfo.getImageUrl()" alt="alt" />
          <img v-else src="../../assets/img/310x310.png" />
        </div>
      </div>
      <div class="card-content">
        <div>{{ news.title }}</div>
      </div>
      <div class="tags">
        <NewsMeta :news="news" />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import NewsMeta from '@/components/News/NewsMeta.vue';
import INews from '@/interfaces/news/INews';
import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'NewsCard',
  components: { NewsMeta },
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
  async setup() {
    const store = useStore();
    const filterTags = computed(() => store.getters['news/filterTags']);

    const filterNews = async (tag: ITag): Promise<void> => {
      await store.dispatch('news/addFilterTag', tag);
      await store.dispatch('tags/filterTagList', filterTags.value);
    };

    return {
      filterNews,
    };
  },
});
</script>

<style scoped lang="scss">
$card-border-radius: 15px;
$card-content-padding: 10px;
$card-content-outpadding: 0 - 24px;
$card-width: 300px;

.card {
  border-radius: $card-border-radius;
  height: 100%;
  width: $card-width;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    // transform: scale(1.01);
    // box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .transition-box {
    border-radius: $card-border-radius;
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
    padding: $card-content-padding;
    height: 100%;

    .title {
      font-size: 1.1rem;
      font-weight: bold;
      height: 50%;
      margin-bottom: 20px;
    }
  }
}

.image {
  width: 100%;
  padding-top: 100%;
  position: relative;
  div {
    position: absolute;
    top: 0;
    height: 100%;
    left: -50%;
    width: 200%;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
      width: auto;
    }
  }
}

.front {
  .tags {
    padding-left: $card-content-padding;
    padding-right: $card-content-padding;
    margin-bottom: $card-content-padding;
  }

  .tags-top {
    margin-top: $card-content-padding;
    z-index: 1;
    position: absolute;
  }
}

.tags {
  .tag-link {
    margin: 2px;
    transition: all 0.2s;
    color: blue;
    border-color: blue;
    border-radius: 20px;
    &:hover {
      background-color: blue;
      color: white;
      cursor: pointer;
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

.image {
  width: 100%;
  padding-top: 100%;
  position: relative;
}

.image > div {
  position: absolute;
  top: 0;
  height: 100%;
  left: -50%;
  width: 200%;
  display: flex;
  justify-content: center;
}

.image > div > img {
  height: 100%;
  width: auto;
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
</style>
