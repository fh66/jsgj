<template>
  <div>
        <el-col :span="24" class="management">
      <el-col :span="4">自主开票管理</el-col>
    </el-col>
    <el-col :span="24" class="marquee">
      <el-col :span="1" class="marquee_span span1">
        <span>任务编号:</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="code" class="marquee_input"></el-input>
      </el-col>
      <el-col :span="1" class="marquee_span" >
        <span>企业名称:</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="enterpriseName" class="marquee_input" ></el-input>
      </el-col>
      <el-col :span="1" class="marquee_span">
        <span>法人姓名:</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="search.reviewer" class="marquee_input"></el-input>
      </el-col>
    </el-col>
    <el-col :span="24" class="taskStatus">
      <el-col :span="1" class="marquee_span span1">
        <span>所属管家:</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="search.drawer" class="marquee_input"></el-input>
      </el-col>
      <el-col :span="1" class="marquee_span">
        <span>园区:</span>
      </el-col>
      <el-col :span="5">
        <el-select v-model="value" class="marquee_input" placeholder="请选择">
          <el-option
            v-for="(item,i) in optionS1"
            :key="i"
            :label="item.parkName"
            :value="item.parkName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" class="marquee_span ">任务状态:</el-col>
      <el-col :span="5">
        <el-select v-model="status" class="taskStatus_input renwuzt" >
          <el-option label="暂存" value="1"></el-option>
          <el-option label="服务中" value="2"></el-option>
          <!-- <el-option label="停止" value="9"></el-option> -->
        </el-select>
      </el-col>
    </el-col>
    <el-col :span="24" class="amount">
      <el-col :span="1" class="marquee_span span1">开票金额:</el-col>
      <el-col :span="4">
        <el-input v-model="invoiceAmountStart" class="amount_input" placeholder="起"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inoviceAmountEnd" class="amount_input" placeholder="止"></el-input>
      </el-col>
      <el-col :span="1" class="marquee_span" style="margin-left:36px; margin-right: 0px;">开票张数:</el-col>
      <el-col :span="4" style="margin-left: 8px;">
        <el-input v-model="invoiceNumStart" class="taskStatus_input" placeholder="起"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="invoiceNumEnd" class="taskStatus_input" placeholder="止"></el-input>
      </el-col>
      <el-col :span="1" class="marquee_span" style="    margin-left: 28px;">创建时间:</el-col>
      <el-col :span="4"  style="margin-left: 1px;">
        <div class="demo-input-suffix taskStatus_input" >
          <el-date-picker
            placeholder="起"
            :picker-options="pickerOptions1"
            suffix-icon="el-icon-date"
            class="qi"
            value-format="yyyy-MM-dd"
            v-model="createTimeStart"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="demo-input-suffix taskStatus_input">
          <el-date-picker
            placeholder="止"
            :picker-options="pickerOptions2"
            suffix-icon="el-icon-date"
            class="zhi"
            value-format="yyyy-MM-dd"
            v-model="createTimeEnd"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="2" class="taskStatus_span1" style="margin-left: 61px;">
        <span class="searchData cao_btn6" @click="searchData">搜索</span>
      </el-col>
      <el-col :span="2" class="taskStatus_span2">
        <span class="cao_btn7" @click="addData" style="width:52px;" >清空条件</span>
      </el-col>
    </el-col>
    <div class="sear_line"></div>
    <!-- 表格 -->
    <el-col :span="24" class="total">
      <ul>
        <li @click="qb" :class="{'active':num3===li1}">全部({{all}})</li>
        <li @click="zc" :class="{'active':num3===li2}">暂存({{temporary}})</li>
        <li @click="fwz" :class="{'active':num3===li4}">服务中({{serving}})</li>
      </ul>
    </el-col>
    <el-col :span="24" class="export">
      <el-col :span="2">
        <span class="cao_btn4" >导出</span>
      </el-col>
      <el-col :span="6" style="text-align: left; height:30px;line-height:30px;">
        <div class="colw">
          <span>
          共
          <span v-text="num"></span>家企业，开票金额共计：
          <span v-text="moeny"></span>元
        </span>
        </div>
      </el-col>
      <el-col :span="2" :offset="8">
        <span @click="newlycompany" class="cao_btn3" >新增企业</span>
      </el-col>
      <el-dialog title="新增企业"  class="addqy" :visible.sync="dialogFormVisible">
        <el-form :model="form" :label-position="labelPosition" :rules="rules" ref="form">
          <el-form-item label="企业名称"   :label-width="formLabelWidth" >
              <el-select v-model="region1" filterable placeholder="请选择" @change="a12" clearable>
              <el-option
            v-for="(item,id,index) in addCompany"
            :key="index"
            :label="item.task_company_name"
            :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="税号" prop="region"  :label-width="formLabelWidth">
            <el-input v-model="region" autocomplete="off"  >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="Qx ">取 消</el-button> -->
          <span @click="Qx" class="cao_btn cao_btn9">取 消</span>
          <span @click="define" class="cao_btn YiKaiPiaoGuanLick">确 定</span>
          <!-- <el-button type="primary" @click="define">确 定</el-button> -->
        </div>
      </el-dialog>
    </el-col>
    <div class="bg">
      <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 98%">
        <el-table-column type="selection"  width="35"></el-table-column>
        <el-table-column label="任务编号"  width="100">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column prop="enterpriseName" label="任务企业名称" ></el-table-column>
        <el-table-column prop="createTime" label="创建人/创建时间" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row. createTime|dateformat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reviewer" label="所属管家" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="registerAddress" label="园区" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status"  label="状态" width="90">
          <template slot-scope="scope">
          <!-- {{scope.row.status}} -->
            <span v-if="scope.row.status===1" >暂存</span>
            <span v-if="scope.row.status===2" >服务中</span>
            <!-- <span v-if="scope.row.status===9" >停止</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="num" label="已开票张数" width="100"></el-table-column>
        <el-table-column prop="amount" label="已开票金额" width="100">
          <!-- <template slot-scope="scope">
          </template> -->
        </el-table-column>
        <el-table-column prop="operating" label="操作" width="250">
          <template slot-scope="scope" class="anniu">
            <span @click="edit(scope.row.id, scope.row)" class="cao_btn cao_btn1 YiKaiPiaoGuanLick">编辑</span>
            <span @click="handleEdit(scope.row.id,scope.row)" class="cao_btn cao_btn2">二维码</span>
            <span v-if="scope.row.num ===0" @click="handleDelete(scope.row.id, scope.row)" class="cao_btn cao_btn5 YiKaiPiaoGuanLisc">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div>
      </div>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 30, 50]"
      :page-size="10"
      layout=" sizes, prev, pager, next, jumper"
      :total=total
      style="text-align:right;margin-top:20px; margin-bottom:20px;">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      qrCodeSize:'',
      shareUrl:'',
      total:0,
      pagesize:10,
      currentPage4:1,
      li1:0,
      li2:1,
      li3:2,
      li4:3,
      region1:'',
      all: '',
      temporary:'',
      stop:'0',
      num3:'',
      serving:'',
      num: '',
      moeny: '',
      options:{},
      a1:'',
      region:'',
      tableData: [],
      addCompany:[],
      dialogFormVisible: false,
      form: {
        name: "",
        region: ""
      },
      rules: {
        region1: [{ required: true, message: "不能为空", trigger: "change" }],
        region: [
          { required: true, message: "请输入税号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      labelPosition: "left",
      timeout:  null,
      optionS1: [
        {"parkId":26,"parkName":"湖北武穴园"},
        {"parkId":25,"parkName":"江苏关庙园"},
        {"parkId":24,"parkName":"山东奎文园"},
        {"parkId":23,"parkName":"重庆忠县园"},
        {"parkId":22,"parkName":"江西瑞昌园"},
        {"parkId":21,"parkName":"浙江舟山园"},
        {"parkId":19,"parkName":"江苏宿迁园"},
        {"parkId":18,"parkName":"山东寿光园"},
        {"parkId":6,"parkName":"重庆垫江园"}
      ],
      createTimeStart:'',
      createTimeEnd:'',
      search:{
        code:'',
        enterpriseName:'',
        reviewer:'',
        drawer:'',
        invoiceNumStart:'',
        invoiceNumEnd:'',
        invoiceAmountStart:'',
        inoviceAmountEnd:''
      },
      // enterpriseName:'',
      value: "",
      status: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value2: "",
      value3: "",
      dialogTableVisible: false,
      Datetime:[],
      code:'',
      enterpriseName:'',
      invoiceAmountStart:'',
      inoviceAmountEnd:'',
      invoiceNumStart:'',
      invoiceNumEnd:'',
      ym:0
    };
  },
  methods: {
    handleSizeChange(val){
      this.ym=val
      console.log(this.ym)
      this.$http.post(`enterprise/queryList?pageSize=${val}`).then(data=>{
      console.log(data.data.data.list.list)
        // console.log(val)
        var list = data.data.data.list.list
        if(data.status===200){
          this.tableData=list
        }
      })
    },
    handleCurrentChange(val){
      // var val = this.currPage
      console.log(this.pagesize)
      this.pagesize=this.ym
      this.$http.post(`enterprise/queryList?currPage=${val}&currPage=${this.pagesize}`).then(data=>{
        var list = data.data.data.list.list
        console.log(list)
        if(data.status===200){
          this.tableData=list
        }
      })
    },
    // 全部
    qb(){
      this.num3=this.li1
      this.$http.post(`enterprise/queryList`).then(data=>{
        var qb = data.data.data
        if(data.status===200){
          var dataA =data.data.data.list.list
          this.tableData=dataA
          // console.log(data.data.data.countInfo)
          this.num = qb.num
          this.moeny=qb.amount
          this.total=data.data.data.countInfo.total
        }
      })
    },
    // 暂存
    zc(){
      this.num3=this.li2
      this.$http.post(`enterprise/queryList?status=1`).then(data=>{
        var qb = data.data.data
        if(data.status===200){
          var dataA =data.data.data.list.list
          console.log(data.data.data.countInfo)
          this.tableData=dataA
          this.num=qb.num
          if(qb.amount===null){
            this.moeny=0
          }else{
            this.moeny=qb.amount
          }
          this.total=data.data.data.countInfo[1]
        }
      })
    },
    // 停止
    // tz(){
    //   this.num3=this.li3
    //   this.$http.post(`enterprise/queryList?status=3`).then(data=>{
    //     if(data.status===200){
    //       var data =data.data.data.list.list
    //       this.tableData=data
    //     }
    //   })
    // },
    // 服务中
    fwz(){
      this.num3=this.li4
      this.$http.post(`enterprise/queryList?status=2`).then(data=>{
        var qb = data.data.data
        if(data.status===200){
          var dataA =data.data.data.list.list
          this.tableData=dataA
          // console.log(data.data.data.countInfo)
          this.num=qb.num
          this.moeny=qb.amount
          this.total=data.data.data.countInfo[2]
        }
      })
    },
    // 搜索
    searchData(){
      // console.log(this.createTimeEnd)
        this.$http.post(`enterprise/queryList?status=${this.status}&code=${this.code}&createTimeEnd=${this.createTimeEnd}&createTimeStart=${this.createTimeStart}&enterpriseName=${this.enterpriseName}&invoiceNumStart=${this.invoiceNumStart}&invoiceNumEnd=${this.invoiceNumEnd}&invoiceAmountStart=${this.invoiceAmountStart}&inoviceAmountEnd=${this.inoviceAmountEnd}`).then(data=>{
          if(data.status===200){
            // console.log(data.data.data)
            var dataA =data.data.data.list.list
            this.tableData=dataA
            if(this.status==1){
            this.total=data.data.data.countInfo[1]
            // console.log(data.data.data.countInfo[1])
            }else if(this.status==2){
            this.total=data.data.data.countInfo[2]
            // console.log(data.data.data.countInfo[2])
            }
            this.num=data.data.data.num
            if(data.data.data.amount===null){
              this.moeny=0
            }else{
            this.moeny=data.data.data.amount
            }
          }
        })
    },
    // 全部搜索
    addData(){
      this.$http.post(`enterprise/queryList`).then(data=>{
        if(data.status===200){
        var dataA =data.data.data.list.list
          this.tableData=dataA
          console.log(data.data.data.countInfo)
        }
        this.code='',
        this.enterpriseName='',
        this.createTimeStart='',
        this.createTimeEnd='',
        this.invoiceNumStart='',
        this.invoiceNumEnd='',
        this.invoiceAmountStart='',
        this.inoviceAmountEnd='',
        this.value='',
        this.status='',
        this.total=data.data.data.countInfo.total
      })
    },
    getAllList(){
      this.$http.post(`enterprise/queryList`).then(data=>{
        var data = data.data.data
        // console.log(data)
      })
    },
    getAll1(){
      this.$http.get('/sys/queryDictMap').then(data=>{
        if(data.status==200){
        var data = data.data.data.auto_invoice_enterprise_status
        this.options1=data
        }
      })
    },
    a12(){
      for(var i =0; i<this.addCompany.length;i++){
        if(this.region1===this.addCompany[i].id){
          this.region=this.addCompany[i].unified_code
        }
      }
    },
    newlycompany(){
      this.$http.post('enterprise/queryAutoInvoiceSettledTask').then(data=>{
        var data = data.data
        this.addCompany=data
      })
      this.dialogFormVisible=true;
      var aa = this.addCompany
    },
    getAll(){
      this.$http.post('enterprise/queryAutoInvoiceSettledTask').then(data=>{
        var data = data.data
        this.addCompany=data
      })
    },
    // 添加操作
    define(){
      var aa = this.addCompany
      this.$http.post(`enterprise/insertAutoInvoiceEnterprise?settledId=${this.region1}`).then(data=>{
        if(data.status==200){
          // console.log(data)
          var data= data.data
          this.$message({
              message:data.message ,
              type: 'success'
          });
          this.region1=''
          this.region=''
          this.getData();
        }
      })
      for(var a1 in aa)
      if(aa[a1].unified_code==''){
        this.dialogFormVisible=true;
      }
      this.region=''
      this.dialogFormVisible=false
    },
    // 取消操
    Qx(){
      this.region1=''
      this.region=''
      this.dialogFormVisible=false
    },
    // 删除操作
    handleDelete(id,row){
      if(row.num!=0){
        this.$alert('该信息不能删除', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
            message: '您已取消操作',
            type: 'success'
            })
          }
        })
      }else{
        // 发送del请求
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(`enterprise/save?id=${id}&status=-1`).then(data=>{
          this.$message({message:data.data.data.param})
          this.getData();
      })}).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    edit(id,f) {
      console.log(f)
      this.$router.push({
        path: `/details`,
        query:{
          id:id,
          f:f
        }
        });
    },
    getData(){
      this.$http.post('enterprise/queryList').then(data=>{
        var dataa =data.data.data.list.total
        var datas = data.data.data.list.list
        var datac = data.data.data.countInfo
        var datab = data.data.data
        if(data.status===200){
          this.all = datac.total
          this.num = datab.num
          this.moeny=datab.amount
          this.tableData=datas
          this.temporary = datac['1']
          this.serving=datac['2']
          this.total=datac.total
        }
      })
    }
  },
  mounted() {
    this.getData();
    this.b1=this.getAll();
    this.getAll1();
    this.getAllList()
  }
};
</script>

