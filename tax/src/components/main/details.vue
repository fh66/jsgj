<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/reconciliation'}">开票自主管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/details'}">自主开票管理详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 购买方开票列表 -->
    <el-col :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理"  name="first">
      <el-col :span="6" style="text-align: left;">
        <h2 v-text="BillingList"></h2>
      </el-col>
      <el-col :span="24" class="marquee" style="margin-left: -10px; margin-top:0;">
        <el-col :span="1" class="marquee_span">发票抬头:</el-col>
        <el-col :span="4" style="margin-right: 10px;">
          <el-input placeholder="发票抬头" class="marquee_input" v-model="invoiceTitle" clearable ></el-input>
        </el-col>
        <el-col :span="1" class="marquee_span">抬头类型:</el-col>
        <el-col :span="4">
          <el-select v-model="invoiceTitleType" class="marquee_input" placeholder="抬头类型">
            <el-option label="企业单位"  value="1"></el-option>
            <el-option label="个人"  value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1" class="marquee_span">开票状态:</el-col>
        <el-col :span="4">
          <el-select v-model="status" class="marquee_input" placeholder="开票状态" >
            <el-option  label="待开票"  value="1"></el-option>
            <el-option  label="开票中"  value="2"></el-option>
            <el-option  label="开票失败" value="3"></el-option>
            <el-option  label="已开票"  value="4"></el-option>
            <el-option  label="已冲红"  value="5"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1" class="marquee_span">发票号:</el-col>
        <el-col :span="4" style="margin-right: 10px;">
          <el-input placeholder="发票号" class="marquee_input" v-model="invoiceNum" clearable  ></el-input>
        </el-col>
        <el-col :span="1" class="marquee_span">备注:</el-col>
        <el-col :span="4">
          <el-input placeholder="备注" class="marquee_input" v-model="input3" clearable></el-input>
        </el-col>
      </el-col>
      <el-col :span="24" class="billing" style="margin-left: 1px;">
        <el-col :span="1"  class="marquee_span marquee_left" >
          <span>开票金额:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="invoiceAmountStart" class="marquee_input" placeholder="起"></el-input>
        </el-col>
        <el-col :span="4" style="margin-left:-14px;">
          <el-input v-model="invoiceAmountEnd" class="marquee_input" placeholder="止"></el-input>
        </el-col>
        <el-col :span="1"  class="marquee_span" style="margin-left:58px;">申请时间:</el-col>
        <el-col :span="4">
          <div class="demo-input-suffix taskStatus_input" >
            <el-date-picker
              placeholder="起始日期"
              :picker-options="pickerOptions1"
              suffix-icon="el-icon-date"
              value-format="yyyy-MM-dd"
              v-model="createTimeStart"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="4" style="margin-left: -14px;">
          <div class="demo-input-suffix taskStatus_input">
            <el-date-picker
              placeholder="结束日期"
              :picker-options="pickerOptions1"
              suffix-icon="el-icon-date"
              value-format="yyyy-MM-dd"
              v-model="createTimeEnd"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="10" class="taskStatus_serach" >        
        <el-col :span="3" class="taskStatus_serach1" >
        <span class="searchData cao_btn6" @click="serachData">搜索</span>
        </el-col>
        <el-col :span="3" class="taskStatus_serach2" >
        <span class="cao_btn7" @click="add" style="width:52px;">清空条件</span>
      </el-col></el-col>
      </el-col>
      <div class="sear_line1"></div>
      <!-- 表格 -->
      <el-col :span="24" class="kaipiao">
        <ul>
          <li @click="whole" style="margin-left:0px;" :class="{'active':num1===li1}">全部({{all}})</li>
          <li @click="era" :class="{'active':num1===li2}">待开票({{pendinginvoice}})</li>
          <li @click="already" :class="{'active':num1===li3}">已开票({{invoiced}})</li>
          <li @click="hasred" :class="{'active':num1===li4}">已冲红({{alreadyred}})</li>
        </ul>
      </el-col>
      <el-col :span="24" class="export">
        <el-col :span="2">
          <span class="cao_btn4" style="margin-left: -18px;cursor:pointer;" >导出</span>
        </el-col>
      <el-col :span="6" style="text-align: left; height:30px;line-height:30px;">
        <div class="colw" style="margin-left=-35px">
	        <span style="height: 30px; line-height: 30px;">
            开票张数共计
            <span v-text="num"></span>张，开票金额共计：
            <span v-text="moeny"></span>元
          </span>
        </div>
      </el-col>
        <el-col :span="1" :offset="8">
          <span  @click="newbilling" class="cao_btn3 cao_btn10" >新增开票</span>
          <el-dialog title="开票申请" class="add" style=""  :visible.sync="dialogFormVisible">
            <div class="fpxq">发票详情</div>
            <el-form :model="addObj"  :label-position="labelPosition" :rules="rules" ref="form">
              <el-form-item label="抬头类型"  :label-width="formLabelWidth" class="ttlx">
                <el-select v-model="addObj.invoiceTitleType"    placeholder="请选择">
                  <el-option
                    v-for="(item,i) in options1"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票抬头" prop="invoiceTitle" :label-width="formLabelWidth">
                <el-input v-model="addObj.invoiceTitle"  autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="税号" prop="taxPayeeId" :label-width="formLabelWidth">
                <el-input v-model.number="addObj.taxPayeeId"  autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单位地址" prop="unitAddress" :label-width="formLabelWidth">
                <el-input v-model="addObj.unitAddress"  autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单位电话" prop="unitPhone" :label-width="formLabelWidth">
                <el-input v-model="addObj.unitPhone"  autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户银行" prop="unitBank" :label-width="formLabelWidth">
                <el-input v-model="addObj.unitBank"  autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="银行账号" prop="unitBankAccount" :label-width="formLabelWidth">
                <el-input v-model="addObj.unitBankAccount"  autocomplete="off"></el-input>
              </el-form-item>
              <div class="fpxq">接受信息</div>
              <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                <el-input v-model="addObj.email"   autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
                <el-input v-model="addObj.phone"  autocomplete="off"></el-input>
              </el-form-item>
              <div class="fpxq">填写信息</div>
              <el-form-item label="开票金额" prop="invoiceAmount" :label-width="formLabelWidth">
                <el-input v-model="addObj.invoiceAmount" class="hongse" @blur="NumberToChinese(addObj.invoiceAmount)" autocomplete="off">
                </el-input>
                  <div style="text-align:left;margin-top: -22px;"> 大写:{{text}}</div>
              </el-form-item>
              <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder=""
                  v-model="addObj.remark"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <span @click="cancel" class="cao_btn cao_btn8" >取消</span>
              <span @click="determine"  class="cao_btn YiKaiPiaoGuanLick">保存</span>
            </div>
          </el-dialog>
        </el-col>
      </el-col>
      <div class="InvoiceList">
        <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width:100%">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column label="任务编号" width="100">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
          <el-table-column prop="invoiceTitleType" label="抬头类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.invoiceTitleType ===1">企业单位</span>
              <span v-if="scope.row.invoiceTitleType ===2">个人</span>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceTitle" label="发票抬头"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="taxPayeeId" label="税号" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="接收邮箱" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="接收手机" width="110"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row. createTime|dateformat}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="invoiceAmount" label="开票金额" width="110">
            
          </el-table-column>
          <el-table-column prop="invoiceInfo[invoicePdfUrl]" label="发票文件" width="260">
            <!-- <iframe class="prism-player" :src="src " width="100%" height="100%"></iframe> -->
            <a :href="src" target="_blank" >{{src1}}</a>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="110"></el-table-column>
          <el-table-column prop="status" label="状态" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1" >待开票</span>
              <span v-if="scope.row.status===2" >开票中</span>
              <span v-if="scope.row.status===3" >开票失败</span>
              <span v-if="scope.row.status===4" >已开票</span>
              <span v-if="scope.row.status===5" >已冲红</span>
            </template>
          </el-table-column>
          <el-table-column prop="operating" label="操作" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1"  @click="handleEdit(scope.row.index,scope.row)" class="cao_btn cao_btn8">编辑</span>
              <span v-if="scope.row.status!==1&&scope.row.status!==3"  @click="handleEdit1(scope.row.index,scope.row)" class="cao_btn YiKaiPiaoGuanLick">查看</span>
              <span v-if="scope.row.status!==5&&scope.row.status!==3&&scope.row.status!==1&&scope.row.status!==2"  @click="flushred(scope.$index,scope.row)" class="cao_btn cao_btn5 ">冲红</span>
              <span v-if="scope.row.status===1" class="cao_btn cao_btn9" @click="handleDelete(scope.$index, scope.row)">删除</span>
              <span v-if="scope.row.status===3" class="cao_btn cao_btn9" @click="cxtj(scope.$index, scope.row)">重新提交</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <el-pagination
        @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 30,50]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next, jumper"
      :total=total
      style="text-align: right;">
    </el-pagination>
    </el-tab-pane>
    <!-- 销货方配置信息 -->
        <el-tab-pane label="销货方配置信息" name="second">
          <el-col :span="20" class="sales">
            <el-col :span="5" style="    text-align: left;">
              <h2 v-text="configuration"></h2>
            </el-col>
            <el-col :span="2" :offset="11">
              <el-button  v-show="Isdisabled" type="warning"  @click="bianji">编辑</el-button> 
              <el-button v-show="!Isdisabled" type="warning" @click="save" >保存</el-button>
            </el-col>
            <el-col :span="2">
              <el-button v-show="!Isdisabled" type="info" @click="calloff" >取消</el-button>
            </el-col>
          </el-col>
          <el-col :span="24" style="text-align:left;font-size:13px">
            状态:
            <span>{{msg}}</span>
          </el-col>
          <el-form :model="information" :label-position="labelPosition" :rules="rules" ref="form">
            <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
              <el-input v-model="information.enterpriseName" :disabled="isDisabled" autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item label="税号" prop="taxPayerId" :label-width="formLabelWidth">
              <el-input v-model.number="information.taxPayerId" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="registerAddress" :label-width="formLabelWidth">
              <el-input v-model="information.registerAddress" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
              <el-input v-model.number="information.phone" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bank" :label-width="formLabelWidth">
              <el-input v-model="information.bank" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户银行账号" prop="bankAccount" :label-width="formLabelWidth">
              <el-input v-model.number="information.bankAccount" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开票人" prop="drawer" :label-width="formLabelWidth">
              <el-input v-model="information.drawer" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="复核" prop="reviewer" :label-width="formLabelWidth">
              <el-input v-model="information.reviewer" :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收款人" prop="payee" :label-width="formLabelWidth">
              <el-input v-model="information.payee"  :disabled="isDisabled"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="税率" :label-width="formLabelWidth" >
                <el-select v-model="information.taxRate"  :disabled="isDisabled1"  placeholder="请选择">
                  <el-option
                    v-for="(item,i) in autorate"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货物或应税劳务、服务名称" prop="taxItem" :label-width="formLabelWidth">
              <el-input v-model="information.taxItem"   :disabled="isDisabled1" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="税收分类编码" prop="taxCode" :label-width="formLabelWidth">
              <el-input v-model="information.taxCode"  :disabled="isDisabled1" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="诺诺身份ID" prop="identity" :label-width="formLabelWidth">
              <el-input v-model="information.identity"  :disabled="isDisabled1"  autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <!-- 修改发票申请 -->
    <el-dialog title="修改发票申请"  class="modify" :visible.sync="modify">
      <el-form :model="editObj" :label-position="labelPosition"  :rules="rules" ref="form">
        <div class="fpxq">发票详情</div>
        <el-form-item label="抬头类型" :label-width="formLabelWidth" style="margin-top:10px;" class="ttlx">
          <el-select v-model="editObj.invoiceTitleType"  :disabled="isDisabled2" placeholder="企业单位">
                  <el-option
                    v-for="(item,i) in options1"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle" :label-width="formLabelWidth">
          <el-input v-model="editObj.invoiceTitle" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxPayeeId" :label-width="formLabelWidth">
          <el-input v-model.number="editObj.taxPayeeId" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="unitAddress" :label-width="formLabelWidth">
          <el-input v-model="editObj.unitAddress" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="unitPhone" :label-width="formLabelWidth">
          <el-input v-model="editObj.unitPhone" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="unitBank" :label-width="formLabelWidth">
          <el-input v-model="editObj.unitBank" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="unitBankAccount" :label-width="formLabelWidth">
          <el-input v-model="editObj.unitBankAccount" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">接受信息</div>
        <el-form-item label="邮箱" prop="email" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="editObj.email" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editObj.phone" :disabled="isDisabled2" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">填写信息</div>
        <el-form-item label="开票金额" prop="invoiceAmount" style="margin-top:10px;"  :label-width="formLabelWidth">
          <el-input v-model="editObj.invoiceAmount" :disabled="isDisabled2" class="hongse" @blur="NumberToChinese(editObj.invoiceAmount)" autocomplete="off">
            </el-input>
        </el-form-item>
          <div style=" margin-top: -22px; text-align: left; margin-left:70px;"> 大写:{{text}}</div>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder :disabled="isDisabled2"  v-model="editObj.emarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span class="cao_btn cao_btn9" v-show="qxkp" @click="modifycancel">修改</span>
        <span  class="cao_btn YiKaiPiaoGuanLick" v-show="qxkp" @click="modifydetermine">开票</span>
        <span class="cao_btn cao_btn9" v-show="!qxkp" @click="ext" >取消</span>
        <span class="cao_btn YiKaiPiaoGuanLick" v-show="!qxkp" @click="baocun1" >保存</span>
      </div>
    </el-dialog>
    <!-- 冲红开票申请 -->
    <el-dialog title="冲红开票申请" class="flushred" :visible.sync="flushredbilling">
      <el-form :model="addObj" :label-position="labelPosition" :rules="rules" ref="form">
        <div class="fpxq">发票详情</div>
        <el-form-item label="抬头类型" :label-width="formLabelWidth" style="margin-top:10px;" class="ttlx">
          <el-select v-model="addObj.invoiceTitleType"  :disabled="true"  placeholder="企业单位">
                  <el-option
                    v-for="(item,i) in options1"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle" :label-width="formLabelWidth">
          <el-input v-model="addObj.invoiceTitle" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxPayeeId" :label-width="formLabelWidth">
          <el-input v-model.number="addObj.taxPayeeId" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="unitAddress" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitAddress" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="unitPhone" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitPhone" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="unitBank" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitBank" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="unitBankAccount" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitBankAccount" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">接收信息</div>
        <el-form-item label="邮箱" prop="email" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="addObj.email" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addObj.phone" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">填写信息</div>
        <el-form-item label="开票金额" style="margin-top:10px;" prop="invoiceAmount" :label-width="formLabelWidth">
          <el-input v-model="addObj.invoiceAmount" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <div style=" margin-top: -22px;text-align:left     margin-left: 72px;"> 大写:{{text}}</div>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" :disabled="true" placeholder v-model="addObj.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span class="cao_btn cao_btn5 " @click="flushreddetermine">冲红</span>
      </div>
    </el-dialog>
    <!-- 查看 -->
        <el-dialog title="查看" class="examine" :visible.sync="chakan">
      <el-form :model="addObj" :label-position="labelPosition" :rules="rules" ref="form">
        <div class="fpxq">发票详情</div>
        <el-form-item label="抬头类型" :label-width="formLabelWidth" style="margin-top:10px;" class="ttlx">
          <el-select v-model="addObj.invoiceTitleType"  :disabled="true"  placeholder="企业单位">
                  <el-option
                    v-for="(item,i) in options1"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle" :label-width="formLabelWidth">
          <el-input v-model="addObj.invoiceTitle" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxPayeeId" :label-width="formLabelWidth">
          <el-input v-model.number="addObj.taxPayeeId" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="unitAddress" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitAddress" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="unitPhone" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitPhone" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="unitBank" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitBank" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="unitBankAccount" :label-width="formLabelWidth">
          <el-input v-model="addObj.unitBankAccount" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">接受信息</div>
        <el-form-item label="邮箱" prop="email" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="addObj.email" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addObj.phone" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">填写信息</div>
        <el-form-item label="开票金额" prop="invoiceAmount" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="addObj.invoiceAmount" class="hongse"  :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <div style=" margin-top: -22px;text-align:left;margin-left:70px;"> 大写:{{text}}</div>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" :disabled="true" :rows="2" placeholder v-model="addObj.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span @click="queding" class="cao_btn YiKaiPiaoGuanLick">确定</span>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑开票" class="flushred" :visible.sync="bianJi1">
      <el-form :model="modifyObj" :label-position="labelPosition" :rules="rules" ref="form">
        <div class="fpxq">发票详情</div>
        <el-form-item label="抬头类型"  :label-width="formLabelWidth" style="margin-top:10px;" class="ttlx">
          <el-select v-model="modifyObj.invoiceTitleType"  :disabled="bianJi"  placeholder="企业单位">
                  <el-option
                    v-for="(item,i) in options1"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.invoiceTitle" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxPayeeId" :label-width="formLabelWidth">
          <el-input v-model.number="modifyObj.taxPayeeId" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="unitAddress" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.unitAddress" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="unitPhone" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.unitPhone" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="unitBank" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.unitBank" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="unitBankAccount" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.unitBankAccount" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">接收信息</div>
        <el-form-item label="邮箱" prop="email" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.email" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.phone" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">填写信息</div>
        <el-form-item label="开票金额" style="margin-top:10px;" prop="invoiceAmount" :label-width="formLabelWidth">
          <el-input v-model="modifyObj.invoiceAmount" class="hongse" :disabled="bianJi" autocomplete="off"></el-input>
        </el-form-item>
        <div style=" margin-top: -22px;  text-align: left;   margin-left: 71px;"> 大写:{{text}}</div>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder :disabled="bianJi" v-model="addObj.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span class="cao_btn cao_btn8 " v-show="cxtj1" @click="Modify1">修改</span>
        <span class="cao_btn YiKaiPiaoGuanLick " v-show="cxtj1" @click="cxtj2">开票</span>
        <span class="cao_btn cao_btn9" v-show="!cxtj1" @click="ext1" >取消</span>
        <span class="cao_btn YiKaiPiaoGuanLick" v-show="!cxtj1" @click="baoCun1" >保存</span>
      </div>
    </el-dialog>
    <!-- 修改 -->
        <el-dialog title="修改发票申请"  class="modify" :visible.sync="Xg1">
      <el-form :model="xg1" :label-position="labelPosition" :rules="rules" ref="form">
        <div class="fpxq">发票详情</div>
        <el-form-item label="抬头类型" :label-width="formLabelWidth" style="margin-top:10px;" class="ttlx">
          <el-select v-model="xg1.invoiceTitleType"   placeholder="企业单位">
                  <el-option
                    v-for="(item,i) in options1"
                    :key="i"
                    :label="item"
                    :value="i"
                  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle" :label-width="formLabelWidth">
          <el-input v-model="xg1.invoiceTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxPayeeId" :label-width="formLabelWidth">
          <el-input v-model.number="xg1.taxPayeeId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="unitAddress" :label-width="formLabelWidth">
          <el-input v-model="xg1.unitAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="unitPhone" :label-width="formLabelWidth">
          <el-input v-model="xg1.unitPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="unitBank" :label-width="formLabelWidth">
          <el-input v-model="xg1.unitBank" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="unitBankAccount" :label-width="formLabelWidth">
          <el-input v-model="xg1.unitBankAccount" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">接受信息</div>
        <el-form-item label="邮箱" prop="email" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="xg1.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="xg1.phone" autocomplete="off"></el-input>
        </el-form-item>
        <div class="fpxq">填写信息</div>
        <el-form-item label="开票金额" prop="invoiceAmount" style="margin-top:10px;" :label-width="formLabelWidth">
          <el-input v-model="xg1.invoiceAmount" @blur="NumberToChinese(editObj.invoiceAmount)" autocomplete="off">
            </el-input>
          <div style=" margin-top: -22px;text-align:left"> 大写:{{text}}</div>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2"  placeholder v-model="editObj.emarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span class="cao_btn cao_btn9" @click="qx1">取消</span>
        <span  class="cao_btn YiKaiPiaoGuanLick" @click="kp2">开票</span>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      bianJi:true,
      src1:'',
      xg1:{},
      cxtj1:true,
      qxkp:true,
      pagesize:10,
      Xg1:false,
      src:'',
      total:0,
      currentPage4:1,
      li1:0,
      li2:1,
      li3:2,
      li4:3,
      num1:'',
      taxRate:{},
      activeName: "first",
      BillingList: "",
      options:{},
      invoiceTitleType: "",
      options1: {},
      value5:'',
      options5:{},
      autorate:{},
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
      flage:false,
      true:true,
      createTimeStart: "",
      createTimeEnd: "",
      invoiceAmountEnd:'',
      invoiceNum: "",
      invoiceAmountStart:'',
      inoviceAmountEnd:'',
      input3: "",
      all: '',
      pendinginvoice:'',
      invoiced:'',
      alreadyred:'',
      invoiceTitle:'',
      num: '',
      moeny: '',
      tableData: [],
      // 新增开票申请
      dialogFormVisible: false,
      // 修改开票申请
      modify: false,
      // 冲红开票申请
      flushredbilling: false,
      // 查看
      chakan:false,
      // 编辑
      bianJi1:false,
      // 新增开票
      addObj: {
        invoiceTitleType:''
      },
      editObj:{
        id:''
        },
      formLabelWidth: "120px",
      labelPosition: "left",
      // 销货方配置信息
      configuration: "销售方开票信息",
      configurationFrom: "",
      information: {},
      msg:'',
      // 验证
      rules: {
        enterpriseName:[
          {required:true, message:'不能为空'}
        ],
        address:[
          {required:true, message:'不能为空'}
        ],
        taxPayerId:[
          {required:true, message:'不能为空'}
        ],
        registerAddress:[
          {required:true,message:'不能为空'}
        ],
        phone:[
          {required:true,message:'不能为空'}
        ],
        bank:[
          {required:true,message:'不能为空'}
        ],
        bankAccount:[
          {required:true,message:'不能为空'}
        ],
        drawer:[
          {required:true,message:'不能为空'}
        ],
        taxRate:[
          { required: true, message: '不能为空' }
        ],
        reviewer:[
          {required:true,message:'不能为空'}
        ],
        payee:[
          {required:true,message:'不能为空'}
        ],
        bankAccount:[
          {required:true,message:'不能为空'}
        ],
        taxClassification:[
          {required:true,message:'不能为空'}
        ],
        taxCode:[
          {required:true, message:'不能为空'}
        ],
        taxItem:[
          {required:true,message:'不能为空'}
        ],
        identity:[
          {required:true,message:'不能为空'}
        ],
        taxPayeeId:[
          {required:true,message:'不能为空'}
        ],
        invoiceTitle:[
          {required:true,message:'不能为空'}
        ],
        invoiceAmount:[
          {required:true, message:'不能为空'}
        ],
        // region: [
        //   { required:true, message: '请选择'}
        // ],
        email:[
          {required:true,message:'请选择'}
        ]
      },
      sys:{},
      region:'',
      text: "",
      search:'',
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      isDisabled:true,
      Isdisabled:true,
      isDisabled1:true,
      isDisabled2:true,
      modifyObj:{},
      ggObj:{},
      ym:10,
      fanhui:{},
      xiugai:{},
      xiugaiObj:{},
      cxtjObj:{},
      edjObj1:{}
    };
  },
  methods: {
    // 重新提交开票
    cxtj2(){
      this.$http.post(`invoice/save?autoEnterpriseId=${this.$route.query.id}&invoiceTitleType=${this.modifyObj.invoiceTitleType}&invoiceTitle=${this.modifyObj.invoiceTitle}&taxPayeeId=${this.modifyObj.taxPayeeId}&unitAddress=${this.modifyObj.unitAddress}&unitPhone=${this.modifyObj.unitPhone}&unitBank=${this.modifyObj.unitBank}&unitBankAccount=${this.modifyObj.unitBankAccount}&email=${this.modifyObj.email}&phone=${this.modifyObj.phone}&invoiceAmount=${this.modifyObj.invoiceAmount}&remark=${this.modifyObj.remark}&invoiceType=1&id=${this.modifyObj.id}`).then(
        data=>{
          if(data.status===200){
            var data=data.data.data 
            this.$message({
              message:data.param
            })
            this.bianJi1=false;
          }
        }
      )
    },
    cxtj(i,y){
      this.modifyObj=y
      this.cxtjObj=JSON.parse(JSON.stringify(this.modifyObj))
      this.bianJi1=true;
    },
    Modify1(){
      this.cxtj1=!this.cxtj1
      this.bianJi=false;
      console.log(1)
    },
    kaipiao1(){    
      var edjObj=this.modifyObj  
      if(edjObj.invoiceTitleType!=''&&edjObj.invoiceTitle!=''&&edjObj.phone!=''&&edjObj.invoiceAmount!=''&&edjObj.email!=''){
        this.$http.post(`invoice/save?autoEnterpriseId=${this.$route.query.id}&invoiceTitleType=${edjObj.invoiceTitleType}&invoiceTitle=${edjObj.invoiceTitle}&taxPayeeId=${edjObj.taxPayeeId}&unitAddress=${edjObj.unitAddress}&unitPhone=${edjObj.unitPhone}&unitBank=${edjObj.unitBank}&unitBankAccount=${edjObj.unitBankAccount}&email=${edjObj.email}&phone=${edjObj.phone}&invoiceAmount=${edjObj.invoiceAmount}&remark=${edjObj.remark}&invoiceType=1`)
      .then(data=>{
      // console.log(this.editObj.status)
        if(data.status==200){
        // this.retrieveData()
        var data=data.data.data
        this.$message({
          message:data.param,
          type:"success"
        })
        }
      })
      }else{
        return this.$message.error('请输入正确的信息')
      }
    },
    ext1(){
      this.modifyObj=JSON.parse(JSON.stringify(this.cxtjObj))
      this.bianJi=true;
      this.cxtj1=!this.cxtj1
    },
    baoCun1(){

      this.bianJi=true;
      this.cxtj1=!this.cxtj1
    },
    qx1(){
      this.Xg1=false;
    },
    kp2(){
      if(edjObj.invoiceTitleType!=''&&edjObj.invoiceTitle!=''&&edjObj.phone!=''&&edjObj.invoiceAmount!=''){
        this.$http.post(`invoice/save?autoEnterpriseId=${this.$route.query.id}&invoiceTitleType=${this.editObj.invoiceTitleType}&invoiceTitle=${this.editObj.invoiceTitle}&taxPayeeId=${this.editObj.taxPayeeId}&unitAddress=${this.editObj.unitAddress}&unitPhone=${this.editObj.unitPhone}&unitBank=${this.editObj.unitBank}&unitBankAccount=${this.editObj.unitBankAccount}&email=${this.editObj.email}&phone=${this.editObj.phone}&invoiceAmount=${this.editObj.invoiceAmount}&remark=${this.editObj.remark}&invoiceType=1`)
      .then(data=>{
      // console.log(this.editObj.status)
        if(data.status==200){
        // this.retrieveData()
        var data=data.data.data
        this.$message({
          message:data.param,
          type:"success"
        })
        }
      })
      }else{
        return this.$message.error('请输入正确的信息')
      }
      this.Xg1=false;
    },
    // 分页
    handleSizeChange(val){
      this.ym=val
      this.$http.post(`invoice/queryList?pageSize=${val}`).then(data=>{
        var list = data.data.data.list.list
        if(data.status===200){
          this.tableData=list
        }
      })
    },
    handleCurrentChange(val){
      // var val = this.currPage
      this.pagesize=this.ym
      console.log(this.pagesize)
      this.$http.post(`invoice/queryList?pageSize=${this.pagesize}&currPage=${val}&status=${this.status}`).then(data=>{
        var list = data.data.data.list.list
        if(data.status===200){
          this.tableData=list
        }
      })
    },
    a1(){
      console.log(this.options1)
    },
    // 全部
    whole(){
      this.num1=this.li1
      this.$http.post(`invoice/queryList`).then(data=>{
        // console.log(data.data.data)
        var qb = data.data.data
        if(data.status===200){
        var data= data.data.data.list.list
        
          this.tableData=data
          console.log(qb)
          this.num = qb.num
          this.moeny=qb.amount
        }
      })
    },
    // 待开票
    era(){
      this.num1=this.li2
      this.$http.post(`invoice/queryList?status=1`).then(data=>{
        var qb = data.data.data
        if(data.status===200){
        var data= data.data.data.list.list
          this.tableData=data
          console.log(qb)
          this.num = qb.num
          this.moeny=0
        }
      })
    },
    // 已开票
    already(){
      this.num1=this.li3
      this.$http.post(`invoice/queryList?status=4`).then(data=>{
        var qb = data.data.data
        if(data.status===200){
        var data= data.data.data.list.list
        console.log(qb)
          this.tableData=data
          this.num = qb.num
          this.moeny=qb.amount
        }
      })
    },
    // 已冲红
    hasred(){
      this.num1=this.li4
      this.$http.post(`invoice/queryList?status=5`).then(data=>{
        var qb = data.data.data
        if(data.status===200){
        var data= data.data.data.list.list
          this.tableData=data
          console.log(qb)
          this.num = qb.num
          this.moeny=qb.amount
        }
      })
    },
    // 编辑
    bianji(){
      this.msg='服务中'
      this.isDisabled1=false
      this.Isdisabled=!this.Isdisabled
      this.fanhui=JSON.parse(JSON.stringify(this.information));
    },
    // 搜索
    serachData(){
      this.$http.post(`invoice/queryList?currPage=1&status=${this.status}&invoiceTitleType=${this.invoiceTitleType}&invoiceNum=${this.invoiceNum}&invoiceAmountEnd=${this.invoiceAmountEnd}&createTimeEnd=${this.createTimeEnd}&createTimeStart=${this.createTimeStart}&invoiceAmountStart=${this.invoiceAmountStart}&inoviceAmountEnd=${this.inoviceAmountEnd}&invoiceTitle=${this.invoiceTitle}`).then(data=>{
        if(data.status===200){
        var dataA= data.data.data.list.list
          for(var i  in dataA){
          var status = dataA[i].status
          if(status===4){            
            var url=dataA[i].invoiceInfo.invoicePdfUrl
            this.src=url
            var url1 = url.slice(60,78)
            this.src1=url1
          }else{
            this.src1=''
          }
        }
        console.log(this.invoiceAmountStart)
        console.log(this.invoiceAmountEnd)
        // 发票抬头
        if(this.invoiceTitle){
          console.log(data.data.data)
          this.total=data.data.data.countInfo.total
          this.num=data.data.data.num
          this.moeny=data.data.data.amount
          }else{}
        // 开票金额
        if(this.invoiceAmountStart){
          this.total=data.data.data.countInfo.total
          this.num=data.data.data.num
          this.moeny=data.data.data.amount
        }else{}
        if(this.invoiceAmountEnd){
          this.total=data.data.data.countInfo.total
          this.num=data.data.data.num
          this.moeny=data.data.data.amount
        }else{}
        // 根据抬头类型
        if(this.invoiceTitleType==1){
          console.log(data)
          this.num=data.data.data.countInfo[4]
          this.total=data.data.data.countInfo.total
          this.moeny=data.data.data.amount
        }else if(this.invoiceTitleType==2){
          console.log(data)
          this.num=data.data.data.countInfo[4]
          this.total=data.data.data.countInfo.total
          this.moeny=data.data.data.amount
        }
        // 根据开票状态
        if(this.status==1){
          // console.log(data.data.data)
          this.total=data.data.data.countInfo[1]
          this.num=0
          this.moeny=0
        }else if(this.status==2){
          // console.log(data.data.data)
          this.total=data.data.data.countInfo[2]
          this.num=0
          this.moeny=0
        }else if(this.status==3){
          // console.log(data.data.data)
          this.total=data.data.data.countInfo[3]
          this.num=0
          this.moeny=0
        }else if(this.status==4){
          // console.log(data.data.data)
          this.total=data.data.data.countInfo[4]
          this.num=data.data.data.countInfo[4]
          this.moeny=data.data.data.amount
        }else if(this.status==5){
          this.total=data.data.data.countInfo[5]
          this.num=data.data.data.countInfo[4]
          this.moeny=data.data.data.amount
        }
        this.tableData=dataA
        // console.log(data.data.data.countInfo)
        }
      })
    },
    // 删除
    handleDelete(i,u){
      this.$confirm("您确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => { 
        this.$http.post(`invoice/save?id=${u.id}&status=-1`).then(data=>{
          if(data.status===200){
            var  data=data.data.data
            this.$message({
            type: "success",
            message: data.param
          });
            this.serachData()
          }
        })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 全部
    add(){
      this.$http.post(`invoice/queryList`).then(data=>{
        if(data.status===200){
          var dataa = data.data.data
        var data= data.data.data.list.list
          this.tableData=data
          for(var i  in data){
          var status = data[i].status
          if(status===4){
            var url=data[i].invoiceInfo.invoicePdfUrl
            // console.log(url)  
            this.src=url
          }
        }
          this.num=dataa.num
          this.moeny=dataa.amount
          this.invoiceAmountStart='',
          this.invoiceNum='',
          this.invoiceTitle='',
          this.invoiceTitleType='',
          this.invoiceAmountEnd='',
          this.createTimeStart='',
          this.createTimeEnd='',
          this.inoviceAmountEnd='',
          this.remark='',
          this.status='',
          this.currentPage4=1
        }
      })
    },
    // 数字转大写
    toDx(n) {
      //阿拉伯数字转换函数
      switch (n) {
        case "0":
          return "零";
        case "1":
          return "壹";
        case "2":
          return "贰";
        case "3":
          return "叁";
        case "4":
          return "肆";
        case "5":
          return "伍";
        case "6":
          return "陆";
        case "7":
          return "柒";
        case "8":
          return "捌";
        case "9":
          return "玖";
      }
    },
    NumberToChinese(m){
      m *= 100;
      m += "";
      var length = m.length;
      var result = "";
      for (var i = 0; i < length; i++) {
          if (i == 2) {
              result = "元" + result;
          } else if (i == 6) {
              result = "万" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
              if (i != 0 && i != 1) {
                  if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                      result = "零" + result;
                  }
              }
              continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
      }
      result += result.charAt(result.length - 1) == '元' ? "整" : "";
      this.text = result;
    },
    getSys(){
      this.$http.post(`sys/queryDictMap`).then(data=>{
        var date=data.data.data
        if(data.status===200){
          this.autorate =date.auto_invoice_tax_rate
          this.options5  =date.auto_invoice_status
          this.options =date.invoice_types
          this.options1 = date.auto_invoice_title_type
        }
      })
    },
    handleClick() {
    },
    // 新增开票
    newbilling() {
      // console.log(this.$route.query.id)
      this.dialogFormVisible = true;
      this.$http.get(`invoice/id/${this.$route.query.id}`).then(data=>{
      // console.log(data)
        var dataa = data.data.data.param
        if(data.status==200){
          this.addObj={}
        }
      })
      this.dialogFormVisible = true;
    },
    // 修改发票
    cancel() {
      // console.log(this.addObj.id)
      this.addObj={}
      this.dialogFormVisible = false;
    },
    determine() {
      console.log(this.addObj)
      this.$http.post(`invoice/save?autoEnterpriseId=${this.$route.query.id}&invoiceTitleType=${this.addObj.invoiceTitleType}&invoiceTitle=${this.addObj.invoiceTitle}&taxPayeeId=${this.addObj.taxPayeeId}&unitAddress=${this.addObj.unitAddress}&unitPhone=${this.addObj.unitPhone}&unitBank=${this.addObj.unitBank}&unitBankAccount=${this.addObj.unitBankAccount}&email=${this.addObj.email}&phone=${this.addObj.phone}&invoiceAmount=${this.addObj.invoiceAmount}&remark=${this.addObj.remark}&invoiceType=1`).then(data=>{
        if(data.status===200){
          var msg=data.data.data.param
          console.log(msg)
          this.$message({
            message:msg,
          type:"success"
          })
          this.retrieveData()
        }
      })
      this.dialogFormVisible = false;
    },
    // 修改企业
    handleEdit(i,y) {
      this.editObj=y
      this.xiugai=JSON.parse(JSON.stringify(this.editObj))
      this.modify = true;
    },
    ext(){
      this.editObj=JSON.parse(JSON.stringify(this.xiugai))
      this.qxkp=!this.qxkp
      this.isDisabled2=true;
    },
    baocun1(){
      // this.edjObj1=this.editObj
      // console.log(this.edjObj1)
      // this.$http.post(`invoice/save?autoEnterpriseId=${this.$route.query.id}&invoiceTitleType=${this.editObj.invoiceTitleType}&invoiceTitle=${this.editObj.invoiceTitle}&taxPayeeId=${this.editObj.taxPayeeId}&unitAddress=${this.editObj.unitAddress}&unitPhone=${this.editObj.unitPhone}&unitBank=${this.editObj.unitBank}&unitBankAccount=${this.editObj.unitBankAccount}&email=${this.editObj.email}&phone=${this.editObj.phone}&id=${this.editObj.id}&invoiceAmount=${this.editObj.invoiceAmount}&remark=${this.editObj.remark}&invoiceType=1`)
      // .then(data=>{
      //   console.log(this.edjObj1.remark)
      // })
      this.qxkp=!this.qxkp
      this.isDisabled2=true;
    },
    modifycancel() {
      this.qxkp=!this.qxkp
      this.isDisabled2=false;
      console.log()
      // this.modify = false;
    },
    //编辑(开票)  
    modifydetermine() {
      var edjObj=this.editObj
      console.log(edjObj)
      var edjObj=this.edjObj1
      if(edjObj.invoiceTitleType!=''&&edjObj.invoiceTitle!=''&&edjObj.phone!=''&&edjObj.invoiceAmount!=''&&edjObj.email!=''){
        this.$http.post(`invoice/save?autoEnterpriseId=${this.$route.query.id}&invoiceTitleType=${this.editObj.invoiceTitleType}&invoiceTitle=${edjObj.invoiceTitle}&taxPayeeId=${edjObj.taxPayeeId}&unitAddress=${edjObj.unitAddress}&unitPhone=${edjObj.unitPhone}&unitBank=${edjObj.unitBank}&unitBankAccount=${edjObj.unitBankAccount}&email=${edjObj.email}&phone=${edjObj.phone}&id=${edjObj.id}&invoiceAmount=${edjObj.invoiceAmount}&remark=${edjObj.remark}&invoiceType=1`)
      .then(data=>{
      // console.log(this.editObj.status)
        if(data.status==200){
        this.retrieveData()
        var data=data.data.data
        this.$message({
          message:data.param,
          type:"success"
        })
        }
      })
      }else{
        return this.$message.error('请输入正确的信息')
      }
      this.isDisabled2=true;
      this.modify = false;
    },
    // 冲红
    flushred(id,a) {
      console.log(a)
      this.addObj=a
      this.flushredbilling = true;
    },
    flushreddetermine() {
      this.$http.post(`invoice/applyInvoice?id=${this.addObj.id}&type=2`).then(data=>{
        var msg = data.data.message
        if(data.status===200){
        this.$message({
          message:msg
        })
        this.flushredbilling=false
        }
      })
    },
    // 销货方配置信息
    save(){
      var information =this.information
      if(information.identity.length===48&&information.taxItem.length!=''&&information.taxCode.length!=''){
      this.$http.post(`enterprise/save?id=${information.id}&taxRate=${information.taxRate}&taxItem=${information.taxItem}&taxCode=${information.taxCode}&identity=${information.identity}`).then(data=>{
          if(data.status===200){
            // console.log(this.information)
            this.information.status=2
            var data=data.data.data
            console.log(this.information.status)
            this.$message({
              message:data.param,
            type: "success"
            })
          }
      })
      }else{
        return this.$message.error('请输入正确的信息')
      }
      this.isDisabled1=true
        this.isDisabled=true
        this.Isdisabled=!this.Isdisabled
        this.msg='暂存'
    },
    calloff(){
      this.$confirm("您确定要取消吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => { 
        this.information=JSON.parse(JSON.stringify(this.fanhui));
        this.isDisabled1=true
        this.Isdisabled=!this.Isdisabled
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleEdit1(id,y){
      this.chakan=true
      this.addObj=y
    },
    // 确定
    queding(){
      this.chakan=false
    },
    retrieveData(id){
      var id = this.$route.query.id
      this.$http.post('invoice/queryList').then(data=>{
        var total=data.data.data.list.total
        var pageCnt =data.data.data.list.pageCnt
        var pageSize =data.data.data.list.pageSize
        var date= data.data.data.list.list
        var dataa = data.data.data
        var dataS= data.data.data.countInfo
        for(var i  in date){
          var dataType=date[i].invoiceTitleType
          var dataId=date[i].autoEnterpriseId
          var status = date[i].status
          if(id == dataId){
            this.tableData=date
          }
        }
        // console.log(date)
        this.total=total
        this.pagecnt=pageCnt
        this.pagesize=pageSize
        this.moeny=dataa.amount
        this.num=dataa.num
        this.all= dataS.total
        this.pendinginvoice=dataS['1']
        this.invoiced=dataS['4']
        this.alreadyred=dataS['5']
      })
    },
    getInformation(){
      this.$http.get(`enterprise/id/${this.$route.query.id}`).then(data=>{
        var datas= data.data.data.param
        if(data.status==200){
          this.BillingList=datas.enterpriseName
          this.information=datas
          this.msg=datas.status
          if(this.msg===1){
            this.msg="暂存中"
          }else if(this.msg===2){
            this.msg="服务中"
          }else{
            this.msg="停止"
          }
        }
      })
    },
  },
  mounted(){
    this.getInformation(),
    this.getSys(),
    this.retrieveData()
  },
};
</script>

<style>
.cao_btn10{
  margin-right: 5px !important;
}
.el-textarea>.el-textarea__inner{
  font-size: 13px;
}
.ttlx>.el-form-item__label::after{
      content: '*';
    color: #F56C6C;
    margin-right: 4px;
}
.el-form-item__label{
  text-align: left
}
.el-table__row .cell a{
  color:red; 
  cursor:pointer;
}
.hongse input{
  color:#ff9900
}
.el-pagination{
      margin-top: 54px;
    margin-bottom: 20px;
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
th.is-leaf{
  background-color: #f8f8f9;
}
.jsxx,
.fpxq{
  text-align: left;
  color: #999999;
  font-size: 16px;
  margin-left: 5px;
}

.sear_line1{
  height: 1px;
  border: none;
  background-color: #E5E7E8;
  /* margin: 0 20px 0; */
  margin-right: 20px;
  clear: both;
}
.cao_btn8{
  background-color: #92CA7E !important;
  margin:0 2px;
}
.cao_btn9{
  background-color:#909399 !important;
  margin:0 2px ;
}
.taskStatus_serach{
  position: relative;
}
.taskStatus_serach1{
  position: absolute;
  right: 87px;
  text-align: right;
}
.taskStatus_serach2{
  position: absolute;
  right: 0;
  text-align: left;
}
.marquee_left{
  text-align: left;
}
.cell{
  text-align: left !important;
}
.active{
  color: #66B1FF;
  border-bottom: 2px solid #66B1FF;
  padding: 2px;
}
.kaipiao ul{
  width: 330px;
  height: 26px;
  line-height: 26px;
  font-size:13px;
}
.kaipiao li{
  padding: 2px;
  float: left;
  margin-left: 10px;
  padding-right: 3px;
  cursor:pointer;
}
.el-table{
  font-size: 13px;
}
/*新增 */

.flushred>.el-dialog>.el-dialog__header,
.examine>.el-dialog>.el-dialog__header,
.modify>.el-dialog>.el-dialog__header,
.add>.el-dialog>.el-dialog__header{
  position: relative;
  padding-left: 25px;
  color: #495060;
  height: 30px;
  font-weight: 600;
  font-size: 14px;
  margin: 10px auto 16px;
  text-align: left;
  border-bottom: 1px solid #E9E9E9;
}
.flushred>.el-dialog>.el-dialog__header>.el-dialog__title,
.examine>.el-dialog>.el-dialog__header>.el-dialog__title,
.modify>.el-dialog>.el-dialog__header>.el-dialog__title,
.add>.el-dialog>.el-dialog__header>.el-dialog__title{
    font-weight: 600;
    font-size: 14px;
}
.flushred>.el-dialog>.el-dialog__header,
.examine>.el-dialog>.el-dialog__header,
.modify>.el-dialog>.el-dialog__header,
.add>.el-dialog>.el-dialog__header{
  padding-bottom: 0
}
.flushred>.el-dialog>.el-dialog__body,
.examine>.el-dialog>.el-dialog__body,
.modify>.el-dialog>.el-dialog__body,
.add>.el-dialog>.el-dialog__body{
  padding: 0 20px;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item{
    overflow: hidden;
    position: relative;
    margin: 0 40px 0 0;
    margin-bottom: 5px;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__label,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__label,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__label,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__label{
  margin-top:0;
  padding: 0;
  width: 56px !important;
  font-size: 12px;
  text-align: left;
  height: 25px;
  margin-left: 6px;
  line-height: 25px;
}

.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-input>input,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-input>input,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-input>input,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-input>input{
      margin-bottom: 5px;
    border-radius: 2px;
    border: 1px solid #DDDEE1;
    display: inline-block;
    vertical-align: top;
    height: 25px;
    line-height: 25px;
    width: 79%;
    padding-left: 1%;
    float: left;
    display: inline-block;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select{
  width: 79%;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix{
  height: 25px;
  width: 263px;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__inner,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__inner,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__inner,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__inner{
    position: absolute;
    padding-left: 0;
    top: 0px;
    right: 0;
    height: 25px;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__suffix>.el-input__suffix-inner,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__suffix>.el-input__suffix-inner,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__suffix>.el-input__suffix-inner,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-select>.el-input--suffix>.el-input__suffix>.el-input__suffix-inner{
      top: -7px;
    right: 0;
    position: absolute;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content{
  text-align: left;
  margin-left: 73px !important;
}
.flushred>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-textarea,
.examine>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-textarea,
.modify>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-textarea,
.add>.el-dialog>.el-dialog__body>.el-form>.el-form-item>.el-form-item__content>.el-textarea{
  width: 79%;
}
.el-card__body {
  /* border-bottom: 1px solid #ccc; */
  padding-bottom: 0;
}
.el-breadcrumb span {
  height: 50px;
  line-height: 60px;
}
.el-breadcrumb :nth-child(3) > .el-breadcrumb__inner {
  line-height: 50px;
  color: #59BA73 !important;
  font-size: 28px;
}
.billing>.el-col-1>button{
    padding: 7px 18px;
}
/* 清除tab栏 下边框 */
.el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  z-index: 1;
}
/* tab栏 */
.el-tabs {
  margin-top: 24px;
  padding-left: 30px;
}
.el-tabs__active-bar {
  background: #008000;
}
.is-top > .is-top {
  font-size: 20px;
}
.el-tabs__item:hover {
  color: #008000;
}
.is-top > .is-top.is-active {
  background-color: #fff !important;
  color: #008000 !important;
}
/* 购买发票列表 */
.el-tab-pane > .el-col-5 {
  text-align: left;
}
.el-tab-pane > .el-col-5 > h2 {
  font-size: 20px;
  color: #000000;
  font-family: "Arial Normal", "Arial";
  font-weight: 700;
}
.el-tabs__content > .el-tab-pane > .el-col-24 > .el-col-3 > .el-input--suffix,
.billing > .el-col-4 {
  width: 170px;
  /* padding-left: 10px; */
  float: left;
  padding-right: 10px;
}

.el-select {
  margin-right: 20px;
}
.billing {
  margin-top: 20px;
  margin-bottom: 20px;
}
.billing > .el-col-2 {
  height: 40px;
  line-height: 40px;
  text-align: left;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 170px;
}
.billing > .el-col-2 {
  width: 65px;
  margin-right: 10px;
}
.billing > .el-col-2 > .el-button {
  width: 65px;
  padding: 6px 4px;
  margin-right: 10px;
}
/* 表格 */
.kaipiao {
  text-align: left;
  margin-top: 20px;
  font-size: 20px;
}
.el-tabs__content > .el-tab-pane > .export {
  margin-top: 20px;
  margin-bottom: 20px;
}
.export > .el-col-1 > button {
  padding: 7px 18px;
}
.export > .el-col-5 {
  height: 30px;
  line-height: 30px;
  color: #6b6b6b;
}
.InvoiceList {
  padding-top:10px;
}
.InvoiceList > .el-table {
  border-bottom: none;
  margin-left: 0;
  margin-top: 10px;
}
.cell {
  text-align: center;
}
/* 开票申请 */
.export :nth-child(3) > .el-input__inner,
.el-form-item__content {
  width: 333px;
}

/* 销货方配置信息 */
.el-tabs__content h2 {
  text-align: left;
  font-size: 20px;
  color: #000000;
  font-family: "Arial Normal", "Arial";
  font-weight: 700;
}
.sales > :nth-child(2),
.sales > :nth-child(3) {
  margin-top: 20px;
}

.el-form--label-left > .is-required {
  margin-bottom: 5px;
}
.el-form--label-left > .ek-input > input {
  height: 33px;
}
.el-form--label-left :nth-child(10) > .el-form-item__content > .el-select,
.el-form--label-left
  :nth-child(10)
  > .el-form-item__content
  > .el-select
  > .el-input {
  width: 333px;
}
.el-form--label-left
  :nth-child(11)
  > .el-form-item__content
  > .el-input
  > input {
  height: 43px;
}
.el-form--label-left :nth-child(11) > label {
  line-height: 22px;
}
.el-form--label-left > .is-required > label {
  padding-left: 0;
}
.marquees {
  width: 333px;
}
.tx {
  position: absolute;
  top: 30px;
  left: -122px;
  color: #999;
}
.el-dialog__title {
  font-weight: 700;
  font-style: normal;
  font-size: 32px;
  color: #333333;
  text-align: left;
  line-height: normal;
}
.el-textarea > textarea {
  height: 77px;
}
.el-dialog
  :nth-child(2)
  > .el-form
  > .is-required
  > .el-form-item__content
  > .el-select
  > .el-input--suffix {
  width: 333px;
}
.dialog-footer {
  text-align: center;
}
.dialog-footer button {
  padding: 7px 18px;
}
</style>
