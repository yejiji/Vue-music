<template>
    <div class="song-list">
        <ul>
            <li class="item" v-for="(song,index) in songs">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
props:{
    songs:{
        type:Array,
        default:[]
    }
},
methods:{
    getDesc(song){
        return `${song.singer}·${song.alname}`
    },
    test(){
        console.log('ces')
    }
}
}
</script>

<style lang="stylus" scoped>
  .song-list
    border-top: 1px solid #e3e3e3
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: 14px
      border-bottom: 1px solid #e3e3e3
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
        .text
          color: #2d2b2b
          font-size: 18px
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          color: #2d2b2b
        .desc
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          margin-top: 4px
          color: #726f6f
</style>