<style>
.addqy>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__label::after{
        content: '*';
    color: #F56C6C;
    margin-right: 4px;
}
.el-pagination .btn-prev,
.el-pagination .btn-next,
.number{
      padding: 0px 0px;
    border: 1px solid #d9d9d9;
    background: #ffffff;
    color: #666666;
    border-radius: 3px;
    cursor: pointer;
    margin-left:10px;
      font-size: 13px;
  font-weight: normal;
}
.el-pager li.active{
  background: #388cff;
  border-bottom: none;
  color:#fff;
  font-size: 13px;
  font-weight: normal;
}
.el-pager li{
  margin-left:10px;
}
.cao_btn9{
  background-color: #909399 !important;
  margin: 0 2px;
}
.sear_line{
  height: 1px;
  border: none;
  background-color: #E5E7E8;
  margin: 0 20px 0;
  /* margin-right: 20px; */
  clear: both;
}
.taskStatus_span1{
  height: 29px;
  text-align: right;
  line-height: 29px;
}
.taskStatus_span2{
  height: 29px;
  text-align: left;
  line-height: 29px;
}
.cell{
  text-align: left;
}
.cao_btn{
    margin: 0 2px;
    transition: all .2s ease-in-out;
    font-size: 12px;
    line-height: 18px;
    border-radius: 2px;
    display: inline-block;
    padding: 3px 10px;
    color: #fff;
    cursor: pointer;
    background-color: #388CFF;
}
.YiKaiPiaoGuanLick{
    background-color: #5abcea !important;
    margin: 0px 2px;
}
.cao_btn5{
    background-color: #FF3D55 !important;
    margin: 0px 2px;
}
.cao_btn2{
  background-color: #FF9900 !important;
  margin: 0px 2px;
}
.cao_btn3{
    width: 52px;
    height: 18px;
    padding: 5px 10px;
    float: right;
    cursor: pointer;
    margin-right: 3%;
    display: inline-block;
    transition: all .2s ease-in-out;
    line-height: 18px;
    font-size: 13px;
    vertical-align: bottom;
    border-radius: 4px;
    color: #fff;
    border: none;
    background: none;
    background-color: #FF9900;
    position: absolute;
    right: 150px;
}
.cao_btn3:hover{
  color: #fff;
  background-color: #ee8815;
}
.cao_btn4{    
  position: absolute;
  /* padding-left: 15px; */
  left: 21px;
  display: inline-block;
  font-size: 13px;
  color: #2D8CF0;
  line-height: 29px;
  cursor: pointer;
  }
