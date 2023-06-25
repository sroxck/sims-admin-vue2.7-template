/**
 * @Author: sroxck
 * @Date: 2023-06-21 10:33:26
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 10:39:35
 * @Description: 
 */
import { h, ref,  } from 'vue'

export function useDialog(config) {
  const visible = ref(false)

  // function openDialog(content) {
  //   console.log(content,'content')
  //   visible.value = true
  //   const dialogWrapper = document.createElement('div')
  //   const { title, width } = config
  //   // const dialogApp = createApp({
  //   //   render: () =>
  //   //     h('el-dialog', {
  //   //       props: {
  //   //         title,
  //   //         width,
  //   //         visible: visible.value,
  //   //         'destroyOnClose': true
  //   //       },
  //   //       on: {
  //   //         'update:visible': val => {
  //   //           visible.value = val
  //   //         }
  //   //       }
  //   //     }, [h(content)])
  //   // })
  //   dialogWrapper.appendChild(dialogApp.mount().$el)
  //   document.body.appendChild(dialogWrapper)
  //   const closeDialog = () => {
  //     visible.value = false
  //     dialogApp.unmount()
  //     dialogWrapper.remove()
  //   }
  //   return { closeDialog }
  // }
  return {
    // openDialog
  }
}
