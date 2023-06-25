
<script >
import { defineComponent, ref } from 'vue';
import { postFun, postBlobFun } from '@/api/common';
import { downloadFn } from '@/utils/download'
import { Message } from 'element-ui';
export default defineComponent({
  props: ['closeDialog'],
  setup(props, ctx) {
    const data = ref([])
    const radio = ref('')
    postFun('cebp-dwh/api/services/emr/getVisitEmrRecordList', {}).then(res => {
      data.value = res.data
    })
    console.log(data, 'data')
    const download = () => {
      if (radio.value == '') return Message.error('请选择模版')
      postBlobFun('/cebp-dwh/api/excelImport/download', { emrCategoryId: radio.value }).then(res => {
        downloadFn(res, '模版')
        props.closeDialog()
      })
    }

    return {
      radio,
      data,
      download
    }
  }
})
</script>

<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="item.emrCategoryId" :key="index" v-for="item, index in data">{{ item.categoryDesc }}</el-radio>
    </el-radio-group>
    <br>
    <div style="margin:0 auto;text-align: center;"> <el-button @click="download">下载</el-button></div>

  </div>
</template>
