<template>
    <div 
     class="listview">
     <ul>
         <li class="back" @click="backSheet()">返回</li>   
         <li v-for="group in tags" class="list-group" >
            <div class="title">{{group.title}}</div>
            <div class="wrapper">
            <ul >
                <li class="item" v-for="tag in group.items" @click="selecttag(item)" >
                      {{tag.name}}
                </li>
            </ul>
            </div>
         </li>
     </ul>
    </div>
</template>

<script>

  export default {
  props: {
      tags:{
          Type: Array,
          default: []
      }
  },
  methods:{
      backSheet(){
          this.$emit('backsheet')
      },
      selecttag(item){
          this.$emit("selecttag")
      }
  }
}
</script>

<style lang="stylus" scoped>
   .listview
     width : 100%
     background  :#fafafa
     height: 100%
     .back
       height 40px
       line-height 40px
       width 100%
       text-align center
       color white
       background-color #49cc7e
     .list-group
        width: 100%
        border-bottom: 1px solid #fff
        display: table
       .title
         display: table-cell
         text-align center
         border-right 1px solid #ccc
         width: 30%;
         vertical-align: middle
       .wrapper
         flex 1
         .item
           width 25%
           height 30px
           line-height 30px
           text-align center  
           display inline-block
           overflow hidden

               
</style>

