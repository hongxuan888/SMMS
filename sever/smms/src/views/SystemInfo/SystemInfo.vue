<template>
    <div class="system-info">
        <!-- 系统信息内容 -->
        <!-- 卡片组件 -->
        <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <h2>系统信息</h2>
            </div>
            <!-- 主要内容 -->
            <div class="text item">
                <!-- 成功提示消息 -->
                <el-alert
                    title="成功提示的文案"
                    type="success"
                    show-icon>
                </el-alert>
                <!-- 消息提示的文案 -->
                <el-alert
                    title="消息提示的文案"
                    type="info"
                    show-icon>
                </el-alert>
                <!-- 左右部分 -->
                <el-row :gutter="30">
                    <el-col :span="12">
                    <!-- 左边面板 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>销售排行</h3>
                            </div>
                            <div class="text item">
                                <!-- 左表格 -->
                                <el-table
                                    :data="LTableData"
                                    stripe
                                    style="width: 100%"
                                    >
                                    <!-- 销售商品 -->
                                    <el-table-column
                                    prop="sellGoods"
                                    label="销售商品"
                                    >
                                    </el-table-column>
                                    <!-- 销量 -->
                                    <el-table-column
                                    prop="salesVolume"
                                    label="销量">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                    <!-- 右边面板 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>缺货的商品</h3>
                            </div>
                            <div class="text item">
                                <!-- 右表格 -->
                                <el-table
                                    :data="RTableData"
                                    stripe
                                    style="width: 100%"
                                    >

                                    <el-table-column
                                    prop="commodity"
                                    label="商品名称"
                                    width="180">
                                    </el-table-column>

                                    <el-table-column
                                    prop="inventory"
                                    label="库存"
                                    width="180">
                                    </el-table-column>
                                    
                                    <el-table-column
                                    prop="operation"
                                    label="操作">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                LTableData:[
                    { sellGoods:"二锅头" , salesVolume:'10'},
                    { sellGoods:"茅台" , salesVolume:'5'},
                    { sellGoods:"竹叶青" , salesVolume:'8'},
                ],
                RTableData:[
                    { commodity: "我的优乐美" , inventory:"0" , operation:"入库"}
                ]
            }
        }
        
    }
</script>

<style lang="less">
.system-info{
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