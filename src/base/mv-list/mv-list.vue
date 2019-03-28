<template>
    <div class="mv-list">
        <ul>
            <li class="item" v-for="(mv,index) in mvs">
                 <div class="avatar" >
                    <img width="120" height="65" :src="mv.image" >
                </div>
                <div class="text">
                    <h2 class="name">{{mv.name}}</h2>
                    <p class="desc">{{mv.time}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
      mvs: {
          type:Array,
          default:[]
      }
  }
}
</script>

<style lang="stylus" scoped>
  .mv-list
    .item
      display :flex
      box-sizing border-box
      align-items center
      padding 0 0 20px 0
      .avatar
        margin-right: 15px
      .text
        display :flex
        flex-direction :column
        justify-content :center
        flex :1
        line-height :20px
        overflow hidden
        font-size :14px
        .name
          margin-bottom 10px
        .desc
          color black     
   
</style>

