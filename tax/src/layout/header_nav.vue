<template>
  <el-row>
    <el-col :span="1">
      <div class="grid-content bg-purple-dark">
      </div>
    </el-col>
    <el-col :span="23">
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style>
  .el-header{
    height: 70px !important;
    padding: 0;
  }
  .grid-content{
    height: 70px;
  }
  div>img{
    position: relative;
    width: 55px;
    height: 55px;
    left: 20px;
    top: 10px;
  }
</style>
