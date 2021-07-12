<template>
    <div>
        <el-table
            ref="table"
            :data="normativeDocuments"
            class="table-shadow"
            header-row-class-name="header-style"
            row-class-name="no-hover"
    >
            <el-table-column label="НАИМЕНОВАНИЕ" sortable prop="name" align="left" min-width="130" width="800" resizable />
        <el-table-column width="100" fixed="right" align="center">
            <template #default="scope">
                    <a  v-if="scope.row.file_object" :href="getFileUrl(scope.row.file_object.filename_disk)"
                    :download="scope.row.file_object.filename_download"
                    target="_blank" class="button is-small is-fullwidth is-info has-margin-bottom-3 is-light  rounded-all-5">
                        <el-button icon="el-icon-download"  >
                    Скачать
                        </el-button>
                </a>
                <el-button icon="el-icon-download" @click="modalOpen = !modalOpen">
                    Просмотр
                </el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-dialog v-model="modalOpen">
            <div>
                <div class="content" style="min-height: 80vh">
<!--                    <template v-if="['doc','docx','xls','xlsx'].includes(scope.row.file_object.extension)">-->
<!--                        <iframe-->
<!--                                :src='`https://docs.google.com/gview?url=http://45.67.57.208:8010/${scope.row.file_object.url}&embedded=true`'-->
<!--                                style="width: 100%;height: 80vh" frameborder='0'>This is an embedded <a target='_blank'-->
<!--                                                                                                        href='http://office.com'>Microsoft-->
<!--                            Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office-->
<!--                            Online</a>.-->
<!--                        </iframe>-->
<!--                    </template>-->
                    <div v-if="['pdf'].includes(scope.row.file_object.extension)">
                        <pdf :src="`http://localhost:8083/originals/${scope.row.file_object.filename_disk}`"></pdf>
                    </div>
<!--                    <template v-else-if="['png', 'jpg', 'jpeg'].includes(document.file_object.extension)">-->
<!--                        <img :src="`http://45.67.57.208:8010/originals/${document.file_object.filename_disk}`"/>-->
<!--                    </template>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { useStore,  } from 'vuex';
    import {ref} from 'vue'

    export default {
        name: 'NormativeDocuments',
        async setup() {
            let fileUrl = ref('')
            let modalOpen = ref(false)
            const store = useStore();
            await store.dispatch('normativeDocuments/getAll');
            const normativeDocuments = store.getters['normativeDocuments/items'];

            const getFileUrl = (name: string): string => {
                return `${process.env.VUE_APP_STATIC_URL}/${name}`
            }

            return {
                getFileUrl,
                fileUrl,
                modalOpen,
                normativeDocuments,
            };
        },
    };
</script>

<style scoped>

</style>
