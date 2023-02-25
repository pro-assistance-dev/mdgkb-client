<template>
  <div class="spec-serv-card card-hover" @click="toLink">
    <div class="spec-serv-card-img">
      <img v-if="item.fileInfo && item.fileInfo.fileSystemPath" :src="item.fileInfo.getImageUrl()" />
      <img v-else-if="item.imgName" :src="require(`@/assets/img/main-page/templates/${item.imgName}`)" />
      <img v-else src="@/assets/img/310x310.webp" />
    </div>
    <div class="spec-serv-card-container">
      <div class="spec-serv-card-title">{{ item.title }}</div>
      <div class="spec-serv-card-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ISpecialService from '@/interfaces/ISpecialService';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'SpecialServiceCard',
  props: {
    item: {
      type: Object as PropType<ISpecialService>,
      required: true,
    },
  },
  setup(props) {
    const toLink = () => {
      if (props.item.link) {
        Provider.router.push(props.item.link);
      }
    };
    return {
      toLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.spec-serv-card {
  margin-left: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  max-width: 270px;
  border-radius: 5px;
  // height: 360px;
  &-img {
    width: 100%;
    height: 180px;
    background-position: bottom;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px 5px 0 0;
    }
  }
  &-container {
    border: rgba(0, 0, 0, 0.05) solid 1px;
    border-top: unset;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    background-clip: padding-box;
  }
  &-title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }
  &-content {
    font-size: 11px;
  }

  .spec-serv-card:first-child {
    margin-left: 0;
  }
}
</style>
