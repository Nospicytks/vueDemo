<template>
  <div>
    <a-upload
        :disabled="disabled"
        name="file"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :action="uploadAction"
        :data="{file:filePath}"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img style="width:100px;height: 100px;" v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            上传
          </div>
        </div>
      </a-upload>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        loading:false,
        imageUrl: '',
        uploadAction:'http://daranzhibojiekou.daranjituan.com/admin/api.Plugs/upload',
        filePath:'',
        filename:'',

      }
    },
    props:{
     pic:{
       type:String,
       required:false
     },
     disabled:{
       type:Boolean,
       required:false,
       default:false
     }
    },
    watch:{
      pic:{
        handler(pic){
          this.imageUrl = pic
          console.log(this.imageUrl)
        },
        deep:true,
        immediate:true
      },
      filename:{
        handler(filename){
          if(filename !== '' && filename !== null && typeof(filename) !== 'undefind'){
            let params = {
              filename:filename,
              imageUrl:this.imageUrl
            }
            this.$emit('filename',params);
          }
        },
        deep: true,
        immediate: true,
      }
    },
    methods:{
      handleChange(info) {
           if (info.file.status === 'uploading') {
             this.loading = true;
             return;
           }
           if (info.file.status === 'done') {
            this.filePath = info
            this.loading = false;
            this.imageUrl = info.file.response.url
            this.filename = info.file.response.filename
           }
      },
      beforeUpload(file) {
           const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
           if (!isJpgOrPng) {
             this.$message.error('只能上传jpg/png格式的图片');
           }
           const isLt2M = file.size / 1024 / 1024 < 2;
           if (!isLt2M) {
             this.$message.error('请上传2M以下的图片');
           }
           return isJpgOrPng && isLt2M;
      }
    }
  }
</script>

<style>
</style>
