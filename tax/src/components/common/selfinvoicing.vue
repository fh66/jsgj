<template>
  <div>
    
    <el-col :span="24" class="management">
      <el-col :span="4">自主开票管理</el-col>
    </el-col>
    <el-col :span="24" class="marquee">
      <el-col :span="4">
        <el-input v-model="code" placeholder="任务编号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="enterpriseName" placeholder="任务企业名称"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="search.reviewer" placeholder="法人姓名"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="search.drawer" placeholder="所属管家"></el-input>
      </el-col>
      <el-col :span="5">
        <el-select v-model="value" placeholder="园区">
          <el-option
            v-for="(item,i) in options"
            :key="i"
            :label="item.parkName"
            :value="item.parkName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3"></el-col>
    </el-col>
    <el-col :span="24" class="taskStatus">
      <el-col :span="5">
        <el-select v-model="value1" placeholder="任务状态">
          <el-option
            v-for="(item,i) in options1"
            :key="i"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">创建时间</el-col>
      <el-col :span="4">
        <div class="demo-input-suffix">
          <el-date-picker
            placeholder="起始日期"
            :picker-options="pickerOptions1"
            suffix-icon="el-icon-date"
            v-model="createTimeStart"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="demo-input-suffix">
          <el-date-picker
            placeholder="结束日期"
            :picker-options="pickerOptions2"
            suffix-icon="el-icon-date"
            v-model="createTimeEnd"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="2">开票张数</el-col>
      <el-col :span="4">
        <el-input v-model="invoiceNumStart" placeholder="起"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="invoiceNumEnd" placeholder="止"></el-input>
      </el-col>
    </el-col>
    <el-col :span="24" class="amount">
      <el-col :span="2">开票金额</el-col>
      <el-col :span="4">
        <el-input v-model="invoiceAmountStart" placeholder="起"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inoviceAmountEnd" placeholder="止"></el-input>
      </el-col>
      <el-col :span="3" :offset="8">
        <el-button type="primary" @click="searchData">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="addData">全部</el-button>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
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
      value: "园区",
      options1: [],
      value1: "任务状态",
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
      Datetime:[],
      code:'',
      enterpriseName:'',
      invoiceAmountStart:'',
      inoviceAmountEnd:'',
      invoiceNumStart:'',
      invoiceNumEnd:''
    };
  },
  methods:{
    searchData(){
      this.$http.post(`enterprise/queryList?code=${this.code}&createTimeEnd=${this.createTimeEnd}&createTimeStart=${this.createTimeStart}&enterpriseName=${this.enterpriseName}&invoiceNumStart=${this.invoiceNumStart}&invoiceNumEnd=${this.invoiceNumEnd}&invoiceAmountStart=${this.invoiceAmountStart}&inoviceAmountEnd=${this.inoviceAmountEnd}`).then(data=>{
        var data =data.data.data.list.list
          console.log(data)
        if(data.status===200){
          this.tableData=data
          console.log(this.tableData)
        }
      })
      // console.log(1)
    },
    addData(){
      this.$http.post(`enterprise/queryList`).then(data=>{
        console.log(data)
        this.code='',
        this.enterpriseName='',
        this.createTimeStart='',
        this.createTimeEnd='',
        this.invoiceNumStart='',
        this.invoiceNumEnd='',
        this.invoiceAmountStart='',
        this.inoviceAmountEnd=''
      })
    },
    getAllList(){
      this.$http.post(`enterprise/queryList`).then(data=>{
        var data = data.data.data
        // console.log(data)
      })
    },
    getAll(){
      this.$http.get('/sys/queryDictMap').then(data=>{
        if(data.status==200){
        var data = data.data.data.auto_invoice_enterprise_status
        this.options1=data
        }
      })
    }
  },
  mounted(){
    this.getAll();
    this.getAllList()
  }
}
</script>

<style>

</style>
