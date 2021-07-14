<template>
  <el-card id="ppvr" class="card" :style="`left: ${position.left}px; top: ${position.top}px;`">
        <p class="card-header-title">
          {{building.name}}
        </p>
    <el-divider class="divider"/>
        <div v-html="building.description"></div>
        <article class="panel panel-card is-light">
          <div @click="$router.push(`/divisions/${item.id}`)" class="panel-block" v-for="item in divisions" :key="`${building.id}.${item.id}`">
            {{item.name}}
          </div>
        </article>
    <el-divider class="divider" />
    <div class="centered-button">
        <el-button    plain @click.prevent="$emit('close')">Закрыть</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "MapPopover",
    props: ['position', 'building', 'divisions']
  }
</script>

<style scoped lang="scss">
  #ppvr {
    position: absolute;
    max-width: 30vw;

    .centered-button {
      text-align: center;
    }

  }
  $card-border-radius: 15px;
  $card-content-padding: 24px;
  $card-content-outpadding: 24px;

  .card {
    border-radius: $card-border-radius;

    &.card-flat{
      box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
      border-radius: 1px;
    }

    &.is-info{
      background: white;
      *{
        color: white;
      }
      .card-header{
        border-bottom: none;
        padding-top: 10px;
      }
      .card-content{
        padding-top: 0;
        padding-bottom: 10px;
      }
    }


    .card-header{
      box-shadow: none;
      border-bottom: solid 1px #f1f1f1;
      .card-header-title{
          margin: 5px 5px;
        width: 100%;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 0.80rem;
        &.two-lined{
          div {
            width: 100%;
            small {
              font-size: 0.70rem;
              color: #9c9c9c;
              font-weight: 100;
              display: block;
              &.is-large{
                font-size: 0.9rem;
                font-weight: 400;
              }
            }
          }
        }
      }
    }

    .card-image{
      .image{
        width: calc(100% + 1px);
      }
    }


    .panel-card {
      margin-top: $card-content-outpadding ;
      margin-bottom: $card-content-outpadding ;
      border: none;
      box-shadow:none;
      overflow: hidden;
        border-radius: $card-border-radius;

        .panel-block{
            padding: 5px;
        box-shadow: none;
        border-radius: 0;
        text-transform: uppercase;
        opacity: 0.6;
        font-size: 0.80rem;
        padding-left: 24px;
        position: relative;
        padding-right: 50px;

      }
    }

      .panel-block:hover{
          cursor: pointer;
          content: "\ea1c";
          background: #e4e5e7;
          border-bottom-color: darken(#e4e5e7, 20);
      }

    .card-content{

      &.border-top{
        border-top: solid 1px #f1f1f1;
      }

      &.darken{
        background: #e4e5e7;

        &.border-top{
          border-top: solid 1px #bfc4ce;
        }
      }

      &.darken-soft{
        background: #f3f4f6;

        &.border-top{
          border-top: solid 1px #e2e2e2;
        }
      }

      .card-time{
        .label {
          text-align: center;
          font-weight: 100;
          opacity: 0.65;
        }

        .interval{
          text-align: center;

          .divider{
            font-weight: 300;
            opacity: 0.65;
            font-size: 1.2rem;
            padding-left: 10px;

            &:first-child{
              padding-left: 0;
            }
          }
          .time{
            font-size: 2.3rem;
            font-weight: 100;
          }
        }
      }

      &:last-child{
        border-bottom-right-radius: $card-border-radius;
        border-bottom-left-radius: $card-border-radius;
      }
    }

    .card-meta{
      font-size: 1rem;
      opacity: 0.75;

      i {
        font-size: 1.5rem;
      }

      .column {
        * {
          vertical-align: sub;
        }

        &:not(:last-child):not(:first-child){
          text-align: center;
        }

        &:last-child{
          text-align: right;
        }
      }
    }

    .article-body{
      margin: 0 6rem;
      font-size: 0.8rem;
      line-height: 1.6rem;
      text-align: justify;
    }

    .division-info{
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


</style>
