<template>
    <div class="inventory-add">
        <!-- 库存添加卡片内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>商品入库</h2>
            </div>
            <div class="text item">
                <!-- 表单内容 -->
                <el-form 
                    style="width:220px"
                    :model="CommodityWarehousing" 
                    status-icon 
                    :rules="rules" 
                    ref="CommodityWarehousing" 
                    label-width="100px" 
                    class="demo-ruleForm"
                    label-position="top"
                    size="mini"
                    >
                    <!-- 商品条形码 -->
                    <el-form-item label="商品条形码:" prop="CommodityBarcode">
                        <el-input type="text" v-model="CommodityWarehousing.CommodityBarcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 数量 -->
                    <el-form-item label="数量:" prop="CommodityAmount">
                        <el-input type="text" v-model="CommodityWarehousing.CommodityAmount" autocomplete="off"></el-input>
                        <p>计重商品的单位位千克</p>
                    </el-form-item>
                    <!-- 进价 -->
                    <el-form-item label="进价:" prop="PurchasingPrice">
                         <el-input type="text" v-model="CommodityWarehousing.PurchasingPrice" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="storageInfo()">入库</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    // 引入正则验证函数
    import { regPwdNum } from '@/utils/reg'
    export default {
        data() {
            // 自定义验证规则函数
            // 条形码
            const CBarcode = (rules, value, callback) => {
                // 获取值的长度
                let len = value.length
                // 判断
                if(value === '') {
                    callback(new Error('条形码不能为空'))  //非空验证
                } else if ( !regPwdNum(value) ){
                    callback(new Error('只能为数字'))      //正则验证
                } else if (len !== 13){
                    callback(new Error('长度为13位'))
                } else {
                    callback()   //成功
                }
            }
            // 数量
            const CAmount = (rules, value, callback) => {
                 // 判断
                if(value === '') {
                    callback(new Error('数量不能为空'))  //非空验证
                } else if ( !regPwdNum(value) ){
                    callback(new Error('只能为数字'))      //正则验证
                } else {
                    callback()   //成功
                }
            }
            // 进价
            const PPrice = (rules, value, callback) => {
                 // 判断
                if(value === '') {
                    callback(new Error('进价不能为空'))  //非空验证
                } else if ( !regPwdNum(value) ){
                    callback(new Error('只能为数字'))      //正则验证
                } else {
                    callback()   //成功
                }
            }
            return {
                CommodityWarehousing:{
                        CommodityBarcode:'',     //商品条形码
                        CommodityAmount:'',     //商品数量
                        PurchasingPrice:''      //进价
                },
                rules:{
                    CommodityBarcode:[
                        //  自定义验证规则
                        { required: true , validator: CBarcode , trigger: 'blur'}
                     ],     
                    CommodityAmount:[
                        //  自定义验证规则
                        { required: true , validator: CAmount , trigger: 'blur'}
                    ],    
                    PurchasingPrice:[
                        //  自定义验证规则
                        { required: true , validator: PPrice , trigger: 'blur'}
                    ]   
                }
            }
           
        },
        methods:{
                // 入库
                storageInfo(){
                    this.$refs.CommodityWarehousing.validate( (valid) => {
                        // 判断
                        if(valid) {
                            alert('前端验证成功')

                            // 获取用户的输入的值
                            let consequence = {
                                CommodityBarcode:this.CommodityWarehousing.CommodityBarcode,     
                                CommodityAmount:this.CommodityWarehousing.CommodityAmount,    
                                PurchasingPrice:this.CommodityWarehousing.PurchasingPrice   
                            }

                            // 发送给后端
                            console.log(consequence)
                        } else {
                            alert('前端验证不成功')
                            return false
                        }
                 
                    })
                },
                // 重置
                resetForm(){
                    // 获取el-form，使用重置方法
                    this.$refs.CommodityWarehousing.resetFields()
                }
            }
    }
</script>

<style lang="less">
.inventory-add{
    .el-card{
        border-left:none;
        border-right:none;
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        & > .el-card__body{
            padding-left:40px;
            .el-alert{
                margin: 20px auto;
            }
            .el-form {
                .el-form-item{
                    // margin-bottom: 10px;
                    .el-form-item__label{
                        color:#000;
                        font-weight:bold;
                        padding:0;
                    }
                    .el-form-item__content{
                        line-height: 20px;
                        p{
                            color: #606266;
                        }
                    }
                }
            }
        }
    }
   
}

</style>