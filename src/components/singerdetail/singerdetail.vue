<template>
    <transition name="sdtran">
       <singer-interface :title="title" :bg-image="bgImage" :songs="songs" :albums="albums" :mvs="mvs" :desc="desc"></singer-interface>
    </transition>
</template>

<script>
import SingerInterface from 'components/singer-interface/singer-interface'
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import url from 'api/api'
import axios from 'axios'
import {creatSong} from 'common/js/song'
import {creatAlbum} from 'common/js/album'
import {creatMvs} from 'common/js/mvs'
export default {
  data(){
      return {
        songs: [],
        albums: [],
        mvs: [],
        desc: {}

      }

  },
  computed: {
        title(){
           return this.singer.name
       },
        bgImage(){
           return this.singer.picUrl
       },
        ...mapGetters([
            'singer'
        ])
  },
  created() {
        this._getAllList()
  },
  methods: {
     _getAllList(){
          if(!this.singer.id){
              this.$router.push('/musicstore')
              return
          } 
          axios.get(`${url}/artists?id=${this.singer.id}`).then((res) => {
            this.songs = this._normalizeSong(res.data.hotSongs)
            
        })
          axios.get(`${url}/artist/album?id=${this.singer.id}`).then((res) => {
            this.albums = this._normalizeAlbum(res.data.hotAlbums)
            
          }) 
          axios.get(`${url}/artist/mv?id=${this.singer.id}`).then((res) => {
              this.mvs = this._normalizeMvs(res.data.mvs)
 
          })
          axios.get(`${url}/artist/desc?id=${this.singer.id}`).then((res) => {
              this.desc = res.data
         
          })
          

     },
    _normalizeSong(list){
        let ret = []
        list.forEach((item)=>{
            axios.get(`${url}/song/detail?ids=${item.id}`).then((res) => {
               ret.push(creatSong(res.data.songs[0].id,res.data.songs[0].ar[0].name,res.data.songs[0].name,res.data.songs[0].al.picUrl,
               res.data.songs[0].al.id,res.data.songs[0].al.name))
            })   
        })
        return ret
    },
    _normalizeAlbum(list){
        let ret = []
        list.forEach((item) => {
            axios.get(`${url}/album?id=${item.id}`).then((res) => {
                const name = item.name
                ret.push(creatAlbum(res.data.album.id,res.data.album.name,res.data.album.picUrl,res.data.album.company,
                res.data.album.description))
                
            })
        })
        return ret
    },
    _normalizeMvs(list){
        let ret = []
        list.forEach((item) => {
    
            ret.push(creatMvs(item.id,item.name,item.imgurl16v9,item.publishTime))
        }) 
        return ret
    }
  },
  components: {
      SingerInterface,
      MusicList
  },
  watch:{
      singer(newSinger){
          this.songs =this._getAllList()
      } 
  }
}
</script>

<style lang="stylus" scoped>
  .sdtran-enter-active,.sdtran-leave-active
    transition :all 0.3s

  .sdtran-enter, .sdtran-leave-to
    transform :translate3d(100%,0,0)  
</style>

