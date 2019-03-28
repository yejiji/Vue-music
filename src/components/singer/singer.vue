<template>
  <transition name="singerTran">
      <singer-view @selectsinger="selectItemSinger" :singerList="singerList" :singers="singers"></singer-view>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import ListView from 'base/listview/listview'
  import SingerView from 'components/singer-view/singer-view'
  import {creatSinger} from 'common/js/singer'
  import axios from 'axios'
  import url from 'api/api'
  // import {mapMutations} from 'vuex'
  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'
  const options = {
  scrollY: true // 因为scrollY默认为true，其实可以省略
  }
  export default {
    data() {
      return {
         singerList: [
           {
             name : '入驻歌手',
             id : 1001
           },{
             name : '华语男歌手',
             id : 1001
           },{
             name : '华语女歌手',
             id : 1002
           },{
             name : '华语组合/乐队',
             id : 1003
           },{
             name : '欧美男歌手',
             id : 2001
           },{
             name : '欧美女歌手',
             id : 2002
           },{
             name : '欧美组合/乐队',
             id : 2003
           },{
             name : '日本男歌手',
             id : 6001
           },{
             name : '日本女歌手',
             id : 6002
           },{
             name : '日本组合/乐队',
             id : 6003
           },{
             name : '韩国男歌手',
             id : 7001
           },{
             name : '韩国女歌手',
             id : 7002
           },{
             name : '韩国组合/乐队',
             id : 7003
           },{
             name : '其他男歌手',
             id : 4001
           },{
             name : '其他女歌手',
             id : 4002
           },{
             name : '其他组合/乐队',
             id : 4003
           }
         ],
         singers : [],
         DEFAULT_TYPE : 1001,
         scrollY : 0,
         showList : false
      } 
    },
    created(){
        this.getSingerList()
    },
    methods:{
         back(){
           this.$router.back()
         },
         selectSinger(singer){
           console.log('test')
         },
         selectItemSinger(item){
           this.showList = true
           this.DEFAULT_TYPE = item.id
           console.log(this.DEFAULT_TYPE)
         },
         getSingerList(){
            axios.get(`${url}/artist/list?cat=${this.DEFAULT_TYPE}`).then((res) => {
              this.singers = this._normalizeSingers(res.data.artists)
              console.log(this.singers)
            })
         },
         _normalizeSingers(list){
            let ret = []
            list.forEach((item) => {
               ret.push(creatSinger(item.id,item.name,item.picUrl))
            })
            return ret
         }
    },
    watch:{
       DEFAULT_TYPE(newNum){
         this.getSingerList()
       }
    },
    components: {
      ListView,
      Scroll,
      SingerView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singerTran-enter-active, .singerTran-leave-active
    transition: all 0.3s

  .singerTran-enter, .singerTran-leave-to
    transform: translate3d(100%, 0, 0)
</style>