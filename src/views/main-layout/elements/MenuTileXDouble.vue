 <template>
  <div id="item" @click.stop="(!expand?$emit('done'):null),expand = !expand" :class="`${expand?'active':''} ff${pad(item_key + 1)}`">
    <div id="inner">
      <div id="icon">
        <component :is="svg"></component>
      </div>
      <div id="label">
        {{item.label}}
      </div>

      <div id="blocks">
        <div class="doubleblock" v-for="block in item.blocks" :style="`background-image: url(/images/megamenu/banner/${block.bg})`" @mouseenter="enableEvents?hoveredBlock = block:null" @mouseleave="enableEvents?hoveredBlock = null:null" :class="{shaded:hoveredBlock !== null && hoveredBlock !== block}">
          <div class="doubleblock-label">
            <span>
                {{block.label}}
            </span>
          </div>
          <div class="spacer"></div>
          <div class="doubleblock-actions">
            <a href="#" class="button is-primary is-rounded is-small">Подробнее</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MenuTileXDouble",
    data() {
      return {
        expand: false,
        hoveredBlock: null,
        enableEvents: false,
      }
    },
    props: ['item_key', 'item'],
    methods: {
      pad(num) {
        return String(num).padStart(2, '0');
      }
    },
    computed: {
      svg() {
        let item = require(`../../../../static/images/megamenu/icon/${this.pad(this.item_key + 1)}.svg`);
        return item;
      }
    },
    mounted() {
      let that = this;
      this.$parent.$on('kill', function(){
        that.expand = false;
      })

      this.$parent.$on('done', function(){
        that.expand = false;
      })
    },
    watch:{
      expand: function(nv){
        if(nv === true){
          setTimeout(() => this.enableEvents = true, 1000);
        } else {
          this.enableEvents = false;
        }
      }
    }
  }
</script>

<style scoped>
  #item {
    background-size: cover;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    max-width: 144px;
    max-height: 144px;
    background-color: rgba(240, 242, 247, 1);
    cursor: pointer;
  }

  #item.active {
    grid-row: 3 / 1;
    grid-column: 6 / 1;
    max-width: 100%;
    max-height: 100%;
  }






  #inner {
    padding: 15px;
    height: 100%;

  }

  #icon {
    position: relative;
    z-index: 0;
    opacity: 1;
    transition: all 1s;
  }

  #icon svg {
    width: 32px;
  }

  #item.active #icon{
    opacity: 0;
  }

  #label{
    height: 76px;
    width: 100px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    display: flex;
    align-items: flex-end;
    transition: all 0.5s;
    transform: scale(1) translate(0, 0);
    transform-origin: 0 0;
    position: absolute;
  }

  #item.active #label{
    bottom: 75%;
    width: 312px;
    transform: scale(1.5) translate(60%, -53px);
    color:#fff;
    z-index: 20;
  }




  #item.active #icon svg path,#item.active #icon svg circle{
    transition: fill 1s;
  }

  #item.active #icon svg path,#item.active #icon svg circle{
    fill: #ffffff;
  }

  .ff01 svg path, .ff01 svg circle{
    fill: #6201e9;
  }
  .ff02 svg path, .ff02 svg circle{
    fill: #ee7d9e;
  }
  .ff03 svg path, .ff03 svg circle{
    fill: #fac808;
  }
  .ff04 svg path, .ff04 svg circle{
    fill: #2753eb;
  }
  .ff05 svg path, .ff05 svg circle{
    fill: #eaadee;
  }
  .ff06 svg path, .ff06 svg circle{
    fill: #43ce37;
  }
  .ff07 svg path, .ff07 svg circle{
    fill: #9fc438;
  }
  .ff08 svg path, .ff08 svg circle{
    fill: #9375b1;
  }
  .ff09 svg path, .ff09 svg circle{
    fill: #01ceab;
  }
  .ff10 svg path, .ff10 svg circle{
    fill: #01bcee;
  }
  .ff11 svg path, .ff11 svg circle{
    fill: #e34b42;
  }
  .ff12 svg path, .ff12 svg circle{
    fill: #eaa674;
  }



  /*DOUBLE*/
  #item:not(.active) .doubleblock{
    opacity: 0;
  }

  #item.active .doubleblock{
    transition: all 1s;
  }

  div#blocks {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  #blocks .doubleblock{
    position: absolute;
    opacity: 1;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 76%;
    background-repeat: no-repeat;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  #blocks .doubleblock:first-child{
    left:0;
    width: 101%;
    clip-path: polygon(0 0, 76% 0, 24% 100%, 0% 100%);
  }

  #blocks .doubleblock:last-child{
    right: 0;
    clip-path: polygon(76% 0, 100% 0, 100% 100%, 24% 100%);
    background-position: right;
    flex-direction: column-reverse;
  }


  #blocks .doubleblock .doubleblock-label {
    color: white;
    width: 100%;
    display: flex;
  }

  #blocks .doubleblock .doubleblock-label span {
    display: inline-block;
    width: 25%;
    font-weight: bold;
  }

  #blocks .doubleblock:last-child .doubleblock-label {
    text-align: right;
    justify-content: flex-end;
  }

  #blocks .doubleblock:last-child .doubleblock-actions {
    text-align: right;
    justify-content: flex-end;
  }

  .doubleblock.shaded {
    filter: brightness(0.5);
  }
</style>
