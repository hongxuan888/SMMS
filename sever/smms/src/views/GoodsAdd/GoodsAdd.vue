<template>
    <div class="goods-add">
         <!-- 添加商品 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>添加商品</h2>
            </div>
            <div class="text item">
                <!-- 表单内容 -->
                <el-form 
                    style="width:250px"
                    ref="goodsForm" 
                    :model="goodsForm" 
                    :rules="rules"
                    label-width="80px"
                    size="small"
                    label-position="top"
                    >
                    <!-- 1.商品条形码 -->
                    <el-form-item label="商品条形码:" prop='barCode'>
                        <el-input v-model="goodsForm.barCode" ></el-input>
                    </el-form-item>
                    <!-- 2.商品名称 -->
                    <el-form-item label="商品名称:" prop='goodsName'>
                        <el-input v-model="goodsForm.goodsName"></el-input>
                    </el-form-item>
                    <!-- 3.所属分类 -->
                     <el-form-item label="所属分类:" prop='category'>
                        <el-input v-model="goodsForm.category"></el-input>
                    </el-form-item>
                     <!-- 4.商品进价 -->
                    <el-form-item label="商品进价:" prop='costPrice'>
                        <el-input @blur='autoPrice' v-model="goodsForm.costPrice"></el-input>
                    </el-form-item>
                    <!-- 5.商品售价-->
                    <el-form-item label="商品售价:" prop='salePrice'>
                        <el-input v-model="goodsForm.salePrice"></el-input>
                    </el-form-item>
                    <!-- 6.市场价格 -->
                    <el-form-item label="市场价格:" prop='marketPrice'>
                        <el-input v-model="goodsForm.marketPrice"></el-input>
                    </el-form-item>
                    <!-- 7.入库数量 -->
                    <el-form-item label="入库数量:" prop='stockCount'>
                        <el-input v-model="goodsForm.stockCount"></el-input>
                    </el-form-item>
                    <!-- 8.商品质量-->
                    <el-form-item label="商品质量:" prop='goodsWeight'>
                        <el-input v-model="goodsForm.goodsWeight"></el-input>
                    </el-form-item>
                    <!-- 9.商品单位 -->
                    <el-form-item label="商品单位:" prop='goodsUnit'>
                        <el-input v-model="goodsForm.goodsUnit"></el-input>
                    </el-form-item>
                    <!-- 10.会员优惠 -->
                    <el-form-item label="会员优惠:" style="width:400px" prop='vipDiscount'>
                        <el-radio-group v-model="goodsForm.vipDiscount">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 11.是否促销 -->
                    <el-form-item label="是否促销:" style="width:400px" prop='promotion'>
                        <el-radio-group v-model="goodsForm.promotion">
                        <el-radio label="起用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 12.商品简介 -->
                    <el-form-item label="商品简介:" prop='goodsDesc'>
                        <el-input type="textarea" v-model="goodsForm.goodsDesc" style="width:800px"></el-input>
                    </el-form-item>
                    
                    <!-- 操作 -->
                    <el-form-item>
                        <el-button type="primary" @click="goodsAdd">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入相关请求
import { goodsAdd } from '@/api/goods'

    export default {
        data() {
            return {
                // 表单数据
                goodsForm:{
                    barCode:'',  //条形码
                    goodsName:'',  //商品名称
                    category:'',   //所属分类
                    costPrice:'',  //进价
                    salePrice:'',  //售价
                    marketPrice:'', //市场价
                    stockCount:'',   //入库数量
                    goodsWeight:'', //商品质量
                    goodsUnit:'',   //商品单位
                    vipDiscount:'',  //会员优惠
                    promotion:'', //是否促销
                    goodsDesc:'',  //商品简介
                },
                // 规则
                rules:{
                    barCode:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],  
                    goodsName:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],  
                    category:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],   
                    costPrice:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],  
                    salePrice:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],  
                    marketPrice:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ], 
                    stockCount:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],   
                    goodsWeight:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ], 
                    goodsUnit:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],   
                    vipDiscount:[
                        { required: true, message: '不能为空', trigger: 'change' },   //失焦 非空验证
                    ],  
                    promotion:[
                        { required: true, message: '不能为空', trigger: 'change' },   //失焦 非空验证
                    ],
                    goodsDesc:[
                        { required: true, message: '不能为空', trigger: 'blur' },   //失焦 非空验证
                    ],  
                },
            }
        },
        methods:{
            // 自动补全价格
            autoPrice(){
                this.goodsForm.salePrice = (parseFloat( this.goodsForm.costPrice ) * 1.5).toFixed(2)
                this.goodsForm.marketPrice = (parseFloat( this.goodsForm.costPrice ) * 2).toFixed(2)
            },
            // 添加
            goodsAdd(){
                this.$refs.goodsForm.validate( (valid) => {
                    //判断
                    if( valid ){ //前端验证通过
                        // 收集参数
                        let params = {
                            barCode :  this.goodsForm.barCode,  
                            goodsName : this.goodsForm.goodsName,  
                            category : this.goodsForm.category,   
                            costPrice : this.goodsForm.costPrice,  
                            salePrice : this.goodsForm.salePrice,  
                            marketPrice : this.goodsForm.marketPrice, 
                            stockCount : this.goodsForm.stockCount,   
                            goodsWeight : this.goodsForm.goodsWeight, 
                            goodsUnit : this.goodsForm.goodsUnit,   
                            vipDiscount : this.goodsForm.vipDiscount,  
                            promotion : this.goodsForm.promotion, 
                            goodsDesc : this.goodsForm.goodsDesc,  
                        }
                        // 发送ajax
                        goodsAdd( params )
                            .then( res => {
                                // 接收后端响应的数据
                                let {code, reason} = res
                                // 判断
                                if(code === 0){  //成功
                                    // 弹成功的提示
                                    this.$message({
                                        type:'success',
                                        message:reason
                                    })
                                    // 跳转到商品列表
                                    this.$router.push('/home/goodsmanage')
                                } else if( code === 1){  //失败
                                    // 弹失败的提示
                                    this.message.error( reason )
                                }
                            })
                            .catch( err => {
                                console.log( err )
                            })


                    } else {  //前端验证不通过
                        this.$message.error('请填写所有数据')
                    }
                })
            },
        }
    }
</script>

<style lang="less">
.goods-add{
    .el-card{
        & > .el-card__header{
            background-color: #f1f1f1;
        }
        // 身体部分
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