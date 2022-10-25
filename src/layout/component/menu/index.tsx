import { defineComponent, provide, ref } from "vue";
import item from './item'
export default defineComponent({
  props: ['route', 'activeColor'],
  setup(props, { slots }) {
    provide('activeColor', props.activeColor)
    function renderMenu() {
      return (
        <ul>
          {slots.default && slots.default()}
        </ul>
      );
    }
    return () => renderMenu();
  },
  components: {
    item
  },
});
