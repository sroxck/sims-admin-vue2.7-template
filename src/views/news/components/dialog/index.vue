<script >
import { postFileFun } from '@/api/common'
import { computed, defineComponent, ref } from 'vue'

export default {
  props: ['show'],
  setup(props, ctx) {
    const dialogShow = computed({
      get() {
        return props.show
      },
      set(value) {
        ctx.emit('update:show', value)
      }
    })
    const dialogVisible = ref(true)
    const handleClose = () => {
      // fileList.value = []
      dialogShow.value = false
    }
    const activeEmr = ref('')

    const uploadRef = ref(null)
    const confirm = async() => {
      const formData = new FormData()
      formData.append('file', fileList.value[0].raw)
      await postFileFun('/cebp-dwh/api/excelImport/upload', formData)
      ctx.emit('confirm')
      uploadRef.value.clearFiles()
      handleClose()
    }
    const fileList = ref([])

    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }
    const handlePreview = (file) => {
      console.log(file)
    }
    const handleChange = (file, fileData) => {
      fileData = []

      fileData.push(file)
      fileList.value = fileData
      console.log(file, fileData, 'change')
      console.log(fileList, 'fileList')
    }
    return {
      uploadRef,
      fileList,
      handleChange,
      handleRemove,
      handlePreview,
      activeEmr,
      confirm,
      dialogShow,
      handleClose,
      dialogVisible
    }
  }
}
</script>

<template>
  <div>
    <el-dialog class="import" title="导入模版" :visible.sync="dialogShow" width="500px" :before-close="handleClose">
      <!-- <el-upload :auto-upload="false" class="upload-demo" style="text-align: center;" drag
        action="https://jsonplaceholder.typicode.com/posts/">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload> -->

      <el-upload
        ref="uploadRef"
        drag
        style="text-align: center;"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传xsl/xslx文件</div>

      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">导 入</el-button>
        <el-button @click="dialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
::v-deep .el-dialog__footer {
  text-align: center !important;
}
</style>
