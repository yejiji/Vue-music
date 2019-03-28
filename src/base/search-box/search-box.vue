<template>
    <div class="search-box">
        <div class="search-box-wrapper">
          <i class="icon-search" v-show="!query"></i>
          <i v-show="query" @click="clear" class="icon-dismiss"></i> 
          <input class="box" placeholder="搜索歌曲" v-model="query">
          
        </div>
        
    </div>
</template>

<script>
export default {
  data(){
      return{
          query:''
      }
  },
  methods:{
      clear(){
          this.query = null
      }
  }
}
</script>

<style lang="stylus" scoped>
  
  .search-box
    display :flex  
    align-items :center
    box-sizing :border-box
    width :100%
    padding :0 6px
    height :40px
    background-color :#31c27c
    .search-box-wrapper
      margin :0 auto
      display :flex
      background: #40b37b  
      border-radius: 13px
      vertical-align :top
      .icon-search
        font-size :24px
        color: #f1f1f1
        flex :1
      .box
        flex :8
        line-height: 18px
        color: #f1f1f1
        font-size: 16px
        border-radius: 13px
        text-align: center
        background: #40b37b
        height: 23px  
        &::placeholder
          color :#f1f1f182 
      .icon-dismiss
        margin :auto 0   
        font-size :16px
        color: #f1f1f1
        

               
</style>
