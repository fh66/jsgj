<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item >{{firstnav}}</el-breadcrumb-item>
    <el-breadcrumb-item >{{lastnav}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name:'crumbs',
  props:['firstnav','lastnav']
};
</script>

<style>
</style>
