<template>
  <el-upload
  class="upload-demo"
  ref="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-change="change"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取excel文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传 excel 文件</div>
</el-upload>
</template>
<script >
import {read,utils} from 'xlsx';//引入插件

  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      change(event){
        console.log(event);
        var f = event.raw
      // 用FileReader来读取
      var reader = new FileReader();
      let that = this
      
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = '';
        var wb; // 读取完成的数据
        var outdata; // 你需要的数据
        var reader = new FileReader();
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = read(binary, {
            type: 'binary'
          });
          outdata = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // 自定义方法向父组件传递数据
          console.log('outdata',outdata)
          that.$emit('getResult', outdata);
          that.$emit('getResultTitle', event.name);
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
