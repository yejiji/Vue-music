<template>
    <div class="music-store" ref ="store">
       <scroll ref="scroll" class="store-content" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" :data="personalized" :click="true">
         <div>
             <div v-if="banners.length" class="slider-wrapper">
                 <slider>
                     <div v-for="item in banners">
                         <a :href="item.url">
                             <img class="needsclick" :src="item.picUrl">
                         </a>
                     </div>
                 </slider>
             </div>
             <div class="store-tab">
                 <div class="tab-singer item" @click="test" >
                     <i class="icon-mine item-icon"></i>
                     <span class="title">歌手</span>
                 </div>
                 <div class="tab-top item" >
                     <i class="iconfont icon-comments item-icon"></i>
                     <span class="title">排行</span>
                 </div>
                 <div class="tab-center item" @click="gosongsheet">
                     <i class="iconfont icon-set item-icon"></i>
                     <span class="title">分类歌单</span>
                 </div>
                 <div class="tab-dj item">
                     <i class="iconfont icon-help item-icon"></i>
                     <span class="title">电台</span>
                 </div>
                 <div class="tab-v item">
                     <i class="icon-mine item-icon"></i>
                     <span class="title">视频</span>
                 </div>
             </div>
             <div class="push">
               <div class="left-push"  >
                   <img class="image" width="100%" height="100%" :src="topmusic.blurPicUrl">
                   <span class="icon-play-mini icon"></span>
               </div>
               <div class="right-push">
                    <div class="item ">
                        <h2>{{topmusic.name}}</h2>
                    </div>
                    <div class="item ">
                        <h2 v-html="topmusicname"></h2>
                        </div> 
                </div>  
             </div> 
             <div class="Personalized-list">
                 <h1 class="list-title">歌单推荐</h1>
                 <ul class="list-ul">
                     <li @click="selectItem(item)" v-for="item in personalizedShow" class="item">
                       <div class="image">
                           <img width="100%" height="170" :src="item.picUrl" >
                            <span class="icon-play-mini btn"></span> 
                       </div>
                       <div class="text">
                           <h2 class="name" v-html="item.name"></h2> 
                       </div>
                     </li>
                 </ul>
                 <button class="changebtn" @click="changeper">换一批</button>
                </div> 
               <div class="topmv-list">
                   <h1 class="list-title">热门MV</h1>
                   <ul class="list-ul">
                       <li v-for="item in topmv" class="item">
                           <div class="image">
                               <img width="100%" height="100%" :src="item.cover">
                               <div class="desc">
                                   <p>{{item.artistName}}-{{item.name}}</p>
                               </div>
                           </div>
                           <div class="text">
                               <h2 class="name" v-html="item.name"></h2>
                           </div>
                       </li>
                   </ul>
                   </div> 
               <div class="artists-list">
               <h1 class="list-title">热门歌手</h1>
               <ul class="list-ul">
                   <li @click="selectSingerItem(item)" v-for="item in artistsShow" class="item">
                       <div class="image">
                           <img width="100%" height="170" :src="item.picUrl">
                           <span class="icon-play-mini btn"></span>
                       </div>
                       <div class="text">
                           <h2 class="name" v-html="item.name"></h2>
                       </div>
                   </li>
               </ul>
               <button class="changebtn" @click="changeart" >换一批</button>
             </div>
             </div>

       </scroll>
       <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import url from 'api/api'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {mapMutations} from 'vuex'
