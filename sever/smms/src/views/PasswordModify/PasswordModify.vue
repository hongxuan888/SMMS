<template>
    <div class="password-modify">
        <!-- 密码修改卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>密码修改</h2>
            </div>
            <div  class="text item">
                <el-form 
                    style="width:220px"
                    :model="amendPassword" 
                    status-icon 
                    :rules="rules" 
                    ref="amendPassword" 
                    label-width="100px" 
                    class="demo-ruleForm"
                    label-position="top"
                    size="mini"
                    >
                    <!-- 原密码 -->
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="text" v-model="amendPassword.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 新密码 -->
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="text" v-model="amendPassword.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 新密码 -->
                    <el-form-item label="新密码" prop="checkNewPassword">
                        <el-input type="text" v-model="amendPassword.checkNewPassword" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="amendSubmitForm()">修改</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    //引入密码正则函数
    import { regPwd, regPwdNum } from '@/utils/reg'
    import { checkOldPassword, amendPwd } from '@/api/account'
    import local from '@/utils/local'
    export default {
        data () {
            // 自定义密码验证函数
            // 原密码
            const OPassword = (rules, value, callback) => {
                // 获取值的长度
                var len = value.length;
                // 判断
                if(value === ''){
                    callback(new Error('请输入原来的密码'))  //非空验证
                }  else {
                    //发送ajax
                    checkOldPassword({ oldPwd:value })
                        .then( res => {
                            //接收后端响应的数据
                            let {code, reason} = res
                            // 判断
                            if(code === 0){  //成功
                                callback() 
                            } else if (code === 1){  //失败
                                callback(new Error(reason))
                            }
                        })
                        .catch( err => {
                            console.log( err )
                        })
                }

            };
            // 新密码
            const NPassword = (rules, value, callback) => {
                // 获取值的长度
                var len = value.length;
                // 判断
                if(value === ''){
                    callback(new Error('请输入原来的密码'))  //非空验证
                } else if (len < 3 || len > 6){
                    callback(new Error('长度为3~6位'))    //长度验证
                } else if ( !regPwdNum(value) ) {
                    callback(new Error('密码这能由数字 字母 特殊符号组成'))  //正则验证
                }else if(value === this.amendPassword.oldPassword){
                    callback(new Error('新密码不能和原密码相等'))
                }else {
                    // 确认密码非空时，反向验证一致性
                    if(this.amendPassword.checkNewPassword !== ''){
                        this.$refs.amendPassword.validateField('checkNewPassword')
                    }
                    callback()  //成功
                }
            };
            // 确认新密码
            const CNPassword = (rules, value, callback) => {
                // 获取值的长度
                var len = value.length;
                // 判断
                if(value === ''){
                    callback(new Error('请输入原来的密码'))  //非空验证
                } else if ( value !== this.amendPassword.newPassword){
                    callback(new Error('两次输入的密码不一致'))    //一致性验证
                } else {
                    callback()  //成功
                }
            };
            return {
                // 修改密码数据
                amendPassword:{
                    oldPassword:'',       //原密码
                    newPassword:'',       //新密码
                    checkNewPassword:''   //确认新密码
                },
                rules:{
                    // 原密码
                    oldPassword:[
                        // 自定义验证规则
                        { required: true , validator: OPassword , trigger: 'blur' }
                    ], 
                    //新密码 
                    newPassword:[
                         // 自定义验证规则
                        { required: true , validator: NPassword , trigger: 'blur' }
                    ],
                    //新密码  
                    checkNewPassword:[
                         // 自定义验证规则
                        { required: true , validator: CNPassword , trigger: 'blur' }
                    ]   
                }
            }
        },
        methods:{
            // 修改密码
            amendSubmitForm(){
                
                this.$refs.amendPassword.validate( (vaild) => {
                    //判断
                    if(vaild){
                        //获取用户的新密码
                        let params = {
                            newPwd : this.amendPassword.newPassword
                        }
                        //发送给后台（发送ajax）
                        amendPwd( params ) 
                            .then( res => {
                                //接收后端响应的数据
                                let{code, reason} = res
                                // 判断
                                if(code === 0){ //成功
                                    //弹出成功的提示
                                    this.$message({
                                        type:'success',
                                        message:reason
                                    })

                                    // 跳转到登陆页面 （必须要重新登陆，因为不重新登陆的话，原密码还是修改之前的密码，
                                    //                 所以再次获取的时候获取的还是修改之前的密码，但数据库的密码已经修改了）
                                    
                                    setTimeout( () => {
                                        // 清除token
                                        local.remove('key')
                                        // 跳转到登陆页面
                                        this.$router.push('/login')
                                    },1000)
                                    
                                } else if (code === 1){  //失败
                                    // 弹出失败的提示
                                    this.$message.error(reason)
                                }
                            })
                            .catch( err => {
                                console.log( err )
                            })

                    } else {
                        alert('前端验证失败')
                        return false
                    }
                })
            },
            //重置
            resetForm(){
                //获取el-form表单，使用重置方法
                this.$refs.amendPassword.resetFields()
            }

        }
        
    }
</script>

<style lang="less">
.password-modify{
    .el-card{
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        & > .el-card__body{
             .el-form {
                .el-form-item {
                    .el-form-item__label{
                        line-height: 16px;
                        color:#000;
                        font-weight:bold;
                    }
                   
                }
            }
        }
    }
   
}

</style>