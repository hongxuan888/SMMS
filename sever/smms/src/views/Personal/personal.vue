<template>
    <div class="personal">
        <el-card class="box-card">
            <!-- 卡片内容 -->
            <div slot="header" class="clearfix">
                <!-- 头部 -->
                <h2>个人中心</h2>
            </div>
            <div class="text item">
               <H2>ID：{{ accountId }}</H2>
               <H2>账户：{{ account }}</H2>
               <H2>用户组：{{ userGroup }}</H2>
            </div>
            <!-- 头像上传 -->
            <el-upload
                style="marginTop:20px"
                :http-request="uploading"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-card>
    </div>
</template>

<script>
    //引入
    import  { accountMessage } from '@/api/account'
    export default {
      data(){
          return {
              accountId:'',
              account:'',
              userGroup:'',
            //   头像上传
              imageUrl:''
          }
      },
      methods:{
        //   用户信息
        getMessage(){
            // 发送ajax
            accountMessage()
                .then( res => {
                    //接收后端响应的数据
                    let { account, id, selectGrouping } = res
                    // 渲染
                    this.accountId = id,
                    this.account = account,
                    this.userGroup = selectGrouping

                })
                .catch( err => {
                    console.log( err )
                })
        },
        // 头像上传
        // 头像上传成功
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        // 头像上传之前的限制
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 自定义上传头像
        uploading(a){
            console.log(a)
        }
      },
      //生命周期函数
      created(){
        //   调用用户信息函数
          this.getMessage()
      }
        
    }
</script>

<style lang="less">
.personal{
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>