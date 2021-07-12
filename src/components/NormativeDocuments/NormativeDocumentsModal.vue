<template>

<!--            <div>-->
<!--                <div class="content" style="min-height: 80vh">-->
<!--                    &lt;!&ndash;                    <template v-if="['doc','docx','xls','xlsx'].includes(scope.row.file_object.extension)">&ndash;&gt;-->
<!--                    &lt;!&ndash;                        <iframe&ndash;&gt;-->
<!--                    &lt;!&ndash;                                :src='`https://docs.google.com/gview?url=http://45.67.57.208:8010/${scope.row.file_object.url}&embedded=true`'&ndash;&gt;-->
<!--                    &lt;!&ndash;                                style="width: 100%;height: 80vh" frameborder='0'>This is an embedded <a target='_blank'&ndash;&gt;-->
<!--                    &lt;!&ndash;                                                                                                        href='http://office.com'>Microsoft&ndash;&gt;-->
<!--                    &lt;!&ndash;                            Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office&ndash;&gt;-->
<!--                    &lt;!&ndash;                            Online</a>.&ndash;&gt;-->
<!--                    &lt;!&ndash;                        </iframe>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </template>&ndash;&gt;-->
                    <div>
                        <pdf :src="`http://localhost:8083/originals/${fileName}`"></pdf>
                    </div>
<!--                    &lt;!&ndash;                    <template v-else-if="['png', 'jpg', 'jpeg'].includes(document.file_object.extension)">&ndash;&gt;-->
<!--                    &lt;!&ndash;                        <img :src="`http://45.67.57.208:8010/originals/${document.file_object.filename_disk}`"/>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </template>&ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->

</template>

<script lang="ts">
    import pdf from '@jbtje/vue3pdf'

    export default {
        name: 'NormativeDocumentsModal',
        components: {pdf},
        props: {
            fileName: {
                type: String,
                required: true,
            },
        },
    };
</script>

<style scoped>

</style>
