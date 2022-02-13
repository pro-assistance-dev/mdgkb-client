<template>
  <div class="card">
    <div class="flex-between-columm front">
      <div class="card-content">
        <div class="title">{{ title }}</div>
        <div v-for="document in documents" :key="document.name" class="text">
          {{ document.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IHospitalizationDocument from '@/interfaces/IHospitalizationDocument';

export default defineComponent({
  name: 'HospitalizationDocumentsCard',
  props: {
    documents: {
      type: Object as PropType<IHospitalizationDocument[]>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
$card-border-radius: 15px;
$card-content-padding: 15px;
$card-content-outpadding: 0px;
$card-width: 300px;

.card {
  background: #ffffff;
  background-clip: padding-box;
  border-radius: 5px;
  border: rgba(0, 0, 0, 0.05) solid 1px;
  height: 100%;
  width: $card-width;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px, rgba(0, 0, 0, 0.1) 0px -1px 3px, rgba(0, 0, 0, 0.1) 0px 4px 6px,
      rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.1) 0px -3px 5px;
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
    padding-left: $card-content-padding;
    padding-right: $card-content-padding;
    max-height: 200px;
    overflow: hidden;
    overflow-wrap: break-word;
    background: #ffffff;
    height: 100%;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #343e5c;
      margin-top: 10px;
    }

    .text {
      font-size: 14px;
      font-weight: normal;
      color: #4a4a4a;
      margin-top: 5px;
      :deep(p) {
        margin: 0;
      }
    }
  }
}
</style>
