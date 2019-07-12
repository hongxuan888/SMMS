<template>
    <div class="login">
        <!-- 登陆表单容器 -->
        <div class="login-wrap">
            <h2 class="title">
                <i class="el-icon-user-solid"></i>
                超市管理系统 登陆页面
            </h2>
            <!-- 登陆表单 -->
            <el-form 
                :model="loginForm" 
                status-icon 
                :rules="rules"
                ref="loginForm"
                label-width="100px"
                >

                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    //引入正则验证
    import { regPwd } from '../../utils/reg.js'
    // 引入登陆请求
    import { checkLogin } from '@/api/login'
    // 引入本地存储的封装
    import local from '@/utils/local'

    export default {
        data() {
            // 自定义验证函数
            //密码验证
            const passwordCheck =  (rule, value, callback) => {
                // 获取值的长度
                var len = value.length;
                //判断
                if( value === ''){    //非空验证
                    callback( new Error('密码不能为空'))
                } else if ( len < 3 || len > 6 ) {   //长度验证
                    callback( new Error('密码长度为3~6位'))
                } else if (!regPwd) {
                    callback( new Error('密码必须由 字母+数字+特殊字符'))
                }else {

                    //确认密码不为空，然后触发反向验证
                    if ( this.loginForm.checkPass !== ''){
                        this.$refs.loginForm.validateField('checkPass')  //验证一致性
                    }

                    callback()    //成功
                }
            };
            //确认密码验证
            const passwordAffirm = (rule, value, callback) => {
                //判断
                if ( value === '') {
                    callback( new Error('请再次确认密码'))
                } else if ( value !== this.loginForm.password) {
                    callback( new Error('两次输入的密码不一致'))
                } else {
                    callback();
                }
            }

            return {
                //登陆表单数据
                loginForm:{
                    account:'',        //用户名
                    password:'',       //密码
                    checkPass:''       //确认密码
                },
                //表单验证规则
                rules:{
                    /*
                        小结：
                            1. 内置验证： 复制粘贴，改一下
                                required: true 必填
                                message:  提示信息
                                trigger:  触发方式
                                min:   最小
                                max：  最大
                            rules: {
                                要验证的字段: [
                                        { required: true, message: '提示信息', trigger: 'blur' }, // 非空验证
                                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证
                                ]
                            }

                            2. 自定义验证
                            rules: {
                                    要验证的字段: [
                                        { validator: 自定义验证函数名, trigger: '触发方式' }, // 自定义验证
                                    ]
                            }
           
                    */

                    //用户名
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },   //失焦 非空验证
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }  //失焦 长度验证
                    ],
                    //密码
                    password: [
                        // 自定义验证规则
                        { required: true , validator: passwordCheck , trigger: 'blur' }
                        
                    ],
                    //确认密码
                    checkPass: [
                         // 自定义验证规则
                       { required: true , validator: passwordAffirm , trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            //登陆按钮事件
            submitForm() {
                // 页面中使用ref属性声明的标签dom，可以使用 this.$refs.ref属性的值 获取
                // element内置了验证方法 validate 传入一个函数 函数中的变量如果是true就验证通过 否则验证不通过

                this.$refs.loginForm.validate( (valid) => {
                    // 判断
                    if( valid ){
                        // 收集用户填写的信息
                        let params = {
                            account : this.loginForm.account,
                            password : this.loginForm.password
                        }
                        // 发送ajax
                        checkLogin( params )
                            .then( res => {
                                // 接收后端响应的数据
                                let {code, reason, token} = res
                                //判断
                                if(code === 0){
                                    // 把token存入本地存储
                                    local.set('key',token)
                                    // 弹出成功的提示
                                    this.$message({
                                        type:'success',
                                        message:reason
                                    })
                                    // 跳转到后端页面
                                    this.$router.push('/home')
                                } else if (code === 1){
                                    //弹出失败的提示
                                    this.$message.error(reason)
                                }
                            })
                            .catch( err => {
                                console.log(err)
                            })


                        // alert('前端验证通过，可以登陆')

                        //模仿后台跳转
                        // setInterval( () => {
                        //     this.$router.push('/home')
                        // },1000)

                    }else{
                        alert('前端验证不通过，登陆失败')
                        return false

                    }
                })

                
            },
            //重置按钮事件
            resetForm () {
                 // 获取el-form表单 调用内置重置方法
                this.$refs.loginForm.resetFields();
            },
        }
        
    }
</script>

<style lang="less">
    //引入样式
    @import './login.less';
</style>