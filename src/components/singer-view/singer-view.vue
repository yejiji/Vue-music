<template>
    <div class="singertype-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" >歌手列表</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper" ref="playitem">
                <ul>
                    <li  class="playItem" v-for="stype in singerList" @click="selectSinger(stype)">
                        {{stype.name}}
                    </li>
                </ul>
      </div>
      <div class="filter" ref="filter"></div>
    </div>

      <div class="bg-layer" ref="layer">

      </div>
        <Scroll :data="singers" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
          <div class="singer-list-wrapper">
              <list-view :singers="singers" @select="selectItem"></list-view>
          </div>
        </Scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import listView from "base/listview/listview"
    import Scroll from 'base/scroll/scroll'
    import {prefixStyle} from 'common/js/domTool'
    const transform = prefixStyle('transform')
    const backdrop = prefixStyle('backdrop-filter')
    import {mapMutations} from 'vuex'
    const RESERVED_HEIGHT = 40

export default {
  props:{
      singerList:{
          type: Array,
          default : []
      },
      singers:{
          type: Array,
          default: []
      }
  },
  data(){
      return {
          scrollY : 0
      }
  },
  created() {
      this.probeType = 3
      this.listenScroll = true
  },
  computed: {
      bgStyle() {
        return `background-image:url(./background.png)`
      }
    },
  methods:{
      selectSinger(stype){
        this.$emit('selectsinger', stype)
      },
      selectItem(item,index){
        this.$router.push({
              path:`/singerDetail`
          })
        this.setSinger(item)  
      },
      back(){
          this.$router.back()
      },
      scroll(pos) {
          this.scrollY = pos.y
      },
     ...mapMutations({
          setSinger : 'SET_SINGER'
      })
      
  },
      mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    watch:{
           scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal)

        let zIndex = 0


        if (newVal > 0) {

          zIndex = 10
        }

        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        if (newVal < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playitem.style.display = 'none'

        } else {
          this.$refs.bgImage.style.paddingTop = '80%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playitem.style.display = ''
        }
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
  components:{
      listView,
      Scroll
  }
}

</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .singertype-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fafafa
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: #ffffff
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 80%
      transform-origin: top
      background-size: cover
      background-image:url(./background.png)
      .play-wrapper
        position: absolute
        bottom: 1px
        z-index: 50
        width: 100%
        padding-left 5px
        .playItem
          display: inline-block
          width: 32%
          height: 40px
          line-height: 40px
          text-align: center 
          margin-right: 2px
          margin-bottom: 2px
          background: #83818730
          overflow hidden
          color: #dddddd
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #31c27c
    .bg-layer
      position: relative
      height: 100%
      background: #fafafa
    .list
      position :fixed
      top :0
      bottom :0
      width :100%
      background #fafafa
      .singer-list-wrapper
        padding 20px 30px        
</style>

