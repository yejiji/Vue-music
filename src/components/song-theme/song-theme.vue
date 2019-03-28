<template>
    <transition name="SongTheme">
       <!-- <singer-interface :title="title" :bg-image="bgImage" :songs="songs" :albums="albums" :mvs="mvs" :desc="desc"></singer-interface> -->
       <song-theme-deta :title="title" :bg-image="bgImage" :sheets="sheets"  ></song-theme-deta>
    </transition> 
</template>
<script>
import SongThemeDeta from 'base/song-theme-deta/song-theme-deta'
import url from 'api/api'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    computed:{
        title(){
        return this.theme.name
        },
        bgImgae(){
            return this.disc.imgUrl
        },
        ...mapGetters([
            'theme'
        ])
    },
    data(){
        return{
           sheets:[],
        }
    },
    methods:{
        _getSheetsList(){
            if(!this.theme.id){
                this.$router.push('/songdisc')
                return
            }
            axios.get(`${url}/top/playlist?cat=${this.theme.name}`).then((res) => {
                this.sheets = res.data.playlist
            })
        }
    },
    components:{
        SongThemeDeta
    }
}
</script>
<style lang="stylus" scoped>
  .SongTheme-enter-active,.SongTheme-leave-active
    transition :all 0.3s

  .SongTheme-enter, .SongTheme-leave-to
    transform :translate3d(100%,0,0)  
</style>
