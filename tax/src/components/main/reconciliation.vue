<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/index' }">任务管理</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{path:'/reconciliation'}">自主开票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 自主开票管理 -->
    <!-- <Selfinvoicing /> -->
    <Tabulation />
  </el-card>
</template>

<script>
import Tabulation from '../common/tabulation.vue'
export default {
  data() {
    return {
      input: "",
      options: [
        {
          value: "",
          label: ""
        }
      ],
      value: "园区",
      options1: [
        {
          value1: "",
          label1: ""
        }
      ],
      value2: "",
      value3: "",
      all: '',
      temporary:'',
      stop:'',
      serving:'',
      num: 36,
      moeny: 434333,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: ""
      },
      rules: {
        region: [{ required: true, message: "请选择企业", trigger: "change" }],
        name: [
          { required: true, message: "请输入税号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      labelPosition: "left",
      Datetime:[]
    };
  },
  methods: {
  },
  mounted() {
  },
  components:{
    Tabulation
  }
};
</script>

<style>
.class-a{
  font-size: 13px;
}
.class-b{
  border-bottom: 2px solid #2D8CF0;
  color: #2D8CF0;
  padding-bottom: 2px;
}
/* 面包屑 */
.el-breadcrumb {
  height: 50px;
  line-height: 66px;
  padding-left: 20px;    
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10);
}
.el-breadcrumb > span {
  height: 50px;
  font-size: 16px;
  line-height: 50px;
}
.el-breadcrumb__item:nth-last-child(1) span {
  cursor: pointer !important;
    color: #59BA73 !important;
    font-size: 16px  !important;
    font-weight: 600  !important;
}
.el-card__body {
  padding: 0;
}
/* 自主开票管理 */
.management,
.marquee,
.taskStatus,
.amount {
  margin-top: 20px;
}
.amount{
  margin-bottom: 10px;
}
.management {
  text-align: left;
  padding-left: 24px;
  font-size: 28px;
}
.marquee > .el-col-4,
.taskStatus > .el-col-4,
.amount > .el-col-4 {
  /* padding-left: 36px; */
  width: 156px;
}
.taskStatus > .el-col-4 {
  padding-left: 20px;
}
.marquee > .el-col-5,
.taskStatus > .el-col-5 {
  /* width: 200px; */
  text-align: left;
  /* padding-left: 36px; */
}

.taskStatus :first-child > .el-select,
.taskStatus :first-child > .el-select > .el-input--suffix {
  width: 134px;
}
.taskStatus :nth-child(3) > .demo-input-suffix,
.taskStatus :nth-child(3) > .demo-input-suffix > .el-input--prefix {
  width: 149px;
}
.taskStatus > .el-col-2{
  height: 40px;
  line-height: 40px;
  text-align: right;
}

.el-date-editor.el-input {
  width: 149px;
}
.amount > .el-col-4 {
  text-align: left;
}
.amount > .el-col-3 {
  width: 69px;
  height: 29px;
  margin-right: 20px;
}
.amount > .el-col-3 > button,
.export > .el-col-2 > button {
  padding: 7px 18px;
}
/* 表格 */
.total {
  text-align: left;
  padding-left: 10px;
  margin-top:10px;
}
.total > span {
  padding-left: 2px;
}
.export {
  margin-top: 10px;
}
.export > .el-col-4 {
  height: 30px;
  line-height: 30px;
  text-align: left;
  color: #6b6b6b;
}
.cell {
  text-align: center;
}
.el-table {
  border-bottom: none;
  margin-left: 20px;
  margin-top: 20px;
}
.has-gutter > tr :last-child > .el-table_1_column_10.is-leaf {
  border-right: none;
}
.el-table__row > .el-table_1_column_10 {
  border-right: none;
}
.bg {
  position: absolute;
  top: 330px;
  width: 100%;
}
/* 新增企业 */
.el-form-item__content{
  text-align: left;
  width: 333px;
}
.el-dialog__body>.el-form--label-left>.el-form-item>.el-form-item__content>.el-select{
  width: 333px ;
}
.is-required > .el-form-item__content > .el-select,
.is-error > .el-form-item__content > .el-input {
  width: 333px;
}
.dialog-footer {
  text-align: center;
}
</style>
