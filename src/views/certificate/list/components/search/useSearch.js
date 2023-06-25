/**
 * @Author: sroxck
 * @Date: 2023-05-08 17:04:14
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 10:55:14
 * @Description:
 */
/*
 * @Date: 2023-04-18 09:37:31
 * @LastEditors: sroxck 642261686@qq.com
 * @LastEditTime: 2023-05-05 09:40:39
 */
import { reactive, ref, h } from 'vue'
import { useDialog } from '@/compoables/useDialog'
import { postFun } from '@/api/common'
export
  const searchConfig = reactive({
    config: {
      inline: true,
      labelWidth: '75px'
    },
    handle: {
     
    },
    property: [
      {
        type: 'text',
        native: {
        },
        props: {
          clearable: true
        },
        model: 'name',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '学员姓名'
      },
      {
        type: 'text',
        native: {
        },
        props: {
          clearable: true
        },
        model: 'cardId',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '学员身份证号'
      },
      {
        type: 'text',
        native: {
        },
        props: {
          clearable: true
        },
        model: 'id',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '证书编号'
      },
      {
        type: 'select',
        native: {
          prefixIcon: 'iconsearchsvg'
        },
        props: {
          clearable: true
        },
        options: [
          {
            label: '未生成',
            value: '1'
          },
          {
            label: '已生成,未上链',
            value: '2'
          },
          {
            label: '已上链',
            value: '3'
          },

        ],
        model: 'status',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '证书状态'
      }
    ]
  })
