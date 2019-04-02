<template>
  <el-container>
      <el-aside width="13%">
        <Aside/>
      </el-aside>
      <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import Top from '../layout/header_nav.vue'
import Aside from '../layout/asidebox.vue'
export default {
  name: "index",
  data() {
    return {};
  },
  components:{
    Top,
    Aside
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    background-color: #296fcf;
    color: #333;
    height: 70px;
    line-height: 70px;
  }
  .el-container{
    height: 100%;
  }
  .el-aside {
    background-color: #495060;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    margin: 0;
    padding: 0;
    position: relative;
  }
</style>
