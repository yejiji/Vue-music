<template>
  <div id="app">
    <tab></tab>
    <search></search>
    <keep-alive>
       <router-view/>
    </keep-alive>
    
  </div>
</template>

<script>
import Tab from './components/tab/tab'
import Search from './components/search/search'
export default {
  components:{
    Tab,
    Search
  }
}

</script>

<style>

</style>
