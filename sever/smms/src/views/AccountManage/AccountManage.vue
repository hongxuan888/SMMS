<template>
    <div class="account-manage">
        <!-- 账户管理卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>账户管理</h2>
            </div>
            <div class="text item">
                <!-- 主要内容 -->
                <el-table
                    ref="AccountManageaTable"
                    :data="AccountManageaTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >

                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>


                    <el-table-column
                    prop="account"
                    label="用户名"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="selectGrouping"
                    label="用户组"
                    >
                    </el-table-column>

                    <el-table-column
                    label="日期"
                    >
                    <template slot-scope="scope">{{ scope.row.ctime | timeFormat}}</template>
                    </el-table-column>
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit( scope.row.id )"><i class="el-icon-edit"></i>编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete( scope.row.id )"><i class="el-icon-delete"></i>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2, 4, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
            <!-- 批量删除 -->
            <div class="batchDel">
                <el-button type="danger"  size="mini" @click='batchdel'>批量删除</el-button>
                <el-button type="primary"  size="mini" @click='deselect'>取消选择</el-button>
            </div>
            <!-- 回填模态框 -->
            <el-dialog 
                title="账户更改" 
                :visible.sync="dialogFormVisible"
                width=400px
                >
                <!-- 回填表单 -->
                <el-form :model="backfill" :rules="rules" >
                    <!-- 账户 -->
                    <el-form-item label="账户" :label-width="formLabelWidth" prop='account'>
                    <el-input v-model="backfill.account" autocomplete="off" style="width:220px"></el-input>
                    </el-form-item>
                    <!-- 用户组 -->
                    <el-form-item label="用户组" :label-width="formLabelWidth" prop='selectGrouping'>
                        <el-select v-model="backfill.selectGrouping" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
//引入时间格式模块
import moment from "moment";
// 引入相关请求
import {accountlistbatchdel, accountlistredact, accountlistdel, accountlistbypage, accountlistredactbymodalbox} from '@/api/account'

