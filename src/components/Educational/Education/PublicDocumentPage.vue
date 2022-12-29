<template>
  <div class="card-item">
    <h2>{{ publicDocumentType.name }}</h2>
    <div v-if="publicDocumentType.description != '<p>undefined</p>'" v-html="publicDocumentType.description"></div>
  </div>
  <div v-for="docType in publicDocumentType.pageSections" :key="docType" class="card-item">
    <template v-if="docType.description != '<p>undefined</p>' && docType.description.length < 1000">
      <h2>{{ docType.name }}</h2>
      <div v-html="docType.description"></div>
    </template>
    <CollapsContainer v-if="docType.description.length > 1000" tab-id="400" :collapsed="false">
      <template #inside-title>
        <h2>{{ docType.name }}</h2>
      </template>
      <template #inside-content>
        <div v-html="docType.description"></div>
      </template>
    </CollapsContainer>

    <li v-for="file in docType.pageSectionDocuments" :key="file.id">
      <a v-if="file.downloadToFile" :download="file.scan.originalName" :href="file.scan.getFileUrl()">{{ file.name }}</a>
      <a v-else target="_blank" :href="file.scan.getFileUrl()">{{ file.name }}</a>
    </li>
    <ImageGallery :images="docType.pageSectionImages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import ImageGallery from '@/components/ImageGallery.vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import IPageSideMenu from '@/interfaces/IPageSideMenu';

export default defineComponent({
  name: 'PublicDocumentPage',
  components: { ImageGallery, CollapsContainer },
  props: {
    publicDocumentType: {
      type: Object as PropType<IPageSideMenu>,
      required: true,
    },
  },
  setup() {
    const mounted = ref(false);

    return {
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/styles/elements/doctor-info-card.scss';

h3 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 16px;
  font-weight: normal;
  color: #343e5c;
}

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}

.card-item {
  // width: 100%;
  border-radius: none;
  border-bottom: none;
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
}

table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
}

td {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
}

th {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
  text-align: left;
  padding: 2px 0 0 3px;
  background-color: #eff2f6;
  height: 20px;
}

th:first-child {
  border-radius: 5px 0 0 0;
}

th:last-child {
  border-radius: 0 5px 0 0;
}

tr {
  &:hover {
    background-color: #ecf5ff;
  }
}

.no-progmam {
  display: block;
  color: #b5b5b5;
}

.card-flex-container {
  display: block;
  padding: 0px;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

.icon-doc {
  width: 20px;
  height: 20px;
  fill: #343e5c;
}

.svg-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}

.download {
  cursor: pointer;
  padding: 7px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 40px;
  border: 1px solid #a3a9be;
  color: #a3a9be;
  align-items: center;
  background: #eff2f6;
}

.download:hover {
  background: #ffffff;
}

.sort {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 60px;
  background: #f6f6f6;
}

.sort-item-2 {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
}

.item-3 {
  width: auto;
  display: flex;
  margin-right: 20px;
}

.item-4 {
  width: 188px;
  display: flex;
}
</style>
