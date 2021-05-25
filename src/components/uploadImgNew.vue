<template>
  <div>
    <el-upload
    class="avatar-uploader"
      name="file"
      list-type="picture-card"
       :file-list="fileList"
      :action="uploadAction"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
   export default {
      data() {
        return {
          dialogImageUrl: '',
          fileList:[],
          dialogVisible: false,
          uploadAction:'http://daranzhibojiekou.daranjituan.com/admin/api.Plugs/upload',
          picArr:[]
        };
      },
      props:{
       pic:{
         type:Array,
         required:false
       }
      },
      watch:{
        pic:{
          handler(pic){
            if(pic.length !== 0){
              this.fileList = pic
            }
          },
          deep:true,
          immediate:true
        },
      },
      methods: {
        handleRemove(file, fileList) {
           console.log(fileList);
           this.$emit('fileList',fileList);
         },
         handlePictureCardPreview(file) {
           this.dialogImageUrl = file.url;
           this.dialogVisible = true;
         },
         handleSuccess(response, file, fileList){
           console.log(fileList)
           this.$emit('fileList',fileList);
         }
      }
    }
</script>

<style>
</style>
