<!--
 * @Author: sroxck
 * @Date: 2023-06-06 10:44:06
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-06 10:58:54
 * @Description: 
-->
<script >
import { postFileFun } from '@/api/common'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default {
  props: ['show','json'],
  setup(props, ctx) {
    const dialogShow = computed({
      get() {
        return props.show
      },
      set(value) {
        ctx.emit('update:show', value)
      }
    })
    const handleClose = () => {
      dialogShow.value = false
    } 
   

    return {

      dialogShow,
      handleClose,
    }
  }
}
</script>

<template>
  <div>
    <el-dialog class="import" title="执行结果" :visible.sync="dialogShow" width="30%" :before-close="handleClose">
      <el-table :stripe="true" :header-cell-style="{ background: '#F2F6FD' }" :data="json" style="width: 100%">
        <el-table-column prop="lineNum" label="行号" >
        </el-table-column>
        <el-table-column prop="status" label="结论" >
        </el-table-column>
        <el-table-column prop="reason" label="原因">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
::v-deep .el-dialog__footer {
  text-align: center !important;
}
</style>
