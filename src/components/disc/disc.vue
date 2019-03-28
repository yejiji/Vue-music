<template>
    <transition name="slide">
        <music-list :songs="songs" :desc="desc" :typename="TypeName" :title="title" :bg-image="bgImgae"></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import url from 'api/api'
import axios from 'axios'
import {creatSong} from 'common/js/song'
export default {
data(){
    return{
        TypeName:'歌单',
        desc:"",
        tag:[],
        songs:[]  
    }
},
computed:{
    title(){
        return this.disc.name
    },
    bgImgae(){
        return this.disc.picUrl
    },
    ...mapGetters([
            'disc'
        ])
},
created(){
   this._getPlaylistCon()
},
methods:{
    _getPlaylistCon(){
        if(!this.disc.id){
            this.$router.push('/musicstore')
            return
        }
        axios.get(`${url}/playlist/detail?id=${this.disc.id}`).then((res) => {
            this.desc = res.data.playlist.description
            this.tag = res.data.playlist.tags
            this.songs = this._normalizeSong(res.data.playlist.tracks)
      
          
        })
        
    },
    _normalizeSong(list){
        let ret = []
        // const newsong = []
        list.forEach((item)=>{
            axios.get(`${url}/song/detail?ids=${item.id}`).then((res) => {
                 const musicurl = ''
               axios.get(`${url}/music/url?id=${res.data.songs[0].id}`).then((res) => {       
                   this.musicurl = res.data.data[0].url 
               }) 
            //    this.newsong = res.data.songs[0]
            //    console.log(res.data.songs[0].id,res.data.songs[0].ar[0].name,res.data.songs[0].name,res.data.songs[0].al.picUrl,
            //    res.data.songs[0].al.id,res.data.songs[0].al.name,this.musicurl)
               ret.push(creatSong(res.data.songs[0].id,res.data.songs[0].ar[0].name,res.data.songs[0].name,res.data.songs[0].al.picUrl,
               res.data.songs[0].al.id,res.data.songs[0].al.name))
            })   
        })
        return ret
    }
    
},
components:{
    MusicList
}
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    transition :all 0.3s

  .slide-enter, .slide-leave-to
    transform :translate3d(100%,0,0)  
</style>

