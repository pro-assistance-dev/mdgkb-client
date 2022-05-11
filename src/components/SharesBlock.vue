<template>
  <div class="card-meta share">
    <div style="margin-right: 5px">Поделиться:</div>
    <ShareNetwork v-for="share in shares" :key="share.name" :network="share.name" :url="url" :title="title" :description="description">
      <div class="share-item">
        <img class="black" :src="require(`@/assets/img/social/${share.icon}.webp`)" :alt="share.name" />
        <img class="colored" :src="require(`@/assets/img/social/${share.icon}-colored.webp`)" :alt="share.name" />
      </div>
    </ShareNetwork>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SharesBlock',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  setup() {
    const shares = [
      // { name: 'facebook', icon: 'fb' },
      // { name: 'twitter', icon: 'twitter' },
      { name: 'VK', icon: 'vk' },
    ];
    return { shares };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}

.share {
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
    height: 25px;
  }
  .anticon {
    margin: 5px;
    font-size: 30px;
  }
  .share-item {
    display: flex;
    align-items: center;
    .colored {
      display: none;
    }
    &:hover {
      .colored {
        display: unset;
        transform: scale(1.1);
      }
      .black {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .share {
    display: flex;
    align-items: center;
    img {
      margin-left: 0px;
      height: 25px;
    }
    .anticon {
      margin: 5px;
      font-size: 30px;
    }
    .share-item {
      display: flex;
      align-items: center;
      .colored {
        display: none;
      }
      &:hover {
        .colored {
          display: unset;
          transform: scale(1.1);
        }
        .black {
          display: none;
        }
      }
    }
  }
}
</style>
