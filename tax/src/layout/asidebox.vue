<template>
  <el-menu
    :router="true"
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#495060"
    text-color="#C8CBCF"
    active-text-color="#363E4F"
  >
    <h2>节税管家</h2>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-tickets" style="padding-left: 15%;"></i>
        <span>任务管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/reconciliation">自主开票管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {};
</script>

<style>
h2{
  color: #ffffff;
    font-weight: 600;
    display: inline-block;
    padding-top: 10px;
    margin-right: 25px;
    height: 50px;
}
.el-submenu__title {
  padding: 0 !important;
  text-align: left;
}
.el-submenu__title >span{
  font-size: 13px !important;
}
.el-submenu__icon-arrow .el-icon-arrow-down {
  display: none !important;
}
.el-submenu__title i {
  color: #fff;
  /* padding-left: 15%; */
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-submenu__title{
  width:100%;
  /* text-align: center; */
      /* padding-left: 15%; */
}
.el-menu-item-group__title{
  padding: 0;
}
.el-menu-item{
  font-size: 13px;
  padding-left: 16px !important;
}
.is-active{
  background: #59BA73 !important;
  color:#fff !important;
  font-size: 18px;
}
.el-submenu .el-menu-item{
  min-width: 160px;
  padding: 0;
  font-size: 13px;
}
</style>
