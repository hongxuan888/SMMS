<template>
    <div class="sell-list">
        <!-- 销售列表卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>销售明细</h2>
            </div>
            <div class="text item">
                <!-- 时间选择区 -->
                <span class="selectTime">时间选择:</span>
                <el-date-picker
                    v-model="value"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    size="small"
                    >
                </el-date-picker>
                <!-- 关键字区 -->
                <el-form 
                    :inline="true" 
                    :model="formInline" 
                    class="demo-form-inline"
                    size="small"
                    >
                    <el-form-item label="关键字:">
                        <el-input v-model="formInline.value" ></el-input>
                    </el-form-item>
                   <span class="message">商品名称，订单号，客户名称，会员卡号</span>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
                 <!-- 主要内容展示区 -->
                 <div class="border"></div>
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
                    prop="orderNumber"
                    label="订单号"
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
                    prop="quantity"
                    label="数量"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 入库 -->
                    <el-table-column
                    prop="realitySell"
                    label="实际售价"
                    >
                    </el-table-column>
                    <!-- 库存 -->
                    <el-table-column
                    prop="discounts"
                    label="优惠(促销/会员)"
                    >
                    </el-table-column>
                    <!-- 已售 -->
                    <el-table-column
                    prop="reimburse"
                    label="退款"
                    >
                    </el-table-column>
                    <!-- 销售时间 -->
                    <el-table-column
                    prop="sellTime"
                    label="销售时间"
                    >
                    </el-table-column>
                   
                </el-table>
                <!-- 分页区 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
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
                // 时间选择区
                value:'',
                pickerOptions:{},
                // 关键字
                formInline:{
                    value:'',
                },
                // 内容表格
                Blurb:[
                    {
                    orderNumber:'123456789',
                    CommodityName:'洗发水', 
                    quantity:'29.9', 
                    realitySell:'22', 
                    discounts:'11', 
                    reimburse:'11', 
                    sellTime:'2019'
                    },
                     {
                    orderNumber:'123456789',
                    CommodityName:'洗发水', 
                    quantity:'29.9', 
                    realitySell:'22', 
                    discounts:'11', 
                    reimburse:'11', 
                    sellTime:'2019'
                    },
                ],
                currentPage:1
            }
            
        },
        methods:{
            // 关键字查询按钮
            onSubmit(){
                // 获取用户输入的关键字
                let val = this.formInline.value
                // 判断
                if(val === ''){
                    alert('请输入关键词语再查询')
                } else {
                    // 把值发送给后台
                    console.log(val)
                }
                
            },
            // 展示区
            handleSelectionChange(){

            },
            // 分页
            handleSizeChange(){

            },
            handleCurrentChange() {

            }
        }
    }
</script>

<style lang="less">
.sell-list{
    .el-card{
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        & > .el-card__body{
            // 分页
            .el-pagination{
                padding-top:10px

            }
            .el-alert{
                margin: 20px auto;
            }
            .selectTime{
                font-size:14px;
                margin-right: 10px;
            }
            .el-form {
                margin-top: 10px;
                .message{
                    font-size:14px;
                    line-height:32px;
                    margin-right: 10px;
                }
            }
            .border{
                height: 1px;
                border:1px solid #ccc;
            }
        }
    }
   
}


</style>