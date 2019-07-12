<template>
    <div class="right-header">
        <el-row>
            <el-col :span="12">
                <h2><i class="el-icon-menu"></i>华联超市管理系统</h2>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="20">
                        <!-- 用户信息 -->
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                               欢迎您！ {{ accoutName }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <!-- 用户选择 -->
                                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出账户</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <!-- 头像 -->
                    <el-col :span="4">
                        <div class="Icon">
                            <!-- <img src="../../assets/images/icon.jpg" alt="帅哥"> -->
                            <img :src="avatarUrl" alt="帅哥">
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // 引入本地存储的封装
    import local from '@/utils/local'
    import {getUserInfo} from '@/api/account'
    export default {
        data(){
            return {
                //账户名称
                accoutName:'',
                // 头像
                avatarUrl:''
               
            }
        },
        methods:{
            // 用户选择
            handleCommand(command){
                // 判断
                if(command === 'personal'){  //个人中心
                    // 跳转到个人中心页面
                    this.$router.push('/home/personal')
                } else if(command === 'logout'){ //退出登陆
                    // 1.清除token
                    local.remove('key')
                    // 2.弹出提示
                    this.$message({
                        type:'success',
                        message:'退出系统成功'
                    })
                    // 3.跳到登陆页面
                    this.$router.push('/login')
                }
            },
            // 请求账户信息
            reqAccountMessage(){
                // 发送ajax
                getUserInfo()
                    .then( res => {
                        //接收后端响应的数据
                        let { account, avatarUrl } = res
                        // 渲染
                        this.accoutName = account
                        this.avatarUrl = 'http://localhost:666'+avatarUrl
                    })
                    .catch( err => {
                        console.log( err )
                    })
            }
        },
        // 生命周期函数
        created(){
            // 调用请求账户信息的函数
            this.reqAccountMessage()
        }
        
    } 
</script>

<style lang="less">
    .right-header{
        .el-row{
            .el-col{
                color:#2d3a4b;
            }
            & > .el-col:last-child{
                .el-row{
                    .el-col:first-child{
                        text-align: right;
                    }
                    .el-col:last-child{
                        // text-indent: 2em;
                        .Icon{
                            height: 50px;
                            width: 50px;
                            background-color: red;
                            margin-left: 10px;
                            margin-top: 5px;
                            border-radius: 50%;
                            img{
                                height: 100%;
                                width: 100%;
                                border-radius: 50%;
                                
                            }
                        }
                    }
                }
            }
        }
    }
   

</style>