<template>
       <div class="music-store">

        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title" >分类列表</h1>
        <div class="bg-image"  ref="bgImage">
            <div class="songsheetTag" ref="playitem">
                        <ul>
                            <li class="TagItem" v-for="(tag,index) in hottag"  @click="selectItem(tag, index)">
                                {{tag.name}}
                            </li>
                        </ul>
            </div>
            <div class="btn-showAll" ref="showall" @click="showTag">
                          查看所有分类歌单
            </div>
           <div class="filter" ref="filter"></div>
        </div>

        <div class="bg-layer" ref="layer">
        </div>
        <scroll ref="list" class="store-content" :data="showsSong" @scroll="scroll"
                :listen-scroll="listenScroll" :probe-type="probeType" :click="true">
                    <div class="ShowSong">
                      <h1 class="list-title">歌单推荐</h1>
                        <ul class="list-ul">
                          <li  v-for="item in showsSong" class="item" @click="selectDisc(item)">
                          <div class="image">
                              <img width="100%" height="170" :src="item.picUrl" >
                                <span class="icon-play-mini btn"></span> 
                          </div>
                          <div class="text">
                              <h2 class="name" v-html="item.name"></h2> 
                            </div>
                          </li>
                        </ul>
                    </div>
              
        </scroll>

        <scroll :data="tags" :probeType="probeType" :listen-scroll="listenScroll"  v-show="showTags" class="songtype">
            <songtype @backsheet="hidetags" :tags="tags" @selecttag="selectDisc" ></songtype>
        </scroll>
     
     </div>


</template>

<script>
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'common/js/domTool'
import songtype from 'components/songtype/songtype'
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
import {mapMutations} from 'vuex'
const RESERVED_HEIGHT = 40
export default {
  props:{
      hottag:{
          Type: Array,
          default : []
      },
      showsSong:{
          Type: Array,
          default: []
      },
      tags: {
        Type: Array,
        default : []
      }
  },
    created() {
      this.probeType = 3
      this.listenScroll = true
  },
    data(){
      return {
          scrollY : 0,
          showTags : false
      }
  },
  methods:{
      back(){
          this.$router.back()
      },
      scroll(pos) {
          this.scrollY = pos.y
      },
      showTag(){
        this.showTags = true
      },
      hidetags(){
        this.showTags = false
      },
      selectDisc(item){
        this.$emit('selectDisc',item)
      },
      selectItem(tag,index){
        console.log(tag)
        this.$emit('selectThemeIn',tag,index)

      }
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
          this.$refs.showall.style.display = 'none'

        } else {
          this.$refs.bgImage.style.paddingTop = '80%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playitem.style.display = ''
          this.$refs.showall.style.display = ''
        }
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
  components:{
      Scroll,
      songtype
  }
}

</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-store
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
      font-size: $font-size-large
      color: #31c27c
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 80%
      transform-origin: top
      background-size: cover
      .songsheetTag
        position: absolute
        z-index: 50
        width: 100%
        top:40px
        .TagItem
          float left
          height 50px
          width :25%
          background #fafafa
          color black
          text-align center
          line-height 50px
          &:nth-child(1)
            width 50%
            height 100px
            line-height 100px
            font-size 24px
            background-color: #33cec378
            color #ffffff

          &:nth-child(2)
            width 50%  
            background-color: #ede1d0
            color #ffffff
          &:nth-child(5)
            height 100px
            line-height 100px 
            background-color: #ff8e8e99 
            color #ffffff
          &:nth-child(6)
            height 100px
            line-height 100px  
            background-color: #83eaab
            color #ffffff      
          &:nth-child(8)
            background-color: #ff9b76
            color #ffffff
      .btn-showAll
        position: absolute
        z-index 50
        bottom 0
        width 100%
        height 50px
        text-align center
        line-height 50px
        background-color #d3d3d3
        color #fafafa 
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #fafafa
    .bg-layer
      position: relative
      height: 100%
      background: #fafafa
    .store-content
      position :fixed
      top :0
      bottom :0
      width :100%
      background #fafafa   
      .ShowSong
        overflow hidden
        .list-title
          height 44px
          line-height 44px
          padding-left 12px 
        .item
          float left
          width :47%
          padding-right :8px
          margin-bottom :10px
          overflow hidden
          .image
            position relative
            margin-bottom 5px
            filter: brightness(0.8)
            .btn
              position :absolute
              bottom :5px
              right :5px 
              font-size :25px
              color: #2bff99           
    .songtype
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      z-index 100
              
</style>