export default {
  data() {
    // 自定义验证规则
    const backfillRule = (rules, value, callback) => {
      // 获取值的长度
      let len = value.length;
      // 判断
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (len < 3 || len > 6) {
        callback(new Error("长度为3~6位"));
      } else {
        callback(); //成功
      }
    };
    return {
      AccountManageaTable: [], //渲染后的，数组里面有啥，视图就渲染啥，但是字段必须要一致
      // 回填模态框
      backfill: {
        account: "",
        selectGrouping: ""
      },
      // 回填模态框状态
      dialogFormVisible: false,
      // 回填表单大小
      formLabelWidth: "100px",
      // 回填表单验证规则
      rules: {
        account: [
          // 自定义验证规则
          { required: true, validator: backfillRule, trigger: "blur" }
        ]
      },
      // 定义变量保存编辑时的id
      editId: "",

      // 分页
      currentPage: 1, //当前页
      pageSize: 10, //每页条数
      total: 100, //总条数

      // 批量删除数组，方便保存获取的id
      delIdArr: []
    };
  },
  methods: {
    // 分页
    //pageSize(每页条数)改变时调用
    handleSizeChange(pageSize) {
      //当前页面的数据条数改变时，触发函数
      this.pageSize = pageSize; //把用户选择的每页条数，赋值给data中的pageSize
      this.getAccountbypage(); //调用数据列表
    },
    // currentPage(当前页)改变时调用
    handleCurrentChange(currentPage) {
      //当前显示的页面改变时，触发函数
      this.currentPage = currentPage; //把用户选择的当前页。赋值给data中的currentPage
      this.getAccountbypage(); //调用数据列表
    },
    // 批量删除
    batchdel() {
      // 判断
      if (this.delIdArr.length) {
        // 模态框
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //发送ajax
            accountlistbatchdel({ Arr: this.delIdArr })
              .then(res => {
                // 接收后端响应的数据
                let { code, reason } = res
                // 判断
                if (code === 0) {
                  //成功
                  // 弹出成功的提示
                  this.$message({
                    type: "success",
                    message: reason
                  });
                  // 刷新页面（再次请求数据）
                  this.getAccountbypage(); //调用数据列表
                } else if (code === 1) {
                  //失败
                  //弹出失败的提示
                  this.$message.error(reason);
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        // 弹出成功的提示
        this.$message({
          type: "danger",
          message: "请先选择，再批量删除"
        });
      }
    },
    // 取消选择
    deselect() {
      this.$refs.AccountManageaTable.clearSelection();
    },
    // 表单批量选择
    handleSelectionChange(val) {
      this.delIdArr = val.map(v => v.id); //循环选中的数组，把数组中的id放入一个新的数组
    },
    // 编辑按钮
    handleEdit(id) {
      // 把id的值赋值给editId
      this.editId = id;
      // 设置模态框回填显示
      this.dialogFormVisible = true;
      // 发送ajax
      accountlistredact({ id })
        .then(res => {
          // 接收后端响应数据
          let { data } = res
          // 回填表单
          this.backfill = data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除按钮
    handleDelete(id) {
      // 模态框
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送ajax
          accountlistdel({ id })
            .then(res => {
              //接收后端响应的数据
              let { code, reason } = res
              //判断
              if (code === 0) {
                //成功
                //弹出成功提示
                this.$message({
                  message: reason,
                  type: "success"
                });
                // 重新请求数据（再次发送ajax）
                this.getAccountbypage(); //调用数据列表
              } else if (code === 1) {
                //失败
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // //抽取请求数据列表
    // getAccount(){
    //     // 发送ajax给后端请求数据信息
    //     this.axios.get('http://localhost:666/account/accountlist')
    //         .then( (response) => {
    //             // 获取响应的数据
    //             let { data } = response.data
    //             // 渲染页面
    //             this.AccountManageaTable = data  //把数据渲染给 AccountManageaTable ，但是字段要跟数据库的字段一致
    //         })
    //         .catch( err => {
    //             console.log(err)
    //         })
    // },

    // 根据分页请求数据列表
    getAccountbypage() {
      // 收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      // 发送ajax给后端请求数据信息
      accountlistbypage( params )
        .then(res => {
          // 获取响应的数据
          let { total, data } = res;
          //判断
          if (!data.length && this.currentPage > 1) {
            this.currentPage -= 1; //当前页
            this.getAccountbypage(); //调用请求数据函数
          }
          // 渲染页面
          this.AccountManageaTable = data; //把数据渲染给 AccountManageaTable ，但是字段要跟数据库的字段一致
          this.total = total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 模态框确认按钮
    confirm() {
      // 隐藏模态框
      this.dialogFormVisible = false;
      // 获取更改后模态框的值
      let params = {
        account: this.backfill.account,
        selectGrouping: this.backfill.selectGrouping,
        id: this.editId
      };
      // 发动ajax
      accountlistredactbymodalbox( params )
        .then(res => {
          // 接收后端响应的数据
          let { code, reason } = res
          // 判断
          if (code === 0) {
            //成功
            // 成功提示
            this.$message({
              type: "success",
              message: reason
            });
            // 刷新数据列表
            this.getAccountbypage(); //调用数据列表
          } else if (code === 1) {
            //失败
            // 失败的提示
            this.$message.error(reason);
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(params);
    }
  },
  // 过滤器
  filters: {
    timeFormat(ctime) {
      return moment(ctime).format("YYYY-MM-DD hh.mm.ss");
    }
  },
  // 生命周期函数
  created() {
    // 调用请求数据列表函数
    // this.getAccount();

    //调用根据分页请求的数据列表函数
    this.getAccountbypage();
  }
};
</script>

<style lang="less">
.account-manage {
  .el-card {
    border-left: none;
    border-right: none;
    & > .el-card__header {
      background-color: #f1f1f1;
    }
    & > .el-card__body {
      .el-alert {
        margin: 20px auto;
      }
      .el-pagination {
        margin-top: 20px;
      }
      .batchDel {
        margin-top: 20px;
      }
    }
  }
}
</style>