.colw{
  position: absolute;
  left: 69px;
  margin-left: -15px;
  color: black !important;
}
/* marquee输入框 */
.marquee_input{
  text-align: left;
}
.marquee_input>.el-input__inner{
    vertical-align: middle;
    text-align: left;
    border: 1px solid #d5d5d5;
    font-size: 12px;
    display: inline-block;
    width: 150px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    padding-left: 5px !important;
}
.marquee_input>.el-input>.el-input__inner{
  vertical-align: middle;
  text-align: left;
  border: 1px solid #d5d5d5;
  font-size: 12px;
  display: inline-block;
  width: 150px;
  height: 25px;
  line-height: 25px;
  border-radius: 2px;
  padding-left: 5px !important;
}
.marquee_input>.el-input--suffix .el-input__suffix-inner{
    position: absolute;
    top: -8px;
    right: 0;
}
.marquee_span,.span1{
  height:25px;
  line-height:25px;
  text-align:right;  
  margin-right: 7px;
}
.span1{
  margin-left:10px; 
}
/*  taskStatus */
.taskStatus_input>.el-input__inner{
  vertical-align: middle;
  text-align: left;
  border: 1px solid #d5d5d5;
  font-size: 12px;
  display: inline-block;
  width: 150px;
  height: 25px;
  line-height: 25px;
  border-radius: 2px;
  padding: 1px 0;
  padding-left: 5px;
  padding-right: 0;
}
.renwuzt>.el-input>.el-input__inner{
      vertical-align: middle;
    text-align: left;
    border: 1px solid #d5d5d5;
    font-size: 12px;
    display: inline-block;
    width: 150px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    padding-left: 5px !important;
}
.taskStatus_input>.el-input>.el-input__inner{
  vertical-align: middle;
  text-align: left;
  border: 1px solid #d5d5d5;
  font-size: 12px;
  display: inline-block;
  width: 150px;
  height: 25px;
  line-height: 24px;
  border-radius: 2px;
}
.taskStatus_input>.el-input>.el-input__prefix>.el-icon-date{
  line-height: 25px;
}
.taskStatus_input>.el-input--suffix .el-input__suffix-inner{
    position: absolute;
    top: -8px;
    right:0;
}
/* .taskStatus_input>.el-input>.el-input__prefix{
  right: 24px;
} */
.taskStatus_input>input,
.taskStatus_input>input{
  padding: 1px 0;
  padding-left: 5px;
  padding-right: 0;
  border-radius: 2px;
}
/* amount */
.amount_input>.el-input__inner{
  padding: 1px 0;
  padding-left: 5px;
  padding-right: 0;
  vertical-align: middle;
  text-align: left;
  border: 1px solid #d5d5d5;
  font-size: 12px;
  display: inline-block;
  width: 150px;
  height: 25px;
  line-height: 25px;
  border-radius: 2px;
}
/* top */
.cao_btn6{
  cursor: pointer;
  transition: all .2s ease-in-out;
  font-size: 13px;
  line-height: 13px;
  border-radius: 4px;
  background-color: #59BA73;
  border: 1px solid #59BA73;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  padding: 7px 15px;
  color: #fff;
}
.cao_btn6:hover{
  cursor: pointer;
  border: 1px solid #1064c4;
  background-color: #1064c4;
}
.cao_btn7{
  cursor: pointer;
  border: 1px solid #D9D9D9;
  color: #495060;
  background: none;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  padding: 7px 15px;
  transition: all .2s ease-in-out;
  font-size: 13px;
  line-height: 13px;
  border-radius: 4px;
}
.active{
  color: #66B1FF;
  border-bottom: 2px solid #66B1FF;
  padding: 2px;
}
.total>ul{
  width: 241px;
  height: 26px;
  line-height: 26px;
}
.total li{
  padding: 2px;
  float: left;
  margin-left: 10px;
  cursor:pointer;
}
</style>
