<script setup lang="ts">
import container from '@components/container/index.vue'
import fromG from '@/views/form/from'
import { ref } from 'vue';

const AppHeight = ref(null)
const config = {
  width: "100%", //
  inline:true, // 表单行内样式
  labelPosition:'top',// 表单域标签的位置
  labelWidth:'80px', // 表单项标签的宽度
  labelSuffix:'',//表单后缀
  showMessage:'', // 是否显示校验错误信息	
  inlineMessage:'', // 是否以行内形式展示校验信息	
  statusIcon:false, // 是否在输入框中显示校验结果反馈图标	
  disabled:false, // 是否禁用该表单内的所有组件
  row:{

  },
  col:{

  },
  property: [
    [
      {
        type: "el-input", // 基于element的组件类型
        formKey: "name", // 表单的key ,字段值
        value: "", // 表单的value
      },
      {
        type: "el-select",
        formKey: "ar4ea",
        value: "",
        options: {
          multiple: true,
        },
        optionData: [
          { label: "男", value: "1" },
          { label: "女", value: "0" },
        ],
      },
     
    ],
   
   
  ], // 分为几列
};
const data=[
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
  {name:'1'},
]
</script>

<template>
  <container >
    <template #header>
      <fromG :config="config"></fromG>
    </template>
    <template #main>
      <el-table   style="width: 100%"
     :data="data"
        :header-cell-style="{ background: '#F2F6FD' }"
        stripe
        default-expand-all>
        <el-table-column prop="name" label="测试表头1" />
        <el-table-column label="测试表头2" />
        <el-table-column  label="测试表头3" />
        <el-table-column  label="测试表头4" />
      </el-table>
    </template>
    <template #footer>
      底部内容,一般为分页组件
    </template>
  </container>
</template>
