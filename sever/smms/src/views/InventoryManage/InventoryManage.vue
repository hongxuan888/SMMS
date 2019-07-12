<template>
    <div class="inventory-manage">
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
                        <el-option label="洗发水" value="洗发水"></el-option>
                        <el-option label="饮品类" value="饮品类"></el-option>
                        <el-option label="玩具" value="玩具"></el-option>
                        <el-option label="食品" value="食品"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关键字:">
                        <el-input v-model="referForm.keyword" ></el-input>
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
                    prop="CommodityBarcode"
                    label="商品条形码"
                    >
                    </el-table-column>
                    <!-- 商品名称 -->
                    <el-table-column
                    prop="CommodityName"
                    label="商品名称"
                    >
                    </el-table-column>
                    <!-- 进价 -->
                    <el-table-column
                    prop="PurchasingPrice"
                    label="进价"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 入库 -->
                    <el-table-column
                    prop="storageInfo"
                    label="入库"
                    >
                    </el-table-column>
                    <!-- 库存 -->
                    <el-table-column
                    prop="inventory"
                    label="库存"
                    >
                    </el-table-column>
                    <!-- 已售 -->
                    <el-table-column
                    prop="soldout"
                    label="已售"
                    >
                    </el-table-column>
                    <!-- 管理 -->
                    <el-table-column label="管理">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页区 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    >
                </el-pagination>
               
                
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 分页
                // 页面条数
                pagesize:3,  
                // 当前yemian
                currentPage:1,
                // 数据总条数  
                total:100,
                // 搜索表单
                referForm:{
                    classify:'',      //分类
                    keyword:''        //关键字
                },
                // 内容表格
                Blurb:[
                    {
                    CommodityBarcode:'123456789',
                    CommodityName:'洗发水', 
                    PurchasingPrice:'29.9', 
                    storageInfo:'22', 
                    inventory:'11', 
                    soldOut:'11', 
                    },
                     {
                    CommodityBarcode:'123456789',
                    CommodityName:'洗发水', 
                    PurchasingPrice:'29.9', 
                    storageInfo:'22', 
                    inventory:'11', 
                    soldOut:'11', 
                    },
                ],
                currentPage:1
            }
        },
        methods:{
            // 查询按钮
            referSubmit() {
                // 获取用户输入的信息
                let val = {
                    classify:this.referForm.classify,
                    keyword:this.referForm.keyword,
                }
                // 判断
                if(val.keyword === ''){
                    alert('请输入关键字再查询')
                } else {
                    
                    // 发送给后台
                    console.log(val)
                }
            },
            // 展示区
            handleSelectionChange() {

            },
            // 分页
            handleSizeChange(){

            },
            handleCurrentChange() {

            }
        },
        // 生命周期函数
        create(){
            //发送ajax
            
        }
    }
</script>

<style lang="less">
.inventory-manage{
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