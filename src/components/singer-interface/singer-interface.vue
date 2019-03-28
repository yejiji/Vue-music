<template>
    <div class="SingerInterface">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="btn">
                    <div class="follow">关注</div>
                    <div class="medal">勋章</div>
                </div>    
          </div>
        </div>
        <div class="type-wrapper" ref="types" >
            <type-switches @switch = "switchItem" :switches="switches" :currentIndex="currentIndex"></type-switches>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <div class="list-wrapper" ref="listWrapper">
            
            <scroll @scroll="scroll" :probeType="probeType" :listen-scroll="listenScroll" ref="songlist" class="list-scroll" v-if="currentIndex === 0" :data="songs">
                <div class="list-inner">
                    <song-list :songs="songs"></song-list>
                </div>
            </scroll>
            <scroll @scroll="scroll" :probeType="probeType" :listen-scroll="listenScroll" ref="albumList" class="list-scroll" v-if="currentIndex === 1" :data="albums">
                <div class="list-inner">
                    <album-list :albums="albums"></album-list>
                </div>
            </scroll>
            <scroll @scroll="scroll" :probeType="probeType" :listen-scroll="listenScroll" ref="mvList" class="list-scroll" v-if="currentIndex === 2" :data="mvs">
                <div class="list-inner">
                    <mv-list :mvs="mvs"></mv-list>
                </div>
            </scroll>
            <div ref="descList" class="desc" v-if="currentIndex === 3"></div>
        </div>
    </div>
</template>

<script>
  import TypeSwitches from "base/type-switches/type-switches"
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import AlbumList from 'base/album-list/album-list'
  import MvList from 'base/mv-list/mv-list'
  import {mapGetters} from 'vuex'
  import {prefixStyle} from 'common/js/domTool'
  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
export default {
  props: {
    songs: {
        type: Array,
        default: function(){
        return []
      }
    },
    albums: {
        type: Array,
        default: []
    },
    mvs: {
        type: Array,
        default: []
    },
    desc: {
        type: Object,
        default: []
    },
    bgImage: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }       
  },
  computed:{
      bgStyle() {
        return `background-image:url(${this.singer.avatar})`
      },
      ...mapGetters([
          'singer'
      ])
  },
  created(){
     this.probeType = 3
     this.listenScroll = true  
  },
  data() {
      return {
          currentIndex : 0,
          switches: [
              {
                  name: '单曲'   
              },{
                  name: '专辑'
              },{
                  name: 'MV'
              },{
                  name: '详情'
              }
          ],
          scrollY : 0
      }
  },
  methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      back(){
          this.$router.back()
      },
      scroll(pos){
           this.scrollY = pos.y  
      }
  },
  mounted(){
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.songlist.$el.style.top = `${this.imageHeight}px` 
  },
  watch:{
    scrollY(newY){
        let translateY = Math.max(this.minTranslateY,newY)
        let zIndex = -1
        
        if (newY > 0) {
            zIndex = 10
        }
        // this.$refs.types.style[transform] = `translate3d(0,${translateY}px,0)`
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        this.$refs.types.style[transform] = `translate3d(0,${translateY}px,0)`
        if (newY < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.types.style.zIndex = 10 
          
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0   
        }
     
        this.$refs.bgImage.style.zIndex = zIndex
      
    }
  },
  components: {
      TypeSwitches,
      Scroll,
      SongList,
      AlbumList,
      MvList
  }
}
</script>

<style lang="stylus" scoped>
  .SingerInterface
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
        font-size: 22px
        color: #31c27c
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: 18px
      color: #f5f5f5
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        margin 0 auto
        position :absolute
        bottom 20px
        width 100%
        .btn
          margin 0 auto
          width 200px
          .follow
            display inline-block
            border 1px solid #ffffff
            border-radius 25px
            height 30px
            width 90px
            line-height :30px
            text-align center
            font-size :14px
            margin-right 10px
            color #ffffff
          .medal
            display inline-block
            border 1px solid #ffffff
            border-radius 25px
            height 30px
            width 90px
            line-height :30px
            text-align center
            font-size :14px
            color #ffffff

    .type-wrapper
      width :100%
    .bg-layer
      position :relative
      height :100%
      background #fafafa
    .list-wrapper
      position absolute
      top :326px
      bottom :0
      width :100%
      .list-scroll
        height :100%
        .list-inner
          background-color #fafafa
          padding :20px 30px   
</style>

