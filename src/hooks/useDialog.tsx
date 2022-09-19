import Vue, { ref } from 'vue'

import { Dialog } from 'element-ui'
import { appendDom, createDom } from '@/utils';
import { DialogSlot } from '@/types';

export function useDialog<T extends DialogSlot>(options: T) {
  const visible = ref(false);
  const open = () => {
    visible.value = true
    const DialogBox = createDom('div', { id: 'DialogBox' })
    const DialogContainer = createDom('div', { id: 'DialogContainer', child: DialogBox })
    appendDom(document.body, DialogContainer)
    const Component = Vue.extend(RenderDialog)
    new Component().$mount('#DialogBox')
  }
  const close = () => {
    visible.value = false
    const dialog = document.querySelector('#DialogContainer');
    dialog && document.body.removeChild(dialog)
  };
  const RenderDialog = () => {
    return (
      <Dialog
        visible={visible.value}
        onClose={close}
        scopedSlots={{
          title: () => options.title,
          default: () => options.content,
          footer: () => options.footer
        }}
      >
        <div slot="footer"/>
      </Dialog >
    );
  };
  return { open, close, RenderDialog };
}
