<template>
  <div>
    <pdf
      v-for="pageNumber in pagesCount"
      :key="pageNumber"
      :src="filePath"
      :page="pageNumber"
      style="border: solid; border-width: 1px"
    ></pdf>
  </div>
</template>

<script lang="ts">
import pdf from '@jbtje/vue3pdf';
import { defineComponent, onMounted, PropType, ref } from 'vue';

export default defineComponent({
  name: 'NormativeDocumentsModal',
  components: { pdf },
  props: {
    filePath: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    let pagesCount = ref(0);
    const loadingTask = pdf.createLoadingTask(props.filePath);

    onMounted(async () => {
      loadingTask.promise.then((source: { numPages: number }) => {
        pagesCount.value = source.numPages;
      });
    });

    return {
      pagesCount,
    };
  },
});
</script>
