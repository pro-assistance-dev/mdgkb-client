<template>
  <div class="size">
    <NmoCourseInfo :course="nmoCourse" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import NmoCourse from '@/classes/NmoCourse';
import NmoCourseInfo from '@/components/Educational/Dpo/NmoCourseInfo.vue';
import chooseRandomBrandColor from '@/services/brandColors';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'NmoCoursePage',
  components: { NmoCourseInfo },

  setup() {
    const nmoCourse: Ref<NmoCourse> = computed<NmoCourse>(() => Provider.store.getters['nmoCourses/item']);

    const load = async () => {
      Provider.filterQuery.value.setParams(Provider.schema.value.nmoCourse.id, Provider.route().params['id'] as string);
      await Provider.store.dispatch('nmoCourses/get', Provider.filterQuery.value);
    };

    Hooks.onBeforeMount(load);

    return {
      chooseRandomBrandColor,
      nmoCourse,
    };
  },
});
</script>

<style scoped lang="scss">
$side-container-max-width: 300px;
$medical-profile-content-max-width: 1000px;
$card-margin-size: 30px;

.bottom-footer {
  margin-top: 20px;
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
  width: 100%;
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
  width: $side-container-max-width;
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

// :deep(a) {
//   color: inherit !important;
// }

:deep(blockquote) {
  border-left: 5px solid #2467a6;
  margin-left: 0;
  padding-left: 50px;
}

.recent-news-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: pointer;
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
  width: 248px;
  button {
    width: 100%;
    background-color: #2754eb;
    border-radius: 5px;
    color: #ffffff;
    padding: 12px 0px;
    font-size: 14px;
    border: none;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(#2754eb, 10%);
    }
  }
}

/* .card-meta {
  display: flex;
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
} */
:deep(.response-btn) {
  border-radius: 20px;
  background-color: #31af5e;
  padding: 10px 20px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgb(black, 0.05);
  &:hover {
    cursor: pointer;
    background-color: lighten(#31af5e, 10%);
  }
}

.right-block {
  width: 100%;
  .card-item {
    margin-bottom: 20px;
  }
}

.article-body {
  min-height: 53.5vh;
}

.button-block {
  display: block;
  width: 100%;
}

@media screen and (max-width: 900px) {
  .medical-profile-page-container {
    display: block;
  }
  .side-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin-right: 0px;

    .side-item {
      margin-bottom: $card-margin-size;
    }
  }

  .recent-news-footer {
    margin: 10px;
    margin-bottom: 15px;
    text-align: center;
    width: 32%;
    button {
      width: 100%;
      background-color: #2754eb;
      border-radius: 5px;
      color: #ffffff;
      padding: 12px 0px;
      font-size: 14px;
      border: none;
      transition: background-color 0.25s ease;
      &:hover {
        cursor: pointer;
        background-color: darken(#2754eb, 10%);
      }
    }
  }
  .button-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

@media screen and (max-width: 640px) {
  .recent-news-footer {
    margin: 0px;
    margin-bottom: 15px;
    text-align: center;
    width: 100%;
    button {
      width: 100%;
      background-color: #2754eb;
      border-radius: 5px;
      color: #ffffff;
      padding: 12px 0px;
      font-size: 14px;
      border: none;
      transition: background-color 0.25s ease;
      &:hover {
        cursor: pointer;
        background-color: darken(#2754eb, 10%);
      }
    }
  }

  .button-block {
    display: block;
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  :deep(.response-btn) {
    font-size: 12px;
    border-radius: 20px;
    background-color: #31af5e;
    padding: 0 10px;
    height: 30px;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
  }

  :deep(.card-item) {
    padding: 15px 5px;
  }
  h3 {
    font-size: 18px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
