<template>
    <div class="commodity-send-back">
        <!-- 商品出库卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>商品退货</h2>
            </div>
            <div class="text item">
                <!-- 会员卡号表单 -->
                <el-form 
                    :inline="true" 
                    :model="formInline" 
                    class="demo-form-inline"
                    size="small"
                    >
                    <el-form-item label="订单号:">
                        <el-input v-model="formInline.value" ></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
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
                //表单数据
                formInline:{
                    value:''
                }
            }
        },
        methods:{
            // 会员卡号提交按钮
            onSubmit(){
                // 获取订单号
                let val = this.formInline.value
                // 判断
                if(val === ''){
                    alert('请输入订单号')
                } else {
                    // 把值发送给后台
                    console.log(val)
                }
            }
        }
    }
</script>

<style lang="less">
.commodity-send-back{
    .el-card{
        // 头部部分
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        .el-card__body{
            .el-form{
                .el-form-item{
                    .el-form-item__label{
                    color:#000;
                    font-weight:bold;
                    }

                }

            }
        }
    }
   
}

</style>