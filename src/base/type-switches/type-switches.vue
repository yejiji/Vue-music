<template>
    <ul class="type-switch">
        <li class="switch-item" v-for="(item,index) in switches":class="{'active':currentIndex === index}"
        @click="switchItem(index)">
        {{item.name}}
        </li>
    </ul>
</template>

<script>
export default {
  props: {
      switches: {
          type: Array,
          default: []
      },
      currentIndex: {
          type: Number,
          default: 0
      }
  },
  methods: {
      switchItem(index){
          this.$emit('switch',index)
      }
  }
}
</script>

<style lang="stylus" scoped>
  .type-switch
    display flex
    height 40px
    width 100%
    background #fafafa
    .switch-item
      flex :1
      text-align :center
      line-height :40px
      font-size :16px
      color :#726f6f
      &.active
        border-bottom 1px solid #31c27c
        color #31c27c

</style>

