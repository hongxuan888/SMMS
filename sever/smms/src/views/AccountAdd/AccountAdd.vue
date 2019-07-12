<template>
    <div class="account-add">
        <!-- 添加账号卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头 -->
                <h2>账号添加</h2>
            </div>
            <div class="text item">
               <el-form 
                    style="width:322px"
                    :model="AccountFrom" 
                    status-icon 
                    :rules="rules" 
                    ref="AccountFrom" 
                    label-width="100px" 
                    class="demo-ruleForm"
                    size="small"
                    >
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="AccountFrom.account" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="AccountFrom.password" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 确认密码 -->
                    <el-form-item label="密码" prop="checkPass">
                        <el-input type="text" v-model="AccountFrom.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                   
                    <!-- 选择用户组 -->
                    <el-form-item label="选择用户组" prop="selectGrouping">
                        <el-select v-model="AccountFrom.selectGrouping" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <!-- 提交按钮 -->
                        <el-button type="primary" @click="submitForm()">添加</el-button>
                        <!-- 重置按钮 -->
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    // 引入正则函数
    import { regPwdNum } from '@/utils/reg'
    // 引入相关请求
    import { accountAdd } from '@/api/account'

    export default {
        
        data() {
            // 自定义验证规则函数
            // 密码
            const AccountPassword = (rule, value, callback) => {
                // 获取值的长度
                const len = value.length;
                // 判断
                if(value === ''){      //非空验证
                    callback(new Error('密码不能为空')) 
                } else if (len < 3 || len > 6) {  //长度验证
                    callback(new Error('长度位3~6位'))  
                } else if ( !regPwdNum(value) ) {   //正则验证
                    callback(new Error('密码必须由 字母+数字+特殊字符'))
                }else {
                    // 当确认密码不为空时，反向验证一致性
                    if(this.AccountFrom.checkPass !== ''){
                        this.$refs.AccountFrom.validateField('checkPass')  
                    }
                    callback() //成功
                }
            };
            // 确认密码验证
            const AccountPasswordCheck = (roule, value, callback) => {
                // 判断
                if(value === ''){
                    callback(new Error('请确认输入密码'))  //非空验证
                } else if ( value !== this.AccountFrom.password){
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()  //成功
                }
            }
            return {
                AccountFrom:{
                    account:'',
                    password:'',
                    checkPass:'',
                    selectGrouping:''
                },
                rules:{
                    // 账号
                     account:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },   //失焦 非空验证
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }  //失焦 长度验证
                     ],
                    //  密码
                    password:[
                        { required: true , validator: AccountPassword , trigger: 'blur' } //自定义验证规则
                    ],
                    // 确认密码
                    checkPass:[
                        { required: true , validator: AccountPasswordCheck , trigger: 'blur' } //自定义验证规则
                    ],
                    // 用户组
                    selectGrouping:[
                         { required: true, message: '请选择用户组', trigger: 'change' },   //改变 非空验证
                    ]
                }
            }
        },
        methods:{
            // 添加
            submitForm() {
                this.$refs.AccountFrom.validate( (valid) => {
                    // 判断
                    if(valid){
                        // alert('前端验证成功')
                        // 获取用户信息
                        let UserInfo = {
                            account:this.AccountFrom.account,               //获取账号
                            password:this.AccountFrom.password,             //获取密码
                            selectGrouping:this.AccountFrom.selectGrouping  //获取用户组
                        }

                        // 发送ajax给后台
                        accountAdd( UserInfo )
                            .then( res  => {
                               //接收后端响应的数据
                               let { code, reason } = res 
                               //判断
                               if(code === 0){  //添加成功
                                    //弹出成功提示
                                    this.$message({
                                    message: reason,
                                    type: 'success'
                                    });    
                                    //跳转到账号管理页面    
                                    this.$router.push('/home/accountmansge')
                               } else if (code === 1 ){  //添加失败
                                    //弹出失败提示
                                    this.$message.error( reason );
                               }                  
                            })
                            .catch( err => {
                                console.log(err)
                            })
                        
                    } else {
                        alert('前端验证失败')
                        return false
                    }
                })
   
            },
            // 重置
            resetForm() {
                // 获取el-form表单 调用内置重置方法
                this.$refs.AccountFrom.resetFields()
            },
        }
        
    }
</script>

<style lang="less">
.account-add{
    .el-card{
        border-left:none;
        border-right:none;
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        & > .el-card__body{
            .el-alert{
                margin: 20px auto;
            }
        }
    }
   
}

</style>