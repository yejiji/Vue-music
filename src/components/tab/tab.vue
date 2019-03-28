<template>
    <div class="tab">
        <div class="tab-left">
            <div class="user-center" @click="test">
                <i class="icon-mine"></i>
            </div>
        </div>
        <div class="tab-center">
            <router-link tag="div" class="tab-center-item" to="/userplay">
                <span class="tab-link">我的</span>
            </router-link>
            <router-link tag="div" class="tab-center-item" to="/musicstore">
                <span class="tab-link">音乐馆</span>
            </router-link>
            <router-link tag="div" class="tab-center-item" to="/recommend">
                <span class="tab-link">发现</span>
            </router-link>
        </div>
        <div class="tab-right">
            <div class="other">
                <i class="iconfont icon-category"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        test(){
            console.log('测试一下')
        }
    }
}
</script>

<style lang="stylus" scoped>
  .tab
    display :flex
    width :100%
    height :44px
    line-height :44px
    font-size :16px
    text-align :center
    background-color :#31c27c
    .tab-left
      flex :64px 0 0
      .user-center
        .icon-mine
          display: block
          padding: 12px
          font-size: 20px
          color :   #f1f1f1      
    .tab-center
      flex :1
      display :flex
      padding :0 44px
      .tab-center-item
        flex :1
        .tab-link
          color :#f1f1f1
        &.router-link-active
          .tab-link  
            color #ffffff            
    .tab-right           
      flex :64px 0 0 
      .other
        .icon-category
          display: block
          padding: 12px
          font-size: 20px
          color :   #f1f1f1   


</style>

