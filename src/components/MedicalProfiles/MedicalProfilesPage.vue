<template>
  <div v-if="mounted" class="medical-profile-page-container">
    <div class="side-container hidden-md-and-down">
      <div v-if="medicalProfile.medicalProfilesDivisions.length" class="side-item">
        <div class="card-item">
          <h4 class="card-item-title">Отделения по профилю</h4>
          <el-divider />

          <el-table :data="medicalProfile.medicalProfilesDivisions" cell-class-name="cell-row" :show-header="false">
            <el-table-column>
              <template #default="scope">
                <div class="recent-news-item" @click="$router.push(`/divisions/${scope.row.division.id}`)">
                  <div class="item-title">{{ scope.row.division.name }}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="recent-news-footer">
            <button @click="$router.push('/divisions')">Все отделения</button>
          </div>
        </div>
      </div>
      <div v-if="medicalProfile.medicalProfilesNews.length" class="side-item">
        <div class="card-item">
          <h4 class="card-item-title">Новости медицинского профиля</h4>
          <el-divider />
          <el-table :data="medicalProfile.medicalProfilesNews" cell-class-name="cell-row" :show-header="false">
            <el-table-column>
              <template #default="scope">
                <div class="recent-news-item" @click="$router.push(`/news/${scope.row.news.slug}`)">
                  <div class="item-title">{{ scope.row.news.title }}</div>
                  <div class="item-footer">
                    <div class="item-date">{{ $dateFormatRu(scope.row.news.publishedOn, true) }}</div>
                    <div class="icon">
                      <EyeOutlined />
                      <span>{{ scope.row.news.viewsCount }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="recent-news-footer">
            <button @click="$router.push('/news')">Все новости</button>
          </div>
        </div>
      </div>
    </div>
    <div class="medical-profile-content-container">
      <div class="card-item" style="padding: 30px">
        <div class="card-header">
          <h2 class="title article-title">{{ medicalProfile.name }}</h2>
        </div>
        <el-divider />
        <div class="title-icon">
          <BaseIcon width="120" height="120" color="#ffffff" :background:="chooseRandomBrandColor()" :icon-name="medicalProfile.icon">
            <HelpProfileIcon :svg-code="medicalProfile.svgCode" />
          </BaseIcon>
        </div>
        <div class="article-body" v-html="medicalProfile.description"></div>
        <el-divider />
        <div class="bottom-footer">
          <div></div>
          <div class="card-meta share">
            <div style="margin-right: 5px">Поделиться:</div>
            <SharesBlock :title="medicalProfile.name" :description="medicalProfile.description" :url="getUrl()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import BaseIcon from '@/components/Base/MedicalIcons/BaseIconMedicalProfiles.vue';
import HelpProfileIcon from '@/components/Base/MedicalIcons/icons/HelpProfileIcon.vue';
import SharesBlock from '@/components/SharesBlock.vue';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import chooseRandomBrandColor from '@/mixins/brandColors';
export default defineComponent({
  name: 'MedicalProfileList',
  components: { SharesBlock, BaseIcon, HelpProfileIcon, EyeOutlined },
  setup() {
    const store = useStore();
    const route = useRoute();
    const mounted: Ref<boolean> = ref(false);
    const medicalProfile: ComputedRef<IMedicalProfile> = computed(() => store.getters['medicalProfiles/item']);

    onBeforeMount(async () => {
      await store.dispatch('medicalProfiles/get', route.params['id']);
      mounted.value = true;
    });

    const getUrl = (): string => {
      const host = process.env.VUE_APP_API_HOST;
      return `${host}/medical-profiles/${route.params['id']}`;
    };

    return { chooseRandomBrandColor, mounted, medicalProfile, getUrl };
  },
});
</script>

<style scoped lang="scss">
$side-container-max-width: 300px;
$medical-profile-content-max-width: 1000px;
$card-margin-size: 30px;

.bottom-footer {
  display: flex;
  justify-content: space-between;
}
.title-icon {
  text-align: center;
  float: left;
  padding: 20px;
  background: #2754eb;
  border-radius: 5px;
  margin: 30px;
}

.article-title {
  color: #4a4a4a;
}

.card-item-title {
  color: #4a4a4a;
}

.medical-profile-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-container-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.medical-profile-content-container {
  max-width: $medical-profile-content-max-width;
  width: 100%;
}

.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2,
h3 {
  margin-top: 0;
  color: black;
  text-align: center;
}
h3 {
  font-size: 20px;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

:deep(p) {
  text-align: justify;
}

:deep(a) {
  color: inherit !important;
}

:deep(blockquote) {
  border-left: 5px solid #2467a6;
  margin-left: 0;
  padding-left: 50px;
}

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
    background-color: #2754eb;
    border-radius: 40px;
    color: #ffffff;
    padding: 12px 23px;
    font-size: 14px;
    border: none;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(#2754eb, 10%);
    }
  }
}

.card-meta {
  display: flex;
  margin-top: 10px;
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
</style>
