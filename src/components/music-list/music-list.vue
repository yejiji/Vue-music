<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
       
          <div class="play-wrapper" ref="playwrapper">
             <div class="avatar">
               <img width="85px" height="85px" :src="BgImage">
             </div>
             <div class="content">
               <h2 class="name" v-html="title"></h2>
               <span class="desc" v-html="desc"></span>
               <i class="icon-play-mini"></i>
             </div>
             <div class="play">
               <i class="icon-play"></i>
               <span class="text">随机播放全部</span>
             </div>
        </div>
      
        <div class="bg-layer" ref="layer">
          
        </div>
        <scroll @scroll="scroll" :probeType="probeType" :listen-scroll="listenScroll" :click="true" :data="songs" class="list" ref="list">
          <div class="song-list-wrapper">
            <song-list :songs="songs"></song-list>
          </div>
        </scroll>
        <div class="background" ref="bgImage">
          <img class="bgimage" :src="BgImage">
        </div>
    </div>
</template>

<script>
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import {prefixStyle} from 'common/js/domTool'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

export default {
  props:{
    typename: {
      type: String,
      default: ''
    },
    BgImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function(){
        return []
      }
    }

  },
  data() {
    return {
      scrollY : 0
    }
  },
  methods:{
    back(){
      this.$router.back()
    },
    scroll(pos){
      this.scrollY = pos.y     
    }
  },
  computed:{
    bgStyle(){
      return `background-image:url(${this.BgImage})`
    }
  },
  mounted(){
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px` 
  },
  created(){
     this.probeType = 3
     this.listenScroll = true  
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY,newY)
      let zIndex = -1
      let scale = 1
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      const percent = Math.abs(newY / this.imageHeight)
      if(newY > 0) {
        scale = 1 + percent

      }
      if(newY < this.minTranslateY) {
        zIndex = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.bgImage.style.background =`#595656`
        
      }else{
        this.$refs.bgImage.style.height = `30%`
      } 
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.playwrapper.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style[transform] = `scale(${scale})`
   }
  },
  components:{
    SongList,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  .music-list
    position :fixed
    z-index :100
    top:0
    left: 0
    bottom :0
    right :0
    background:#fafafa
    .back
      position :absolute
      top:0
      left:6px
      z-index :50
      .icon-back
        display :block
        padding :10px
        font-size :22px
        color:#31c27c
    .title
      position :absolute
      top:0
      left:10%
      z-index:40 
      width :80%
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      text-align :center
      line-height :40px
      font-size:18px
      color:#fff
    .play-wrapper
      position relative
      display :flex
      overflow hidden
      width :100%
      height :30%
      background: rgba(41, 37, 37, 0.63)
      .avatar
        flex 140px 0 0
        img 
          padding-left: 27px;
          padding-top: 41%;
      .content
        flex 1
        padding :54px 0
        overflow hidden
        height :43px
        .name
          display:block
          color: white
          height: 40px
          line-height: 20px
          font-size: 17px
          margin-bottom: 5px
          overflow: hidden
        .desc
          width: 80%
          display: inline-block
          margin-top: 36px
          height: 14px
          font-size: 14px
          color: #b1a9a9
          overflow: hidden
        .icon-play-mini
          color #c4d0c5
      .play
        position absolute
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        margin-left: 33%
        margin-right: 33%
        text-align: center
        border: 1px solid #31c27c
        color: #31c27c
        border-radius: 100px
        font-size: 0
        bottom: 5px
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: 16px
        .text
          display: inline-block
          vertical-align: middle
          font-size: 10px         
    .background
      position  absolute
      top:0
      left :0
      width :100%
      height 30%
      z-index :-1
      overflow hidden  
      .bgimage
        width: 100%
        height: 100%
        filter: blur(13px)
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%

      .song-list-wrapper
        padding: 20px 30px  
    .bg-layer
      position :relative
      height :100%
      width 100%
      background:#fafafa
</style>
