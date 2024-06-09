<template>
  <div id="container" class="relative-container">
    <div v-if="menu.sections.length && menu.showContent" class="sticky-container">
      <div class="top-list">
        <PButton v-if="!opened && menu.sections.length" skin="text" type="neutral" text="Показать содержание" margin="0"
          @click="isOpen" />
        <PButton v-if="opened && menu.sections.length" skin="text" type="neutral" text="Скрыть содержание" margin="0"
          @click="isOpen" />
        <PButton v-if="menu.sections.length" skin="text" type="neutral" text="Вверх" margin="0"
          @click="(opened = false), $scroll('#container', -200)" />
      </div>
      <div v-if="opened" class="abs">
        <div v-if="menu.sections.length" class="list">
          <div v-for="section in menu.sections" :key="section" class="list-item"
            @click="(opened = false), $scroll('#card-item' + section.id, -95)">
            {{ section.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="card-item">
      <h2>{{ menu.name }}</h2>
      <div v-if="menu.text.length" v-html="menu.text" />
    </div>

    <div v-if="!collaps">
      <div v-for="section in menu.sections" :id="'card-item' + section.id" :key="section" class="card-item">
        <h2>{{ section.name }}</h2>
        <div v-html="section.text" />
        <ul>
          <li v-for="file in section.documents" :key="file.id">
            <a :target="file.scan.isPdf() ? '_blank' : '_self'" :download="file.scan.originalName"
              :href="file.scan.getFileUrl()">
              {{ file.getFileName() }}
            </a>
          </li>
        </ul>
        <ImageGallery :images="section.pageSectionImages" />
      </div>
    </div>
    <div v-else>
      <div v-for="section in menu.sections" :id="'card-item' + section.id" :key="section" class="margin-container">
        <CollapseItem :tab-id="1036">
          <template #inside-title>
            <div class="title-in">{{ section.name }}</div>
          </template>
          <template #inside-content>
            <div class="background-container">
              <div v-if="section.description !== '<p>undefined</p>'" v-html="section.description"></div>
              <ul>
                <li v-for="file in section.pageSectionDocuments" :key="file.id">
                  <a :target="file.scan.isPdf() ? '_blank' : '_self'" :download="file.scan.originalName"
                    :href="file.scan.getFileUrl()">{{
                      file.getFileName()
                    }}</a>
                </li>
              </ul>
              <ImageGallery :images="section.pageSectionImages" />
            </div>
          </template>
        </CollapseItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageSection from '@/services/classes/page/PageSection';
import getExtention from '@/services/GetExtension';
import scroll from '@/services/Scroll';
import Strings from '@/services/Strings'

const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
  description: {
    type: String as PropType<string>,
    required: true,
  },
  menu: {
    type: Array as PropType<PageSection[]>,
    required: true,
  },
  collaps: {
    type: Boolean,
    default: false,
    required: false,
  },
  showContent: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const description = computed(() => {
  return Strings.SearchIn(props.menu.description, page.value.filterStr) ? props.menu.description : ""
})

const page: ComputedRef<Page> = Store.Item('pages')

const getWithSearch = (text: string) => {
  return text
}
const opened = ref(false);

const isOpen = () => {
  opened.value = !opened.value;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

:deep(.search-text) {
  color: red;
  background-color: blue;
}

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
  border-radius: none;
  // border-bottom: none;
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
  border: 1px solid $base-light-font-color;
  color: $base-light-font-color;
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

:deep(.title-in) {
  padding: 0 100px 0 0px;
  font-weight: normal;
  font-size: 18px;
}

.relative-container {
  position: relative;
}

.top-list {
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0;
}

.background-container {
  width: auto;
  margin: 20px;
}

.sticky-container {
  position: sticky;
  top: 58px;
  background: #ffffff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid #e9e9e9;
  border-bottom: none;
  border-top: none;
  margin-bottom: -25px;
  margin-top: 0px;
  z-index: 1;
}

.list {
  max-height: 500px;
  overflow-y: scroll;
  font-size: 14px;
  border-top: 1px solid #e9e9e9;
  box-shadow: 0 6px 2px -2px rgba(0, 0, 0, 0.15);
}

.list-title {
  width: 160px;
  cursor: pointer;
  color: #a3a5b9;
  padding: 3px 0 0px 0;
  font-size: 14px;
}

.list-up {
  cursor: pointer;
  color: #a3a5b9;
  margin-left: 5px;
  padding: 3px 10px 0px 0;
  font-size: 14px;
}

.list-item {
  margin-left: 20px;
  padding: 3px 10px;
  cursor: pointer;
  color: #91929c;
}

.list-item:hover {
  margin-left: 20px;
  padding: 3px 10px;
  cursor: pointer;
  color: #0a216f;
}

.description {
  padding: 0 20px;
  background: #ffffff;
}

.abs {
  width: 100%;
  position: absolute;
  top: 24px;
  left: 0px;
  background: #ffffff;
  border-bottom: 1px solid #e9e9e9;
}
</style>
