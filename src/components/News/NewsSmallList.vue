<template>
  <el-table :data="newsList" cell-class-name="cell-row" :show-header="false">
    <el-table-column>
      <template #default="scope">
        <div class="recent-news-item" @click="getNews(scope.row.id)">
          <div class="item-title">{{ scope.row.title }}</div>
          <div class="item-footer">
            <div class="item-date">
              {{ $dateTimeFormatter.format(scope.row.publishedOn, { month: 'long', day: 'numeric', year: 'numeric' }) }}
            </div>
            <div class="icon">
              <EyeOutlined />
              <span>{{ scope.row.viewsCount }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';

import News from '@/classes/News';
import router from '@/router';

export default defineComponent({
  name: 'NewsSmallList',
  components: { EyeOutlined },
  props: {
    main: {
      type: Boolean,
      default: false,
    },
    newsNumber: {
      type: Number,
      default: 3,
    },
    newsList: {
      type: Array as PropType<News[]>,
      required: true,
    },
  },
  setup() {
    const getNews = async (slug: string): Promise<void> => {
      await router.push(`/news/${slug}`);
    };

    return {
      getNews,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-item {
  padding: 0;
}
.recent-news-item {
  display: flex;
  flex-direction: column;
  .item-title {
    font-weight: 600;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .icon {
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin-right: 3px;
  }
  .anticon {
    padding-right: 5px;
    font-size: 16px;
  }
}
h4 {
  color: black;
  margin: 15px 0 0 10px;
}
.item-footer {
  color: #a1a7bd;
}

:deep(.cell-row) {
  cursor: pointer;
}
.el-divider {
  margin: 10px 0 0;
}
// :deep(.cell) {
// padding: 0 !important;
// }
.recent-news-footer {
  margin: 10px;
  margin-bottom: 15px;
  text-align: center;
  button {
    background-color: white;
    border-radius: 10px;
    padding: 7px 20px;
    font-size: 14px;
    border: 1px solid #4a4a4a;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(white, 10%);
    }
  }
}

:deep(.el-table),
:deep(.el-table__body-wrapper),
:deep(.el-table__body) {
  height: 100%;
}
</style>
