<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(singer, index)" class="item" v-for="(singer, index) in singers">
        <div class="avatar">
            <img class="image" width="50" height="50" :src="singer.avatar" >
        </div>
        <div class="content">
          <h2 class="name">{{singer.name}}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      singers: {
        type: Array,
        default: []
      }

    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      padding-bottom 10px
      .avatar
        flex 50px 0 0   
        padding-right 50px
        .image
          border-radius 50%     
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: black
</style>