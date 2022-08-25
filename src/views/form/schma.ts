import { ref } from "vue";

export default {
  width: "100%", //
  rules:[], // 校验规则
  inline:false, // 表单行内样式
  labelPosition:'top',// 表单域标签的位置
  labelWidth:'80px', // 表单项标签的宽度
  labelSuffix:'表单后缀',//表单后缀
  showMessage:'', // 是否显示校验错误信息	
  inlineMessage:'', // 是否以行内形式展示校验信息	
  statusIcon:false, // 是否在输入框中显示校验结果反馈图标	
  disabled:true, // 是否禁用该表单内的所有组件
  row:{

  },
  col:{

  },
  property: [
    [
      {
        type: "el-input", // 基于element的组件类型
        label: "姓名", // 表单item 名称
        formKey: "name", // 表单的key ,字段值
        value: "", // 表单的value
        disabled: false, // 禁用
        options: {
          // 配置项
          multiple: true, // 是否可多选
        },
        optionData: [
          { label: "男", value: "area1" },
          { label: "女", value: "area2" },
        ],
        on: [{ name: "click", handle: (value: any) => {} }],
        nativeOn: [{ name: "click", handle: (value: any) => {} }],
        element:{}
      },
      {
        type: "el-select",
        label: "性别",
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
      {
        type: "el-input",
        label: "年龄",
        formKey: "are3a",
        value: "",
        options: {
          multiple: true,
        },
        optionData: [
          { label: "男", value: "1" },
          { label: "女", value: "0" },
        ],
      },
      {
        type: "el-select",
        label: "民族",
        formKey: "are2a",
        value: "",
        options: {
          multiple: true,
        },
        optionData: [
          { label: "汉", value: "1" },
          { label: "汉奸", value: "0" },
        ],
      },
    ],
    [
      {
        type: "el-input", // 基于element的组件类型
        label: "家庭住址", // 表单item 名称
        formKey: "n4a3me", // 表单的key ,字段值
        value: "", // 表单的value
        disabled: false, // 禁用
        options: {
          // 配置项
          multiple: true, // 是否可多选
        },
        optionData: [
          { label: "男", value: "area1" },
          { label: "女", value: "area2" },
        ],
        on: [{ name: "click", handle: (value: any) => {} }],
        nativeOn: [{ name: "click", handle: (value: any) => {} }],
      },
      {
        type: "el-select",
        label: "学历",
        formKey: "ar43ea",
        value: "",
        options: {
          multiple: true,
        },
        optionData: [
          { label: "大学", value: "1" },
          { label: "小学", value: "0" },
        ],
      },
      
    ],
   
  ], // 分为几列
};
