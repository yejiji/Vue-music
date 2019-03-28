<template>
    <transition name="songtran"> 
       <song-sheet @selectDisc="selectdisc" :tags="tags" :hottag="hottag" :showsSong="showsSong" @selectThemeIn="selectThemeIndex"></song-sheet>
    </transition>
</template>

<script>
import axios from 'axios'
import url from 'api/api'
import {creatSinger} from 'common/js/singer'
import SongSheet from 'components/songsheet/songsheet'
import {mapMutations} from 'vuex'
export default {
  data() {
      return {
          hottag:[],
          showsSong:[],
          tags: []
      }
  },
  created() {
      this._getHotTag() 
      this._getNewSong() 
      this._getTogList()
  },
  methods: {
      selectdisc(item){
         this.$router.push({
            path:`/musicstore/${item.id}`
        })
        this.setDisc(item)
      },
      selectThemeIndex(item){
        this.$router.push({
            path:`/songdisc/${item.id}`
        })
        this.setTheme(item)
      },
      _getHotTag(){
          axios.get(`${url}/playlist/hot`).then(res => {
              this.hottag= res.data.tags
          })
      },
      _getNewSong(){
          axios.get(`${url}/personalized`).then(res=>{
            this.showsSong = res.data.result
            console.log(this.showsSong) 
          })
          
     },
     _getTogList(){
         axios.get(`${url}/playlist/catlist`).then(res => {
             this.tags = this._normalizeList(res.data.sub)
             console.log(this.tags)
         })
     },
     _normalizeList(list){
         let map = {
             Languages : {
                 title : '语种',
                 items : []
             },
             style : {
                 title : '风格',
                 items : []
             },
             scene : {
                 title : '场景',
                 items : []
             },
             emotion : {
                 title : '情感',
                 items : []
             },
             theme : {
                 title : 'theme',
                 items : []
             }

         }
         list.forEach(item=>{
             if(item.category === 0){
                 map.Languages.items.push(item)
             }else if(item.category === 1){
                 map.style.items.push(item)
             }else if(item.category === 2) {
                 map.scene.items.push(item)
             }else if(item.category === 3){
                 map.emotion.items.push(item)
             }else if(item.category === 4) {
                 map.theme.items.push(item)
             }
         });
        //  for(let i=0;i++;i<=list.length){
        //      if(list[i].type === 0){
        //          map.Languages.items.push(list[i])
        //      }else if(list[i].type === 1){
        //          map.style.items.push(list[i])
        //      }else if(list[i].type === 2) {
        //          map.scene.items.push(list[i])
        //      }else if(list[i].type === 3){
        //          map.emotion.items.push(list[i])
        //      }else if(list[i].type === 4) {
        //          map.theme.items.push(list[i])
        //      }
        //  }
         let tags = []
         for(let key in map ){
             let tag = map[key]
             tags.push(tag)
         }
         return tags
     },
       ...mapMutations({
      setTheme:'SET_THEME',
      setDisc : 'SET_DISC'
    })
  },
  components:{
      SongSheet
  }
}
</script>

<style lang="stylus" scoped>
  .songtran-enter-active, .songtran-leave-active
    transition: all 0.3s

  .songtran-enter, .songtran-leave-to
    transform: translate3d(100%, 0, 0)
</style>

