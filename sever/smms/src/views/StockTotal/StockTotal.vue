<template>
    <div class="stock-total">
        <el-card class="box-card">
            <!-- 卡片内容 -->
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>进货统计</h2>
            </div>
            <div class="text item">
                <el-button type='success'>切换数据</el-button>
                <!-- 1.准备报表容器 -->
                <div id='sellCharts' style="height:500px;marginTop:20px"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    //引入echarts
    import echarts from 'echarts' 
    export default {
        // 数据
        data(){
            return {
                xdata:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                serdata:[820, 932, 901, 934, 1290, 1330, 1320],
            }
        },
        // 函数
        methods:{

        },
        // 生命周期函数
        mounted(){
            //2.初始化报表
            var sellCharts = echarts.init(document.getElementById('sellCharts'));
            //3.写配置
            var option = {
                // x轴
                xAxis: {
                    type: 'category',
                    data: this.xdata
                },
                // y轴
                yAxis: {
                    type: 'value'
                },
                // 核心数据
                series: [{
                    data: this.serdata,
                    type: 'line'
                }]
            };
            //4. 使用报表
            sellCharts.setOption( option )
        }
        
    }
</script>

<style lang="less">
.stock-total{
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