<!--
 * @Author: sroxck
 * @Date: 2023-06-21 10:29:54
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 10:37:57
 * @Description: 
-->

<script  >
import { h } from 'vue'

export default {
  props: {
    tableData: {
      required: true,
      type: Array
    },
    labelData: {
      required: true,
      type: Object
    }
  },
  setup(props, ctx) {
    return () => {
      return h('el-table', {
        props: {
          data: props.tableData,
          stripe: true,
          'header-cell-style': { background: '#F2F6FD' }
        }
      }, [
        Object.entries(props.labelData).map(([item]) => {
          return h('el-table-column', {
            props: {
              label: props.labelData[item],
              prop: item
            }
          })
        }).concat(ctx.slots.custom()),
        h('el-table-column', {
          props: {
            label: '操作'
          },
          scopedSlots: {
            default: (slot) => {
              return [
                ctx.slots.handle ? ctx.slots.handle({ row: slot.row }) : ''
              ]
            }
          }
        })]
      )
    }
  }
}
</script>