import {creatSinger} from 'common/js/singer'
const clickNumber = 0
export default {
  data() {
      return {
          banners: [],
          personalized:[],
          personalizedShow:[],
          artists:[],
          artistsShow:[],
          start :5,
          startT:5,
          topmv:[],
          topmusic:[],
          topmusicname:'',
          singer:{},
          scrollY : 0
      }
  },
  created() {
      this.probeType = 3
      this.listenScroll = true
      this._getBanner()
      setTimeout(() => {
      this._getPersonalized()
      this._getArtists()
      this._getTopMv()
      this._getTopMusic()
      }, 500)

  },
  methods: {
       scroll(pos) {
          this.scrollY = pos.y
      },
      selectItem(item){
        this.$router.push({
            path:`/musicstore/${item.id}`
        })
        this.setDisc(item)
      },
      selectSingerItem(item){
        //   this.singer = creatSinger(item.id,item.name,item.picUrl)
          this.setSinger(creatSinger(item.id,item.name,item.picUrl)) 
          this.$router.push({
              path:`/singerDetail`
          })      
      },
      test(){
         this.$router.push({
              path:`/singer`
          })
      },
      gosongsheet(){
          this.$router.push({
              path:`/songdisc`
          })
      },
      changeart(){
         const number = this.startT
         if(number >this.artists.length){
             this.number = 5
         }
         this.artistsShow = this.artists.slice(number,number+4)
         this.startT = number + 5 
      },
      changeper(){ 
         const number = this.start
         if(number > this.personalized.length){
             this.number = 5
         }
         this.personalizedShow = this.personalized.slice(number,number+4)
         this.start = number + 5
      },
      _getBanner() {
          axios.get(`${url}/banner`).then(res => {
              this.banners = res.data.banners
            
          })
      },
      _getPersonalized() {
          axios.get(`${url}/personalized`).then(res => {
              this.personalized = res.data.result
              this.personalizedShow = this.personalized.slice(0,4)
            
          }) 
      },
      _getArtists(){
          axios.get(`${url}/top/artists?offset=0&limit=30`).then(res => {
              this.artists = res.data.artists
              this.artistsShow = this.artists.slice(0,4)
          })
      },
      _getTopMv(){
          axios.get(`${url}/top/mv?limit=2`).then(res => {
              this.topmv = res.data.data 
        
          })
      },
      _getTopMusic(){
          axios.get(`${url}/top/album?limit=1`).then(res => {
              this.topmusic = res.data.albums[0]
              this.topmusicname = res.data.albums[0].artist.name

          })
      },
      ...mapMutations({
          setDisc : 'SET_DISC',
          setSinger : 'SET_SINGER'
      })
    //   _getPersonalizedShow(){
    //       if(clickNumber * 4 > this.personalized.length ){
    //           this.clickNumber = 0
    //       }
    //       const persondata = []
    //       this.persondata = this.personalized.slice(5,9)
    //       this.clickNumber = clickNumber + 4
    //       return persondata
          
    //   } 
  },
  watch:{
    scrollY(newVal){
        if (newVal < -44) {
            
            this.$refs.store.style.top = '44px'
        }else{
            this.$refs.store.style.top = "83px"
        } 
    }
  },
  components:{
      Scroll,
      Slider
  }
}
</script>
<style lang="stylus" scoped>
  .music-store
    position :fixed
    width :100%
    top:83px
    bottom :0
    background-color #fafafa
    .store-content
      height :100%
      overflow hidden
      .slider-wrapper
        position relative    
        width :100%
        overflow hidden
        margin-bottom :16px 
      .store-tab
        display :flex
        margin 0 auto
        text-align center
        height :60px
        margin-left :10px
        margin-right :10px
        // margin-bottom :15px
        padding :5px 0
        transform: translate3d(0,-20px,0)
        box-shadow: 2px 2px 5px #eee
        background: white
        .item
          flex :1
          display :inline-grid
          .item-icon
            font-size :30px
            padding-top :5px 
            color: #31c27c  
          .title
            padding-top:10px  
            font-size :13px
            color: #6f706e     
      .push
        display :flex
        height :140px
        width :100%
        margin-bottom 12px
        margin-left: 10px
        margin-right : 10px
        .left-push
          position relative
          flex 0 0 140px
          width :140px
          padding-right :20px
          .image
            box-shadow: 10px 9px 5px #cccccc
          .icon
            position absolute
            bottom 37%
            color white
            left 32%
            font-size 40px
        .right-push
          flex :1
          padding-right: 10px
          margin-right: 10px
          .item
            height 45%
            background-color #d4d4d4
            margin-bottom :14px
            margin-right: 10px
            line-height 63px
            text-align center
            overflow hidden
            box-shadow: 4px 4px 5px #ccc
            &:last-child
              margin-bottom 0px

              
            

      .Personalized-list,.artists-list
        margin-bottom :7px
        margin-left :10px
        margin-right :10px
        .list-title
          font-size :16px
          color:#817f7f
          margin-bottom :16px
          font-weight :normal
          border: 1px solid;
          border-top: none;
          border-bottom: none;
          text-align center
        .list-ul
          overflow hidden
          margin-right: -16px        
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
            .text
              font-size :14px
              color: #6f706e
              overflow: hidden
              line-height :16px
              height :32px
        .changebtn
          width 140px
          height :35px
          margin :0 auto
          text-align :center
          display :block
          background :#ffffff
          color :#31c27c
          border :none
          font-size :16px
      .topmv-list
        margin-bottom :7px
        margin-left :10px
        margin-right :10px
        .list-title
          font-size :16px
          color:#817f7f
          margin-bottom :16px
          font-weight :normal
          border: 1px solid;
          border-top: none;
          border-bottom: none;
          text-align center
        .list-ul
          overflow hidden
          .image
            .desc
              position: relative 
              margin-top: -40px
              color: #FFF
              width: 100%
              height: 40px
              padding: 0px
              text-align :right
              background-color: rgba(0,0,0,0.5)
              p
                padding:3%
          .item
            width :100%
            .text
              font-size: 16px;
              height: 36px;
              line-height: 36px;
              color: #817f7f;

            
                       


</style>
