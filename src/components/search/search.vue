<template>
   <div class="search">
       <transition name="box"> 
        <div class="search-box-wrapper">
           <search-box></search-box>
        </div>   
       </transition>      
       <div class="shortcut-wrapper"></div>
     
       </div>
</template>

<script>
import SearchBox from '../../base/search-box/search-box'
export default {
  data(){
      return{
         
      }
  },
  components:{
    SearchBox
}
}
</script>


<style lang="stylus" scoped>

  .search
    margin-top :-1px
    .search-box-wrapper
      &.box-enter-active, &.box-leave-active
        transition: all 0.1s
      &.box-enter, &.box-leave-to
        height: 0
</style>
