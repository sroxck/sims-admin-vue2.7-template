
<script  lang="ts">
import { getCurrentInstance, ref } from 'vue';

export default {
  setup() {
    const dialogVisible = ref(true);
    const root = getCurrentInstance()
    const handleClose = () => {
      dialogVisible.value = false
      if (root) {
        document.body.removeChild(root.proxy.$el)
      }
    }
    return {
      dialogVisible,
      handleClose
    }
  }
}
</script>

<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <span>这是一段信息</span>
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
