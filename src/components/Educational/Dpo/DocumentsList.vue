<template>
  <div class="table-container">
    <table class="table-list">
      <colgroup>
        <col width="5%" />
        <col width="70%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <th><h4></h4></th>
        <th><h4>НАЗВАНИЕ ДОКУМЕНТА</h4></th>
        <th><h4>НАЗНАЧЕНИЕ</h4></th>
        <th style="text-align: center"><h4>ДЕЙСТВИЕ</h4></th>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.id">
          <td>
            <div class="svg-box">
              <svg class="icon-doc">
                <use xlink:href="#document"></use>
              </svg>
            </div>
          </td>
          <td>
            {{ document.name }}
          </td>
          <td>ДПО</td>
          <td style="text-align: center">
            <a class="download" :href="document.documentsScans[0]?.scan.getFileUrl()" target="_blank">Скачать</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="document" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 22">
      <path
        d="M20.0781 6.39375L14.6094 1.58125C14.4531 1.44375 14.2969 1.375 14.0625 1.375H6.25C5.39062 1.375 4.6875 1.99375 4.6875 2.75V19.25C4.6875 20.0063 5.39062 20.625 6.25 20.625H18.75C19.6094 20.625 20.3125 20.0063 20.3125 19.25V6.875C20.3125 6.66875 20.2344 6.53125 20.0781 6.39375ZM14.0625 3.025L18.4375 6.875H14.0625V3.025ZM18.75 19.25H6.25V2.75H12.5V6.875C12.5 7.63125 13.2031 8.25 14.0625 8.25H18.75V19.25Z"
      ></path>
      <path d="M7.8125 15.125H17.1875V16.5H7.8125V15.125ZM7.8125 11H17.1875V12.375H7.8125V11Z"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'DocumentsList',
  props: {
    documents: {
      type: Array as PropType<Document[]>,
      required: false,
      default: () => [],
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
