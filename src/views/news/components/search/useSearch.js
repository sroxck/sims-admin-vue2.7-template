/**
 * @Author: sroxck
 * @Date: 2023-05-08 17:04:14
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 14:52:42
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
      '新增': (emit) => {
        
        emit('update:addNews')
      },
    },
    property: [
      {
        type: 'text',
        native: {
        },
        props: {
          clearable: true
        },
        model: 'newsTitle',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '新闻标题'
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
          //新闻类型:1-中心动态、2   新闻动态  3   通知公告  4   图片要闻  5   重要声明  6   健康馆  7   中医培训  8   同业资讯  9   成功案例
          {
            label: '中心动态',
            value: '1'
          },
          {
            label: '新闻动态',
            value: '2'
          },
          {
            label: '通知公告',
            value: '3'
          },
          {
            label: '图片要闻',
            value: '4'
          },
          {
            label: '重要声明',
            value: '5'
          },
          {
            label: '健康馆',
            value: '6'
          },
          {
            label: '中医培训',
            value: '7'
          },
          {
            label: '同业资讯',
            value: '8'
          },
          {
            label: '成功案例',
            value: '9'
          },

        ],
        model: 'newsType',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '新闻类型'
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
          //新闻状态：0   待发布,1   已发布,2   已下架
          {
            label: '待发布',
            value: '0'
          },
          {
            label: '已发布',
            value: '1'
          },
          {
            label: '已下架',
            value: '2'
          },

        ],
        model: 'newsStatus',
        handle: (emit, data) => {
          emit('update:change', data)
        },
        label: '新闻状态'
      }
    ]
  })
