<template>
    <div class="album-list">
        <ul>
            <li class="item" v-for="(album,index) in albums">
                <div class="avatar" >
                    <img width="60" height="60" :src="album.image" >
                </div>
                <div class="text">
                    <h2 class="name">{{album.name}}</h2>
                    <p class="desc">{{album.company}}</p>
                </div>
                <div class="icon">
                    <i class="icon-play-mini"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
      albums: {
          type:Array,
          default:[]
      }
  }
}
</script>

<style lang="stylus" scoped>
  .album-list
    .item
      display :flex
      box-sizing border-box
      align-items center
      padding 0 0 20px 0
      .avatar
        margin-right: 15px
      .icon
        flex 0 0 16px
        width :16px
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
