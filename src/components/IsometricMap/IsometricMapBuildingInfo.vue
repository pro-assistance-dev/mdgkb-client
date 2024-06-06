<template>
  <el-card id="ppvr" class="card-container">
    <div class="description-point">
      <div class="left">
        <div class="dp-item">
          <h4 class="grey">Здание:</h4>
          <h4 class="black">{{ building.name }}</h4>
        </div>
        <div class="dp-item">
          <h4 class="grey">Этажей:</h4>
          <h4 class="black">{{ building.floors.length }}</h4>
        </div>
      </div>
      <div class="right">
        <div class="building-number">{{ building.number }}</div>

        <div class="button-field">
          <BaseModalButtonClose @click.prevent="$emit('close')" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import Building from '@/classes/Building';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import Provider from '@/services/Provider/Provider';
const emit = defineEmits(['close']);
// const filterString: Ref<string> = ref('');

const building: ComputedRef<Building> = computed<Building>(() => Provider.store.getters['buildings/item']);

// const divisionsFilter = (division: Division): boolean => {
//   if (filterString.value.length === 0) {
//     return true;
//   }
//   return division.name.toLowerCase().includes(StringsService.translit(filterString.value.toLowerCase()));
// };
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
#ppvr {
  // position: absolute;
}
$card-content-padding: 24px;
$card-content-outpadding: 24px;

.card-container {
  border: 1px solid rgb(black, 0.2);
  border-radius: $border-radius;
  width: 100%;
  zz-index: 1000;
  .floor-number {
    font-size: 14px;
    text-transform: uppercase;
    padding: 5px 50px 5px 24px;
  }

  &.card-flat {
    box-shadow:
      0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
    border-radius: 1px;
  }

  &.is-info {
    background: white;
    * {
      color: white;
    }
    .card-header {
      border-bottom: none;
      padding-top: 10px;
    }
    .card-content {
      padding-top: 0;
      padding-bottom: 10px;
    }
  }
  :deep(.el-card__body),
  :deep(.el-card__header) {
    padding: 0;
  }

  .card-header {
    box-shadow: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-button {
      border: none;
      font-size: 25px;
    }
    .card-header-title {
      padding-left: 24px;
      font-weight: 400;
      text-transform: uppercase;
      font-size: 14px;
      &.two-lined {
        div {
          width: 100%;
          small {
            font-size: 12px;
            color: #9c9c9c;
            font-weight: 100;
            display: block;
            &.is-large {
              font-size: 12px;
              font-weight: 400;
            }
          }
        }
      }
    }
  }

  .card-image {
    .image {
      width: calc(100% + 1px);
    }
  }

  .panel-card {
    margin-top: $card-content-outpadding;
    margin-bottom: $card-content-outpadding;
    border: none;
    box-shadow: none;
    overflow: hidden;

    .panel-block {
      padding: 5px;
      box-shadow: none;
      border-radius: 0;
      text-transform: uppercase;
      opacity: 0.6;
      font-size: 12px;
      padding-left: 24px;
      position: relative;
      padding-right: 50px;
    }
  }

  .panel-block:hover {
    cursor: pointer;
    content: '\ea1c';
    background: #e4e5e7;
    border-bottom-color: darken(#e4e5e7, 20);
  }

  .card-content {
    &.border-top {
      border-top: solid 1px #f1f1f1;
    }

    &.darken {
      background: #e4e5e7;

      &.border-top {
        border-top: solid 1px #bfc4ce;
      }
    }

    &.darken-soft {
      background: #f3f4f6;

      &.border-top {
        border-top: solid 1px #e2e2e2;
      }
    }

    .card-time {
      .label {
        text-align: center;
        font-weight: 100;
        opacity: 0.65;
      }

      .interval {
        text-align: center;

        .divider {
          font-weight: 300;
          opacity: 0.65;
          font-size: 1.2rem;
          padding-left: 10px;

          &:first-child {
            padding-left: 0;
          }
        }
        .time {
          font-size: 2.3rem;
          font-weight: 100;
        }
      }
    }
  }

  .card-meta {
    font-size: 1rem;
    opacity: 0.75;

    i {
      font-size: 1.5rem;
    }

    .column {
      * {
        vertical-align: sub;
      }

      &:not(:last-child):not(:first-child) {
        text-align: center;
      }

      &:last-child {
        text-align: right;
      }
    }
  }

  .article-body {
    margin: 0 6rem;
    font-size: 0.8rem;
    line-height: 1.6rem;
    text-align: justify;
  }

  .division-info {
    line-height: 1.2rem;
    font-size: 0.9rem;
    p {
      margin-bottom: 12px;
    }
    li {
      margin-bottom: 12px;
    }
  }
}

.card.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
}
.card.is-horizontal .card-image {
  flex: 1;
  flex-shrink: 1;
}
.card.is-horizontal .card-image .image {
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.card.is-horizontal .card-image .image img {
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.card.is-horizontal .card-content {
  flex: 3;
}

.description-point {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: block;
  justify-content: left;
  width: 70%;
  margin: 10px 10px 10px 20px;
}

.right {
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 30%;
  margin: 0;
}

.dp-item {
  display: flex;
  justify-content: left;
  align-items: center;
}

.grey {
  min-width: 65px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  text-transform: uppercase;
  color: $site_gray;
  font-weight: normal;
}

.black {
  margin: 0 0 0 5px;
  padding: 0;
  font-size: 14px;
  color: $site_dark_gray;
  font-weight: normal;
}

.building-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgb(black, 0.2);
  border-radius: 15px;
  font-weight: bold;
  color: #f30012;
}

.button-field {
  position: absolute;
  top: -8px;
  right: 8px;
}
</style>
