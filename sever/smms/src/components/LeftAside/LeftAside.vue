<template>
    <div class="left-aside">
       <!-- 我是左边部分 -->
        <h2 class="title"><i class="el-icon-s-finance el-i"></i>华联超市管理系统</h2>
       <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            unique-opened
            active-text-color="rgb(64, 158, 255)"
            background-color="rgb(48, 65, 86)"
            router
            >
            <!-- 导航 -->
            <el-submenu :index="i+1 + ''" v-for="(v , i) in LeftAnv" :key='i'>
                <template slot="title">
                <i :class= v.iClass ></i>
                <span>{{ v.nav }}</span>
                </template>

                <el-menu-item 
                 v-for="(vSon , index) in v.children" 
                 :key='index' 
                 :index= vSon.chilPath 
                >
                {{ vSon.chilTitle }}
                </el-menu-item>
            </el-submenu>  
        </el-menu>
    </div>
</template>

<script>
    //引入权限请求
    import {reqJurisdiction} from '@/api/account' 
    export default {
        data () {
            return {
                // 左侧导航数据
                LeftAnv:[]
            }
        },
        //生命周期函数
        created(){
            // 发送ajax
            reqJurisdiction()
                .then( res => {
                    //接收后端响应的数据
                    let { selectGrouping } = res
                    // 定义当行数据
                    let nav = [
                        // 导航一
                        { iClass : "el-icon-s-tools" , 
                        nav : '系统管理' , 
                        router:['超级管理员','普通管理员'],
                        children : [
                            { chilPath : "/home/systeminfo" ,
                                chilTitle : '系统信息'
                            }
                        ]    
                        },
                        // 导航二
                        { iClass : "el-icon-s-help" , 
                        nav : '账号管理' , 
                        router:['超级管理员'],                        
                        children : [
                            { chilPath : "/home/accountmansge" ,
                                chilTitle : '账号管理'
                            },
                            { chilPath : "/home/accountadd" ,
                                chilTitle : '添加账号'
                            },
                            { chilPath : "/home/passwordmodify" ,
                                chilTitle : '密码修改'
                            },
                        ]    
                        },
                        // 导航三
                        { iClass : "el-icon-s-goods" , 
                        nav : '商品管理' , 
                        router:['超级管理员','普通管理员'],                        
                        children : [
                            { chilPath : "/home/goodsmanage" ,
                                chilTitle : '商品管理'
                            },
                            { chilPath : "/home/goodsadd" ,
                                chilTitle : '添加商品'
                            }
                        ]    
                        },
                        // 导航四
                        { iClass : "el-icon-s-order" , 
                        nav : '统计管理' , 
                        router:['超级管理员'],                        
                        children : [
                            { chilPath : "/home/selltotal" ,
                                chilTitle : '销售统计'
                            },
                            { chilPath : "/home/stocktotal" ,
                                chilTitle : '进货统计'
                            }
                        ]    
                        },
                        // 导航五
                        { iClass : "el-icon-s-order" , 
                        nav : '进货管理' , 
                        router:['超级管理员','普通管理员'],                        
                        children : [
                            { chilPath : "/home/inventorymanage" ,
                                chilTitle : '库存管理'
                            },
                            { chilPath : "/home/inventoryadd" ,
                                chilTitle : '添加库存'
                            }
                        ]    
                        },
                        // 导航六
                        { iClass : "el-icon-s-order" , 
                        nav : '出货管理' , 
                        router:['超级管理员'],                        
                        children : [
                            { chilPath : "/home/selllist" ,
                                chilTitle : '销售列表'
                            },
                            { chilPath : "/home/commoditygetoutwarehouse" ,
                                chilTitle : '商品出库'
                            },
                            { chilPath : "/home/commoditysendback" ,
                                chilTitle : '商品退货'
                            }
                      ]    
                     }
                    ]
                    // 设置权限
                    let newNav = nav.filter(v => v.router.includes(selectGrouping))
                    console.log(selectGrouping)
                    // 渲染
                    this.LeftAnv = newNav
                })
                .catch(err =>{
                    console.log( err )
                })
        }
        
    }
</script>

<style lang="less" >
 .left-aside {
        .title {
            color: #fff;
            margin: 10px auto;
            text-align: center;
            font-size: 16px;
            .el-i{
                margin-right: 8px;
                font-size: 20px;
            }
        }
        .el-menu{
                border-right:none;
                .el-menu-item{
                    color:#fff;
                }
                .el-submenu{
                    .el-submenu__title{
                        color:#fff;
                        &>i{
                            color:#fff;
                        }
                    }
                }
            }
    }

</style>