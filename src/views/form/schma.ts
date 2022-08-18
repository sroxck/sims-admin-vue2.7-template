import { ref } from "vue";

export default {
  width: "100%", // 每一项的宽度
  property: [
    [
      {
        type: "el-input", // 基于element的组件类型
        label: "姓4名", // 表单item 名称
        formKey: "name", // 表单的key ,字段值
        value: "11", // 表单的value
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
        label: "性4别",
        formKey: "area",
        value: "area1",
        options: {
          multiple: true,
        },
        optionData: [
          { label: "男", value: "area1" },
          { label: "女", value: "area2" },
        ],
      },
    ],
    [
      {
        type: "el-input", // 基于element的组件类型
        label: "姓名1", // 表单item 名称
        formKey: "name1", // 表单的key ,字段值
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
        label: "性别1",
        formKey: "area1",
        value: "area1",
        options: {
          multiple: true,
        },
        optionData: [
          { label: "男", value: "area1" },
          { label: "女", value: "area2" },
        ],
      },
    ],
  ], // 分为几列
};
