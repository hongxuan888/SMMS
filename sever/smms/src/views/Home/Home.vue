<template>
    <div class="home">
           <el-container>
               <!-- 左边 -->
                <el-aside width="200px">
               <!-- 3.使用左边组件 -->
               <LeftAside></LeftAside> 
                </el-aside>
                <!-- 右边 -->
                <el-container>
                    <!-- 上 -->
                    <el-header>
                        <!-- 3.使用头部组件 -->
                        <RightHeader></RightHeader>
                    </el-header>
                    <!-- 中 -->
                    <el-main>
                        <!-- 组件出口 -->
                        <router-view></router-view>
                    </el-main>
                    <!-- 下 -->
                    <el-footer>
                         <!-- 3.使用尾部组件 -->
                        <RightFooter></RightFooter>
                    </el-footer>
                </el-container>
            </el-container>
    </div>
</template>

<script>
// 1.引入组件
import LeftAside from '@/components/LeftAside/LeftAside.vue'
import RightHeader from '@/components/RightHeader/RightHeader.vue'
import RightFooter from '@/components/RightFooter/RightFooter.vue'

    export default {
        // 2.注册组件
        components:{
            LeftAside,
            RightHeader,
            RightFooter
        }
        
    }
</script>

<style lang="less" >
.home{
    height: 100%;
    .el-container{
        height: 100%;
        .el-header{
            background-color: #B3C0D1;
            line-height: 60px;
        }
        .el-aside {
            background-color: rgb(48, 65, 86);
        }
        .el-main {
            background-color: #E9EEF3;
        
        }
        .el-footer {
            background-color: #B3C0D1;
             line-height: 60px;
        }
    }
}
  
  

</style>