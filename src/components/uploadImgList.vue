<template>
  <div>
    <el-upload
    class="avatar-uploader"
      name="file"
      list-type="picture-card"
       :file-list="fileList"
      :action="uploadAction"
      :on-preview="handlePictureCardPreview"
      :on-success="onsuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { delImg } from '@/api/request'
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
          if(file.response){
            let index = file.response.url
            if(this.picArr.indexOf(index) !== -1){
              this.picArr.splice(index, 1)
              this.$emit('picArr',this.picArr);
            }
          }else{
            delImg(file.id)
              .then(res =>{
                if(res.data.code == 200){
                  this.$message.success('删除成功!',3);
                }else{
                  this.$message.warning('删除失败!',3);
                }
              })
              this.$emit('fileList',fileList);
          }
        },
        onsuccess(file, fileList){
          this.picArr.push(file.url)
          this.$emit('picArr',this.picArr);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      }
    }
</script>

<style>
</style>
