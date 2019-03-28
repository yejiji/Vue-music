<template>
    <div class="ThemeDeta">
        <div class="back" @click="back">
          <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
          <div class="play-wrapper">
          
          </div>
          <div class="filter" ref="filter"></div>
      </div>
        <div class="bg-layer" ref="layer"> 
        </div>
        <scroll  @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="sheets" class="list" ref="list">
            <div class="ShowSong">
                        <ul class="list-ul">
                          <li  v-for="(item,index) in sheets" class="item" @click="selectDisc(item)">
                          <div class="image">
                              <img width="100%" height="170" :src="item.coverImgUrl" >
                                <span class="icon-play-mini btn"></span> 
                          </div>
                          <div class="text">
                              <h2 class="name" v-html="item.name"></h2> 
                            </div>
                          </li>
                 </ul>
             </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
export default {
   props:{
     BgImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    sheets: {
        type: Array,
        default : []
    }
   },
     created(){
      this.probeType=3
      this.listenScroll=true
  },
    computed:{
      bgStyle(){
          return `background-image:url(${this.BgImage})`
      }
  },
  methods:{
      selectDisc(item){
        this.setDisc(item)
        this.$router.push({
              path:`/disc`
         })
      },
      ...mapMutations({
          setDisc : 'SET_DISC'
  
      })
  },
   components:{
       Scroll
   }    
}
</script>

<style lang="stylus" scoped>
  .ThemeDeta
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background #fafafa
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
    .bg-image
      position :relative
      width :100%
      height :0
      padding-top:70%
      transform-origin :top
      background-size:cover
      .play-wrapper
        position :absolute
        bottom :20px
        z-index :20
        width :100%
      .filter
        position :absolute
        top:0
        left :0
        width :100%
        height :100%
        background :rgba(7,17,27,0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position fixed
      top 0
      bottom 0
      width  100%
      background-color #ffffff
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
</style>
