<template>
    <div class="goods-manage">
        <!-- 库存管理卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>库存管理</h2>
            </div>
            <div class="text item">
                <!-- 查询区 -->
                <el-form 
                    :inline="true" 
                    :model="referForm" 
                    class="demo-form-inline"
                    size="mini"
                    >

                    <el-form-item label="分类:">
                        <el-select v-model="referForm.classify" placeholder="---选择分类---">
                        <el-option label="全部分类" value="全部分类"></el-option>                            
                        <el-option label="日用类" value="日用类"></el-option>
                        <el-option label="饮品类" value="饮品类"></el-option>
                        <el-option label="食品类" value="食品类"></el-option>
                        <el-option label="蔬菜类" value="蔬菜类"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关键字:" >
                        <el-input v-model="referForm.keyword" placeholder="商品名称或条形码"></el-input>
                    </el-form-item>
                        <span class="Note">(商品名称 条形码)</span>

                    <el-form-item>
                        <el-button type="primary" @click="referSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
                <div class="border"></div>
                <!-- 主要内容展示区 -->
                <el-table
                    ref="multipleTable"
                    :data="Blurb"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
                    @selection-change="handleSelectionChange"
                    >
                    <!-- selection -->
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <!-- 商品条形码 -->
                    <el-table-column
                    prop="barCode"
                    label="商品条形码"
                    >
                    </el-table-column>
                    <!-- 商品名称 -->
                    <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    >
                    </el-table-column>
                    <!-- 所属分类 -->
                    <el-table-column
                    prop="category"
                    label="所属分类"
                    >
                    </el-table-column>
                    <!-- 售价 -->
                    <el-table-column
                    prop="salePrice"
                    label="售价(元)"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 是否促销 -->
                    <el-table-column
                    prop="promotion"
                    label="是否促销"
                    >
                    </el-table-column>
                    <!-- 市场价 -->
                    <el-table-column
                    prop="marketPrice"
                    label="市场价"
                    >
                    </el-table-column>
                    <!-- 管理 -->
                    <el-table-column label="管理">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row.id)"><i class="el-icon-edit"></i>编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页区 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 2, 3, 4]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    >
                </el-pagination>
                <!-- 模态框 -->
                <el-dialog 
                    title="库存管理数据" 
                    :visible.sync="redactFormVisible"
                    width='450px'
                    >

                    <el-form :model="redactFormList">
                        <el-form-item label="商品名称" label-width="120px" style="width:340px">
                        <el-input v-model="redactFormList.name" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="是否促销" label-width="120px">
                        <el-select v-model="redactFormList.region" >
                            <el-option label="促销" value="促销"></el-option>
                            <el-option label="不促销" value="不促销"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="redactFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="redactFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
               
                
            </div>
        </el-card>
    </div>
</template>

<script>
    // 引入相关请求
    import { goodsList, goodsListByPage, delGoodsList, reqGoodsList } from '@/api/goods'

    export default {
        data() {
            return {
                // 搜索表单
                referForm:{
                    classify:'',      //分类
                    keyword:''        //关键字
                },
                // 内容表格
                Blurb:[ ],
                // 分页
                currentPage:1,   //当前显示页面
                pageSize:3,     //页面显示条数
                total:100 ,  //数据总数
                // 模态框状态
                redactFormVisible : false, 
                redactFormList:{},
            }
        },
        methods:{
            // 查询按钮
            referSubmit() {
                // 调用根据分页请求数据
                this.getsListByPage()


                // // 获取用户输入的信息
                // let params = {
                //     classify:this.referForm.classify,
                //     keyword:this.referForm.keyword,
                // }
                // //发送ajax
                // goodsSeeAbout( params )
                //     .then( res => {
                //         // 接收后端响应的数据
                //         let { data, len } = res
                //         // 渲染页面
                //         this.Blurb = data
                //     })
                //     .catch( err => {
                //         console.log( err )
                //     })
            
            },
            // 展示区
            handleSelectionChange() {

            },
            // 编辑
            handleEdit( id ){
                // 改变模态框状态为显示
                this.redactFormVisible = true
                // 发送ajax
                reqGoodsList({ id })
                    .then( res => {
                        console.log( res )
                    })
                    .catch( err => {
                        console.log( err )
                    })
            },
            // 删除
            handleDelete( id ){
                // 模态框
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    // 发送ajax
                    delGoodsList( { id } )
                        .then( res => {
                            // 接收后端响应的数据
                            let {code, reason} = res
                            // 判断
                            if(code === 0) {   //成功
                                // 弹出成功提示
                                this.$message({
                                    type:'success',
                                    message:reason
                                })
                                // 刷新页面，调用刷新数据列表函数
                                this.getsListByPage()
                            } else if (code === 1){   //失败
                                // 弹出失败的提示
                                this.$message.error(reason)
                            }
                        })
                        .catch( err => {
                            console.log( err )
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            },
            // 分页
            handleSizeChange( pageSize ){    //当前页面条数改变时触发
                this.pageSize = pageSize
                this.getsListByPage()     //调用刷新数据列表函数
            },
            handleCurrentChange( currentPage ) {  //当前页面改变时触发
                this.currentPage = currentPage
                this.getsListByPage()      //调用刷新数据列表函数
            },
            // 根据分页请求数据
            getsListByPage(){
                // 收集参数
                let params = {
                    pageSize : this.pageSize,
                    currentPage : this.currentPage,
                    classify:this.referForm.classify,
                    keyword:this.referForm.keyword,
                }
                //发送ajax
                goodsListByPage( params )
                    .then( res => {
                        //接收后端响应的数据
                        let {total, data} = res
                        // 判断
                        if(!data.length && this.currentPage > 1){   //当请求的数组长度为0并且当前页面大于1时
                            this.currentPage -= 1    //当前页面减一
                            this.getsListByPage()   //调用自己，请求数据
                        }
                        // 渲染
                        this.total = total
                        this.Blurb = data
                    })
                    .catch( err => {
                        console.log(err)
                    })
            }
        },
        // 生命周期函数
        created(){
            //调用请求数据函数
             this.getsListByPage()

        }
    }
</script>

<style lang="less">
.goods-manage{
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
            .el-pagination{
                padding-top:10px

            }
        }
        .Note{
            font-size:16px;
            color:rgb(177, 176, 176);
            margin-right:10px;
        }
        .el-table thead{
            color:#000;
            font-weight:bolder;
        }
        .border{
            height: 1px;
            border:1px solid #ccc;
        }
    }
   
}

</style>