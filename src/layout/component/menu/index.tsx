import { defineComponent } from "vue";
import item from './item'
export default defineComponent({
  setup(props,{slots}) {
    function renderMenu() {
      return (
        <ul   >
          {slots.default && slots.default()}
        </ul>
      );
    }
    return () => renderMenu();
  },
  components:{
    item
  },
});
