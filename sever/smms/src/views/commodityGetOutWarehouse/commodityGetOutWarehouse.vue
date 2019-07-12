<template>
    <div class="commodity-getout-warehouse">
        <!-- 商品出库卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>商品销售</h2>
            </div>
            <div class="text item">
                <!-- 搜索表单 -->
                <el-form 
                    style="width:250px"
                    :model="ruleForm" 
                    status-icon 
                    :rules="rules" 
                    ref="ruleForm" 
                    label-width="100px" 
                    class="demo-ruleForm"
                    label-position="top"
                    size="small"
                    >

                    <el-form-item label="商品条形码:" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="数量:" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width:120px"></el-input>
                        <span class="reminder">计重商品单位为千克</span>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">加入订单</el-button>
                        <el-button @click="resetForm()">重新入库</el-button>
                    </el-form-item>
                </el-form>
                <!-- 内容表格 -->
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
                    label="单价"
                    >
                    </el-table-column>
                    <!-- 已售 -->
                    <el-table-column
                    prop="reimburse"
                    label="总价"
                    >
                    </el-table-column>
                    <!-- 优惠 -->
                    <el-table-column
                    prop="discounts"
                    label="优惠(促销/会员)"
                    >
                    </el-table-column>
                    
                   
                </el-table>
                <div class="aggregate">总价: 0元,优惠:0元, 小计: 0元</div>
                <!-- 会员卡号表单 -->
                <el-form 
                    style="width:250px"
                    :model="numberValidateForm" 
                    ref="numberValidateForm" 
                    label-width="100px" 
                    class="demo-ruleForm"
                     label-position="top"
                     size="small"
                    >
                    <el-form-item
                        label="会员卡卡号"
                        prop="age"
                        :rules="[
                        { type: 'number', message: '会员卡号必须为数字值'}
                        ]"
                    >
                        <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">确认提交</el-button>
                        <!-- <el-button @click="resetForm()">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        data( ) {
            return {
                // 表单数据
                ruleForm:{},
                // 表单规则
                rules:{},
                // 表格
                Blurb:[
                    {
                    CommodityName:'洗发水', 
                    quantity:'29.9', 
                    realitySell:'22', 
                    discounts:'11', 
                    reimburse:'11', 
                    }
                ],
                // 会员卡号表单
                numberValidateForm:{},
                // 卡号规则
                numberValidateForm:{}
            }
        },
        methods:{
            // 加入订单
            submitForm(){},
            // 重新入库
            resetForm(){},
            // 表格展示区
            handleSelectionChange(){

            },
            // 会员卡号提交按钮
            // submitForm(){}
        }
    }
</script>

<style lang="less">
.commodity-getout-warehouse{
    .el-card{
        // 头部部分
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        // 身体部分
        & > .el-card__body{
            .el-form {
                .el-form-item {
                    .el-form-item__label{
                        line-height: 20px;
                        color:#000;
                        font-weight:bold;
                    }
                    .reminder{
                        color:rgb(160, 158, 158);
                    }
                   
                }
            }
             .border{
                height: 1px;
                border:1px solid #ccc;
            }
             .aggregate{
                        font-size:16px;
                        border-bottom: 1px solid #EBEEF5;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
           
        
        }
    }
   
}

</style>